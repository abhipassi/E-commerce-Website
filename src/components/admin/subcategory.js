import axios from "axios";
import { useEffect, useState } from "react";

function Sub() {
  const [categorydata, setCategoryData] = useState([]);
  const [subcategory, setSubCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [subcategorydata, setSuBCategoryData] = useState([])
  const [id , setId] = useState()

  // let hanldeCategryData = async() =>{
  //     try{
  //         let response = axios.get("http://localhost:8000/showCategory")
  //     }
  //     catch(err){
  //         console.log(err);
  //     }
  // }

  let handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/showCategory").then(
      (response) => {
        setCategoryData(response.data);
      },
      [categorydata]
    );
  });
  // console.log(categorydata);

  let handleSubCategory = (e) => {
    setSubCategory(e.target.value);
  };

  

  let handleSubmit = async () => {
    let data = {
      selectedCategory,
      subcategory,
    };
    console.log(selectedCategory);
    

    try {
      await axios.post(
        "http://localhost:8000/subcategory",
        data
      )
      .then((response) =>{

        console.log("Response", response.data);
        setSubCategory("");
      })
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() =>{
    axios.get('http://localhost:8000/showSubCategory')
    .then((response) => {
      setSuBCategoryData(response.data)
    },[subcategorydata])
  })
  // console.log(subcategorydata);
  
  let handleEdit = (e) =>{
    let id = e.target.id
    
    const data = subcategorydata.filter((i) => i.id == id)
    console.log(data);

    setSelectedCategory(data[0].categoryid)
    setSubCategory(data[0].subcategory)
    setId(data[0].id)
  }

   let handleUpdate = async() =>{
    let data = {
      id:id,
      category: selectedCategory,
      subcategory: subcategory
    }
    try{
      await axios.post('http://localhost:8000/updatesubcategory', data)
      .then((response) =>{

        console.log("response:",response.data);
      })
    }
    catch(err){
      console.log(err);
      
    }
  }



  let handleDelete = async (e) =>{
    e.preventDefault()

    let id = e.target.id
    // console.log(id);
    
    let data = {
      id: id
    }
    console.log(data);

    try{

       await axios.post('http://localhost:8000/deletesubcategory',data)
       .then((response) =>{

         console.log('response:',response.data);
       })
      
    }
    catch(err) {
      console.log(err); 
    }

  }

  return (
    <>
      <div>

        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categorydata.map((elements, index) => (
            <option key={index} value={elements.id}>
              {elements.categoryName}
            </option>
          ))}
        </select> 
        {/* {selectedCategory && <p>selectedCategory: {selectedCategory}</p>} */}
        <br />

        <h4>Subcategory Name</h4>
        <input type="text" value={subcategory} onChange={handleSubCategory} />
        <br />
        <input type="button" value="Create" onClick={handleSubmit} />
        <input type="button" value="Update" onClick={handleUpdate} />
      </div>

      <table border = "1" width="100%">
        <th>#</th> <th>Category Name</th> <th>SubCategory</th> <th>Creation Date</th> <th>Last Updated</th> <th>edit</th> <th>Delete</th>

        {subcategorydata &&
        subcategorydata.map((item) =>{
          const cat = categorydata.find(id => id.id === item.categoryid)
          return <tr> <th>{item.id}</th> <th>{cat ? cat.categoryName :"Unknown"}</th> <th>{item.subcategory}</th> <th>{item.creationDate}</th> <th>{item.updationDate}</th> <th><input type="button" value ="Edit" id = {item.id} onClick={handleEdit} /></th> <th><input type="button" value ="Delete" id = {item.id} onClick={handleDelete} /></th></tr>
        })}
      </table>
    </>
  );
}
export default Sub;
