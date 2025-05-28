  import React, { useEffect, useState } from "react";
  import axios from "axios"


  function Category() {
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [categorydata, setCategoryData] = useState([]);
    const [id, setId] = useState()

    let handleCategory = (e) => {
      setCategory(e.target.value);
    };

    let handleDescription = (e) => {
      setDescription(e.target.value);
    };



    let clearInputs =() =>{
      setCategory('')
      setDescription('')

    }
    let createCategory = async () => {
      let data = {
        category,
        description,
      };

      try {
        await axios.post("http://localhost:8000/savecategory", data )
        .then((response) =>{

          console.log("Response:", response.data);
        })

        clearInputs()
      } catch (error) {
        console.error("Error:", error);
      }
    };

    useEffect(() =>{
      axios.get('http://localhost:8000/showCategory')
            .then(response =>{
              setCategoryData(response.data)
    },[categorydata])})


    let handleEdit = (e) =>{
      let id = e.target.id
      const data = categorydata.filter((li) => li.id == id ) 
      console.log(data);
      setCategory(data[0].categoryName)
      setDescription(data[0].categoryDescription)
      setId(data[0].id)
      
    }

  const updateCategory = async () => {
    try {
      const data = {
        id: id,
        category: category,
        description: description
      };

      await axios.post('http://localhost:8000/updatecategory', data)
      .then((response) =>{

        console.log('Response:', response.data);
        setCategoryData([]);
      })
      

      clearInputs()

    } catch (err) {
      console.error('Error:', err);
    }
  };


  const handleDelete = async(e) =>{
        e.preventDefault()

      let id = e.target.id
      const data = {
        id:id
      }
      console.log(data);
      

      try{
        await axios.post('http://localhost:8000/deletecategory',data)
        .then((response) =>{

          console.log('response:',response.data);
        })
      }
      
      
      catch(err){
        console.log(err);  
      }
    }

    return (
      <>
        <div className="container">
          <div className="category">
            <h3>This is Category</h3>
            
            <div>
              <h4>Enter Category Name</h4>
              <input
                type="text"
                placeholder="Enter Category Name"
                name="category"
                value={category}
                onChange={handleCategory}
              />
            </div>

            <div>
              <h4>Description</h4>
              <input
                className="description"
                type="text"
                size="50"
                value={description}
                placeholder="Description"
                name="description"
                onChange={handleDescription}
              />
            </div>
            <br />
            <input type="button" value="Create" onClick={createCategory} />
            <input type="button" value="Update" onClick={updateCategory} />

            <table border='1' width='100%'>
        <th>#</th><th>Category </th> <th>Description</th> <th>Creation Date</th> <th>Updation Date</th><th>Edit</th><th>Delete</th>
        {categorydata &&
        categorydata.map((item) =>{
          return <tr><th>{item.id}</th><th>{item.categoryName}</th><th>{item.categoryDescription}</th><th>{item.creationDate}</th> <th>{item.updationDate}</th>  <th><input type="button" value= 'Edit' id={item.id} onClick={handleEdit}/> </th> <th><input type="button" value='Delete' id={item.id} onClick={handleDelete} /> </th></tr>
        })}
      </table>
          </div>
        </div>


      </>
    );
  }
  export default Category;
