'use client';

import { createBlog } from '@/app/actions/blogs';
import { useActionState } from 'react';

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: { author: '', title: '', url: '' },
  });

  return (
    <div>
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
            <p style={{ color: 'red' }}>{state.errors.title}</p>
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
            <p style={{ color: 'red' }}>{state.errors.author}</p>
          )}
        </div>
        <div>
          <label>
            Url
            <input
              type="url"
              name="url"
              required
              defaultValue={state.values.url}
            />
          </label>
          {state.errors.url && (
            <p style={{ color: 'red' }}>{state.errors.url}</p>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
