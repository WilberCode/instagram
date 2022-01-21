import Image from 'next/image'
import SearchIcon from '@heroicons/react/solid/SearchIcon'
import HomeIcon from '@heroicons/react/solid/HomeIcon' 
import PaperAirplaneIcon from '@heroicons/react/outline/PaperAirplaneIcon'
import PlusCircleIcon from '@heroicons/react/outline/PlusCircleIcon'
import HeartIcon from '@heroicons/react/outline/HeartIcon'
import BadgecheckIcon from '@heroicons/react/outline/BadgeCheckIcon'
import { useState } from 'react'
import {useRouter} from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react' 
import { useRecoilState } from 'recoil'
import { modalState } from '../../atoms/modalAtom'


const Header = () => {
    const [focus, setFocus] = useState(true)
    const [input, setInput] = useState('') 

    const [open, setOpen] =  useRecoilState(modalState)

    const {data: session} = useSession()
    const router = useRouter() 

    return (
        <header className="border-b boder-gray-300 fixed top-0 w-full bg-white z-50  " >
           <div className="flex w-full justify-between container  items-center h-[44px] sm:h-[60px] maxmd:space-x-4 " >
               
                <div  className="relative w-6 h-6 flex sm:hidden  flex-shrink-0 " >
                    <Image 
                    src="https://links.papareact.com/jjm" 
                    layout="fill"
                    objectFit="contain"
                    />
                </div>
                <div  className="relative w-[103px] h-[29px]  flex cursor-pointer " onClick={()=>router.push('/')} >
                    <Image 
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                    layout="fill"
                    objectFit="contain"
                    />
                </div>
                <label htmlFor="search" className="w-full  max-w-[268px] relative px-3  md:ml-auto md:mr-[5rem]  hidden sm:flex justify-center items-center   cursor-text bg-[#efefef] rounded-lg   h-[36px]  ">
                    <div    className={` ${!focus?'text-left':'text-left '}   w-full items-center ` } >
                       <div  className={`inline-flex items-center  text-gray-500 relative z-10   `} >
                        {focus && 
                            <span  className=" inline-flex  insety-y-1 pointer-events-none  ">
                                <SearchIcon className="h-5 w-5  fill-[#a8a7a7]  "  />  
                            </span> }
                            <span  className="ml-2   overflow-hidden   max-w-[140px] whitespace-nowrap overflow-ellipsis text-md text-gray-400 font-light  " >{!!!input&&'Buscar'} {focus&&input} </span>
                       </div>
                        <input onFocus={()=>setFocus(false)} value={input} id="search"  onBlur ={()=>setFocus(true)} onChange={(e)=>setInput(e.target.value)}    className={` ${!focus?'text-gray-700':'text-transparent '} absolute w-full top-0 bottom-0 bg-transparent   py-[3px] px-3  inline-flex  left-0 text-center text-sm  focus:text-left `} type="text"  />

                    </div>
                </label>
                <PaperAirplaneIcon  className="w-7 h-7 rotate-[54deg] text-heading  inline-flex sm:hidden -mt-2 " ></PaperAirplaneIcon>
                <div  className="hidden sm:flex items-center space-x-[1.09rem] text-heading  " >
                    <HomeIcon onClick={ ()=>router.push('/') }  className="w-7 h-7 cursor-pointer " ></HomeIcon>
                    {session? 
                     (
                        <>
                        <div className="relative" >
                            <span className="absolute top-[-3px] right-2 inline-flex items-center justify-center w-5 h-5 z-10 rounded-full  animate-pulse bg-red-700 bg-opacity-90 text-white text-base" >3</span>
                            <PaperAirplaneIcon  className="w-7 h-7 rotate-[54deg] " ></PaperAirplaneIcon>
                        </div>
                        <PlusCircleIcon onClick={()=>setOpen(true)}  className="w-7 h-7 cursor-pointer  " ></PlusCircleIcon> 
                        <HeartIcon className="w-7 h-7" >  </HeartIcon> 
                        <BadgecheckIcon  className="w-7 h-7" ></BadgecheckIcon>  
                        <img src={session.user.image} onClick={()=> signOut() }
                        className="h-6 rounded-full cursor-pointer "
                        alt={session.user.name} title={session.user.name} />
                        </>
                        )
                    :
                        <button onClick={()=>signIn()} >Iniciar session</button>
                     }
                </div> 
           </div>
        </header>
    )
}

export default Header
