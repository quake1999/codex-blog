import type { Metadata } from 'next';import './globals.css';
export const metadata:Metadata={title:'quake1999 · 在日常的缝隙里，捡拾微光',description:'quake1999 的个人博客，记录设计、生活与那些看似无用之事。',openGraph:{title:'quake1999 · 个人博客',description:'在日常的缝隙里，捡拾微光。',type:'website'},twitter:{card:'summary',title:'quake1999 · 个人博客',description:'在日常的缝隙里，捡拾微光。'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN" data-scroll-behavior="smooth"><body>{children}</body></html>}
