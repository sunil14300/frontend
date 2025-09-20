import React from 'react'
import { useState } from 'react';
// import './ProductForm.css'; // Assuming you have a CSS file for styling

const ProductForm = () => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    description: '',
    price: '',
    category: '',
    discount: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8081/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Product created:', data)
      } else {
        console.error('Error creating product')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
  <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
  <input type="text" name="title" placeholder="Title" onChange={handleChange} />
  <input type="text" name="description" placeholder="Description" onChange={handleChange} />
  <input type="number" name="price" placeholder="Price" onChange={handleChange} />
  <input type="text" name="category" placeholder="Category" onChange={handleChange} />
  <input type="number" name="discount" placeholder="Discount" onChange={handleChange} />
  <button type="submit">Create Product</button>
</form>

    </div>
  )
}

export default ProductForm;
