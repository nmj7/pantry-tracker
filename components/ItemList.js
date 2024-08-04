import React from 'react';

const ItemList = ({ items, onDelete, onUpdate }) => (
  <div>
    <h2>Pantry Items</h2>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} - {item.quantity} {item.unit} ({item.category})
          <button onClick={() => onDelete(item.id)}>Delete</button>
          <button onClick={() => onUpdate(item.id)}>Update</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ItemList;

