'use server';

import {
  addBlogToReadingList,
  setReadingListBlogAsRead,
} from '@/app/services/reading-list';
import { revalidatePath } from 'next/cache';

export const addBlogToReadingListAction = async (formData: FormData) => {
  const blogId = formData.get('id') as string;
  await addBlogToReadingList(Number(blogId));
  revalidatePath(`/blogs/${blogId}`);
};

export const markReadingListBlogAsRead = async (formData: FormData) => {
  const blogId = formData.get('id') as string;
  await setReadingListBlogAsRead(Number(blogId));
  revalidatePath(`/me`);
};
