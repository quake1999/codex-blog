'use client';

import { useState } from 'react';

const template = `---
title: 在这里填写文章标题
category: 技术
date: YYYY-MM-DD
readTime: 5 分钟
excerpt: 用一两句话概括这篇文章的内容。
tone: blue
mark: ✦
---

在这里填写文章开场。

## 第一个小标题

在这里填写正文内容。

## 第二个小标题

继续填写正文。可以使用以下格式：

- 列表项目一
- 列表项目二

> 这里可以填写引用内容。

## 总结

在这里总结文章。`;

export function ArticleTemplate() {
  const [copied, setCopied] = useState(false);

  async function copyTemplate() {
    await navigator.clipboard.writeText(template);
    setCopied(true);
  }

  return <div className="template-actions">
    <button type="button" onClick={copyTemplate}>{copied ? '已复制 ✓' : '复制文章模板'}</button>
    <a href="https://github.com/quake1999/codex-blog/new/main/content/posts" target="_blank" rel="noreferrer">去 GitHub 新建文章 ↗</a>
    <pre aria-label="Markdown 文章模板"><code>{template}</code></pre>
  </div>;
}
