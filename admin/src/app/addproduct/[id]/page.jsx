"use client"
import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios';
import { apiBaseUrl } from '@/app/API/BaseUrl';
import Header from '@/app/common/Header';
import Sidebar from '@/app/common/Sidebar';
import { LoginContext } from '@/app/MainContext/MainContext';
import { useParams } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';



export default function page() {
  let {token,setToken}=useContext(LoginContext)
  let { id } =useParams()
  let [imgsrc1, setImgSrc1] = useState('');
  let [imgsrc2, setImgSrc2] = useState('');
  let [dispcategory, setDispCategory] = useState([]);
  const router = useRouter();

  let [allInputs,setAllinputs]=useState({
    catId:'',
    pName:'',
    pPrice:'',
    pDesc:'',
   
    status:1,
    imgsrc1:'',
    imgsrc2:''
  })
  let chnageValue=
    (event)=>{
        let obj={...allInputs}
        obj[event.target.name]=event.target.value;
        console.log(obj)
        setAllinputs(obj)
    }

  let imageShow = (event, setImageSrc) => {
    let imgFile = event.target;
    let reader = new FileReader();
    reader.readAsDataURL(imgFile.files[0]);
    reader.onload = function(e) {
      setImageSrc(e.target.result);
    };
  };
  useEffect(()=>{
    if(id!==undefined){
        axios.get(apiBaseUrl+`product/edit/${id}`)
        .then((res)=>res.data)
        .then((finalRes)=>{
            console.log(finalRes)
            let status=finalRes.productStatus ? 1 : 0
            console.log(status)
            setAllinputs({
                catId:finalRes.categoryId,
                pName:finalRes.productName,
                pPrice:finalRes.productPrice,
                pDesc:finalRes.productDesc,
                
                status:status,
                imgsrc1:apiBaseUrl+"uploads/products/"+finalRes.productImg1,
                imgsrc2:apiBaseUrl+"uploads/products/"+finalRes.productImg2,
                
               
            })

            setImgSrc1(apiBaseUrl+"uploads/products/"+finalRes.productImg1);
            setImgSrc2(apiBaseUrl+"uploads/products/"+finalRes.productImg2);
        })
    }
    else{
        setAllinputs({
            catId:'',
            pName:'',
            pPrice:'',
            pDesc:'',
           
            status:1,
            imgsrc1:'',
            imgsrc2:''
           
        })
        setImgSrc1('');
        setImgSrc2('');
    }
 },[id])

 
  let getCategoryDetails = () => {
    axios.get(`${apiBaseUrl}category/view`)
        .then((res) => res.data)
        .then((finalRes) => {
            setDispCategory(finalRes)
           
        })

  }
  let productUpdate=(event)=>{
    event.preventDefault();
    let formValues=new FormData(event.target);
    console.log(event.target)
    axios.post(apiBaseUrl+`product/insert/${id}`,formValues)
    .then((res)=>res.data)
    .then((finalRes)=>{
        console.log(finalRes)
        router.push('/viewproduct');
    }) 
  }
  useEffect(() => {
      getCategoryDetails()
  }, [])
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
            <form className='w-[100%] mx-auto px-3 py-2' onSubmit={productUpdate}>
            <h1 className='font-bold text-gray-900 dark:text-white block mt-3 text-[25px] mb-5 '>Add Product</h1>
            <label className='text-sm font-medium text-gray-900 dark:text-white block mt-3 text-[14px] mb-1 '>Category Name</label>
            <select  className='p-2 w-[100%] border-[1px] border-[#ccc] border-[solid] mb-2  text-gray-900 dark:text-white' name='catId' value={allInputs.catId} disabled>
                <option >--Select Category--</option>
                  {
                      dispcategory.length>=1?
                      dispcategory.map((v,i)=>{
                        
                              return(
                                  <option value={v._id}>{v.catName}</option>
                              )
                        })
                      :""
                  }
            </select>
            
            <label className='text-sm font-medium text-gray-900 dark:text-white" block mt-3 text-[14px] mb-1 '>Product Name</label>
            <input type="text" name="pName" className='p-2 w-[100%] border-[1px] border-[#ccc] border-[solid] mb-2  text-gray-900 dark:text-white'  value={allInputs.pName}  onChange={chnageValue} />

            <label className='text-sm font-medium text-gray-900 dark:text-white" block mt-3 text-[14px] mb-1 '>Product Price</label>
            <input type="text" name="pPrice" className='p-2 w-[100%] border-[1px] border-[#ccc] border-[solid] mb-2  text-gray-900 dark:text-white'  value={allInputs.pPrice}  onChange={chnageValue} />

            <label className='text-sm font-medium text-gray-900 dark:text-white" block mt-3 text-[14px] mb-1 '>Product Description</label>
            <input type="text" name="pDesc" className='p-2 w-[100%] border-[1px] border-[#ccc] border-[solid] mb-2  text-gray-900 dark:text-white' value={allInputs.pDesc}  onChange={chnageValue} />

            <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload files</label>
            <div className="flex justify-between">
            <div className="w-[70%]">
              <input
                className="w-[70%] mb-2 block p-1 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                name="img1"
                
                onChange={event => imageShow(event, setImgSrc1)}
              />
            </div>
            <div>
              {imgsrc1 !== '' ? (
                <img src={imgsrc1} width={100} alt="not found" />
              ) : (
                <img
                  src="/generic-image-file-icon-hi.de739e3e4966ab6c5df4.png"
                  width={100}
                  alt="not found"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[70%]">
              <input
                className="w-[70%] mb-2 block p-1 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                name="img2"
               
                onChange={event => imageShow(event, setImgSrc2)}
              />
            </div>
            <div>
              {imgsrc2 !== '' ? (
                <img src={imgsrc2} width={100} alt="not found" />
              ) : (
                <img
                  src="/generic-image-file-icon-hi.de739e3e4966ab6c5df4.png"
                  width={100}
                  alt="not found"
                />
              )}
            </div>
          </div>

            <label className='text-sm font-medium text-gray-900 dark:text-white" block mt-4 text-[14px] mb-1 '>Product Status</label>
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
           <button type="submit" className='text-md bg-red-600 w-[100px] font-medium  dark:text-white py-3 mt-5 mb-5'>Save</button>
            </form>
        </div>
    </>
  )

}
