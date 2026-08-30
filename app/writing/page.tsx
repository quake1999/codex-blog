import type { Metadata } from 'next';
import Link from 'next/link';
import { PostArchive } from '@/components/PostArchive';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: '文章归档 · quake1999',
  description: '浏览 quake1999 关于设计、生活与数字世界的全部文章。',
  openGraph: { title: '文章归档 · quake1999', description: '关于设计、生活与数字世界的观察。', images: [] },
  twitter: { card: 'summary', title: '文章归档 · quake1999', description: '关于设计、生活与数字世界的观察。', images: [] },
};

export default function WritingPage() {
  return <main>
    <nav className="nav shell"><Link className="brand" href="/"><span>Q</span>quake1999</Link><Link className="back-link" href="/">← 返回首页</Link></nav>
    <section className="archive-shell">
      <header className="archive-header"><p className="kicker">WRITING ARCHIVE / {new Date().getFullYear()}</p><h1>所有文章</h1><p>设计、生活和数字世界的观察。按自己的节奏，随便翻翻。</p></header>
      <PostArchive posts={getAllPosts()} />
    </section>
  </main>;
}
