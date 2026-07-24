'use client';

import { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { profile } from '@/lib/content';

function buildVCard() {
  // vCard 3.0. Phone line is commented out by default — see README to enable.
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${profile.name.split(' ').reverse().join(';')}`,
    `FN:${profile.name}`,
    `TITLE:${profile.title}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${profile.siteUrl}`,
    `URL:${profile.linkedin}`,
    // profile.phone is '' by default. Fill it in lib/content.ts to include it.
    ...(profile.phone ? [`TEL;TYPE=CELL:${profile.phone}`] : []),
    'END:VCARD',
  ];
  return lines.join('\n');
}

type Mode = 'site' | 'vcard';

export default function QRCode() {
  const [mode, setMode] = useState<Mode>('site');
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const value = mode === 'site' ? profile.siteUrl : buildVCard();

  const handleDownload = () => {
    const canvas = canvasWrapRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'site' ? 'joyston-fernandes-site-qr.png' : 'joyston-fernandes-contact-qr.png';
    a.click();
  };

  return (
    <div className="surface flex flex-col items-center gap-4 rounded-2xl p-8">
      <div className="flex gap-2 rounded-full surface p-1">
        <button
          onClick={() => setMode('site')}
          className={`focus-ring rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
            mode === 'site' ? 'bg-signal-amber text-ink-900' : 'text-muted'
          }`}
        >
          Visit Website
        </button>
        <button
          onClick={() => setMode('vcard')}
          className={`focus-ring rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
            mode === 'vcard' ? 'bg-signal-teal text-ink-900' : 'text-muted'
          }`}
        >
          Save My Contact
        </button>
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        ref={canvasWrapRef}
        className="rounded-xl bg-white p-4"
      >
        <QRCodeCanvas value={value} size={200} level="M" includeMargin />
      </motion.div>

      <p className="max-w-xs text-center text-sm text-muted">
        {mode === 'site'
          ? 'Scan to open the live portfolio — great for a resume footer or business card.'
          : "Scan to save Joyston's contact directly to your phone — no app needed."}
      </p>

      <button
        onClick={handleDownload}
        className="focus-ring rounded-full border border-current px-5 py-2 font-mono text-xs uppercase tracking-wide transition-colors hover:border-signal-amber hover:text-signal-amber"
      >
        Download QR as PNG
      </button>
    </div>
  );
}
