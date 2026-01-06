'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Import Supabase client
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, Edit, Check, XCircle } from 'lucide-react'; // Icons for actions

interface CryptoSetting {
  id: string;
  currency_code: string;
  address: string;
  barcode_url: string;
  network: string;
  is_active: boolean;
}

export default function AdminCryptoSettingsPage() {
  const [settings, setSettings] = useState<CryptoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSetting, setNewSetting] = useState<Omit<CryptoSetting, 'id' | 'created_at' | 'updated_at'>>({
    currency_code: '',
    address: '',
    barcode_url: '',
    network: '',
    is_active: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('crypto_payment_settings')
      .select('*')
      .order('currency_code', { ascending: true });

    if (error) {
      console.error('Error fetching settings:', error);
      setError('Failed to fetch settings.');
    } else {
      setSettings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewSetting((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase
      .from('crypto_payment_settings')
      .insert([newSetting])
      .select('*')
      .single();

    if (error) {
      console.error('Error adding setting:', error);
      setError(error.message);
    } else {
      setSettings((prev) => [...prev, data]);
      setNewSetting({
        currency_code: '',
        address: '',
        barcode_url: '',
        network: '',
        is_active: true,
      });
    }
  };

  const handleEditClick = (setting: CryptoSetting) => {
    setEditingId(setting.id);
    setNewSetting({
      currency_code: setting.currency_code,
      address: setting.address,
      barcode_url: setting.barcode_url,
      network: setting.network,
      is_active: setting.is_active,
    });
  };

  const handleUpdateSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setError(null);

    const { data, error } = await supabase
      .from('crypto_payment_settings')
      .update(newSetting)
      .eq('id', editingId)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating setting:', JSON.stringify(error, null, 2));
      setError(error.message);
    } else {
      setSettings((prev) => prev.map((s) => (s.id === editingId ? data : s)));
      setEditingId(null);
      setNewSetting({
        currency_code: '',
        address: '',
        barcode_url: '',
        network: '',
        is_active: true,
      });
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
      setError(error.message);
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
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <XCircle className="h-6 w-6 fill-current" />
          </span>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Setting' : 'Add New Setting'}</h2>
        <form onSubmit={editingId ? handleUpdateSetting : handleAddSetting} className="space-y-4">
          <Input
            name="currency_code"
            placeholder="Currency Code (e.g., BTC)"
            value={newSetting.currency_code}
            onChange={handleInputChange}
            required
            className="w-full"
            disabled={!!editingId} // Disable editing currency code for existing entries
          />
          <Input
            name="address"
            placeholder="Wallet Address"
            value={newSetting.address}
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <Input
            name="barcode_url"
            placeholder="Barcode URL (e.g., https://example.com/btc.png)"
            value={newSetting.barcode_url}
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <Input
            name="network"
            placeholder="Network (e.g., ERC-20, Bitcoin)"
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
                  network: '',
                  is_active: true,
                });
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
                <div>
                  <p className="font-semibold text-lg">{setting.currency_code}</p>
                  <p className="text-sm text-neutral-600">Address: <span className="font-mono">{setting.address}</span></p>
                  <p className="text-sm text-neutral-600">Network: {setting.network}</p>
                  <p className="text-sm text-neutral-600">Barcode: {setting.barcode_url}</p>
                  <p className="text-sm text-neutral-600">Status: {setting.is_active ? 'Active' : 'Inactive'}</p>
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
