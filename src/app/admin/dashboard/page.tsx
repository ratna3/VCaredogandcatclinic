"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
}

interface StoreItem {
  id: number;
  title: string;
  image_url: string;
  price_inr: string;
  description: string;
  category_id: number;
  category: string;
}

export default function AdminDashboard() {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch items
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [itemsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/items'),
        fetch('/api/admin/categories'),
      ]);
      if (itemsRes.ok && categoriesRes.ok) {
        setItems(await itemsRes.json());
        setCategories(await categoriesRes.json());
      } else {
        setError('Failed to load data');
      }
      setLoading(false);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Real-time update every 5s
    return () => clearInterval(interval);
  }, []);

  // Remove item
  const handleRemove = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const res = await fetch(`/api/admin/items?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items => items.filter(item => item.id !== id));
    } else {
      setError('Failed to delete item');
    }
  };


  // Add/Edit form state
  const [form, setForm] = useState({
    id: undefined as number | undefined,
    title: '',
    price_inr: '',
    description: '',
    image_url: '',
    imageFile: undefined as File | undefined,
    category_id: '',
  });
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [formLoading, setFormLoading] = useState(false);

  // Category form state
  const [categoryForm, setCategoryForm] = useState({ id: undefined as number | undefined, name: '' });
  const [categoryMode, setCategoryMode] = useState<'add' | 'edit'>('add');
  const [categoryLoading, setCategoryLoading] = useState(false);

  // Handle form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, imageFile: e.target.files![0] }));
    }
  };

  // Handle add/edit submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    let imageUrl = form.image_url;
    // Upload image if new file selected
    if (form.imageFile) {
      const data = new FormData();
      data.append('file', form.imageFile);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: data });
      if (res.ok) {
        const { url } = await res.json();
        imageUrl = url;
      } else {
        setError('Image upload failed');
        setFormLoading(false);
        return;
      }
    }
    // Add or edit item
    const method = formMode === 'add' ? 'POST' : 'PUT';
    const res = await fetch('/api/admin/items', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: form.id,
        title: form.title,
        price_inr: form.price_inr,
        description: form.description,
        image_url: imageUrl,
        category_id: Number(form.category_id),
      })
    });
    if (res.ok) {
      setForm({ id: undefined, title: '', price_inr: '', description: '', image_url: '', imageFile: undefined, category_id: '' });
      setFormMode('add');
      setError('');
      // Refresh items
      const itemsRes = await fetch('/api/admin/items');
      if (itemsRes.ok) setItems(await itemsRes.json());
    } else {
      setError('Failed to save item');
    }
    setFormLoading(false);
  };

  // Category CRUD
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryLoading(true);
    const method = categoryMode === 'add' ? 'POST' : 'PUT';
    const res = await fetch('/api/admin/categories', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: categoryForm.id,
        name: categoryForm.name,
      })
    });
    if (res.ok) {
      setCategoryForm({ id: undefined, name: '' });
      setCategoryMode('add');
      setError('');
      // Refresh categories
      const categoriesRes = await fetch('/api/admin/categories');
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
    } else {
      setError('Failed to save category');
    }
    setCategoryLoading(false);
  };

  // Edit item
  const handleEdit = (item: StoreItem) => {
    setForm({
      id: item.id,
      title: item.title,
      price_inr: item.price_inr,
      description: item.description,
      image_url: item.image_url,
      imageFile: undefined,
      category_id: String(item.category_id),
    });
    setFormMode('edit');
  };

  // Edit category
  const handleEditCategory = (category: Category) => {
    setCategoryForm({ id: category.id, name: category.name });
    setCategoryMode('edit');
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setForm({ id: undefined, title: '', price_inr: '', description: '', image_url: '', imageFile: undefined, category_id: '' });
    setFormMode('add');
  };

  // Cancel category edit
  const handleCancelCategoryEdit = () => {
    setCategoryForm({ id: undefined, name: '' });
    setCategoryMode('add');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Category CRUD */}
      <form onSubmit={handleCategorySubmit} className="bg-white p-4 rounded shadow mb-8 max-w-xl">
        <h2 className="text-xl font-semibold mb-2">{categoryMode === 'add' ? 'Add New Category' : 'Edit Category'}</h2>
        <input
          name="name"
          value={categoryForm.name}
          onChange={handleCategoryFormChange}
          placeholder="Category Name"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={categoryLoading}>
            {categoryMode === 'add' ? 'Add Category' : 'Save Category'}
          </button>
          {categoryMode === 'edit' && (
            <button type="button" onClick={handleCancelCategoryEdit} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          )}
        </div>
      </form>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <table className="w-full border mb-4">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditCategory(category)}
                  >Edit</button>
                  {/* Category delete button can be added here if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Form */}
      <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow mb-8 max-w-xl">
        <h2 className="text-xl font-semibold mb-2">{formMode === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleFormChange}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="price_inr"
          value={form.price_inr}
          onChange={handleFormChange}
          placeholder="Price (INR)"
          type="number"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleFormChange}
          placeholder="Long Description"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleFormChange}
          className="w-full mb-2 p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {form.image_url && !form.imageFile && (
          <img src={form.image_url} alt="Current" className="w-32 h-32 object-cover mb-2 rounded" />
        )}
        <div className="flex gap-2">
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" disabled={formLoading}>
            {formMode === 'add' ? 'Add Product' : 'Save Changes'}
          </button>
          {formMode === 'edit' && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          )}
        </div>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <div className="text-green-700 font-bold">₹{item.price_inr}</div>
              <p className="text-gray-700 text-sm mb-2">{item.description}</p>
              <div className="text-gray-600 text-xs mb-2">Category: {item.category || '-'}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                <button onClick={() => handleRemove(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
