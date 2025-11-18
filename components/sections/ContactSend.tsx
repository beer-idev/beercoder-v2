"use client";
import { useState } from "react";

export default function ContactSend() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true); setOk(null); setErr(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          subject: form.get('subject'),
          message: form.get('message'),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setOk('ส่งข้อความเรียบร้อย ขอบคุณครับ');
      if (typeof window !== 'undefined') {
        alert('ส่งข้อความเรียบร้อย ขอบคุณครับ');
      }
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e.message || 'ส่งไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 form-underline max-w-3xl mx-auto">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="field">
          <label className="mb-1 block text-sm text-slate-300">Name</label>
          <input name="name" className="w-full px-1 py-2" placeholder="Your name" required />
        </div>
        <div className="field">
          <label className="mb-1 block text-sm text-slate-300">Email</label>
          <input name="email" type="email" className="w-full px-1 py-2" placeholder="you@example.com" required />
        </div>
        <div className="field md:col-span-2">
          <label className="mb-1 block text-sm text-slate-300">Subject</label>
          <input name="subject" className="w-full px-1 py-2" placeholder="Message subject" required />
        </div>
        <div className="field md:col-span-2">
          <label className="mb-1 block text-sm text-slate-300">Message</label>
          <textarea name="message" rows={5} className="w-full resize-y px-1 py-2" placeholder="Tell me what you need" required />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button type="submit" disabled={loading} className="rounded-lg bg-[color:var(--tropical-teal)] px-5 py-2 font-semibold text-black hover:bg-[color:var(--neon-ice)] disabled:opacity-60">
          {loading ? 'Sending…' : 'Send Message'}
        </button>
        {ok && <span className="text-sm text-[color:var(--tropical-teal)]">{ok}</span>}
        {err && <span className="text-sm text-red-400">{err}</span>}
      </div>
    </form>
  );
}
