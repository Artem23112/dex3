export const processCartData = (cartData) => {
  //TODO: Нужно добавить поле discount(oldPrice - price)
  // убрать поле oldPrice
  return cartData.map((obj) => {
    if (!(obj.hasOwnProperty("oldPrice") && obj.hasOwnProperty('price'))) return obj;

    obj.discount = obj.oldPrice - obj.price;
    delete obj.oldPrice;

    return obj;
  });
};

export const makeCartItemCopy = (cartData) => {
  //TODO: сделать копию элемента "Пицца с анчоусами"
  // После увеличить кол-во добавленного ингредиента
  const copyPizza = JSON.parse(JSON.stringify(cartData[0]));
  copyPizza.addedIngredients[0].count = 3;
  return copyPizza;
};

export const calcSum = (cartData) => {
  //TODO: посчитать суммы по типам товаров и их цены
  const res = {
    total: { count: 0, sum: 0 },
    water: { count: 0, sum: 0 },
    pizza: { count: 0, sum: 0 },
    other: { count: 0, sum: 0 },
  };

  cartData.forEach(obj => {
    res[obj.type].count += obj.count;
    res[obj.type].sum += obj.price * obj.count;
    res['total'].count += obj.count;
    res['total'].sum += obj.price * obj.count;
  });
  
  return res;
};

export const getCartItemsByDate = (cartData, date) => {
  //TODO: выбрать покупки сделанные за выбранную дату
  const selectedData = new Date(date);
  const DATE = new Date(selectedData.getFullYear(), selectedData.getMonth(), selectedData.getDate());
  return cartData.filter(obj => {
    return new Date(obj.date).getTime() === DATE.getTime();
  })

};

export const repeatOrder = (cartData, date) => {
  //TODO: нужно повторить заказ за выбранную дату
  // дублиовать соответствующие элементы
  // поставить в начало спиcка
  // дату текущую
  // поменять id на уникальный
  return cartData;
};

export const addItem = (cartData, item) => {
  //TODO: увеличить кол-во товара в полученном элементе
  return cartData;
};

export const checkPromo = (cartData) => {
  //TODO: нужно проверить корзина подходит под правила промоакции
  // проверить что суммарно в корзине больше 1000р
  // что есть пункт больше чем на 500р
  // что нет скидочных товаров
  return {
    total: false,
    oneBigPosition: false,
    notDiscounted: false
  };
};
