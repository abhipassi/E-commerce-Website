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


  let cart = JSON.parse(localStorage.getItem("cart")) || []
  console.log(cart);

  let filteredData = productData.filter((item => cart.includes(item.id)))
  console.log(filteredData);


  let handleRemove =(id) =>{
    alert(id)
    localStorage.removeItem("cart");  
      }


  return (
    <>
      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
  {filteredData.map((item, index) => (
    <div
      key={index}
      className="flex w-11/12 max-w-3xl bg-white shadow-lg rounded-xl border border-gray-300 mt-4 p-4"
    >
      {/* Product Image */}
      <img
        src={item.productImage1}
        alt={item.productName}
        className="w-32 h-32 object-cover rounded-md"
      />

      {/* Product Details */}
      <div className="ml-4 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-xl font-semibold">{item.productName}</h2>
          <p className="text-gray-600 mt-1">{item.productDescription}</p>
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-green-600">
            ₹{item.productPrice}
          </p>
          <button onClick={() => handleRemove(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-200">
            Remove
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


    </>
  )
}

export default Cart