import { incrementLikes } from '@/app/actions/blogs';
import { getBlogById } from '@/app/services/blogs';
import { notFound } from 'next/navigation';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <ul>
        <li>author: {blog.author}</li>
        <li>
          url: <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          likes: {blog.likes}
          <form action={incrementLikes}>
            <input name="id" value={blog.id} hidden readOnly />
            <button type="submit">Like</button>
          </form>
        </li>
      </ul>
    </div>
  );
}
