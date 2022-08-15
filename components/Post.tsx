import Image from 'next/image'


export interface PostTypes{
    post:{
    userId: number;
    id: number;
    image: string;
    body: string;}
  }

const Post = ({post}: PostTypes) => { 

   
    
    return(<div className='mb-8 flex flex-col w-[420px] rounded bg-white p-4'><p className='my-2 text-base leading-5 whitespace-pre-line'>{post.body && post.body}</p>{post.image && <div className='rounded'><Image src={post.image} layout='responsive' alt={post.body} width='400' height='300' /></div>}</div>)}

export default Post
