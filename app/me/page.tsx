import { generateNewApiToken } from '@/app/actions/users';
import { getCurrentUser } from '@/app/services/session';
import { redirect } from 'next/navigation';

export default async function MePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="card">
      <h1>My Profile</h1>
      <p>
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold">Username:</span> {user.username}
      </p>
      <div className="border-t my-6"></div> <h2>API Token</h2>
      <div className="p-4 bg-gray-100">
        <p className="mx-0 mt-0 mb-2">Current token:</p>
        <div className="p-2 bg-gray-200">
          <p className={`m-0 ${user.apiToken === null && 'text-red-600'}`}>
            {user.apiToken ?? 'No token has been generated yet'}
          </p>
        </div>
      </div>
      <button className="w-fit mt-2" onClick={generateNewApiToken}>
        Generate New Token
      </button>
    </div>
  );
}
