type Props = {}

export default function CommentForm({}: Props) {
	return (
		<div>
			<input type='text' className='w-full h-14 border-slate-400 border-[1px] rounded-md' />
			<div className='flex justify-end'>
				<button className='bg-slate-200 px-3 py-1 mt-2 rounded-md text-sm  transition ease-in-out hover:scale-105 hover:bg-slate-300'>Submit</button>
			</div>
		</div>
	)
}
