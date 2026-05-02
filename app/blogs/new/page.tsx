import { createBlog } from '@/app/actions/blogs';

export default function newBlogPage() {
  return (
    <div>
      <h1>Create a new blog</h1>
      <form action={createBlog}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required />
          </label>
        </div>
        <div>
          <label>
            Url
            <input type="url" name="url" required />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
