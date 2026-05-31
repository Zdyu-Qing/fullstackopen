import { getCurrentUser } from '@/app/services/session';
import { db } from '@/db';
import { readingList } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export const getCurrentUserReadingList = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: true,
    },
  });
};

export const addBlogToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Not logged in');
  }

  await db.insert(readingList).values({
    blogId,
    userId: user.id,
  });
};

export const setReadingListBlogAsRead = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Not logged in');
  }

  await db
    .update(readingList)
    .set({
      read: true,
    })
    .where(
      and(eq(readingList.blogId, blogId), eq(readingList.userId, user.id)),
    );
};
