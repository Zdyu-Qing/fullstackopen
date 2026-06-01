'use client';

import { registerUser } from '@/app/actions/users';
import { useActionState } from 'react';

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { name: '', username: '', password: '', passwordConfirm: '' },
  });

  return (
    <div className="card items-center">
      <h1>Register</h1>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
              data-testid="username-error"
            />
          </label>
          {state.errors.username && (
            <p className="text-red-500">{state.errors.username}</p>
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
            <p className="text-red-500">{state.errors.password}</p>
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
              data-testid="passwordConfirm-error"
            />
          </label>
          {state.errors.passwordConfirm && (
            <p className="text-red-500">{state.errors.passwordConfirm}</p>
          )}
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  );
}
