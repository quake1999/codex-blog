'use client';

import { useMemo, useState } from 'react';
import type { Post } from '@/lib/posts';

export function PostArchive({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const categories = ['全部', ...Array.from(new Set(posts.map((post) => post.category)))];
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === '全部' || post.category === category;
      const matchesQuery = !keyword || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(keyword);
      return matchesCategory && matchesQuery;
    });
  }, [category, posts, query]);

  return <>
    <div className="archive-controls">
      <div className="category-tabs" aria-label="按分类筛选">
        {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <label className="search-box"><span>搜索</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="标题、摘要或分类" /></label>
    </div>
    <p className="result-count" aria-live="polite">FOUND / {String(filtered.length).padStart(2, '0')}</p>
    {filtered.length ? <div className="archive-list">{filtered.map((post, index) => <a href={`/posts/${post.slug}`} className="archive-item" key={post.slug}>
      <span className="archive-number">{String(index + 1).padStart(2, '0')}</span>
      <div><p className="meta"><span>{post.category}</span>{post.date} · {post.readTime}</p><h2>{post.title}</h2><p>{post.excerpt}</p></div>
      <b aria-hidden="true">↗</b>
    </a>)}</div> : <div className="empty-state"><strong>没有找到相关文章。</strong><p>换个关键词，或者试试其他分类。</p><button onClick={() => { setQuery(''); setCategory('全部'); }}>清除筛选</button></div>}
  </>;
}
