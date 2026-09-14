import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tone: string;
  mark: string;
  content: string;
};

const postsDirectory = join(process.cwd(), 'content', 'posts');

function parseFile(path: string, source: string): Post {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`文章缺少 Frontmatter：${path}`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(':');
    if (index > -1) meta[line.slice(0, index).trim()] = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  return {
    slug,
    title: meta.title || slug,
    category: meta.category || '随想',
    date: meta.date || '',
    readTime: meta.readTime || '5 分钟',
    excerpt: meta.excerpt || '',
    tone: meta.tone || 'blue',
    mark: meta.mark || '✦',
    content: match[2].trim(),
  };
}

export function getAllPosts() {
  return readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => parseFile(file, readFileSync(join(postsDirectory, file), 'utf8')))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
