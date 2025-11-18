import type { NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Ensure Node.js runtime so we can write to the filesystem during dev
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const entry = {
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      ua: req.headers.get('user-agent') || undefined,
      ip:
        (req.headers.get('x-forwarded-for')?.split(',')[0] ||
          (req as any).ip ||
          undefined),
    };

    const dir = path.join(process.cwd(), '.data');
    const file = path.join(dir, 'contact.json');
    await fs.mkdir(dir, { recursive: true });

    let list: any[] = [];
    try {
      const raw = await fs.readFile(file, 'utf8');
      list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      // file not found or invalid -> start fresh
      list = [];
    }

    list.push(entry);
    await fs.writeFile(file, JSON.stringify(list, null, 2), 'utf8');

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || 'Server error' }), { status: 500 });
  }
}
