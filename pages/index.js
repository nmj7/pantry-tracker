import React, { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import AddItemForm from '../components/AddItemForm';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data);
  };

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleDeleteItem = async (id) => {
    const response = await fetch(`/api/items?id=${id}`, { method: 'DELETE' });
    if (response.ok) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  const handleUpdateItem = async (id) => {
    const updatedItemDetails = prompt('Enter new item details (name, category, quantity, unit) separated by commas');
    if (updatedItemDetails) {
      const [name, category, quantity, unit] = updatedItemDetails.split(',');
      const updatedItem = { id, name, category, quantity: parseFloat(quantity), unit };
      const response = await fetch(`/api/items?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
      if (response.ok) {
        setItems(prevItems => prevItems.map(item => (item.id === id ? updatedItem : item)));
      }
    }
  };

  return (
    <div>
      <h1>Pantry Tracker</h1>
      <ItemList items={items} onDelete={handleDeleteItem} onUpdate={handleUpdateItem} />
      <AddItemForm onAdd={handleAddItem} />
    </div>
  );
};

export default Home;
