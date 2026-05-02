const blogs = [
  {
    id: 1,
    title: 'Minimal Blog Post',
    author: 'Alice',
    url: 'https://example.com/blog-1',
    likes: 5,
  },
  {
    id: 2,
    title: 'Another Post',
    author: 'Bob',
    url: 'https://example.com/blog-2',
    likes: 2,
  },
  {
    id: 3,
    title: 'Third Entry',
    author: 'Charlie',
    url: 'https://example.com/blog-3',
    likes: 0,
  },
];

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (title: string, author: string, url: string) => {
  const id = Math.max(...blogs.map((blog) => blog.id)) + 1;
  blogs.push({
    id,
    title,
    author,
    url,
    likes: 0,
  });
};
