'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-neutral-600">
            We'd love to hear from you.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          {isSubmitted ? (
            <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Thank you!</h2>
              <p className="text-green-700">
                Your message has been sent successfully. We will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-lg font-medium">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-lg font-medium">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  rows={6}
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="submit" className="w-full text-lg py-6">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
