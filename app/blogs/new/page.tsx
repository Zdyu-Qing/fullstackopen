'use client';

import { createBlog } from '@/app/actions/blogs';
import { useNotification } from '@/app/components/NotificationContext';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: { author: '', title: '', url: '' },
    success: false,
  });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification('Blog created!');
      router.push('/blogs');
    }
  }, [state, showNotification, router]);

  return (
    <div className="card items-center">
      <h1>Create a new blog</h1>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values.title}
              required
            />
          </label>
          {state.errors.title && (
            <p className="text-red-500">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              required
              defaultValue={state.values.author}
            />
          </label>
          {state.errors.author && (
            <p className="text-red-500">{state.errors.author}</p>
          )}
        </div>
        <div>
          <label>
            URL
            <input
              type="url"
              name="url"
              required
              defaultValue={state.values.url}
            />
          </label>
          {state.errors.url && (
            <p className="text-red-500">{state.errors.url}</p>
          )}
        </div>
        <button type="submit" data-testid="create-blog-button">
          Create
        </button>
      </form>
    </div>
  );
}
