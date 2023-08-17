import database from "./database.json";
import { getProductDiscountEvents } from "./getProductDiscountEvents.js";
import { getPrice } from "./getPrice.js";

export const checkout = (productIDs = [], products = database.products) => {
  const productDiscountEvents = getProductDiscountEvents(productIDs);

  const price = productIDs.reduce(
    (prev, currId, index) =>
      prev + getPrice(products[currId].price, productDiscountEvents[index]),
    0
  );

  return price;
};
