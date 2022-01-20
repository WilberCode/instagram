import Link from 'next/link'
import Image from 'next/image'
const SuggestionUser = ({username, img,users}) => {
    return ( 
        <div  className="flex space-x-4 items-center  mt-3 pl-1 " >
            <div  className=" relative  w-[32px] h-[32px]  " >
                <Image 
                    src={img}
                    layout="fill"
                    objectFit="cover" 
                    className="rounded-full"
                        /> 
            </div>
            <div className="flex-1 leading-4 truncate ">
        
                    <Link href="#" >
                        <a  className="font-medium text-sm " >{username}</a>   
                    </Link>
                    <p  className="text-xs text-gray-400 truncate  " >{users}</p> 
            </div>
            <button  className= " text-xs text-blue-600 font-medium ">Seguir</button>
        </div> 
    )
}

export default SuggestionUser
