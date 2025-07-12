import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProductsPage = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false)
  return (
    <div>
      <div className='py-2 px-4 flex justify-between'>
        <h1 className='font-bold text-lg'>All Product</h1>
        <button 
        onClick={()=>setopenUploadProduct(true)}
        className='border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all px-3 py-2 rounded-full'>Upload Product</button>
      </div>
      {/** upload product componet */}
      {
        openUploadProduct &&(
            <UploadProduct onClose={()=>setopenUploadProduct(false)}/>
        )
      }
    
    </div>
  )
}

export default AllProductsPage