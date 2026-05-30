import { getCurrentUser } from '@/app/services/session';
import { db } from '@/db';
import { blogs } from '@/db/schema';
import { desc, eq, ilike } from 'drizzle-orm';

export const getBlogs = async (titleFilter: string) => {
  return await db.query.blogs.findMany({
    orderBy: [desc(blogs.likes)],
    where: ilike(blogs.title, `%${titleFilter}%`),
  });
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Not logged in');
  }

  await db.insert(blogs).values({
    title,
    author,
    url,
    userId: user!.id,
  });
};

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: eq(blogs.id, id) });
};

export const addLike = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({
        likes: blog.likes + 1,
      })
      .where(eq(blogs.id, id));
  }
};
