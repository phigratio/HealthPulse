import { id } from "ethers/lib/utils";

export const color = [
  "white",
  "yellow",
  "red",
  "blue",
  "green",
  "black",
  "purple",
  "pink",
  "orange",
  "gray",
];

export const filters = [
  {
    id: color,
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "yellow", label: "Yellow" },
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "black", label: "Black" },
    ],
  },
  {
    id: "power",
    name: "Power",
    options: [
      { value: "10mg", label: "10mg" },
      { value: "20mg", label: "20mg" },
      { value: "500IU", label: "500IU" },
      { value: "1000IU", label: "1000IU" },
      { value: "100ml", label: "100ml" },
      { value: "200ml", label: "200ml" },
    ],
  },
  {
    id: "quantity",
    name: "Quantity",
    options: [
      { value: 100, label: "100" },
      { value: 50, label: "50" },
      { value: 200, label: "200" },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: 9.99, label: "$9.99" },
      { value: 12.99, label: "$12.99" },
      { value: 7.99, label: "$7.99" },
    ],
  },
  {
    id: "discountPercentage",
    name: "Discount",
    options: [
      { value: "50%", label: "50%" },
      { value: "48%", label: "48%" },
      { value: "40%", label: "40%" },
    ],
  },
];


export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: 9.99, label: "$9.99" },
      { value: 12.99, label: "$12.99" },
      { value: 7.99, label: "$7.99" },
    ],
  },
  {
    id: "discountPercentage",
    name: "Discount",
    options: [
      { value: "50%", label: "50%" },
      { value: "48%", label: "48%" },
      { value: "40%", label: "40%" },
    ],
  },
  {
    id: "avability",

    name: "Avability",

    options: [
      { value: "In Stock", label: "In Stock" },
      { value: "Out of Stock", label: "Out of Stock" },
    ],
  },
];


