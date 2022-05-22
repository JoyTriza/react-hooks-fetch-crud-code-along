import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect (() => {
    fetch ("http://localhost:4000/items")
    .then((response) => response.json())
    .then((items) => setItems(items));
  }, []);

  function handleUpdateItem(updateItem) {
    const updateItem = items.map((item) => {
      if (item.id === updateItem.id) {
        return updateItem;
      } else {
        return item;
      }
    });
    setItems(updateItem)
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem = {handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdatedItem={handleUpdateItem} onDeleteItem={handleDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
