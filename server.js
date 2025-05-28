const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mysql = require('mysql2')
const cors = require('cors')
const multer = require('multer');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'project_shop'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors())
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// multer Storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const multipleUpload = upload.fields([
  { name: 'imageFile1', maxCount: 1 },
  { name: 'imageFile2', maxCount: 1 },
  { name: 'imageFile3', maxCount: 1 }
]);
// app.post('/uploads', upload.single('imageFile') , (req,res) => {
//   console.log('file received', req.body);

//   if(!req.file){
//     return res.status(400).json({message: "Please select an image to upload"})
//   }

//   const imageFileName = req.file.filename

//   let sql =  "insert into products(productImage1) values(?, ?)"
//   let values = [imageFileName]

//   let query = conn.query(sql, values,(err, mydata) => {
//     if(err) throw err;
//     res.json(mydata);
//   });


// })


//route for homepage
// app.get('/', (req, res) => {
//   let sql = "SELECT * FROM product";
//   let query = conn.query(sql, (err, mydata) => {
//     if (err) throw err;
//     res.json(mydata);
//   });

// });


app.get('/showCategory', (req, res) => {
  let sql = "SELECT * FROM category";
  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err;
    res.json(mydata);
  });


});

app.get('/showsubCategory', (req, res) => {
  let sql = "SELECT * FROM subcategory";
  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err;
    res.json(mydata);
  });

});

app.post('/saveproduct', multipleUpload, (req, res) => {

  const {
    selectedCategory,
    selectedSubCategory,
    name,
    price,
    company,
    discount,
    description,
    shipping,
    availability,
  } = req.body;

  // const imageFile = req.file ? req.file.filename : '';
  // const imageFile2 = req.file ? req.file.filename : '';
  // const imageFile3 = req.file ? req.file.filename : '';

  const imageFile1 = req.files['imageFile1'] ? req.files['imageFile1'][0].filename : '';
  const imageFile2 = req.files['imageFile2'] ? req.files['imageFile2'][0].filename : '';
  const imageFile3 = req.files['imageFile3'] ? req.files['imageFile3'][0].filename : '';

  // let sql = "insert into products(name,price,qty) values('"+req.body.name+"',"+req.body.price+","+req.body.qty+")";
  // let sql = "INSERT INTO products (category, subCategory,productName,productPrice,productCompany,productPriceBeforeDiscount,productDescription,productImage1,shippingCharge,productAvailability ) VALUES (?,?,?,?,?,?,?,?,?)";
  let sql = "INSERT INTO products (category, subCategory, productName, productPrice, productCompany, productPriceBeforeDiscount, productDescription, shippingCharge, productAvailability, productImage1,productImage2,productImage3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  // let values = [req.body.selectedCategory,req.body.selectedsubCategory,req.body.name, req.body.price, req.body.company,req.body.discount,req.body.description,req.body.image,req.body.shipping,req.body.availability]
  const values = [
    selectedCategory,
    selectedSubCategory,
    name,
    price,
    company,
    discount,
    description,
    shipping,
    availability,
    imageFile1,
    imageFile2,
    imageFile3
  ];

  console.log(sql);
  let query = conn.query(sql, values, (err, mydata) => {
    if (err) throw err;
    res.json("{'success':'product inserted'}")
  });

})

// delete product

// app.post('/deleteproduct', (req, res) => {
//   let sql = "delete from product where id =" + req.body.id
//   let query = conn.query(sql, (err, mydata) => {
//     if (err) throw err
//     res.json("Product Deleted")
//   })
// })


// app.post('/updateproduct', (req, res) => {
//   let sql = "UPDATE product SET name='" + req.body.name + "', price=" + req.body.price + ", qty=" + req.body.qty + " WHERE id=" + req.body.id;

//   let query = conn.query(sql, (err, mydata) => {
//     if (err) throw err
//     res.json("Product Updated")
//   })
// })


app.post('/savecategory', (req, res) => {
  console.log(req.body);

  let sql = "insert into category(categoryName,categoryDescription) values('" + req.body.category + "','" + req.body.description + "')"
  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err

    res.json({ success: 'category inserted' });

  })
})

app.post('/updatecategory', (req, res) => {
  let sql = "UPDATE category SET categoryName='" + req.body.category + "', categoryDescription= '" + req.body.description + "' WHERE id=" + req.body.id;

  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err
    res.json("Product Updated")
  })
})

app.post('/deletecategory', (req, res) => {
  let sql = "delete from category where id =" + req.body.id
  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err
    res.json("category Deleted")
  })
})


app.post('/subcategory', (req, res) => {
  let sql = "insert into subcategory(categoryid ,subcategory) values(" + req.body.selectedCategory + " ,'" + req.body.subcategory + "')"

  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err
    res.json("SubCategory Added")
  })
})


app.get('/showSubCategory', (req, res) => {
  let sql = "SELECT * FROM subcategory";
  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err;
    res.json(mydata);
  });

});

app.post('/deletesubcategory', (req, res) => {
  let sql = "delete from subcategory where id = " + req.body.id
  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err
    res.json("Subcategory deleted")
  })
})

app.post('/updatesubcategory', (req, res) => {
  let sql = "UPDATE subcategory SET categoryid=" + req.body.category + ", subcategory= '" + req.body.subcategory + "' WHERE id=" + req.body.id;

  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err
    res.json("Product Updated")
  })

})



// app.get('/getproducts', (req,res) =>{
//   let sql = "Select * FROM products"
//   let query = conn.query(sql, (err,mydata) =>{
//     if(err) throw err
//     res.json(mydata)
//   })
// })

app.get('/getproducts', (req, res) => {
  let sql = "SELECT * FROM products";
  let query = conn.query(sql, (err, mydata) => {
    if (err) throw err;

    
    const modifiedData = mydata.map(product => ({
      ...product,
      productImage1: product.productImage1 ? `http://localhost:8000/uploads/${product.productImage1}` : '',
      productImage2: product.productImage2 ? `http://localhost:8000/uploads/${product.productImage2}` : '',
      productImage3: product.productImage3 ? `http://localhost:8000/uploads/${product.productImage3}` : '',
    }));

    res.json(modifiedData);
  });
});

app.post('/deleteproduct', (req,res) =>{
  let sql = "delete from products where id = " + req.body.id
  let query = conn.query(sql, (err, mydata)=>{
    if(err) throw err
    res.json("Product Deleted")
  })
})

 
app.post('/updateproducts', multipleUpload, (req, res) => {
  const {
    selectedCategory,
    selectedSubCategory,
    productName,
    productPrice,
    productCompany,
    productPriceBeforeDiscount,
    productDescription,
    shippingCharge,
    productAvailability,
    id
  } = req.body;

  const imageFile1 = req.files['imageFile1'] ? req.files['imageFile1'][0].filename : '';
  const imageFile2 = req.files['imageFile2'] ? req.files['imageFile2'][0].filename : '';
  const imageFile3 = req.files['imageFile3'] ? req.files['imageFile3'][0].filename : '';

  const sql = `
    UPDATE products 
    SET category = ?, subCategory = ?, productName = ?, productPrice = ?, 
        productCompany = ?, productPriceBeforeDiscount = ?, productDescription = ?, 
        shippingCharge = ?, productAvailability = ?, 
        productImage1 = ?, productImage2 = ?, productImage3 = ? 
    WHERE id = ?`;

  const values = [
    selectedCategory,
    selectedSubCategory,
    productName,
    productPrice,
    productCompany,
    productPriceBeforeDiscount,
    productDescription,
    shippingCharge,
    productAvailability,
    imageFile1,
    imageFile2,
    imageFile3,
    id
  ];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Failed to update product." });
    }
    res.json({ success: "Product updated successfully" });
  });
});





//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});