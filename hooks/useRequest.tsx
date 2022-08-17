// These two request hooks could be redundant. The refreshInterval on UseGetPosts is there so the comment count will update in the interface. 
// There may be a better way to accomplish that and resolve the redundancy.

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const baseUrl = '/api'

export const useGetPosts = (path: string) => {
	if (!path) {
		throw new Error('Path is required')
	}
	const url = baseUrl + path

	const { data: posts, error } = useSWR(url, fetcher, {
		refreshInterval: 1000,
	})

	return { posts, error }
}

export const useGetUsers = (path: string) => {
	if (!path) {
		throw new Error('Path is required')
	}
	const url = baseUrl + path

	const { data: users, error } = useSWR(url, fetcher)

	return { users, error }
}
