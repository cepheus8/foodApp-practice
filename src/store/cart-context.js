import React from "react";

const CartContex = React.createContext({
  items: [],
  totalAmounts: 0,
  addItem: () => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContex;
