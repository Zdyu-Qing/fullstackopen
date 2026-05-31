import { getUserWithBlogsByApiToken } from '@/app/services/users';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get('Authorization');

  if (auth == null || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiToken = auth.slice(7);
  const user = await getUserWithBlogsByApiToken(apiToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(user);
};
