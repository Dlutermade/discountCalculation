import {
  DISCOUNT_EVENT_NONE,
  DISCOUNT_EVENT_ONE,
  DISCOUNT_EVENT_TWO
} from "./discountEventConstant";

const initProductRecord = (productCountRecords, productId, index) => {
  productCountRecords.set(productId, { count: 1, lastIndex: index });
};

const setProductRecord = (
  productCountRecords,
  productId,
  productCount,
  index
) => {
  productCountRecords.set(productId, { count: productCount, lastIndex: index });
};

const clearProductRecord = (productCountRecords, productId) => {
  productCountRecords.set(productId, { count: 0, lastIndex: null });
};

/**
 *
 * @param { string[] } productIds
 * @returns { number[] } discountEvent
 */
export const getProductDiscountEvents = (productIds = []) => {
  let allProductNotDiscountCount = productIds.length;
  const productCountRecords = new Map();

  const result = productIds
    .reduce((prev, productId, index) => {
      let productRecord = productCountRecords.get(productId);
      if (productRecord) {
        productRecord.count += 1;
        setProductRecord(
          productCountRecords,
          productId,
          productRecord.count,
          index
        );
      } else {
        initProductRecord(productCountRecords, productId, index);
      }

      // discount event 1
      if (productRecord && productRecord.count === 2) {
        clearProductRecord(productCountRecords, productId);
        allProductNotDiscountCount -= 2;

        // [...before last data, last data, ... after last data, new data]
        return [
          ...prev.slice(0, productRecord.lastIndex),
          { event: DISCOUNT_EVENT_NONE, actived: true },
          ...prev.slice(productRecord.lastIndex + 1),
          { event: DISCOUNT_EVENT_ONE, actived: true }
        ];
      }

      return [...prev, { event: 0, actived: false }];
    }, [])
    // discount event 2
    .map((discountEvent) =>
      discountEvent.actived === false && allProductNotDiscountCount >= 3
        ? {
            event: DISCOUNT_EVENT_TWO,
            actived: true
          }
        : discountEvent
    );

  return result.map((discountEvent) => discountEvent.event);
};
