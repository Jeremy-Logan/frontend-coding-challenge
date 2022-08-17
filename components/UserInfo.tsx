import { PostProps } from './Post'
import { useGetUsers } from '../hooks/useRequest'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'

const UserInfo = ({ userId }: PostProps) => {
	const { users } = useGetUsers(`/users/${userId}`)

	if (!users) return <h1>Loading...</h1>

	return (
		<>
			<div className='flex flex-row justify-start'>
				{users.avatar ? (
					<div className='relative h-10 w-10 rounded-full overflow-hidden'>
						<Image
							src={users.avatar}
							layout='fill'
							objectFit='cover'
							alt={users.name}
						/>
					</div>
				) : (
					<UserCircleIcon className='h-10 w-10 text-gray-400' />
				)}
				<div className='flex flex-col ml-1'>
					{users.name && (
						<h3 className='font-semibold text-xs mb-[2px]'>
							{users.name}
						</h3>
					)}
					{users.name && (
						<h3 className='font-semibold text-[0.7rem] text-gray-400'>
							@{users.username}
						</h3>
					)}
				</div>
			</div>
		</>
	)
}

export default UserInfo
