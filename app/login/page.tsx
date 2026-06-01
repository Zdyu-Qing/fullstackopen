'use client';

import { useNotification } from '@/app/components/NotificationContext';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid username or password');
    } else {
      showNotification('Logged in successfully!');
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="card items-center">
      <h1>Login</h1>
      {error && (
        <p className="text-red-500" data-testid="error-message">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <button type="submit" data-testid="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
