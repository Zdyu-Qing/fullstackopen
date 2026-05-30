'use client';

import { registerUser } from '@/app/actions/users';
import { useActionState } from 'react';

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { name: '', username: '', password: '', passwordConfirm: '' },
  });

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
            />
          </label>
          {state.errors.username && (
            <p style={{ color: 'red' }}>{state.errors.username}</p>
          )}
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values.name}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values.password}
            />
          </label>
          {state.errors.password && (
            <p style={{ color: 'red' }}>{state.errors.password}</p>
          )}
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              required
              defaultValue={state.values.passwordConfirm}
            />
          </label>
          {state.errors.passwordConfirm && (
            <p style={{ color: 'red' }}>{state.errors.passwordConfirm}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
