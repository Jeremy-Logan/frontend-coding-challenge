import { PostProps } from './Post'
import { useGetPosts } from '../hooks/useRequest'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { AnnotationIcon } from '@heroicons/react/outline'

function CommentsSection({ commentCount, id }: PostProps) {
	const { posts, error } = useGetPosts(`/posts/${id}/comments`)
	if (error) return <h1>Something went wrong!</h1>
	if (!posts) return <h1>Loading...</h1>

	return (
		<div>
			<button className='flex items-center justify-start mt-2 ml-2 mb-4'>
				<AnnotationIcon className='h-4 w-4 mr-1' />
				<p className='text-sm'>{commentCount}</p>
			</button>
            <CommentForm/>
			{posts &&
				posts.map((post: any) => <Comment key={post.id} {...post} />)}
		</div>
	)
}

export default CommentsSection
