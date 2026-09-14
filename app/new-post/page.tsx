import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleTemplate } from '@/components/ArticleTemplate';

export const metadata: Metadata = {
  title: '新建文章模板 · quake1999',
  description: '复制 quake1999 博客的标准 Markdown 文章模板。',
};

export default function NewPostPage() {
  return <main>
    <nav className="nav shell"><Link className="brand" href="/"><span>Q</span>quake1999</Link><Link className="back-link" href="/">← 返回首页</Link></nav>
    <article className="template-shell">
      <header className="template-header"><p className="kicker">WRITING TEMPLATE</p><h1>从一个清晰的<br />结构开始。</h1><p>复制模板，修改日期与文章信息，然后前往 GitHub 新建一个英文文件名的 <code>.md</code> 文件。</p></header>
      <ArticleTemplate />
      <section className="template-guide"><h2>使用方法</h2><ol><li>点击“复制文章模板”。</li><li>点击“去 GitHub 新建文章”。</li><li>文件名使用英文，例如 <code>my-first-note.md</code>。</li><li>粘贴模板，修改内容后点击 <strong>Commit changes</strong>。</li><li>等待 Vercel 自动发布。</li></ol></section>
    </article>
  </main>;
}
