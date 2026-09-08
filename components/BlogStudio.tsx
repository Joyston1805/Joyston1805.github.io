'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Github,
  Bold,
  Italic,
  Heading2,
  Link2,
  Code2,
  List,
  Quote,
  Eye,
  FileCode2,
} from 'lucide-react';
import { profile } from '@/lib/content';

// ---------------------------------------------------------------------------
// A very small Markdown renderer, just for the live preview pane.
// The real rendering on the published page is done by MDX at build time —
// this only needs to be close enough to show you what you're writing.
// ---------------------------------------------------------------------------
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(s: string) {
  return s
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}

function renderMarkdown(md: string): string {
  const blocks: string[] = [];
  // Pull fenced code out first so its contents aren't treated as markdown.
  let text = escapeHtml(md).replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    blocks.push(`<pre><code data-lang="${lang}">${code.replace(/\n$/, '')}</code></pre>`);
    return `\u0000BLOCK${blocks.length - 1}\u0000`;
  });

  const lines = text.split('\n');
  const out: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('\u0000BLOCK')) {
      flushParagraph();
      closeList();
      out.push(blocks[Number(trimmed.replace(/\D/g, ''))]);
      continue;
    }
    if (trimmed === '') {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      flushParagraph();
      closeList();
      out.push('<hr />');
      continue;
    }

    if (trimmed.startsWith('&gt; ')) {
      flushParagraph();
      closeList();
      out.push(`<blockquote><p>${inline(trimmed.slice(5))}</p></blockquote>`);
      continue;
    }

    const ul = trimmed.match(/^[-*]\s+(.*)$/);
    const ol = trimmed.match(/^\d+\.\s+(.*)$/);
    if (ul || ol) {
      flushParagraph();
      const wanted = ul ? 'ul' : 'ol';
      if (listType !== wanted) {
        closeList();
        out.push(`<${wanted}>`);
        listType = wanted;
      }
      out.push(`<li>${inline((ul ?? ol)![1])}</li>`);
      continue;
    }

    paragraph.push(trimmed);
  }
  flushParagraph();
  closeList();

  return out.join('\n');
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

const STARTER_BODY = `Open with the thing that made this worth writing — the surprise, the
problem, or the number that didn't add up.

## What I was trying to do

A sentence or two of context. Who it was for, what the data was.

## What I found

- The finding
- Why it mattered
- What changed because of it

## What I'd do differently

Honest reflection lands better than a victory lap.
`;

export default function BlogStudio() {
  const [title, setTitle] = useState('');
  const [slugOverride, setSlugOverride] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [updated, setUpdated] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState('');
  const [coverAlt, setCoverAlt] = useState('');
  const [draft, setDraft] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [body, setBody] = useState(STARTER_BODY);
  const [view, setView] = useState<'preview' | 'mdx'>('preview');
  const [copied, setCopied] = useState(false);

  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const slug = slugOverride || slugify(title) || 'untitled-post';
  const filename = `${slug}.mdx`;

  const tagList = tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const mdx = useMemo(() => {
    const fm = [
      '---',
      `title: ${JSON.stringify(title || 'Untitled post')}`,
      `date: ${JSON.stringify(date)}`,
      ...(updated ? [`updated: ${JSON.stringify(updated)}`] : []),
      `excerpt: ${JSON.stringify(excerpt)}`,
      `tags: [${tagList.map((t) => JSON.stringify(t)).join(', ')}]`,
      ...(category ? [`category: ${JSON.stringify(category)}`] : []),
      ...(cover ? [`cover: ${JSON.stringify(cover)}`] : []),
      ...(cover && coverAlt ? [`coverAlt: ${JSON.stringify(coverAlt)}`] : []),
      ...(draft ? ['draft: true'] : []),
      ...(featured ? ['featured: true'] : []),
      ...(pinned ? ['pinned: true'] : []),
      '---',
      '',
    ].join('\n');
    return fm + body.trimEnd() + '\n';
  }, [title, date, updated, excerpt, tagList, category, cover, coverAlt, draft, featured, pinned, body]);

  const copyMdx = async () => {
    try {
      await navigator.clipboard.writeText(mdx);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const downloadMdx = () => {
    const blob = new Blob([mdx], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // GitHub's "new file" screen accepts a prefilled filename and body via query
  // string. Browsers cap URL length, so anything long falls back to filename
  // only and you paste the body in (the Copy button above has it ready).
  const githubUrl = useMemo(() => {
    const base = `${profile.repoUrl}/new/main/content/blog?filename=${encodeURIComponent(filename)}`;
    const withValue = `${base}&value=${encodeURIComponent(mdx)}`;
    return withValue.length < 7000 ? withValue : base;
  }, [filename, mdx]);

  const wrapSelection = (before: string, after = before, placeholder = 'text') => {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = body.slice(start, end) || placeholder;
    const next = body.slice(0, start) + before + selected + after + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const prefixLine = (prefix: string) => {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = body.lastIndexOf('\n', start - 1) + 1;
    const next = body.slice(0, lineStart) + prefix + body.slice(lineStart);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length);
    });
  };

  const toolbar = [
    { icon: Heading2, label: 'Heading', onClick: () => prefixLine('## ') },
    { icon: Bold, label: 'Bold', onClick: () => wrapSelection('**') },
    { icon: Italic, label: 'Italic', onClick: () => wrapSelection('*') },
    { icon: Link2, label: 'Link', onClick: () => wrapSelection('[', '](https://)', 'link text') },
    { icon: Code2, label: 'Code', onClick: () => wrapSelection('`') },
    { icon: List, label: 'List item', onClick: () => prefixLine('- ') },
    { icon: Quote, label: 'Quote', onClick: () => prefixLine('> ') },
  ];

  const fieldClass =
    'surface focus-ring w-full rounded-xl px-3 py-2 font-mono text-sm outline-none placeholder:text-muted';
  const labelClass = 'font-mono text-[10px] uppercase tracking-widest text-muted';

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
      {/* ---------------- Front matter ---------------- */}
      <div className="surface flex flex-col gap-4 rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Post details</h2>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What I learned building..."
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>File name</span>
          <input
            value={slugOverride}
            onChange={(e) => setSlugOverride(slugify(e.target.value))}
            placeholder={slug}
            className={fieldClass}
          />
          <span className="font-mono text-[10px] text-muted">
            content/blog/<span className="text-signal-amber">{filename}</span> → /blog/{slug}
          </span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Updated</span>
            <input
              type="date"
              value={updated}
              onChange={(e) => setUpdated(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Excerpt</span>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="One or two lines — this is what shows on the blog index."
            className={`${fieldClass} resize-y`}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Tags (comma separated)</span>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="power-bi, sql"
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Category</span>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Tutorial"
              className={fieldClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Cover image path</span>
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="/blog/my-image.jpg"
            className={fieldClass}
          />
          <span className="font-mono text-[10px] text-muted">
            Upload the file to public/blog/ in the repo first.
          </span>
        </label>

        {cover && (
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Cover alt text</span>
            <input
              value={coverAlt}
              onChange={(e) => setCoverAlt(e.target.value)}
              placeholder="Describe the image"
              className={fieldClass}
            />
          </label>
        )}

        <div className="flex flex-col gap-2 pt-1">
          {[
            { label: 'Draft (hidden from the blog index)', value: draft, set: setDraft },
            { label: 'Featured (big card at the top)', value: featured, set: setFeatured },
            { label: 'Pinned (always sorts first)', value: pinned, set: setPinned },
          ].map((toggle) => (
            <label key={toggle.label} className="flex items-center gap-2.5 text-sm text-muted">
              <input
                type="checkbox"
                checked={toggle.value}
                onChange={(e) => toggle.set(e.target.checked)}
                className="focus-ring h-4 w-4 accent-[#F2B705]"
              />
              {toggle.label}
            </label>
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-2 border-t border-ink-900/10 pt-4 dark:border-white/10">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-signal-amber px-5 py-2.5 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-105"
          >
            <Github className="h-4 w-4" />
            Publish via GitHub
          </a>
          <div className="flex gap-2">
            <button
              onClick={copyMdx}
              className="focus-ring flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-current px-4 py-2 font-mono text-xs transition-colors hover:border-signal-teal hover:text-signal-teal"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy MDX'}
            </button>
            <button
              onClick={downloadMdx}
              className="focus-ring flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-current px-4 py-2 font-mono text-xs transition-colors hover:border-signal-teal hover:text-signal-teal"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Editor + preview ---------------- */}
      <div className="flex flex-col gap-6">
        <div className="surface rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-1 border-b border-ink-900/10 pb-3 dark:border-white/10">
            {toolbar.map((t) => (
              <button
                key={t.label}
                onClick={t.onClick}
                aria-label={t.label}
                title={t.label}
                className="focus-ring rounded-lg p-2 text-muted transition-colors hover:bg-signal-amber/10 hover:text-signal-amber"
              >
                <t.icon className="h-4 w-4" />
              </button>
            ))}
            <span className="ml-auto font-mono text-[10px] text-muted">
              {body.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={20}
            spellCheck
            className="focus-ring mt-3 w-full resize-y bg-transparent font-mono text-sm leading-relaxed outline-none"
          />
        </div>

        <div className="surface rounded-2xl p-6">
          <div className="flex gap-2">
            <button
              onClick={() => setView('preview')}
              className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                view === 'preview' ? 'bg-signal-amber text-ink-900' : 'text-muted'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
            <button
              onClick={() => setView('mdx')}
              className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                view === 'mdx' ? 'bg-signal-teal text-ink-900' : 'text-muted'
              }`}
            >
              <FileCode2 className="h-3.5 w-3.5" />
              MDX file
            </button>
          </div>

          {view === 'preview' ? (
            <div className="mt-6">
              <h1 className="font-display text-3xl font-semibold tracking-tight">
                {title || 'Untitled post'}
              </h1>
              {excerpt && <p className="mt-3 text-muted">{excerpt}</p>}
              <div
                className="prose prose-invert dark:prose-invert mt-6 max-w-none prose-headings:font-display prose-a:text-signal-amber"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
              />
            </div>
          ) : (
            <pre className="mt-6 overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs text-muted">
              {mdx}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
