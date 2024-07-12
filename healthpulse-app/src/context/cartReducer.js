const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { medicine } = action.payload.medicine; // Fix the extraction of medicine object
    console.log("Medicine details: ", medicine);
    console.log("Medicine ID: ", medicine.medicineId);
    console.log("Medicine Name: ", medicine.name);

    let existingItemIndex = state.cart.findIndex(
      (item) => item.id === "MED:" + medicine.medicineId
    );

    if (existingItemIndex >= 0) {
      let updatedCart = state.cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cart: updatedCart };
    } else {
      let cartMedicine = {
        id: "MED:" + medicine.medicineId,
        name: medicine.name,
        price: medicine.price ?? 0, // Use default value if price is undefined
        image: medicine.imageName,
        quantity: 1,
        max: medicine.quantity,
      };
      return { ...state, cart: [...state.cart, cartMedicine] };
    }
  }

  if (action.type === "INCREASE_QUANTITY") {
    let updatedCart = state.cart.map((item) =>
      item.id === action.payload && item.quantity < item.max
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    return { ...state, cart: updatedCart };
  }

  if (action.type === "DECREASE_QUANTITY") {
    let updatedCart = state.cart.map((item) =>
      item.id === action.payload && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    return { ...state, cart: updatedCart };
  }

  return state;
};

export default cartReducer;
