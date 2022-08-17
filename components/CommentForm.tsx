import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { useSWRConfig } from 'swr'
import axios from 'axios'

type Props = { id: number }

export default function CommentForm({ id }: Props) {
	const [comment, setComment] = useState<string>()
	const { mutate } = useSWRConfig()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		if (!comment) return {}
		const newComment = {
			body: comment,
		}
		const response = await axios.post(
			`/api/posts/${id}/comments`,
			newComment
		)
		mutate(`/api/posts/${id}/comments`)
		setComment('')
	}

	const handleChange: ChangeEventHandler = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const commentValue = e.target.value
		setComment(commentValue)
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit(e)
			}}>
			<textarea
				name='comment'
				id='comment'
				onChange={(e) => {
					e.preventDefault()
					handleChange(e)
				}}
				value={comment}
				placeholder='Add your comment...'
				className='w-full h-16 border-slate-400 border-[1px] rounded-md text-xs p-1 mt-2'
			/>
			<div className='flex justify-end'>
				<button
                    aria-label='Submit Comment'
					type='submit'
					className='bg-slate-200 px-3 py-1 mt-2 rounded-md text-sm transition ease-in-out active:bg-slate-400 focus:outline-none focus:ring-[1px] focus:ring-slate-400 hover:bg-slate-300'>
					Submit
				</button>
			</div>
		</form>
	)
}
