"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Header from '@/app/common/Header';
import Sidebar from '@/app/common/Sidebar';
import { apiBaseUrl } from '@/app/API/BaseUrl';
import { redirect, useParams } from 'next/navigation';
import { LoginContext } from '@/app/MainContext/MainContext';


export default function page() {
  
  let {token,setToken}=useContext(LoginContext)
  let { id } =useParams()
 
  let [imgsrc,setImageSrc]=useState('')

  let [allInputs,setAllinputs]=useState({
    cname:'',
    cdesc:'',
    status:1,
    imgsrc:''
})
let chnageValue=
    (event)=>{
        let obj={...allInputs}
        obj[event.target.name]=event.target.value;
        console.log(obj)
        setAllinputs(obj)
    }
  
  let categoryUpdate=(event)=>{
    event.preventDefault();
    let formValues=new FormData(event.target);
    
    axios.post(apiBaseUrl+`category/insert/${id}`,formValues)
    .then((res)=>res.data)
    .then((finalRes)=>{
        console.log(finalRes)
        
    })
   
  }
  let imageShow=(event)=>{
    let imgFile=event.target;

    let reader = new FileReader();
    reader.readAsDataURL(imgFile.files[0]);
    reader.onload = function(e) {
      
        setImageSrc(e.target.result);
    };
  }
  useEffect(()=>{
    if(id!==undefined){
        axios.get(apiBaseUrl+`category/edit/${id}`)
        .then((res)=>res.data)
        .then((finalRes)=>{
            
            let status=finalRes.catStatus ? 1 : 0
            console.log(status)
            setAllinputs({
                cname:finalRes.catName,
                cdesc:finalRes.catDesc,
                status:status,
                imgsrc:apiBaseUrl+"uploads/category/"+finalRes.catImage,
               
            })

            setImageSrc(apiBaseUrl+"uploads/category/"+finalRes.catImage);
        })
    }
    else{
        setAllinputs({
          cname:'',
          cdesc:'',
          status:1,
          imgsrc:''
           
        })
        setImageSrc('');
    }
},[id])
useEffect(()=>{
  if(token=='' ){
    redirect('/');
  }
})

  return (
    <>
      <Header />
      <div className="grid grid-cols-[20%_80%]">
        <Sidebar />
        <form className='w-[100%] mx-auto px-3 py-2' onSubmit={categoryUpdate}>
            <h1 className='font-bold text-gray-900 dark:text-white block mt-3 text-[25px] mb-5 '>Add Category</h1>
            <label className='text-sm font-medium text-gray-900 dark:text-white block mt-3 text-[14px] mb-1 '>Category Name</label>
            <input type="text" name="cname" value={allInputs.cname}  onChange={chnageValue}  className='p-2 w-[100%] border-[1px] border-[#ccc] border-[solid] mb-2  text-gray-900 dark:text-white' />
            
            <label className='text-sm font-medium text-gray-900 dark:text-white" block mt-3 text-[14px] mb-1 '>Category Description</label>
            <input type="text" name="cdesc" value={allInputs.cdesc} onChange={chnageValue} className='p-2 w-[100%] border-[1px] border-[#ccc] border-[solid] mb-2  text-gray-900 dark:text-white' />

            <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
            <div className="flex justify-between ">
                <div  className="w-[70%]">

                  <input className="w-[70%] mb-2 block  p-1 text-sm text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"  name="categoryImage" onChange={imageShow}  />

                </div>
                <div>
                  {
                    imgsrc!==''
                    ?
                    <img src={imgsrc}  width={100} alt="not found" />
                    :
                    <img src='/generic-image-file-icon-hi.de739e3e4966ab6c5df4.png' width={100} alt="not found" />
                  }
                  
                </div>
            </div>

            <label className='text-sm font-medium text-gray-900 dark:text-white" block mt-4 text-[14px] mb-1 '>Category Status</label>
            <div class="flex items-center mb-4 ">
                <input  type="radio"  name="status"  class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" 
                
                  value={1}
                                
                  onChange={()=>{
                    let obj={...allInputs}
                    obj['status']=1;
                    setAllinputs(obj)

                }} 
                checked={allInputs.status=='1' ? 'checked': '' }
                
                
                />
                <label for="country-option-1" class="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        Active 
                </label>
                <input  type="radio"  name="status"  class=" ms-8 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" 
                
                value={0} 
                            
                checked={allInputs.status=='0' ? 'checked': '' }
                                
                                
                onChange={()=>{
                    let obj={...allInputs}
                    obj['status']=0;
                    setAllinputs(obj)

                }} 
                            
              
                />
                <label for="country-option-1" class="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        Deactive 
                </label>
           </div>
           <button type="submit" className='text-md bg-red-600 w-[100px] font-medium  dark:text-white py-3 mt-5 mb-5'>Update</button>
        </form>
      </div>  
    </>
  )
}
