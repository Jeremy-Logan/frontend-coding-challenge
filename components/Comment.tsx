import UserInfo from './UserInfo'

type Props = { body: string; userId: number }

export default function Comment({ body, userId }: Props) {
	return (
		<div className='mb-6'>
			<UserInfo userId={userId} />
			<p className='text-xs mt-1 whitespace-pre-line mx-4'>{body}</p>
		</div>
	)
}
