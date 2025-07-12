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
    console.log(diffMs)

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
    <div className='mt-8 flex gap-4 p-4 border-t border-gray-300'>
      {/* Left part of post */}
      <div className='text-right whitespace-nowrap'>
        <p>0 votes</p>
        <p>0 answers</p>
        <p>0 views</p>
      </div>

      {/* The right portion the post */}
      <div className='flex-1'>
        <div>
          <h1 className='text-blue-200'>{post.title}</h1>
          <p>{getPlainText(post.description)}</p>
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
              <div className='h-5 w-5'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    opacity='0.5'
                    cx='12'
                    cy='9'
                    r='3'
                    stroke='#1C274C'
                    strokeWidth='1.5'
                  />
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='#1C274C'
                    strokeWidth='1.5'
                  />
                  <path
                    opacity='0.5'
                    d='M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20'
                    stroke='#1C274C'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
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