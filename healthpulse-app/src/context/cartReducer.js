import React from "react";

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { medicine } = action.payload;
    // console.log("Hey I can fetch medicine info", medicine);
    // console.log("This is medicine Id", medicine.medicineId);

    let cartMedicine = {
      id: "MED:" + medicine.medicineId,
      name: medicine.name,
      price: medicine.price,
      imege: medicine.imageName,
      max: medicine.quantity,
    };

    return { ...state, cart: [...state.cart, cartMedicine] };
  }
  return state;
};

export default cartReducer;

// addedDate
// :
// "2024-07-09 13:23:38.199"
// brand
// :
// "Generic"
// description
// :
// "The combination of Amlodipine and Benazepril is used to treat high blood pressure. Benazepril and benazeprilat inhibit angiotensin-converting enzyme (ACE) in human subjects and in animals. While the mechanism through which Benazepril lowers blood pressure is believed to be primarily suppression of the renin-angiotensin aldosterone system, Benazepril has an antihypertensive effect even in patients with low-renin hypertension. Amlodipine is a dihydropyridine calcium antagonist (calcium ion antagonist or slow channel blocker) that inhibits the transmembrane influx of calcium ions into vascular smooth muscle and cardiac muscle. Amlodipine inhibits calcium ion influx across cell membranes selectively, with a greater effect on vascular smooth muscle cells than on cardiac muscle cells. Amlodipine is a peripheral arterial vasodilator that acts directly on vascular smooth muscle to cause a reduction in peripheral vascular resistance and reduction in blood pressure."
// imageName
// :
// "default.png"
// medicineCategory
// :
// categoryDescription
// :
// "Paracetamol is a medicine used for mild to moderate pain. It can be bought over the counter in pharmacies, supermarkets and other shops. You can also take paracetamol for: fever (high temperature) stronger pain — used with other pain relievers such as codeine."
// medicine_categoryId
// :
// 2
// medicine_categoryTitle
// :
// "Paracetamol "
// [[Prototype]]
// :
// Object
// medicineId
// :
// 3
// name
// :
// "Amlozep"
// power
// :
// 500
// price
// :
// 10
// quantity
// :
// 100
