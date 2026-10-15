'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function LeadForm({ onComplete }: { onComplete: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'New Lead from Chatbot',
          message: formData.message,
          source: 'chatbot',
          isNotRobot: true
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(onComplete, 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-100 p-5 rounded-2xl text-green-900 text-sm animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span className="font-bold">Sent Successfully!</span>
        </div>
        <p className="opacity-90 leading-relaxed font-medium">Our team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm space-y-3 mt-2 animate-in slide-in-from-top-2">
      {error && (
        <div className="bg-red-50 border border-red-100 p-2 rounded-lg text-red-600 text-[10px] font-bold text-center">
          {error}
        </div>
      )}
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Name</label>
        <input
          required
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
        <input
          required
          type="email"
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
        <input
          required
          type="tel"
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Message</label>
        <textarea
          required
          rows={2}
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors resize-none"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help you?"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs h-9 rounded-lg shadow-sm"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
