import { useRecoilState } from "recoil"
import { modalState } from "../../atoms/modalAtom"
import {Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from "react";
import { CameraIcon, LockClosedIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
 

const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState)
    const filePickerRef =  useRef(null)
    const [selectedFile, setSelectedFile]  =  useState(null) 
    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)

    const {data:session} =  useSession()

    const getCaption = (e)=>{
        setCaption(e.target.value)
    }


    const addImageToPost = (e)=>{
        const  reader =  new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) =>{
            setSelectedFile(readerEvent.target.result) 
        } 
    }
    const  removeImage = (e)=>{    
        setSelectedFile(null)
    } 

    const  uploadPost = async (e)=>{
        if(loading) return;
        setLoading(true)

        const  docRef =  await  addDoc(collection(db, 'posts'),{
            username: session.user.username,
            caption: caption,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })

        console.log('New doc added with ID', docRef.id );
        const  imageRef =  ref(storage, `posts/${docRef.id}/image` )
        await uploadString(imageRef, selectedFile, "data_url").then( async snapshot => {
            const downloadURL =  await getDownloadURL(imageRef)

            await updateDoc( doc(db, 'posts', docRef.id ), {
                image:downloadURL
            } )
        })

        setOpen(false)
        setLoading(false)
        setCaption('')
        setSelectedFile(null)

        
    }



    return (
        <Transition.Root  show={open} as={Fragment} >
               <Dialog  
               as="div"
               className="fixed z-10 inset-0 overflow-y-auto " 
               onClose={()=>setOpen(false)} >
                    <div className="flex items-end  justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 " >
                        <Transition.Child
                            as={Fragment} 
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay  className=" fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity  " /> 
                        </Transition.Child>
                        <span  className="hidden sm:inline-block  sm:align-middle sm:h-screen " aria-hidden="true" >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0  sm:scale-95 "
                            enterTo="opacity-100  translate-y-0  sm:scale-100 "
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8  sm:align-middle sm:max-w-sm sm:w-full sm:p-6" >
                                    <div>
                                        
                                        { 
                                            selectedFile ?(
                                                <div  className=" relative overflow-hidden bg-black rounded-lg group  " >
                                                    <button onClick={removeImage} className="absolute top-2 z-10 w-10 h-10 justify-center items-center right-2 rounded-full bg-gray-100 text-gray-600 bg-opacity-80 hidden group-hover:inline-flex  " >
                                                        <XIcon  className="w-6 h-6" />
                                                    </button>
                                                    <img src={selectedFile}  alt="" className="cursor-pointer group-hover:opacity-50" />
                                                </div>
                                            ):
                                            (
                                               
                                                <div  className="text-center" >
                                                    <div className="mx-auto mb-2 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 cursor-pointer  "
                                                    onClick={()=>filePickerRef.current.click()}
                                                    > 
                                                        <CameraIcon  className="h-6 w-6 text-blue-500 fill-current " aria-hidden="true" /> 
                                                    </div>
                                                    <Dialog.Title  as ="h3"  className=" text-lg leading-6   font-medium text-gray-900 " >
                                                        Subir una foto
                                                    </Dialog.Title>
                                                </div>
                                            )
                                        }

                                        <div>
                                            <div  className="mt-3 text-center sm:mt-5 ">
                                             
                                                <div>
                                                    <input
                                                        type="file"
                                                        ref={filePickerRef}
                                                        hidden
                                                        onChange={addImageToPost}
                                                    />
                                                </div>
                                                <div  className="mt-2" >
                                                    <input type="text"
                                                        className="border-none focus:ring-0  w-full text-center "
                                                        placeholder="Escribe una descripción..."
                                                       value={caption}
                                                        onChange={getCaption}
                                                     />
                                                </div>
                                            </div>
                                        </div>
                                        <div  className="mt-5 sm:mt-6 " >
                                            {
                                                (selectedFile &&  !!caption  ) ?(
                                                    <button 
                                                type="button"
                                                className=" inline-flex justify-center text-md w-full bg-blue-500 text-white  rounded-lg px-3 py-2  "
                                                onClick = {uploadPost}
                                            > 
                                                { loading? 'Subiendo...':'Subir Publicación'}
                                            </button>
                                                ):
                                                (
                                                    <button
                                                type="button"
                                                className=" inline-flex justify-center text-md w-full bg-blue-500 text-white opacity-30 cursor-not-allowed rounded-lg px-3 py-2  "
                                            >
                                                 Subir Publicación 
                                            </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                        </Transition.Child>
                    </div>
                </Dialog> 
        </Transition.Root>
    )
}

export default Modal
