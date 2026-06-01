import { markReadingListBlogAsRead } from '@/app/actions/reading-list';
import { generateNewApiToken } from '@/app/actions/users';
import { getCurrentUserWithReadingList } from '@/app/services/users';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function MePage() {
  const user = await getCurrentUserWithReadingList();
  if (!user) {
    redirect('/login');
  }

  const unreadReadingList = user.readingList.filter((v) => v.read === false);
  const readReadingList = user.readingList.filter((v) => v.read === true);

  return (
    <div className="card" data-testid="user-profile">
      <h1>My Profile</h1>
      <p data-testid="user-name">
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p data-testid="user-username">
        <span className="font-semibold">Username:</span> {user.username}
      </p>

      <div className="border-t my-6"></div>

      <div data-testid="reading-list-section">
        <h2>Reading List</h2>
        {unreadReadingList.length === 0 && readReadingList.length === 0 && (
          <p data-testid="empty-reading-list">Reading list is empty</p>
        )}
        <div
          data-testid={
            unreadReadingList.length === 0
              ? 'no-unread-blogs'
              : 'unread-section'
          }
        >
          <h3>Unread {`(${unreadReadingList.length})`}</h3>
          {unreadReadingList.map((unread) => (
            <div
              key={unread.id}
              className="flex flex-row items-center justify-between bg-yellow-100 p-3 mb-3"
            >
              <Link href={`/blogs/${unread.blogId}`} className="link">
                {unread.blog.title}
              </Link>
              <form className="w-fit" action={markReadingListBlogAsRead}>
                <input name="id" value={unread.blogId} hidden readOnly />
                <button
                  className="bg-green-600"
                  type="submit"
                  data-testid="mark-read-button"
                >
                  mark as read
                </button>
              </form>
            </div>
          ))}
        </div>
        <div>
          <h3>Read {`(${readReadingList.length})`}</h3>
          {readReadingList.map((read) => (
            <div key={read.id} className=" bg-blue-100 p-3 mb-3">
              <Link href={`/blogs/${read.blogId}`} className="link">
                {read.blog.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t my-6"></div>

      <div data-testid="api-token-section">
        <h2>API Token</h2>
        <div className="p-4 bg-gray-100">
          <p className="mx-0 mt-0 mb-2">Current token:</p>
          <div className="p-2 bg-gray-200" data-testid="token-display">
            <p
              className={`m-0 ${user.apiToken === null && 'text-red-600'}`}
              data-testid={
                user.apiToken === null ? 'no-token-message' : 'api-token'
              }
            >
              {user.apiToken ?? 'No token has been generated yet'}
            </p>
          </div>
        </div>
        <button
          className="w-fit mt-2"
          onClick={generateNewApiToken}
          data-testid="generate-token-button"
        >
          Generate New Token
        </button>
      </div>
    </div>
  );
}
