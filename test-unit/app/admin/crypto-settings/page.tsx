'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash, Edit, XCircle } from 'lucide-react'; // Icons for actions

interface CryptoSetting {
  id: string;
  currency_code: CryptoCurrencyCode;
  address: string;
  barcode_url: string | null;
  logo_url: string | null;
  network_logo_url: string | null; // Added for network logo
  network: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

type CryptoCurrencyCode = 'BTC' | 'USDC' | 'ETH' | 'SOL' | 'LTC' | 'TRX' | 'BNB' | 'USDT';

interface CryptoFormState {
  currency_code: CryptoCurrencyCode | '';
  address: string;
  barcode_url: string | null;
  logo_url: string | null;
  network_logo_url: string | null; // Added for network logo
  network: string;
  is_active: boolean;
}

const CRYPTO_CURRENCIES: CryptoCurrencyCode[] = ['BTC', 'USDC', 'ETH', 'SOL', 'LTC', 'TRX', 'BNB', 'USDT'];

export default function AdminCryptoSettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<CryptoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSetting, setNewSetting] = useState<CryptoFormState>({
    currency_code: '',
    address: '',
    barcode_url: '',
    logo_url: '',
    network_logo_url: '', // Initial state for network logo
    network: '',
    is_active: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [networkLogoFile, setNetworkLogoFile] = useState<File | null>(null); // State for network logo file

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/crypto-settings');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data: CryptoSetting[] = await response.json();
      const sanitizedData = data?.map(s => ({
        ...s,
        barcode_url: s.barcode_url || '',
        logo_url: s.logo_url || '',
        network_logo_url: s.network_logo_url || '', // Sanitize network logo
      })) || [];
      setSettings(sanitizedData as CryptoSetting[]);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      if (name === 'qr_code_image' && files) {
        setQrCodeFile(files[0]);
      } else if (name === 'logo_image' && files) {
        setLogoFile(files[0]);
      } else if (name === 'network_logo_image' && files) {
        setNetworkLogoFile(files[0]);
      }
    } else {
      setNewSetting((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setNewSetting((prev) => ({
      ...prev,
      currency_code: value as CryptoCurrencyCode | '',
    }));
  };

  const uploadFileToSupabaseStorage = async (file: File, folder: string): Promise<string | null> => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('crypto-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error(`Error uploading ${folder} file:`, uploadError);
      setError(`Failed to upload ${folder} file: ${uploadError.message}`);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('crypto-images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  const handleAddSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const barcodeUrl = qrCodeFile ? await uploadFileToSupabaseStorage(qrCodeFile, 'qr-codes') : null;
    const logoUrl = logoFile ? await uploadFileToSupabaseStorage(logoFile, 'crypto-logos') : null;
    const networkLogoUrl = networkLogoFile ? await uploadFileToSupabaseStorage(networkLogoFile, 'network-logos') : null;

    if ((qrCodeFile && !barcodeUrl) || (logoFile && !logoUrl) || (networkLogoFile && !networkLogoUrl)) {
      return;
    }

    const { data, error } = await supabase
      .from('crypto_payment_settings')
      .insert([{ ...newSetting, barcode_url: barcodeUrl, logo_url: logoUrl, network_logo_url: networkLogoUrl }])
      .select('*')
      .single();

    if (error) {
      console.error('Error adding setting:', error);
      setError(`Failed to add setting: ${error.message}`);
    } else if (data) {
      setSettings((prev) => [...prev, data]);
      setNewSetting({
        currency_code: '',
        address: '',
        barcode_url: '',
        logo_url: '',
        network_logo_url: '',
        network: '',
        is_active: true,
      });
      setQrCodeFile(null);
      setLogoFile(null);
      setNetworkLogoFile(null);
    }
  };

  const handleEditClick = (setting: CryptoSetting) => {
    setEditingId(setting.id);
    setNewSetting({
      currency_code: setting.currency_code || '',
      address: setting.address || '',
      barcode_url: setting.barcode_url || '',
      logo_url: setting.logo_url || '',
      network_logo_url: setting.network_logo_url || '',
      network: setting.network || '',
      is_active: setting.is_active,
    });
    setQrCodeFile(null);
    setLogoFile(null);
    setNetworkLogoFile(null);
  };

  const handleUpdateSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setError(null);

    const barcodeUrl = qrCodeFile ? await uploadFileToSupabaseStorage(qrCodeFile, 'qr-codes') : newSetting.barcode_url;
    const logoUrl = logoFile ? await uploadFileToSupabaseStorage(logoFile, 'crypto-logos') : newSetting.logo_url;
    const networkLogoUrl = networkLogoFile ? await uploadFileToSupabaseStorage(networkLogoFile, 'network-logos') : newSetting.network_logo_url;

    if ((qrCodeFile && !barcodeUrl) || (logoFile && !logoUrl) || (networkLogoFile && !networkLogoUrl)) {
      return;
    }

    const { data, error } = await supabase
      .from('crypto_payment_settings')
      .update({ ...newSetting, barcode_url: barcodeUrl, logo_url: logoUrl, network_logo_url: networkLogoUrl })
      .eq('id', editingId)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating setting:', error);
      setError(`Failed to update setting: ${error.message}`);
    } else if (data) {
      setSettings((prev) => prev.map((s) => (s.id === editingId ? data : s)));
      setEditingId(null);
      setNewSetting({
        currency_code: '',
        address: '',
        barcode_url: '',
        logo_url: '',
        network_logo_url: '',
        network: '',
        is_active: true,
      });
      setQrCodeFile(null);
      setLogoFile(null);
      setNetworkLogoFile(null);
    }
  };

  const handleDeleteSetting = async (id: string) => {
    setError(null);
    const { error } = await supabase
      .from('crypto_payment_settings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting setting:', error);
      setError(`Failed to delete setting: ${error.message}`);
    } else {
      setSettings((prev) => prev.filter((s) => s.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading admin settings...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin: Cryptocurrency Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <XCircle className="h-6 w-6 fill-current" />
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Setting' : 'Add New Setting'}</h2>
        <form onSubmit={editingId ? handleUpdateSetting : handleAddSetting} className="space-y-4">
          <Select onValueChange={handleSelectChange} value={newSetting.currency_code} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Currency Code" />
            </SelectTrigger>
            <SelectContent>
              {CRYPTO_CURRENCIES.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="address"
            placeholder="Wallet Address"
            value={newSetting.address}
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <div className="flex flex-col space-y-1">
            <label htmlFor="qr_code_image" className="text-sm font-medium text-gray-700">QR Code Image</label>
            <Input
              id="qr_code_image"
              name="qr_code_image"
              type="file"
              onChange={handleInputChange}
              className="w-full"
            />
            {qrCodeFile && <p className="text-sm text-neutral-500">Selected: {qrCodeFile.name}</p>}
            {editingId && newSetting.barcode_url && !qrCodeFile && (
              <p className="text-sm text-neutral-500">Current QR: <a href={newSetting.barcode_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="logo_image" className="text-sm font-medium text-gray-700">Cryptocurrency Logo</label>
            <Input
              id="logo_image"
              name="logo_image"
              type="file"
              onChange={handleInputChange}
              className="w-full"
            />
            {logoFile && <p className="text-sm text-neutral-500">Selected: {logoFile.name}</p>}
            {editingId && newSetting.logo_url && !logoFile && (
              <p className="text-sm text-neutral-500">Current Logo: <a href={newSetting.logo_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="network_logo_image" className="text-sm font-medium text-gray-700">Network Logo</label>
            <Input
              id="network_logo_image"
              name="network_logo_image"
              type="file"
              onChange={handleInputChange}
              className="w-full"
            />
            {networkLogoFile && <p className="text-sm text-neutral-500">Selected: {networkLogoFile.name}</p>}
            {editingId && newSetting.network_logo_url && !networkLogoFile && (
              <p className="text-sm text-neutral-500">Current Network Logo: <a href={newSetting.network_logo_url} target="_blank" rel="noopener noreferrer" className="text-.blue-600 hover:underline">View</a></p>
            )}
          </div>
          <Input
            name="network"
            placeholder="Network (e.g., Tron, ERC-20)"
            value={newSetting.network}
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={newSetting.is_active}
              onChange={handleInputChange}
              id="is_active"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Is Active</label>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {editingId ? 'Update Setting' : 'Add Setting'}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={() => {
                setEditingId(null);
                setNewSetting({
                  currency_code: '',
                  address: '',
                  barcode_url: '',
                  logo_url: '',
                  network_logo_url: '',
                  network: '',
                  is_active: true,
                });
                setNetworkLogoFile(null);
              }}>
                Cancel Edit
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Settings List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Settings</h2>
        {settings.length === 0 ? (
          <p className="text-neutral-500">No settings found. Add one above!</p>
        ) : (
          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.id} className="border p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {setting.logo_url && <img src={setting.logo_url} alt={`${setting.currency_code} logo`} className="h-10 w-10 object-contain" />}
                    {setting.network_logo_url && (
                      <img
                        src={setting.network_logo_url}
                        alt={`${setting.network} logo`}
                        className="absolute -bottom-1 -right-1 h-5 w-5 object-contain border-2 border-white rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{setting.currency_code}</p>
                    <p className="text-sm text-neutral-600">Address: <span className="font-mono">{setting.address}</span></p>
                    <p className="text-sm text-neutral-600">Network: {setting.network}</p>
                    {setting.barcode_url && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-neutral-600">QR Code:</span>
                        <img src={setting.barcode_url} alt={`${setting.currency_code} QR code`} className="h-10 w-10 object-contain border rounded" />
                      </div>
                    )}
                    <p className="text-sm text-neutral-600">Status: {setting.is_active ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditClick(setting)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteSetting(setting.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
