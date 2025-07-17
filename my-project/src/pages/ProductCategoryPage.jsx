import { useParams } from 'react-router-dom'

const ProductCategoryPage = () => {
    const params = useParams()

  return (
    <div>
       { params.categoryName}
    </div>
  )
}

export default ProductCategoryPage