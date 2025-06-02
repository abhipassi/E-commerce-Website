import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Cart() {
  const [productData, setProductData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/getproducts')
      .then((response) => {
        setProductData(response.data)
      })
  }, [])
  console.log(productData);


  let cart = JSON.parse(localStorage.getItem("cart"))
  console.log(cart);

  let filteredData = productData.filter((item => cart.includes(item.id)))
  console.log(filteredData);


  return (
    <>
    <div className='flex justify-center'>
      <div className='h-52 w-11/12 mt-3 border-2 border-black rounded-lg' >

    </div>
    </div>
    
    </>
  )
}

export default Cart