import {
  DISCOUNT_EVENT_NONE,
  DISCOUNT_EVENT_ONE,
  DISCOUNT_EVENT_TWO
} from "./discountEventConstant.js";
import { getProductDiscountEvents } from "./getProductDiscountEvents.js";

it("Should get empty array if no product", () => {
  const expected = [];

  expect(getProductDiscountEvents([])).toStrictEqual(expected);
});

it("Should get DISCOUNT_EVENT_NONE if no match discount", () => {
  const example = ["200", "300"];
  const expected = [DISCOUNT_EVENT_NONE, DISCOUNT_EVENT_NONE];

  expect(getProductDiscountEvents(example)).toStrictEqual(expected);
});

it(`
Given:
  Only match discount event 1
    ["300", "300"]
When:
  Calculate discount
Then:
  The first one is not discounted, the second one has a discount event 1.
    [DISCOUNT_EVENT_NONE, DISCOUNT_EVENT_ONE]
`, () => {
  const example = ["300", "300"];
  const expected = [DISCOUNT_EVENT_NONE, DISCOUNT_EVENT_ONE];

  expect(getProductDiscountEvents(example)).toStrictEqual(expected);
});

it(`
Given:
  Only match discount event 1, and an additional identical item
    ["300", "300", "300"]
When:
  Calculate discount
Then:
  The second one has a discount event 1, ohter have a discount event 0
    [DISCOUNT_EVENT_NONE, DISCOUNT_EVENT_ONE, DISCOUNT_EVENT_NONE]
`, () => {
  const example = ["300", "300", "300"];
  const expected = [
    DISCOUNT_EVENT_NONE,
    DISCOUNT_EVENT_ONE,
    DISCOUNT_EVENT_NONE
  ];

  expect(getProductDiscountEvents(example)).toStrictEqual(expected);
});

it(`
Given:
  Only match discount event 2
    ["300", "300", "300"]
When:
  Calculate discount
Then:
  All discount event 2
    [DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_TWO]
`, () => {
  const example = ["100", "200", "300"];
  const expected = [DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_TWO];

  expect(getProductDiscountEvents(example)).toStrictEqual(expected);
});

it(`
Given:
  Match discount event of 2 and discount event of 1
    ["100", "200", "300", "300", "400"]
When:
  Calculate discount
Then:
  The third one has a discount event 0, the fourth one has a discount event 1, ohter have a discount event 0 
    [DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_NONE, DISCOUNT_EVENT_ONE, DISCOUNT_EVENT_TWO]
`, () => {
  const example = ["100", "200", "300", "300", "400"];
  const expected = [
    DISCOUNT_EVENT_TWO,
    DISCOUNT_EVENT_TWO,
    DISCOUNT_EVENT_NONE,
    DISCOUNT_EVENT_ONE,
    DISCOUNT_EVENT_TWO
  ];

  expect(getProductDiscountEvents(example)).toStrictEqual(expected);
});

it(`
Given:
  Match discount event 2 and discount event 1, and the events are not continuous
    ["100", "200", "300", "400", "300"]
When:
  Calculate discount
Then:
  The third one has a discount event 0, the fifth one has a discount event 1, ohter have a discount event 0 
    [DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_NONE, DISCOUNT_EVENT_TWO, DISCOUNT_EVENT_ONE]
`, () => {
  const example = ["100", "200", "300", "400", "300"];
  const expected = [
    DISCOUNT_EVENT_TWO,
    DISCOUNT_EVENT_TWO,
    DISCOUNT_EVENT_NONE,
    DISCOUNT_EVENT_TWO,
    DISCOUNT_EVENT_ONE
  ];

  expect(getProductDiscountEvents(example)).toStrictEqual(expected);
});
