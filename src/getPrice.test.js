import {
  DISCOUNT_EVENT_NONE,
  DISCOUNT_EVENT_ONE,
  DISCOUNT_EVENT_TWO
} from "./discountEventConstant";
import { getPrice } from "./getPrice";

it("Should get 100 if DISCOUNT_EVENT_NONE", () => {
  const example = 100;
  const discountId = DISCOUNT_EVENT_NONE;

  const expected = 100;

  expect(getPrice(example, discountId)).toBe(expected);
});

it("Should get 50 if DISCOUNT_EVENT_ONE", () => {
  const example = 100;
  const discountId = DISCOUNT_EVENT_ONE;

  const expected = 50;

  expect(getPrice(example, discountId)).toBe(expected);
});

it("Should get 95 if DISCOUNT_EVENT_TWO", () => {
  const example = 100;
  const discountId = DISCOUNT_EVENT_TWO;

  const expected = 95;

  expect(getPrice(example, discountId)).toBe(expected);
});

it("Should throw error if not found discount event", () => {
  const example = 100;
  const discountId = 4;

  const expected = /^not found discount event id$/;

  expect(() => getPrice(example, discountId)).toThrow(expected);
});
