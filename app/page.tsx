import { HomeClient } from '@/components/HomeClient';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts().map(({ slug, title, category, date, readTime, excerpt, tone, mark }) => ({ slug, title, category, date, readTime, excerpt, tone, mark }));
  return <HomeClient posts={posts} />;
}
