import { getCurrentUser } from '@/app/services/session';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getUsers = async () => {
  return await db.query.users.findMany({
    orderBy: users.username,
  });
};

export const getUserWithBlogs = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const usernameExists = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  return user !== undefined;
};

export const updateApiToken = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Not logged in');
  }

  const newApiToken = crypto.randomUUID();
  await db
    .update(users)
    .set({
      apiToken: newApiToken,
    })
    .where(eq(users.id, user.id));
};

export const getUserWithBlogsByApiToken = async (apiToken: string) => {
  return await db.query.users.findFirst({
    where: eq(users.apiToken, apiToken),
    with: { blogs: true },
  });
};

export const getCurrentUserWithReadingList = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return undefined;
  }

  return await db.query.users.findFirst({
    where: eq(users.id, user.id),
    with: {
      readingList: {
        with: {
          blog: true,
        },
      },
    },
  });
};
