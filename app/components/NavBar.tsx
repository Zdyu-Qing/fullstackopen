'use client';

import { useSession, signOut } from 'next-auth/react';
import NavLink from '@/app/components/NavLink';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4 mb-4">
      {session ? (
        <>
          <div className="mr-auto">
            <NavLink href="/" active={pathname === '/'}>
              home
            </NavLink>
          </div>
          <NavLink
            href="/blogs"
            active={pathname.includes('/blogs') && pathname !== '/blogs/new'}
          >
            blogs
          </NavLink>
          <NavLink href="/users" active={pathname.includes('/users')}>
            users
          </NavLink>
          <NavLink href="/blogs/new" active={pathname === '/blogs/new'}>
            create new
          </NavLink>
          <NavLink href="/me" active={pathname === '/me'}>
            me
          </NavLink>
          <em>{session.user?.name} logged in</em>
          <button
            onClick={() => signOut({ redirectTo: '/login' })}
            className="bg-red-600"
          >
            logout
          </button>
        </>
      ) : (
        <>
          <NavLink href="/login" active={pathname === '/login'}>
            login
          </NavLink>
          <NavLink href="/register" active={pathname === '/register'}>
            register
          </NavLink>
        </>
      )}
    </nav>
  );
}
