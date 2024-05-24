"use client"
import { faAngleDown, faAngleUp, faBook, faGreaterThan, faMessage, faPeopleGroup, faSliders, faUser, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Link from 'next/link'

export default function Sidebar() {
    let [menuopen,setMenuopen]=useState(80)
    const itemList=[
        {
            id:1,
            name:"Category",
            icon:<FontAwesomeIcon icon={faBook} className='me-2'/>,
            submenu:[
                {
                  menu:"Add Category",
                  url:"/addcategory"
                },
                {
                  menu:"View Category",
                  url:"/viewcategory"
                } 
                
            ]
        },
        {
            id:2,
            name:"Product",
            icon:<FontAwesomeIcon icon={faVideo}  className='me-2'/>,
            submenu:[
              {
                menu:"Add Product",
                url:"/addproduct"
              },
              {
                menu:"View Product",
                url:"/viewproduct"
              } 
              
          ]
          
        },
        {
            id:3,
            name:"Testimonial",
            icon:<FontAwesomeIcon icon={faSliders}  className='me-2'/>,
            submenu:[
              {
                menu:"Add Testimonial",
                url:"/addtestimonial"
              },
              {
                menu:"View Testimonial",
                url:"/viewtestimonial"
              } 
              
          ]
          
        },
        {
            id:4,
            name:"Page",
            icon: <FontAwesomeIcon icon={faPeopleGroup}  className='me-2'/>,
            submenu:[
              {
                menu:"Add Pages",
                url:"/addpages"
              },
              {
                menu:"View Pages",
                url:"/viewpages"
              } 
              
          ]
          
        },
        
        {
          id:5,
          name:"User",
          icon:<FontAwesomeIcon icon={faUser}  className='me-2'/>,
          submenu:[
            {
              menu:"Change Password",
              url:"/changepassword"
            },
            
            
        ]
          
        }
      ]
  return (
   <div className='relative'>
    <div className='fixed w-[20%] h-[100%] bg-slate-200  top-0 left-0' style={{zIndex:'9',paddingTop:"80px"}}>
        <ul>
          {
            itemList.map((v,i)=>{
               return(
                  <li className='relative p-2 mt-3 text-[15px]' key={i} onClick={()=>setMenuopen((i==menuopen)? menuopen:i)} style={{backgroundColor:`${(i==menuopen)?"#4B49AC":"rgb(226 232 240)"}`,color:`${(i==menuopen)?"#fff":"#000"}`}}>
                    {v.icon}{v.name}
                    <span className='right-angle'>
                     {
                      (i==menuopen)?<FontAwesomeIcon icon={faAngleUp} style={{color:"white"}} /> :<FontAwesomeIcon icon={faAngleDown} />
                     }
   
                    </span>
                    {
                       v.submenu && v.submenu.length>=1 ?

                      <div className='subMenu' style={{transform:`${i==menuopen?"scaleY(1)":"scaleY(0)"}`,height:`${i==menuopen?"auto":"0"}`}}>
                          <ul className='m-0'>
                           {
                              v.submenu.map((sItem,index)=>{
                                  
                                  return(
                                    <li key={index} className='ms-[20px]  list-disc' style={{listStyle:"disc"}}>
                                        
                                        <Link href={sItem.url}>{sItem.menu}</Link>
                                        
                                    </li>
                                  )
                                })
                            }
                            
                          </ul>
                       </div>
                       :""
                    }

                  </li>

               )

            })
          }
        </ul>
    </div>
    </div>
  )
}
