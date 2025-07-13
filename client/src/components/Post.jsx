import { Link } from 'react-router-dom'

const Post = ({ post }) => {
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
    <div className='flex flex-col sm:flex-row gap-4 px-2 sm:px-4 py-8 border-b border-gray-300'>
      {/* Left part of post */}
      <div className='flex gap-2 sm:gap-0 sm:flex-col sm:text-right whitespace-nowrap'>
        <p>0 <span className='text-gray-600'>votes</span></p>
        <p>0 <span className='text-gray-600'>answers</span></p>
        <p>0 <span className='text-gray-600'>views</span></p>
      </div>

      {/* The right portion the post */}
      <div className='flex-1'>
        <div className="flex flex-col">
          <Link to={`/question/${post._id}`} className='text-blue-600 hover:text-blue-800'>{post.title}</Link>
          <div className='text-gray-600'>{getPlainText(post.description)}</div>
        </div>

        {/* The tags and user details */}
        <div className='flex flex-col sm:flex-row justify-between gap-4 mt-4'>
          <div className='flex flex-wrap gap-1'>
            {post.tags.map((tag, index) => (
              <p className='h-fit px-2 rounded bg-gray-300 text-gray-600' key={index}>
                {tag}
              </p>
            ))}
          </div>
          <div className='flex items-center justify-between gap-2'>
            {/* user svg */}
            <div className='flex gap-1 items-center'>
              <img
                src={post.user.avatar || '/user.png'}
                className="size-5 rounded"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p className='whitespace-nowrap'>{post.user.name}</p>
            </div>
            <p className='text-sm text-gray-600 whitespace-nowrap'>asked {getTimeAgo(post.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post