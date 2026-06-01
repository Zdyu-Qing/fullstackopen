import { addUser } from '@/app/services/users';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    );
  }

  const { username, name, password } = await req.json();

  if (!username || !name || !password) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const createdUser = await addUser(username, name, password);

  return NextResponse.json(createdUser, {
    status: 201,
  });
};
