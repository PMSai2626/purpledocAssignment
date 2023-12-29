import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Products = () => {

    const [pro, setproducts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                setproducts(res.data)
            } catch (error) {
                
            }
        }
        fetchAllBooks()


    }, [])

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
      };


    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8800/products/${id}`);
          setproducts((prevProducts) => prevProducts.filter(product => product.id !== id));
         
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div>
<center>
        <h1>Product CRUD List</h1>
        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}} >
            <thead >
                <tr style={{justifyContent: "center", border: "2px solid black"}}>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>product</th>
                    <th style={tableHeaderStyle}>delete/update</th>
                </tr>
            </thead>
            <tbody style={{alignItems: "center", justifyContent: "center",  border: "1px solid black"}}>
                {pro.map((product) => (
                    <tr key={product.id} style={tableRowStyle}>
                        <td style={tableCellStyle}>{product.title}</td>
                        <td style={tableCellStyle}>{product.desc}</td>
                        
                    <button onClick={() => handleDelete(product.id)} style={buttonStyle}>Delete</button>
                    <button  onClick={() => handleUpdate(product.id)}   style={buttonStyle}><Link to={`/update/${product.id}`} > Update </Link></button>
                    </tr>
                ))}
            </tbody>
        </table>
    

            <button style={linkButtonStyle}><Link to='/add'>Add new product</Link></button>
            </center>
     </div>
   
    
  )
}
const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };
  
  const tableRowStyle = {
    border: '1px solid black',
  };
  
  const tableCellStyle = {
    padding: '8px',
    border: '1px solid black',
  };
  
  const buttonStyle = {
    marginRight: '5px',
  };
  
  const linkButtonStyle = {
    display: 'block',
    margin: '10px 0',
    padding: '8px',
    textDecoration: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    textAlign: 'center',
    fontSize: '16px',
    cursor: 'pointer',
  };



export default Products
