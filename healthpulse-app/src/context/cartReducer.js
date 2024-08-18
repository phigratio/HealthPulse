

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { medicine } = action.payload.medicine;
      console.log("Hey I can fetch medicine info", medicine);
      console.log("This is medicine Id", medicine.medicineId);

      // Check if the item already exists in the cart
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === "MED:" + medicine.medicineId
      );

      if (existingItemIndex >= 0) {
        // If the item exists, increase its quantity
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        return { ...state, cart: updatedCart };
      } else {
        // If the item does not exist, add it to the cart
        let cartMedicine = {
          id: "MED:" + medicine.medicineId,
          name: medicine.name,
          price: medicine.price,
          image: medicine.image,
          quantity: 1,
        };

        return { ...state, cart: [...state.cart, cartMedicine] };
      }

    case "INCREASE_QUANTITY":
      const updatedCartIncrease = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { ...state, cart: updatedCartIncrease };

    case "DECREASE_QUANTITY":
      const updatedCartDecrease = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return { ...state, cart: updatedCartDecrease };

    case "REMOVE_ITEM":
      const updatedCartRemove = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, cart: updatedCartRemove };

    case "CALCULATE_TOTALS":
      const totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalAmount = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, totalItems, totalAmount };

    default:
      return state;
  }

  
};

export default cartReducer;
