'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addBlog, addLike } from '@/app/services/blogs';
import { auth } from '@/auth';
import { addBlogToReadingList } from '@/app/services/reading-list';

type FormValues = {
  title: string;
  author: string;
  url: string;
};

type ValidationError = Partial<FormValues>;

export const createBlog = async (
  prevState: { errors: ValidationError; values: FormValues },
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
    return { errors, values: { title, author, url }, success: false };
  }

  const addedBlog = await addBlog(title, author, url);
  await addBlogToReadingList(addedBlog[0].id);

  revalidatePath('/blogs');
  return {
    errors: {},
    values: { author: '', title: '', url: '' },
    success: true,
  };
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
