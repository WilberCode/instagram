import { collection, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import Post from "./Post"

 
const Posts = () => {

    const [posts, setPosts] = useState([])
    
    useEffect(() =>  
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp','desc')),
        (snapshot) =>{
            setPosts(snapshot.docs);
            
        }) 
    ,[db]) 

 
    return (
        <div> 
            {
                posts?.map((post) =>(
                  
                         <>
                         {console.log(post.data())}
                         <Post 
                        id = {post.id}
                        key ={post.id} 
                        username={post.data().username}  
                        userImg={post.data().profileImg} 
                        img={post.data().image} 
                        caption={post.data().caption}
                        like={post.data().like}
                         />
                         </>
                ) )
            }  
        </div> 
        
    )
}

export default Posts
