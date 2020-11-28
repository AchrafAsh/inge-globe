import Link from 'next/link'

interface Post {
    slug: string
    autor: string
    title: string
    excerpt: string
    likes: number
    comments: number
    createdAt: Date
}

const Post: React.FC<Post> = ({
    slug,
    autor,
    title,
    excerpt,
    likes,
    comments,
    createdAt
}) => {
    return (
        <div className='bg-white p-6 rounded shadow-md'>
            <div className='flex flex-row space-x-2'>
                <div className='rounded-full w-9 h-9 bg-purple-400' />
                <div>
                    <div className='text-sm font-semibold'>{autor}</div>
                    <small className='font-thin text-gray-400'>
                        {createdAt.toLocaleDateString()}
                    </small>
                </div>
            </div>

            <div className='p-6'>
                <Link href={`post/${slug}`}>
                    <a>
                        <h2 className='text-xl font-semibold mb-2'>{title}</h2>
                    </a>
                </Link>
                <p className='text-gray-400 font-thin'>{excerpt}</p>
            </div>
            <div className='px-6 flex flex-row items-center space-x-6'>
                <button className='flex flex-row items-center space-x-1'>
                    <img src='img/heart-empty.png' />
                    <span className='text-xs font-thin text-purple-500'>
                        {likes}
                    </span>
                </button>
                <button className='outline-none flex flex-row items-center space-x-1'>
                    <img src='img/msg-full.png' />
                    <span className='text-xs font-thin text-purple-500'>
                        {comments}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Post
