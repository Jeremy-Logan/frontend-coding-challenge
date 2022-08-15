import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())
const baseUrl = "/api"

export const useGetPosts = (path: string) => {
    if (!path) {
        throw new Error("Path is required")
    }
    const url = baseUrl + path

    const { data: posts, error } = useSWR(url, fetcher)

    return{ posts, error }

}



