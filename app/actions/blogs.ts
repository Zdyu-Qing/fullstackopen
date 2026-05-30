'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addBlog, addLike } from '@/app/services/blogs';
import { auth } from '@/auth';

type ValueFields = {
  title: string;
  author: string;
  url: string;
};

type ValidationError = Partial<ValueFields>;

export const createBlog = async (
  prevState: { errors: ValidationError; values: ValueFields },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const errors: ValidationError = {};
  const title = formData.get('title') as string;
  if (!title || title.length < 5) {
    errors.title = getMinLengthErrorMessage('Title', 5);
  }

  const author = formData.get('author') as string;
  if (!author || author.length < 5) {
    errors.author = getMinLengthErrorMessage('Author', 5);
  }

  const url = formData.get('url') as string;
  if (!url || url.length < 5) {
    errors.url = getMinLengthErrorMessage('Url', 5);
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } };
  }

  await addBlog(title, author, url);
  revalidatePath('/blogs');
  redirect('/blogs');
};

export const incrementLikes = async (formData: FormData) => {
  const blogId = formData.get('id') as string;
  await addLike(Number(blogId));
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath('/blogs');
};

const getMinLengthErrorMessage = (fieldName: string, minLength: number) => {
  return `${fieldName} must be at least ${minLength} characters long`;
};
