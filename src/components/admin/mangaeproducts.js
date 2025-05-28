import axios from "axios"
import { useEffect, useState } from "react"

function Getproduct() {
  
    const [productList, setProductList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [categorydata, setCategoryData] = useState([]) //datagetting from db category dropdown
    const [selectedCategory, setSelectedCategory] = useState()
    const [subcategory, setSuBCategoryData] = useState([]) //datagetting from db for sub dropdown
    const [selectedsubCategory, setSelectedSubCategory] = useState()
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);


    const[currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5


    const [selectedProduct, setSelectedProduct] = useState(null);



    useEffect(() => {
    axios.get("http://localhost:8000/showCategory").then(
      (response) => {
        setCategoryData(response.data);
      },
      [categorydata]
    );
  });




  useEffect(() => {
      axios.get("http://localhost:8000/showsubCategory").then(
        (response) => {
          setSuBCategoryData(response.data);
        },
        [subcategory]
      );
    });



    // useEffect(() =>{
    //   axios.get('http://localhost:8000/getproducts')
    //         .then(response =>{
    //           setProductList(response.data)
    // },[])})
    useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getproducts");
      setProductList(res.data);

      
      const maxPage = Math.ceil(res.data.length / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage > 0 ? maxPage : 1);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

    let handleEdit = (e) =>{
      setShowModal(true)

      let id = e.target.id

      const product = productList.find((i) => i.id == id)
      setSelectedProduct(product)
      console.log(product);
      
    }


       const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value)
  }


    let handleName = (e) =>{
       setSelectedProduct({ ...selectedProduct, productName: e.target.value })
    }

    let handleCompany = (e) =>{
      setSelectedProduct({...selectedProduct, productCompany : e.target.value})
    }

    let handleDiscount = (e) =>{
      setSelectedProduct({...selectedProduct, productPriceBeforeDiscount : e.target.value})
    }

    let handlePrice = (e) =>{
      setSelectedProduct({...selectedProduct, productPrice : e.target.value})
    }

    let handleDescription = (e) =>{
      setSelectedProduct({...selectedProduct, productDescription : e.target.value})
    }

    let handleShipping = (e) =>{
      setSelectedProduct({...selectedProduct, shippingCharge : e.target.value})
    }

    let handleAvailability = (e) =>{
      setSelectedProduct({...selectedProduct, productAvailability : e.target.value})
    }

    let handleImage = (e) =>{
      setImage1(e.target.files[0])
    }

     let handleImageTwo = (e) =>{
      setImage2(e.target.files[0])
    }

     let handleImageThree = (e) =>{
      setImage3(e.target.files[0])
    }

  
    let handleDelete = async (e) =>{
      let id = e.target.id
      const data = {
        id: id
      }
      console.log(data);

      try{

         await axios.post("http://localhost:8000/deleteproduct",data)
        .then((response) =>{
          console.log(response.data);
          
        })
      }

      catch(err){

        console.log(err);
      }
    }
   

let updateProduct = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("id", selectedProduct.id); 
  formData.append("selectedCategory", selectedCategory);
  formData.append("selectedSubCategory", selectedsubCategory);
  formData.append("productName", selectedProduct.productName);
  formData.append("productCompany", selectedProduct.productCompany);
  formData.append("productPriceBeforeDiscount", selectedProduct.productPriceBeforeDiscount);
  formData.append("productPrice", selectedProduct.productPrice);
  formData.append("productDescription", selectedProduct.productDescription);
  formData.append("shippingCharge", selectedProduct.shippingCharge);
  formData.append("productAvailability", selectedProduct.productAvailability);

  if (image1) formData.append("imageFile1", image1);
  if (image2) formData.append("imageFile2", image2);
  if (image3) formData.append("imageFile3", image3);

  try {
    const response = await axios.post("http://localhost:8000/updateproducts", formData);
    console.log("Product updated:", response.data);
    setShowModal(false); 
  } catch (err) {
    console.error("Error updating product:", err);
  }
};

const handleNext = () => {
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

let handlePrev = () =>{
if(currentPage > 1){
setCurrentPage(prev => prev-1);
}
};

const startIndex = (currentPage - 1 ) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const paginatedProducts = productList.slice(startIndex , endIndex)





    return(
        <>
        {showModal && selectedProduct &&
        <form onSubmit={updateProduct}>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categorydata.map((elements, index) => (
                  <option key={index} value={elements.id}>
                    {elements.categoryName}
                  </option>
                ))}
              </select>

              <br />
              <br />

              <h4>Select Subcategory</h4>
              <select value={selectedsubCategory} onChange={handleSubCategoryChange}>
                <option value="">Select SubCategory</option>
                {subcategory.map((elements, index) => (
                  <option key={index} value={elements.id}>
                    {elements.subcategory}
                  </option>
                ))}
              </select>
              <br />


              <h4>Enter the Product Name</h4>
              <input type="text" value = {selectedProduct.productName} name="name" onChange={handleName} />
              <br />
              <br />

              <h4>Enter the Product Company</h4>
              <input type="text" value = {selectedProduct.productCompany} onChange={handleCompany} />
              <br />

              <h4>Product price before discount</h4>
              <input type="text" value = {selectedProduct.productPriceBeforeDiscount}  onChange={handleDiscount} />
              <br />

              <h4>Product price after discount (sellling price)</h4>
              <input type="text" value = {selectedProduct.productPrice} onChange={handlePrice} />
              <br />

              <h4>Product Description</h4>
              <input type="text" value = {selectedProduct.productDescription} onChange={handleDescription} />
              <br />

              <h4>Product Shipping Charges</h4>
              <input type="text" value = {selectedProduct.shippingCharge} onChange={handleShipping} />
              <br />

              <h4>Product Availability</h4>
              <select onChange={handleAvailability}>
                <option value="">-- Select Availability --</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <br />

              <h4>Product image1</h4>
              <input type="file" accept="image/*" onChange={handleImage} />
              <h4>Product image2</h4>
              <input type="file" accept="image/*" onChange={handleImageTwo} />
              <h4>Product image3</h4>
              <input type="file" accept="image/*" onChange={handleImageThree} />

              <br />
              <br />


              {/* <input type="button" value ='Submit' onClick={handleSubmit} /> */}
              <input type="submit" value='Submit' />
            </form>
        }
      
           <table border='1' width='100%'>
        <th>#</th><th>Product Name</th> <th>Product Comapany</th> <th>Category</th> <th>SubCategory</th>  <th>Product Price</th> <th>Product Price before discout</th><th>Product Availability</th><th>Shipping Charges </th> <th>Product Images </th> <th>Actions</th>
        {paginatedProducts &&
        paginatedProducts.map((item, index) =>{

          //  if(item.id >= start && item.id <= end){
          //   // console.log(item);
            
            const cat = categorydata.find(id => id.id === item.category)
            const subCat = subcategory.find(id => id.id === item.subCategory)
            return <tr><th>{startIndex+index+1}</th><th>{item.productName}</th><th>{item.productCompany}</th><th>{cat ? cat.categoryName :"Unknown"}</th> <th>{subCat ? subCat.subcategory : "Unknown"}</th>  <th>{item.productPrice}</th>  <th>{item.productPriceBeforeDiscount}</th>  <th>{item.productAvailability}</th><th>{item.shippingCharge}</th> <th> <img src= {item.productImage1} width={50} height ={50} alt="img1"/>  <img src= {item.productImage2} width={50} height ={50} alt="img2"/>  <img src= {item.productImage3} width={50} height ={50} alt="img3"/> </th>  <th><input type="button" value= 'Edit' id={item.id} onClick={handleEdit}/> <input type="button" value='Delete' id={item.id} onClick={handleDelete} /> </th></tr>
          // }
        })}
      </table>
      <input type="button" onClick={handlePrev} value="Prev"/> &nbsp;
      <input type="button" onClick={handleNext} value="Next"/>
</>
    )
}
export default Getproduct