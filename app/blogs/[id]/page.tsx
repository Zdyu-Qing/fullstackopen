import { incrementLikes } from '@/app/actions/blogs';
import { addBlogToReadingListAction } from '@/app/actions/reading-list';
import { getBlogById } from '@/app/services/blogs';
import { getCurrentUserReadingList } from '@/app/services/reading-list';
import { notFound } from 'next/navigation';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const readingList = await getCurrentUserReadingList();

  if (!blog) {
    notFound();
  }

  // readingList is null when the user is not authenticated
  const showAddToReadingListButton =
    readingList !== null
      ? !readingList.some((v) => v.blogId === blog.id)
      : false;

  return (
    <div className="card" data-testid="blog-detail">
      <h1 data-testid="blog-title">{blog.title}</h1>
      <p className="text-gray-600 mt-0" data-testid="blog-author">
        by {blog.author}
      </p>
      <div className="flex flex-row items-center my-3 gap-3">
        <p className="m-0">likes: {blog.likes}</p>
        <form className="w-fit" action={incrementLikes}>
          <input name="id" value={blog.id} hidden readOnly />
          <button type="submit">like</button>
        </form>
        {showAddToReadingListButton && (
          <form className="w-fit" action={addBlogToReadingListAction}>
            <input name="id" value={blog.id} hidden readOnly />
            <button
              className="bg-green-600"
              type="submit"
              data-testid="add-to-reading-list-button"
            >
              add to reading list
            </button>
          </form>
        )}
      </div>
      <a href={blog.url} className="link">
        {blog.url}
      </a>
    </div>
  );
}
