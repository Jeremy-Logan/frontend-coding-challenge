import { PostProps } from './Post'
import { useState, useEffect } from 'react'
import { useGetPosts } from '../hooks/useRequest'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { Transition } from '@headlessui/react'
import { AnnotationIcon, ChevronUpIcon } from '@heroicons/react/outline'

function CommentsSection({ commentCount, id }: PostProps) {
	const [open, setOpen] = useState(false)
	const { posts, error } = useGetPosts(`/posts/${id}/comments`)
    const [comments, setComments] = useState([])

	useEffect(() => {
		setComments(posts)
	}, [posts])

	if (error) return <h1>Something went wrong!</h1>
	if (!comments)
		return (
			<div className='flex items-center justify-start mt-2 ml-2 mb-4'>
				<AnnotationIcon className='h-4 w-4 mr-1 text-slate-500' />
			</div>
		)

	return (
		<div>
			<button
				className='flex items-center mt-2 ml-2 mb-4 bg-slate-200 px-2 py-1 rounded-md text-sm transition ease-in-out duration-200 active:bg-slate-400 focus:outline-none focus:ring-[1px] focus:ring-slate-400 hover:bg-slate-300'
				onClick={() => setOpen(!open)}>
				<AnnotationIcon className='h-4 w-4 mr-1 text-slate-500' />
				<p className='text-xs'>{commentCount}</p>
				<ChevronUpIcon
					className={open ? 'ml-2 block w-4 h-4' : 'hidden'}
				/>
			</button>
			<Transition
				show={open}
				className='origin-top'
				enter='duration-300 ease-in-out'
				enterFrom='opacity-0 '
				enterTo='opacity-100 '
				leave='duration-200 ease-in-out'
				leaveFrom='opacity-100 '
				leaveTo='opacity-0 '>
				{id && <CommentForm id={id} />}
				{(comments ?? []).map((post: any) => (
						<Comment key={post.id} {...post} />
					))}
			</Transition>
		</div>
	)
}

export default CommentsSection
