import Image from 'next/image'

const Story = ({imageUrl,username}) => {
    return (
        <div className="text-center "   >
             <div  className="  border-2   story  rounded-full p-[2px]    hover:scale-110 transition transform duration-200 ease-out " >
                <div className="relative w-14  h-14 cursor-pointer " >
                    <Image src={imageUrl} layout="fill" objectFit="contain" className=" rounded-full " /> 
                </div> 
             </div>
             <span  className= " inline-block   truncate text-sm  w-14  " >{username}</span>
        </div>
    )
}

export default Story
