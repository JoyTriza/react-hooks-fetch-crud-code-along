import React from "react";

function Item({ item, onUpdateItem, onDeleteItem}) {

  function handleAddToCartClick() {
    fetch ("http://localhost:4000/items/${item.id}", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({isInCart: !item.isInCart,}),
    })
    .then((response) => response.json())
    .then(updateItem => onUpdateItem(updateItem))
  }

   function handleDelete(deletedItem){
     const updateItem = item.filter((item) => item.id !== deletedItem.id);
     setItems(updateItem)
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: 'DELETE',
    })
    .then(resp=> resp.json())
    .then(()=> onDeleteItem('deleted!'))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
      className={item.isInCart ? "remove" : "add"}
      onClick = {handleAddToCartClick}
      >
      {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
