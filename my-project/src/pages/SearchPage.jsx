import { useLocation } from 'react-router-dom'
import summaryApi from '../common'
import { useEffect } from 'react'

const SearchPage = () => {
    const query = useLocation()
    console.log('query', query.search)

    const fetchProduct = async()=>{
        const response = await fetch(summaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()

        console.log('dataResponse', dataResponse)
    }

    useEffect(()=>{
        fetchProduct()
    },[])
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage