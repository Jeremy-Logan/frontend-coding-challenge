import Image from 'next/image'
import { useState, useEffect } from 'react'
import UserInfo from './UserInfo'
import CommentsSection from './CommentsSection'

export interface PostProps {
	userId?: number
	id?: number
	image?: string
	body?: string
	
}

const Post = ({ userId, id, image, body }: PostProps) => {
	
	if (!id)
		return (
			<div className='border border-slate-300 shadow rounded-md p-4 max-w-sm mx-auto mt-2 w-[420px] bg-white'>
				<div className='animate-pulse flex space-x-4'>
					<div className='rounded-full bg-slate-400 h-10 w-10'></div>
					<div className='flex-1 space-y-6 py-1'>
						<div className='h-2 bg-slate-400 rounded'></div>
						<div className='space-y-3'>
							<div className='grid grid-cols-3 gap-4'>
								<div className='h-2 bg-slate-400 rounded col-span-2'></div>
								<div className='h-2 bg-slate-400 rounded col-span-1'></div>
							</div>
							<div className='h-2 bg-slate-400 rounded'></div>
						</div>
					</div>
				</div>
			</div>
		)
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
			<CommentsSection id={id} />
		</div>
	)
}

export default Post
