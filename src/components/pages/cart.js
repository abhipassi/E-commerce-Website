import React from 'react'

function Cart() {
      const [productData, setProductData] = useState([])

      
        useEffect(() => {
          axios.get('http://localhost:8000/getproducts')
            .then((response) => {
              setProductData(response.data)
            })
        }, [])
  return (
    <div>Cart</div>

  )
}

export default Cart