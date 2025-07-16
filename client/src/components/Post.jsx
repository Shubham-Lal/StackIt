import { Link } from 'react-router-dom'
import { getTimeAgo } from '../utils/timeUtils'

const Post = ({ post }) => {
  const getPlainText = (html) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent.replace(/\u00a0/g, '').trim()
  }

  return (
    <div className='flex flex-col sm:flex-row gap-4 px-2 sm:px-4 py-8 border-b border-gray-300'>
      {/* Left part of post */}
      <div className='sm:mt-1 flex gap-2 sm:flex-col sm:text-right text-sm whitespace-nowrap'>
        <p>0 votes</p>
        <p className='text-gray-600'>{post.answerCount} {post.answerCount > 1 ? 'answers' : 'answer'}</p>
        <p className='text-gray-600'>{post.views} {post.views > 1 ? 'views' : 'view'}</p>
      </div>

      {/* The right portion the post */}
      <div className='flex-1'>
        <div className="flex flex-col">
          <Link to={`/question/${post._id}`} className='text-lg text-blue-600 hover:text-blue-800'>{post.title}</Link>
          <p className='text-[14px] text-gray-600 line-clamp-2'>{getPlainText(post.description)}</p>
        </div>

        {/* The tags and user details */}
        <div className='flex flex-wrap items-center justify-between mt-4'>
          <div className='flex flex-wrap gap-1'>
            {post.tags.map((tag, index) => (
              <button
                key={index}
                className='h-fit py-0.5 px-2 rounded bg-gray-200 text-gray-600 text-xs font-semibold cursor-pointer'
              >
                {tag.toLowerCase()}
              </button>
            ))}
          </div>
          <div className='w-fit flex items-end sm:items-center justify-end gap-2'>
            {/* user svg */}
            <div className='flex items-center gap-1'>
              <img
                src={post.user.avatar || '/user.png'}
                className="size-4 rounded outline outline-[hsl(210,8%,90%)]"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p className='text-xs whitespace-nowrap'>{post.user.name}</p>
            </div>
            <p className='text-xs text-gray-600 whitespace-nowrap'>asked {getTimeAgo(post.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post