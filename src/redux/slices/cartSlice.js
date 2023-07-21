import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // AGREGAR PRODUCTO
    addItem: (state, action) => {
      const newItem = action.payload
      const existingItem = state.cartItems.find(item => item.id === newItem.id)
      state.totalQuantity++

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          img: newItem.img,
          price: newItem.price,
          pricesale: newItem.pricesale,
          quantity: 1,
          totalPrice: newItem.price
        })
      }
      else {
        existingItem.quantity++
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
      }
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)
    },

    // BORRAR PRODUCTO
    deleteItem: (state, action) => {
      const id = action.payload
      const existingItem = state.cartItems.find(item => item.id === id)

      if (existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id)
        state.totalQuantity = existingItem.quantity >= state.totalQuantity ? 0 : state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)
    },


    // INCREMENTAR CANTIDAD
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) +
          Number(existingItem.price);
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }
    },

    // DECREMENTAR CANTIDAD
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) -
          Number(existingItem.price);
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
})

export const { addItem, deleteItem, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer