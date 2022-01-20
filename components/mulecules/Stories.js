import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import faker from 'faker';
import { Fragment, useEffect, useState } from 'react';
import Story from '../atoms/Story'; 
import '@splidejs/splide/dist/css/splide.min.css';
import { useSession } from 'next-auth/react';
 


const Stories = () => {
     const [suggestions, setSuggestions] = useState([])
     const {data:session} =  useSession()

     
    useEffect(() => { 
    /*     const suggestions =[...Array(20)].map((_,i) =>({
            ...faker.helpers.contextualCard(),
            id:i
        }) )    */
    /*     setSuggestions(suggestions)   
         */ 
           fetch('https://randomuser.me/api/?results=20').then((data)=> data.json()).then((data)=> {   
            setSuggestions(data.results)   
           }) 
   
    }, [0])
    
    return (  
        <div  className=" layout p-4" >  

        <Splide  options={ {
            type         : 'loop',
            gap          : '.6rem',
            autoplay     : true,
            pauseOnHover : true,
            resetProgress: false,
            arrows       : 'slider',
            height       : 'auto',
            perPage   : 8,
          } }     
         
         >
           {session &&(
            <SplideSlide  key={4} > 
                <Story key={6} username={session?.user.name}   imageUrl={session?.user.image}/>
            </SplideSlide>
           )}
            {suggestions?.map((user, index) =>  
                <SplideSlide  key={index} > 
                    <Story key={index} username={user.name.first}   imageUrl={user.picture.thumbnail}/>
                </SplideSlide>
           
            )} 
        </Splide>
      </div>
    )
}

export default Stories
{/* <div className="glide ">
<div  className="flex space-x-2  layout p-4  overflow-x-scroll scrollbar-thin scrollbar-thumb-black   " >  
        {suggestions?.map(({avatar,username,id}) => 
            <Story key={id} imageUrl={avatar} username={username}  />
        )} 
    
 </div> 
</div> */}