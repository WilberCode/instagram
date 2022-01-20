import { useSession } from 'next-auth/react'
import Image from 'next/image'
import PostBody from '../atoms/PostBody'
import PostFooter from '../atoms/PostFooter'
import PostHeader from '../atoms/PostHeader'


const Post = ({id,username,userImg,img,caption,like}) => {
    const {data:session} =  useSession()
    
    return (
        <div  className="mt-6" >
            <article  className="layout">
                <PostHeader username={username} userImg={userImg} />
                
                {img&&(
                <PostBody img={img}  />
                )}
             
                <PostFooter id={id} caption={caption} username={username} like={like} />
                
            </article>
        </div>
    )
}

export default Post
