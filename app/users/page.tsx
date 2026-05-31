import { getUsers } from '@/app/services/users';
import Link from 'next/link';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="card">
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`} className="link">
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
