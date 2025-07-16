import { useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common'
import { useEffect } from 'react'
import AdminProductCard from '../components/AdminProductCard'

const AllProductsPage = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false)
  const [allProduct, setallProduct] = useState([])
  
  const fetchAllProducts = async()=>{
    const response = await fetch(summaryApi.allProduct.url)
    const dataResponse = await response.json()

    setallProduct(dataResponse?.data || [])
  }

useEffect(()=>{
  fetchAllProducts()
}, [])


  return (
    <div>
      <div className='py-2 px-4 flex justify-between'>
        <h1 className='font-bold text-lg'>All Product</h1>
        <button 
        onClick={()=>setopenUploadProduct(true)}
        className='border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all px-3 py-2 rounded-full'>Upload Product</button>
      </div>
      {/** All product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
        {  
          allProduct.map((product, index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProducts}/>
            )
          })
        }
      </div>





      {/** upload product componet */}
      {
        openUploadProduct &&(
            <UploadProduct fetchData={fetchAllProducts} onClose={()=>setopenUploadProduct(false)}/>
        )
      }
    
    </div>
  )
}

export default AllProductsPage