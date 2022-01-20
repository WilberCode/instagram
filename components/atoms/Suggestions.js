
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SuggestionUser from './SuggestionUser'
const Suggestions = () => {
    const [users, setUsers] = useState([])
     useEffect(async() => { 
         const res = await fetch('https://randomuser.me/api/?results=6')
         const data =  await res.json()
         setUsers(data.results)
 
     }, [])
    return (
        <div  className="mt-[1.4rem]" >
            <div className="flex justify-between space-x-4 text-sm " >
                <span className="font-medium text-gray-500 " >Sugerencias para ti  </span> 
                <Link href="#" >
                        <a  className="font-medium text-xs " >Ver todo</a>   
                </Link>
            </div> 
            {users.map((user, index) =>(
                <SuggestionUser
                    key={index}
                    username={user.name.first}
                    img={user.picture.thumbnail}
                    users='Nuevo en Instagram' 
                />  
            ))}
           
             <div  className="mt-7 text-[11px] " >
                 <p  className=" text-[#c7c7c7]" >Información Ayuda Prensa API Empleo Privacidad Condiciones Ubicaciones Cuentas destacadas Hashtags Idioma Español
                    </p>
                 <h4 className=" mt-5  uppercase text-[#c7c7c7]" >© 2021 INSTAGRAM FROM META</h4>
             </div>   
        </div>
    )
}

export default Suggestions
