import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { AuthenticationProvider } from '../context/Authentication'
import { useGetPosts } from '../hooks/useRequest'

const Home: NextPage = () => {
	const { posts, error } = useGetPosts('/posts')
	if (error) return <h1>Something went wrong!</h1>
	if (!posts) return <h1>Loading...</h1>

	return (
		<div className='p-[0 2rem]'>
			<Head>
				<title>Practicegenius Post Feed</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='min-h-[100vh] p-[4rem 0] flex flex-col justify-center items-center'>
				{posts.map((post: any) => {console.log(post)})}
			</main>
		</div>
	)
}

const ProvidedApp = () => (
	<AuthenticationProvider>
		<Home />
	</AuthenticationProvider>
)

export default ProvidedApp
