import Link from 'next/link'
import DotsHorizontalIcon from '@heroicons/react/solid/DotsHorizontalIcon'
import Image from 'next/image'
const PostHeader = ({id, username,userImg}) => {
    return (
        <div  className="px-4 py-4  flex justify-between items-center " >
            <div  className="flex items-center">
                <div  className="relative h-[32px] w-[32px] " >
                    <Image src={userImg} layout="fill" className="rounded-full " objectFit="contain" /> 
                </div>
                <Link href="https://links.papareact.com" className="" >
                    <a  className="ml-4  font-medium text-sm hover:underline " >{username}</a>
                </Link>
            </div> 
            <button><DotsHorizontalIcon className="w-[16px]" /> </button>
        </div>
    )
}

export default PostHeader
