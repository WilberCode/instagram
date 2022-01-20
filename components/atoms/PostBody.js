import Image from 'next/image'
const PostBody = ({img}) => {
    return (
        <section>
            <div  className="relative w-full h-[600px] " >
          
                <Image 
                src={img}
                layout="fill"
                objectFit="cover" 
                   />  
            </div>
        </section>
    )
}

export default PostBody
