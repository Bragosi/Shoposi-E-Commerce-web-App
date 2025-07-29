import React from 'react'
import { useParams } from 'react-router-dom'
import productCategory from '../Helpers/ProductCategory'
import { useState } from 'react'
import { useEffect } from 'react'

const ProductCategoryPage = () => {
    const params = useParams()
    console.log(params?.categoryName)
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)

    const fetchData = async()=> {
        const response = await fetch()

        const dataResponse = await response.json()
        console.log('dataRes', dataResponse)
    }
      
  return (
    <div className='container mx-auto p-4'>
        {/** desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/** Left side  */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll '>
                    {/** sort By */}
                    <div className=" ">
                        <h3 className='text-base uppercase font-medium text-slate-300 border-b pb-1 '>Sort By</h3>

                        <form action="" className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3 '>
                                <input type="radio" name='sort' />
                                <label htmlFor="">Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3 '>
                                <input type="radio" name='sort' />
                                 <label htmlFor="">High - Low Low</label>
                            </div>
                        </form>
                    </div>

                        <div className=" ">
                        <h3 className='text-base uppercase font-medium text-slate-300 border-b pb-1 '>Category</h3>

                        <form action="" className='text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((categoryName, index)=>{
                                    return(
                                        <div className='flex items-center gap-3'>
                                            <input type="checkbox" id={categoryName.value} name={'category'} />
                                            <label htmlFor={categoryName.value}> {categoryName?.label} </label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>

                </div>
                {/** Right side  */}
                <div>
                    right
                </div>
            </div>
    </div>
  )
}

export default ProductCategoryPage