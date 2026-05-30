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
