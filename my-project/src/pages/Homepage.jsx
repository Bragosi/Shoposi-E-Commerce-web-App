import CategoryList from '../components/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import ProductBanner from '../components/ProductBanner'

const Homepage = () => {
  return (
    <div>
      <CategoryList/>
      <ProductBanner/>
<HorizontalCardProduct category={"airpods"} heading={"Top Airpods"} />

    </div>
  )
}

export default Homepage