import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Home() {

  const [productData, setProductData] = useState([])


  useEffect(() => {
    axios.get('http://localhost:8000/getproducts')
      .then((response) => {
        setProductData(response.data)
      })
  }, [])

  let handleCart = (productId) =>{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.includes(productId)) { 
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product ID added to cart!");
  } else {
    alert("Product is already in the cart!");
  }
  }
  return (
    <>
    <div className='flex flex-wrap justify-center gap-10 '>
      {productData.map((item) => (
          <div className="relative flex flex-col items-center my-6 hover:scale-105 transition-all ease-in-out bg-white shadow-sm border border-slate-200 rounded-lg w-80">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img src={item.productImage1} alt='img'/>
            </div>
            <div className="p-4">
              <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                {item.productName}
              </h6>
              <p className="text-slate-600 leading-normal font-light">
                {item.productDescription}
              </p>

              <p className="text-slate-600 leading-normal font-light">
                Product Price before discount : {item.productPriceBeforeDiscount} ₹
                <br />
                Product Price: {item.productPrice} ₹
              </p>
            </div>
            <div className="px-4 pb-4 pt-0 mt-2">
              <input  type='button' onClick={() => handleCart(item.id)} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" value="Add to Cart"  />
            </div>
          </div>
      ))}
      </div>

    </>

  )
}

export default Home