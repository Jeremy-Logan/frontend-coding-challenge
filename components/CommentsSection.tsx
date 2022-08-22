// I used an animated transition to expand the comments section. It would be fun to work in some kind of staggered effect on the individual comments too.

import { PostProps } from './Post'
import { useState, useEffect } from 'react'
import { useGetPosts } from '../hooks/useRequest'
import _ from 'lodash'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { Transition } from '@headlessui/react'
import { AnnotationIcon, ChevronUpIcon } from '@heroicons/react/outline'

function CommentsSection({ commentCount, id }: PostProps) {
	const [open, setOpen] = useState(false)
	const { posts } = useGetPosts(`/posts/${id}/comments`)
	const [comments, setComments] = useState([])
	const orderedComments = _.orderBy(comments, ['id'], ['desc']) // Order comments from newest to oldest via the comment ID

	useEffect(() => {
		setComments(posts)
	}, [posts])

	if (!comments)
		return (
			<div className='flex items-center justify-start mt-2 ml-2 mb-4'>
				<AnnotationIcon className='h-4 w-4 mr-1 text-slate-500' />
			</div>
		)

	return (
		<div>
			<button
				aria-label='Expand Comments'
				className='flex items-center mt-2 ml-2 mb-2 bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-sm transition ease-in-out duration-200 active:bg-slate-400 focus:outline-none focus:ring-[1px] focus:ring-slate-400 hover:bg-slate-300'
				onClick={() => setOpen(!open)}>
				<AnnotationIcon className='h-4 w-4 mr-1' />
				<p className='text-xs font-semibold'>{comments.length}</p>
				<ChevronUpIcon
					className={open ? 'ml-2 block w-4 h-4' : 'hidden'}
				/>{console.log(comments)}
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
				{(orderedComments ?? []).map((comment: any) => (
					<Comment key={comment.id} {...comment} />
				))}
			</Transition>
		</div>
	)
}

export default CommentsSection
