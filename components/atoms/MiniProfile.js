import { UserCircleIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const MiniProfile = ({img='https://links.papareact.com/3ke'}) => {

    const {data: session} = useSession()
    console.log(session);
    return (
        <div  className="flex space-x-5 items-center mt-[1.4rem] " >
             <div  className=" relative  w-[56px] h-[56px]  " >
              { session ? (
                <Image 
                    src={session?.user.image}
                    layout="fill"
                    objectFit="cover" 
                    className="rounded-full"
                        /> 
              ) : 
              (
                  <UserCircleIcon  className="w-14 h-14 fill-[#c5c5c5] " /> 
              )
              }
             </div>
             <div className="flex-1 leading-4 ">
           
                    <Link href="#" >
                         <a  className="font-medium text-sm " > {session?.user.username} </a>   
                    </Link>
                     <p  className="text-sm text-gray-400 " >{session?.user.name}  </p> 
             </div>
            { session?(
                <button  className= " text-xs text-blue-600 font-medium " onClick={signIn} > Cambiar </button>
            ):
                <button  className= " text-xs text-blue-600 font-medium " onClick={signIn} > Iniciar Sessión </button>
            
            }
        </div>
    )
}

export default MiniProfile
