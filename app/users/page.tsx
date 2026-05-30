import { getUsers } from '@/app/services/users';
import Link from 'next/link';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
