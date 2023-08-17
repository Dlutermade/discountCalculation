import {
  DISCOUNT_EVENT_NONE,
  DISCOUNT_EVENT_ONE,
  DISCOUNT_EVENT_TWO
} from "./discountEventConstant";

export const getPrice = (price, discountEventId) => {
  if (discountEventId === DISCOUNT_EVENT_NONE) {
    return price;
  } else if (discountEventId === DISCOUNT_EVENT_ONE) {
    return price * 0.5;
  } else if (discountEventId === DISCOUNT_EVENT_TWO) {
    return price >= 5 ? price - 5 : 0;
  }

  throw Object.assign(Error("not found discount event id"), {
    name: "GET_PRICE_ERROR"
  });
};
