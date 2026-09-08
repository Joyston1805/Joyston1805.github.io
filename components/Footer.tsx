import { Github, Linkedin, Mail, Youtube, Instagram, Facebook, ShoppingBag } from 'lucide-react';
import { profile } from '@/lib/content';
import { brands, allSocialLinks, shop } from '@/lib/creator';

const platformIcon = { instagram: Instagram, facebook: Facebook } as const;

export default function Footer() {
  return (
    <footer className="no-print border-t border-ink-900/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="focus-ring text-muted hover:text-signal-amber"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="focus-ring text-muted hover:text-signal-amber"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="focus-ring text-muted hover:text-signal-amber"
          >
            <Mail className="h-5 w-5" />
          </a>
          {brands.map((brand) => (
            <a
              key={brand.key}
              href={brand.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`YouTube — ${brand.name}`}
              className="focus-ring text-muted hover:text-signal-amber"
            >
              <Youtube className="h-5 w-5" />
            </a>
          ))}
          {allSocialLinks.map((link) => {
            const Icon = platformIcon[link.kind as 'instagram' | 'facebook'];
            return (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="focus-ring text-muted hover:text-signal-amber"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
          <a
            href={shop.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={shop.name}
            className="focus-ring text-muted hover:text-signal-amber"
          >
            <ShoppingBag className="h-5 w-5" />
          </a>
        </div>
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
