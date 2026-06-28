import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const { logout } = useAuth();
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Load all products
  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, price, description, category, stock, image })
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('✅ Product added!');
      setName(''); setPrice(''); setDescription('');
      setCategory(''); setStock(''); setImage('');
      fetchProducts();
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers
    });

    fetchProducts();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Panel</h2>
        <button onClick={logout}
          style={{ padding: '0.5rem 1rem', background: 'red', color: '#fff', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Add Product Form */}
      <h3 style={{ marginTop: '2rem' }}>Add New Product</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={name}
          onChange={e => setName(e.target.value)} required
          style={{ display: 'block', width: '100%', marginBottom: '0.75rem', padding: '0.5rem' }} />
        <input placeholder="Price" value={price} type="number"
          onChange={e => setPrice(e.target.value)} required
          style={{ display: 'block', width: '100%', marginBottom: '0.75rem', padding: '0.5rem' }} />
        <input placeholder="Description" value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.75rem', padding: '0.5rem' }} />
        <input placeholder="Category" value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.75rem', padding: '0.5rem' }} />
        <input placeholder="Stock" value={stock} type="number"
          onChange={e => setStock(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.75rem', padding: '0.5rem' }} />
        <input placeholder="Image URL" value={image}
          onChange={e => setImage(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '0.75rem', padding: '0.5rem' }} />
        <button type="submit"
          style={{ padding: '0.75rem 2rem', background: '#333', color: '#fff', cursor: 'pointer' }}>
          Add Product
        </button>
      </form>

      {/* Products Table */}
      <h3 style={{ marginTop: '2rem' }}>All Products</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleDelete(p._id)}
                  style={{ color: 'red', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;