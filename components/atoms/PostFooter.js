import {BookmarkIcon, ChatAlt2Icon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon} from '@heroicons/react/outline' 
import { HeartIcon as HeartIconOutline  } from '@heroicons/react/solid' 
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import React  from 'react';

import Moment from 'react-moment'
import PostOption from './PostOption'

const PostFooter = ({id,caption,username }) => {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]) 
    const [likes, setLikes] = useState([]) 
    const [hasLiked, setHasLiked] = useState([]) 

    const {data:session} =  useSession()
    useEffect(() => {
        onSnapshot(query(collection(db, 'posts',id,'comments'), orderBy('timestamp','desc')), snapshot => setComments(snapshot.docs))
        
    } 
    ,[db,id])
    
    
    useEffect(
        () => 
        onSnapshot(collection(db, 'posts',id,'likes'), (snapshot) =>
         setLikes(snapshot.docs)
        ),[db,id]
    ) 

    useEffect(
        () => 
             setHasLiked(likes.findIndex((like)=> like.id === session?.user?.uid) !== -1 ) 
        ,[likes]
    ) 
  
    const likePost = async()=>{

        if (hasLiked){
             await deleteDoc(doc(db,'posts',id,'likes', session.user.uid) )
        } 
        else{ 
            await setDoc(doc(db,'posts',id,'likes', session.user.uid),{
                username: session.user.username
            })
        } 
    }



    const sendComment =  async(e)=> {
        e.preventDefault()
        const commentToSend =  comment
        setComment('')   
        await addDoc(collection(db, 'posts', id,'comments'),{
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })
    } 

    console.log(likes);
/*     const sendLike = async(e)=> { 
          return await updateDoc( doc(db, 'posts', id ), { like:!like } ) 
    }  
   */
    return (
        <section> 
           
     
            { session && (
                <div  className="px-4 py-4">
                    <div className="flex justify-between "  >
                        <div className="inline-flex space-x-3 " >  
                            { hasLiked  ?  
                        
                                <PostOption Icon={HeartIconOutline}  onClick={likePost}  className="text-red-600  fill-[#ed4956]  "  /> 
                            : 
                                <PostOption onClick={likePost} Icon={HeartIcon} />
                        
                            } 
                            <PostOption Icon={ChatAlt2Icon}  />
                            <PostOption Icon={PaperAirplaneIcon} className="rotate-[60deg]" />
                        </div>
                        <div> <PostOption Icon={BookmarkIcon}  /> </div>
                    </div> 
                    <div  className=" ">  
                        {likes.length> 0 && (
                            <p  className="font-bold ">{likes.length} likes</p>
                        )} 
                    </div> 
                </div> 
                )

            } 
             <div  className=" "> 
                <div  className="px-4 py-[10px] " > 
                    <p className="truncate" >
                        <strong className="mr-1" >
                          {username}
                        </strong>
                        {caption}
                     </p>
                </div> 
                {  
                    comments.length > 0 && (

                        <div  className="ml-10 h-20 overflow-y-scroll  scrollbar-thumb-black scrollbar-thin " >
                            {
                                comments.map((comment) =>(
                                    <div key={comment.id}  className="flex items-center space-x-2 mb-3" >
                                        <img src={comment.data().userImage} alt={comment.data().username} className="rounded-full h-7 " />
                                        <p  className="text-sm flex-1" >
                                            <span className="font-bold" >{comment.data().username}  </span>
                                            {" "} {comment.data().comment}  
                                        </p>
                                        <Moment  fromNow className="pr-5 text-xs" >
                                            { comment.data().timestamp?.toDate() }
                                        </Moment>
                                       
                                    </div>
                                ))
                            }
                        </div>

                    )

                }

                { session && (
                    <form  className="flex justify-between items-center space-x-2 border-t border-line px-4 py-[10px] " >
                        <div className="  " >
                            <EmojiHappyIcon  className="text-gray-600 w-[32px] h-[32px] font-light " />  
                        </div>
                        <div className="flex-1" >
                            <input  value={comment} onChange={(e)=>setComment(e.target.value)}  className={` text-gray-700 outline-none  w-full top-0 bottom-0 bg-transparent   py-[3px] px-3   text-sm  focus:text-left `} type="search" placeholder="Agregar un comentario"  />
                        </div>
                        <div> <button disabled={!comment.trim()}  type="submit"  onClick={sendComment} className={` text-blue-500 text-sm font-medium ${!!!comment.trim() && 'opacity-30' } `} >Publicar</button> </div>
                    </form>
                )}
               

            </div>

        </section>
    )
}

export default PostFooter
