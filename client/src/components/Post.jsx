import { Link } from "react-router-dom"

export default function Post({ post }) {
  const getPlainText = (html) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent.replace(/\u00a0/g, '').trim()
  }

  const getTimeAgo = (isoDate) => {
    const now = new Date();
    const past = new Date(isoDate);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }

  return (
    <div className='flex gap-4 px-4 py-8 border-b border-gray-300'>
      {/* Left part of post */}
      <div className='text-right whitespace-nowrap'>
        <p>0 votes</p>
        <p>0 answers</p>
        <p>0 views</p>
      </div>

      {/* The right portion the post */}
      <div className='flex-1'>
        <div className="flex flex-col">
          <Link to={`/question/${post._id}`} className='text-blue-400'>{post.title}</Link>
          <Link to={`/question/${post._id}`}>{getPlainText(post.description)}</Link>
        </div>

        {/* The tags and user details */}
        <div className='flex justify-between mt-4'>
          <div className='flex gap-1'>
            {post.tags.map((tag, index) => (
              <p className='px-2 rounded-lg bg-gray-300' key={index}>
                {tag}
              </p>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            {/* user svg */}
            <div className='flex gap-1 items-center'>
              <img
                src={post.user.avatar || '/user.png'}
                className="size-5 rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p>{post.user.name}</p>
            </div>

            <p>{post.asks}</p>
            <p>{getTimeAgo(post.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}