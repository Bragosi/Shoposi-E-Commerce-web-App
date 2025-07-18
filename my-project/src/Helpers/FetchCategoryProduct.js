import summaryApi from "../common"

const fetchCategoryProduct = async(category)=>{
  const response = await fetch(summaryApi.GetCategoryProducts.url,{
    method : summaryApi.GetCategoryProducts.method,
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify({
      category : category
    })
  })
  
const dataResponse = await response.json()
  return dataResponse
}

export default fetchCategoryProduct