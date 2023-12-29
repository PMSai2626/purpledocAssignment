import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Add = () => {
    const [product, setProduct] = useState({
        title: "",
        desc: "",
    });

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/products", product);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <center>
            <div className={formStyle}>
                <h1 style={headingStyle}>Add New Product</h1>
                <input
                    type="text"
                    placeholder="name"
                    name="title"
                    style={inputStyle}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="item"
                    name="desc"
                    style={inputStyle}
                    onChange={handleChange}
                />
                <button style={buttonStyle} onClick={handleClick}>Add</button>
                {error && <span  style={errorStyle}>"Something went wrong!"</span>}
                <Link style={linkStyle}to="/">See all products</Link>
            </div>
            </center>
    );
};

const formStyle = {
    textAlign: 'center',
    margin: '20px',
  };
  
  const headingStyle = {
    fontSize: '24px',
    marginBottom: '10px',
  };
  
  const inputStyle = {
    padding: '8px',
    margin: '5px',
    width: '200px',
  };
  
  const buttonStyle = {
    padding: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '5px',
  };
  
  const errorStyle = {
    color: 'red',
  };
  
  const linkStyle = {
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



export default Add;
