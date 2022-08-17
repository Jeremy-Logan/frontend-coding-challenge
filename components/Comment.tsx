import UserInfo from './UserInfo'
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { mutate } from 'swr'
import axios from 'axios'
import { useAuthentication } from '../context/Authentication'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'

type Props = { body: string; userId: number; id: number; postId: number }

export default function Comment({ body, userId, id, postId }: Props) {
	const userContext = useAuthentication()
	const [editorOpen, setEditorOpen] = useState(false)
	const [comment, setComment] = useState<string>(body)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		const newComment = {
			body: comment,
		}
		mutate(`/api/posts/${postId}/comments/${id}`)
		const response = await axios.patch(
			`/api/posts/${postId}/comments/${id}`,
			newComment
		)
		mutate(`/api/posts/${postId}/comments/${id}`)

		setEditorOpen(false)
	}

	const handleDelete = async () => {
		mutate(`/api/posts/${postId}/comments/${id}`, false)
		const response = await axios.delete(
			`/api/posts/${postId}/comments/${id}`
		)
		mutate(`/api/posts/${postId}/comments`)

		setEditorOpen(false)
	}

	const handleChange: ChangeEventHandler = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const commentValue = e.target.value
		setComment(commentValue)
	}

	return (
		<div className='mb-6'>
			<UserInfo userId={userId} />
			<div className='flex items-start justify-between'>
				{!editorOpen ? (
					<p className='text-xs mt-1 whitespace-pre-line mx-4'>
						{comment}
					</p>
				) : null}
				{editorOpen ? (
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleSubmit(e)
						}}
						className='w-full mr-2'>
						<textarea
							name='comment'
							id='comment'
							onChange={handleChange}
							value={comment}
							className='w-full h-24 border-slate-400 border-[1px] rounded-md text-xs px-2 py-1'
						/>
						<div className='flex justify-end'>
							<button
								type='submit'
								className='bg-slate-200 px-3 py-1 mt-2 rounded-md text-sm transition ease-in-out active:bg-slate-400 focus:outline-none  focus:ring-[1px] focus:ring-slate-400 hover:bg-slate-300'>
								Submit
							</button>
						</div>
					</form>
				) : null}
				{/* Show edit button only when comment user id matches auth user id */}
				{userContext.user.id && userContext.user.id === userId ? (
					<div className='flex flex-col'>
						<button
							onClick={() => {
								setEditorOpen(!editorOpen)
								setComment(body)
							}}>
							<PencilIcon className='h-4 w-4 text-right text-slate-500 rounded-md active:text-slate-800 focus:outline-none focus:ring-[1px] focus:ring-slate-400' />
						</button>
						{editorOpen ? (
							<button
								onClick={() => {
									handleDelete()
									setEditorOpen(!editorOpen)
								}}>
								<TrashIcon className='h-4 w-4 mt-3 text-right text-red-500 rounded-md active:text-slate-800 focus:outline-none focus:ring-[1px] focus:ring-red-400' />
							</button>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	)
}
