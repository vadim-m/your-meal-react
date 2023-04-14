export const calcTotalCount = (orderGoods) => {
  return orderGoods.reduce((acc, item) => acc + item.count, 0);
};

export const calcTotalPrice = (orderGoods) => {
  return orderGoods.reduce((acc, item) => acc + item.count * item.price, 0);
};
