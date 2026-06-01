import { db } from '@/db';
import { blogs, readingList, users } from '@/db/schema';
import { NextResponse } from 'next/server';

export const DELETE = async () => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    );
  }

  try {
    await db.delete(readingList);
    await db.delete(blogs);
    await db.delete(users);

    return new Response(null, {
      status: 204,
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Something unexpected happened.' },
      { status: 500 },
    );
  }
};
