'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { updateApiToken, usernameExists } from '@/app/services/users';
import { revalidatePath } from 'next/cache';

type FormValues = {
  username: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

type ValidationError = Partial<Omit<FormValues, 'name'>>;

export const registerUser = async (
  prevState: { errors: ValidationError; values: FormValues },
  formData: FormData,
) => {
  const errors: ValidationError = {};

  const username = (formData.get('username') as string)?.trim();
  if (!username || username.length < 4) {
    errors.username = 'Username must be at least 4 characters long';
  } else if (await usernameExists(username)) {
    errors.username = 'The given username is already taken';
  }

  const name = (formData.get('name') as string)?.trim();

  const password = formData.get('password') as string;
  if (!password || password.length < 4) {
    errors.password = 'Password must be at least 4 characters long';
  }

  const passwordConfirm = formData.get('passwordConfirm') as string;
  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect('/login');
};

export const generateNewApiToken = async () => {
  await updateApiToken();
  revalidatePath('/me');
};
