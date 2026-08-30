import type { Metadata } from 'next';
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
  return { title: `${post.title} · quake1999`, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, images: [] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <main className="article-page">
    <nav className="nav shell"><a className="brand" href="/"><span>Q</span>quake1999</a><a className="back-link" href="/#writing">← 返回文章</a></nav>
    <article className="article-shell">
      <header className="article-header"><p className="kicker">{post.category} / ARTICLE_{post.date.replaceAll('-', '')}</p><h1>{post.title}</h1><p>{post.excerpt}</p><div><time>{post.date}</time><span>{post.readTime}</span></div></header>
      <MarkdownContent source={post.content} />
      <footer className="article-footer"><p>感谢阅读。</p><a href="/#writing">继续浏览文章 →</a></footer>
    </article>
  </main>;
}
