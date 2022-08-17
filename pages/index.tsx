import type { NextPage } from 'next'
import Head from 'next/head'
import { AuthenticationProvider } from '../context/Authentication'
import { useGetPosts } from '../hooks/useRequest'
import Post from '../components/Post'
import _ from 'lodash'

const Home: NextPage = () => {
	const { posts, error } = useGetPosts('/posts')

	if (error) return <h1>Something went wrong!</h1>
	if (!posts) return <h1>Loading...</h1>

	const orderedPosts = _.orderBy(posts, ['id'], ['desc']) // Order posts from newest to oldest via the post ID

	return (
		<>
			<Head>
				<title>Practicegenius Post Feed</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='min-h-[100vh] p-[4rem 0] flex flex-col justify-center items-center bg-slate-200'>
				{orderedPosts &&
					orderedPosts.map((post: any) => (
						<Post key={post.id} {...post} />
					))}
			</main>
		</>
	)
}

const ProvidedApp = () => (
	<AuthenticationProvider>
		<Home />
	</AuthenticationProvider>
)

export default ProvidedApp
