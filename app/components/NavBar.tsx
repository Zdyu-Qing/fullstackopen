'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <>
          <Link href="/">home</Link>
          {' | '}
          <Link href="/users">users</Link>
          {' | '}
          <Link href="/blogs">blogs</Link>
          {' | '}
          <Link href="/blogs/new">create new</Link>
          {' | '}
          <em>{session.user?.name} logged in</em>{' '}
          <button onClick={() => signOut({ redirectTo: '/login' })}>
            logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {' | '}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  );
}
