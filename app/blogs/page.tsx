import { getBlogs } from '@/app/services/blogs';

export default function blogs() {
  const blogs = getBlogs();
  return (
    <div>
      <h1>Blogs</h1>

      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
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
