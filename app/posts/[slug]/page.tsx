import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MarkdownContent } from '@/components/MarkdownContent';
import { getAllPosts, getPost } from '@/lib/posts';

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} · quake1999`, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, type: 'article', images: [] }, twitter: { card: 'summary', title: post.title, description: post.excerpt, images: [] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const posts = getAllPosts();
  const current = posts.findIndex((item) => item.slug === slug);
  const newer = current > 0 ? posts[current - 1] : undefined;
  const older = current < posts.length - 1 ? posts[current + 1] : undefined;
  return <main className="article-page">
    <nav className="nav shell"><Link className="brand" href="/"><span>Q</span>quake1999</Link><Link className="back-link" href="/#writing">← 返回文章</Link></nav>
    <article className="article-shell">
      <header className="article-header"><p className="kicker">{post.category} / ARTICLE_{post.date.replaceAll('-', '')}</p><h1>{post.title}</h1><p>{post.excerpt}</p><div><time>{post.date}</time><span>{post.readTime}</span></div></header>
      <MarkdownContent source={post.content} />
      <nav className="article-pagination" aria-label="文章翻页">
        {newer ? <a href={`/posts/${newer.slug}`}><span>← 更新一篇</span><strong>{newer.title}</strong></a> : <span />}
        {older ? <a href={`/posts/${older.slug}`}><span>更早一篇 →</span><strong>{older.title}</strong></a> : <a href="/writing"><span>全部文章 →</span><strong>浏览文章归档</strong></a>}
      </nav>
      <footer className="article-footer"><p>感谢阅读。</p><a href="/writing">继续浏览文章 →</a></footer>
    </article>
  </main>;
}
