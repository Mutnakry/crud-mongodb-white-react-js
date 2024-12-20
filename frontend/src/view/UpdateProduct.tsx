
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export interface Product {
  _id: string;
  names: string;
  price: number;
  sale_price: number;
  Image: string;
  detail: string;
  category_id: {
    _id: string;
    names: string;
    detail: string;
  };
}

export interface Category {
  _id: string;
  names: string;
  detail: string;
}

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const Navigetor = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product');
        setLoading(false);
        console.error(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category');
        setCategories(response.data);
      } catch (err) {
        setError('Error fetching categories');
        console.error(err);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (product) {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (product) {
      setProduct({
        ...product,
        category_id: {
          _id: e.target.value,
          names: e.target.options[e.target.selectedIndex].text,
          detail: '', // You can fill this with category details if needed
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (product) {
      try {
        await axios.put(`http://localhost:5000/api/products/${id}`, product);
        Navigetor('/');
      } catch (err) {
        setError('Error updating product');
      }
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="names"
            value={product.names}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sale Price</label>
          <input
            type="number"
            name="sale_price"
            value={product.sale_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="Image"
            value={product.Image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Details</label>
          <textarea
            name="detail"
            value={product.detail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            name="category_id"
            value={product.category_id._id}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.names}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
