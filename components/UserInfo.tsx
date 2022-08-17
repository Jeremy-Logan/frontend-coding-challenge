import { PostProps } from './Post'
import { useGetUsers } from '../hooks/useRequest'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/solid'

const UserInfo = ({ userId }: PostProps) => {
	const { users } = useGetUsers(`/users/${userId}`)

	if (!users) return <div className=' rounded-md  max-w-sm  mt-2 w-1/2 bg-white'>
    <div className='animate-pulse flex space-x-4'>
        <div className='rounded-full bg-slate-400 h-10 w-10'></div>
        <div className='flex-1 space-y-2 py-1'>
            <div className='h-2 bg-slate-400 rounded'></div>
            <div className='space-y-2'>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='h-2 bg-slate-400 rounded col-span-2'></div>
                    <div className='h-2 bg-slate-400 rounded col-span-1'></div>
                </div>
            </div>
        </div>
    </div>
</div>

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
