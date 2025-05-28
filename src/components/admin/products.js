import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  // const [mid,setMyid] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [company, setCompany] = useState()
  const [discount, setDiscount] = useState()
  const [description, setDescription] = useState()
  const [shipping, setShipping] = useState()
  const [availability, setAvailability] = useState()
  const [mylist, setmyList] = useState([])
  const [categorydata, setCategoryData] = useState([]) //datagetting from db category dropdown
  const [selectedCategory, setSelectedCategory] = useState()
  const [subcategory, setSuBCategoryData] = useState([]) //datagetting from db for sub dropdown
  const [selectedsubCategory, setSelectedSubCategory] = useState()
  const [image1, setImage] = useState()
  const [image2, setImageTwo] = useState()
  const [image3, setImageThree] = useState()

  let clearInputFields = () =>{
    setName('')
    setPrice('')
    setDiscount('')
    setDescription('')
    setShipping('')
    setAvailability('')
    setSelectedCategory('')
    setSelectedSubCategory('')
    setImage('')
    setImageTwo('')
    setImageThree('')
  }
  // image 

  let handleImage = (e) => {
    const file = e.target.files[0]
    console.log(file);
    if (file) {

      setImage(file)
    }
  }

  let handleImageTwo = (e) => {
    const file = e.target.files[0]
    console.log(file);
    if (file) {

      setImageTwo(file)
    }
  }

  let handleImageThree = (e) => {
    const file = e.target.files[0]
    console.log(file);
    if (file) {

      setImageThree(file)
    }
  }

  // let handleImageSubmit = async(e) =>{
  //   e.preventDefault()
  //   const formData = new FormData()
  //   formData.append("imageFile", image)
  //   try{
  //     // const response = await axios.post()
  //     const response = await fetch('http://localhost:8000/uploads',{
  //       method: "POST",
  //       body : formData
  //     })
  //     const result = await response.json()

  //   }
  //   catch(err){
  //     console.log(err);

  //   }

  // }


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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)

  }

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleCompany = (e) => {
    setCompany(e.target.value)
  }

  const handleDiscount = (e) => {
    setDiscount(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleShipping = (e) => {
    setShipping(e.target.value)
  }

  const handleAvailability = (e) => {
    setAvailability(e.target.value)
  }

  // const handleSubmit = async(e) =>{
  //   e.preventDefault()

  //   const frontendData = {
  //     selectedCategory,
  //     selectedsubCategory,
  //     name,
  //     price,
  //     company,
  //     discount,
  //     description,
  //     shipping,
  //     availability,
  //   }
  //   console.log(frontendData);



  //   try{
  //    const response =  await axios.post('http://localhost:8000/saveproduct',frontendData)
  //   //  .then(res =>setmyList([res.frontendData]))
  //    console.log('response:',response.data);
  //   //  clearForm()
  //   }


  //   catch(err){
  //     console.log(err);  
  //   }
  // }

  let handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('selectedCategory', selectedCategory);
    formData.append('selectedSubCategory', selectedsubCategory);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('company', company);
    formData.append('discount', discount);
    formData.append('description', description);
    formData.append('shipping', shipping);
    formData.append('availability', availability);
    if (image1) formData.append('imageFile1', image1);
    if (image2) formData.append('imageFile2', image2);
    if (image3) formData.append('imageFile3', image3);

    console.log(formData);

    try {
      axios.post('http://localhost:8000/saveproduct', formData).then((response) => {

        console.log('Response:', response.data);
      })

      clearInputFields()
    } catch (err) {
      console.log('Error uploading:', err);
      if (err.response) {
        console.error('Server responded with:', err.response.data);
      } else if (err.request) {
        console.error('No response received. Request:', err.request);
      } else {
        console.error('Error setting up request:', err.message);
      }
    }

  }


  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => {
        setmyList(response.data)
      })
      .catch(err => {
        console.log(err);

      })
  }, [mylist])
  // console.log(mylist);





  return (
    <>

      <div className="container">
        <div className="category">
          <h3>Product</h3>
          <div>
            <form onSubmit={handleSubmit}>
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
              <input type="text" name="name" onChange={handleName} />
              <br />
              <br />

              <h4>Enter the Product Company</h4>
              <input type="text" onChange={handleCompany} />
              <br />

              <h4>Product price before discount</h4>
              <input type="text" onChange={handleDiscount} />
              <br />

              <h4>Product price after discount (sellling price)</h4>
              <input type="text" onChange={handlePrice} />
              <br />

              <h4>Product Description</h4>
              <input type="text" onChange={handleDescription} />
              <br />


              <h4>Product Shipping Charges</h4>
              <input type="text" onChange={handleShipping} />
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
          </div>
        </div>
      </div>

    </>

  );
}

export default Products;
