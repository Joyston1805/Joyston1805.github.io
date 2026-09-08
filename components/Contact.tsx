'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, CheckCircle2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { profile } from '@/lib/content';
import { copy } from '@/lib/site';
import QRCode from './QRCode';

const FORMSPREE_FORM_ID = 'mvzevovk';

function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className="surface flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-signal-teal" />
        <p className="font-display text-lg font-semibold">Message sent</p>
        <p className="text-sm text-muted">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface flex flex-col gap-4 rounded-2xl p-6">
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Name</span>
        <input
          required
          id="name"
          name="name"
          type="text"
          className="focus-ring rounded-lg border border-ink-900/10 bg-transparent px-3 py-2 dark:border-white/10"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Email</span>
        <input
          required
          id="email"
          name="email"
          type="email"
          className="focus-ring rounded-lg border border-ink-900/10 bg-transparent px-3 py-2 dark:border-white/10"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-400" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Message</span>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          className="focus-ring rounded-lg border border-ink-900/10 bg-transparent px-3 py-2 dark:border-white/10"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-400" />
      </label>

      <ValidationError errors={state.errors} className="text-xs text-red-400" />

      <button
        type="submit"
        disabled={state.submitting}
        className="focus-ring mt-2 rounded-full bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {state.submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">{copy.contact.eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {copy.contact.heading}
      </h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <ContactForm />

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring flex items-center gap-2 font-mono text-sm text-muted hover:text-signal-amber"
            >
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 font-mono text-sm text-muted hover:text-signal-amber"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 font-mono text-sm text-muted hover:text-signal-amber"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <QRCode />
        </motion.div>
      </div>
    </section>
  );
}
