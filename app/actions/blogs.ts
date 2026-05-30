'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addBlog, addLike } from '@/app/services/blogs';
import { auth } from '@/auth';

export const createBlog = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const url = formData.get('url') as string;
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
