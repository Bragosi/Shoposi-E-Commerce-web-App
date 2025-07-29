import React from 'react'
import { useParams } from 'react-router-dom'
import productCategory from '../Helpers/ProductCategory'
import { useState } from 'react'
import { useEffect } from 'react'
import RecommendedProduct from '../components/RecommendedProduct'

const ProductCategoryPage = () => {
    const params = useParams()
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const [selectCategory, setSelectCategory] = useState({})
    const [filterCategoryList, setfilterCategoryList] = useState([])

    const fetchData = async()=> {
        const response = await fetch()

        const dataResponse = await response.json()
        setdata(dataResponse?.data || [])
        console.log('dataRes', dataResponse)
    }
    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

useEffect(() => {
  const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName=>{
   if (selectCategory[categoryKeyName]) {
    return categoryKeyName
   }
   return null
  }).filter(el => el)
  setfilterCategoryList(arrayOfCategory)
}, [selectCategory])

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
                            {/** filterBy */}
                        <div className=" ">
                        <h3 className='text-base uppercase font-medium text-slate-300 border-b pb-1 '>Category</h3>

                        <form action="" className='text-sm flex flex-col gap-2 py-2'>
                         {
                          productCategory.map((categoryName,index)=>{
                            return(
                              <div className='flex items-center gap-3'>
                                 <input  type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]}  value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                 <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                              </div> 
                            )
                          })
                        }

                        </form>
                    </div>

                </div>
                {/** Right side  */}
                <div>
                    {
                        params?.categoryName && (
                            <RecommendedProduct category={params?.categoryName} heading={params?.categoryName}  />
                        )
                    }
                </div>
            </div>
    </div>
  )
}

export default ProductCategoryPage