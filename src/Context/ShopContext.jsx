import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);
// logic for cart
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length+1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

 // function to add items in cart 
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId]+1 }));
    console.log(cartItems);
  };
  // function to remove items from cart 
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId]-1 }));
  };
  // function to have total amount of the products added in the cart
const getTotalCartAmount=()=>{
  let totalAmount=0;
  for(const item in cartItems){
    if(cartItems[item]>0){
      let itemInfo=all_product.find((product)=> product.id===Number(item) )
      totalAmount+=itemInfo.new_price*cartItems[item]
     
    }
    
  }
  return totalAmount;
}

const getTotalCartItems=()=>{
  let totalItem=0;
  for(const item in cartItems){
    if(cartItems[item]>0){
      totalItem+=cartItems[item]

    }
  }
  return totalItem;
}

  const contextValue = {getTotalCartItems,getTotalCartAmount, all_product, cartItems, addToCart , removeFromCart  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
