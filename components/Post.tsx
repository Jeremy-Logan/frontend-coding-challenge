import Image from 'next/image'
import UserInfo from './UserInfo'
import CommentsSection from './CommentsSection';

export interface PostProps {
	userId?: number; id?: number; image?: string; body?: string; commentCount?: number
}

const Post = ({ userId, id, image, body, commentCount }: PostProps) => {
	return (
		<div className='mb-8 flex flex-col w-[420px] rounded-md bg-white p-4'>
			<UserInfo userId={userId} />
			<p className='my-2 text-base leading-5 whitespace-pre-line'>
				{body}
			</p>
			{image && (
				<div className='rounded-md overflow-hidden'>
					<Image
						src={image}
						layout='responsive'
						alt={body}
						width='400'
						height='300'
					/>
				</div>
			)}
            <CommentsSection commentCount={commentCount} id={id}/>
		</div>
	)
}

export default Post
