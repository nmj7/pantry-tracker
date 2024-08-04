import React, { useState } from 'react';

const AddItemForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name, category, quantity: parseFloat(quantity), unit };
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    if (response.ok) {
      onAdd(newItem);
      setName('');
      setCategory('');
      setQuantity('');
      setUnit('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
      <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit" required />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
