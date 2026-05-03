import { getBlogs } from '@/app/services/blogs';
import Link from 'next/link';

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter ?? '');

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        <form method="GET" action="/blogs">
          <input name="filter" placeholder="Search blogs by title" />
          <button type="submit">Search</button>
        </form>
      </div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
          </Link>
          <ul>
            <li>id: {blog.id}</li>
            <li>author: {blog.author}</li>
            <li>
              url: <a href={blog.url}>{blog.url}</a>
            </li>
            <li>likes: {blog.likes}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
