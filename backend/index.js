import express from 'express';
import mysql from 'mysql'
import cors from 'cors'
const app = express()



const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "Sai2626*",
    database: "purpledocs"
})


//if there is a auth problem
//Alter USER 'root' @ 'localhost' identified with mysql_native_password by password
app.use(cors())
app.use(express.json())


app.get("/", (req,res) => {
    res.json("hi this is backend")
})


app.get("/products", (req, res) => {
    const q = "SELECT * FROM products"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post("/products", (req,res) => {
    const  q = "INSERT INTO products (`title`, `desc`) VALUES (?)"
    const values  = 
    [req.body.title,
    req.body.desc,
    ]


    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("products has been successfully")
    })
})


app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    const q = " DELETE FROM products WHERE id = ? ";
  
    db.query(q, [productId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


  app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const q = "UPDATE products SET `title`= ?, `desc`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
      
      ];
  
    db.query(q, [...values, productId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800, () => {
    console.log("Connected to backend")
})

