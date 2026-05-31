'use client';

import { useNotification } from './NotificationContext';

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  const backgroundClass = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div
      className={`mx-4 py-4 px-2.5 rounded-sm text-white ${backgroundClass}`}
    >
      {message}
    </div>
  );
}
