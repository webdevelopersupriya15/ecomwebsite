"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiBaseUrl } from '../API/BaseUrl'
import Link from 'next/link'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

export default function page() {
    let [dispcategory, setDispCategory] = useState([])
    let getCategoryDetails = () => {
        axios.get(`${apiBaseUrl}category/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                setDispCategory(finalRes)
            })

    }
    useEffect(() => {
        getCategoryDetails()
    }, [])
    return (
        <>
           <Header />
           <div className="grid grid-cols-[20%_80%]">
            <Sidebar />
            <div className='w-[100%] mx-auto px-3 py-2'>
                <h1 className='font-bold text-gray-900 dark:text-white block mt-3 text-[25px] mb-5 '>View Category</h1>



                <div class="relative shadow-md sm:rounded-lg">
                    <table class="w-[100%]  text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class=" py-3">
                                    Sl
                                </th>
                                <th scope="col" class=" py-3">
                                    Cat. Name
                                </th>
                                <th scope="col" class=" py-3">
                                    Cat. Desc.
                                </th>
                                <th scope="col" class=" py-3">
                                    Cat. Image
                                </th>
                                <th scope="col" class=" py-3">
                                    Cat. Status
                                </th>
                                <th scope="col" class=" py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody class="text-xs text-gray-700 uppercase  dark:text-gray-400">
                            {
                                dispcategory.length >= 1 ?
                                    dispcategory.map((v, i) => {
                                        return (
                                            <tr className='text-center'>
                                                <td>{i + 1}</td>
                                                <td>{v.catName}</td>
                                                <td>{v.catDesc}</td>
                                                <td><img src={apiBaseUrl + "uploads/category/" + v.catImage} width={50} /></td>
                                                <td>{v.catStatus == true ? 'Active' : 'Deactive'}</td>
                                                <td>
                                                    {/* <Link href={{
                                                        pathname: '/addcategory',
                                                        query: v._id // the data
                                                    }}>
                                                        <button type="" className='bg-yellow-400 p-2 rounded-md mr-2'>Edit</button>
                                                    </Link> */}
                                                   <Link href={`/addcategory/${v._id}`}>
                                                        <button type="" className='bg-yellow-400 p-2 rounded-md mr-2'>Edit</button>
                                                   </Link>
                                                    
                                                    <button type="" className='bg-red-400 p-2 rounded-md text-white'>Delete</button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                    : ""
                            }

                        </tbody>
                    </table>
                </div>


            </div>
          </div>
        </>
    )
}
