export const processCartData = (cartData) => {
  //TODO: Нужно добавить поле discount(oldPrice - price)
  // убрать поле oldPrice
  return cartData.map((obj) => {
    if (!(obj.hasOwnProperty("oldPrice") && obj.hasOwnProperty("price")))
      return obj;

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
    other: { count: 0, sum: 0 }
  };

  cartData.forEach((obj) => {
    res[obj.type].count += obj.count;
    res[obj.type].sum += obj.price * obj.count;
    res["total"].count += obj.count;
    res["total"].sum += obj.price * obj.count;
  });

  return res;
};

export const getCartItemsByDate = (cartData, date) => {
  //TODO: выбрать покупки сделанные за выбранную дату
  const selectedDate = new Date(date);
  const dateToCompare = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  return cartData.filter((obj) => {
    const tempDate = new Date(obj.date);
    const orderDate = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    );
    return orderDate.getTime() === dateToCompare.getTime();
  });
};

export const repeatOrder = (cartData, date) => {
  const nowDate = new Date();
  const selectedDate = new Date(date);
  // создаю объект Date без учета времени, с учетом только даты, потому что сравнение должно быть по дате
  const dateToCompare = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  ); // объект для сравнения
  const arrOfFoundObjs = []; //временное хранилище всех найденных заказов

  cartData.forEach((obj) => {
    const tempDate = new Date(obj.date); // временнЫй объект Date, используется для того чтобы создать другой объект без учета времени
    // создаю объект Date без учета времени, с учетом только даты, потому что сравнение должно быть по дате
    const orderDate = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    );

    // поиск соответсвующих заказов
    if (dateToCompare.getTime() === orderDate.getTime()) {
      const copyObj = JSON.parse(JSON.stringify(obj)); // копирование объекта

      copyObj.date = nowDate.toISOString(); // присваиваю сегоднешнюю дату в формате строки
      copyObj.id = nowDate.getTime(); // устанавливаю уникальный id путем присвоения количества миллисекунд прошедших с 1970
      arrOfFoundObjs.push(copyObj);
    }
  });

  cartData = arrOfFoundObjs.concat(cartData);
  return cartData;
};

export const addItem = (cartData, item) => {
  item.count += 1;
  return cartData;
};

export const checkPromo = (cartData) => {
  //TODO: нужно проверить корзина подходит под правила промоакции
  // проверить что суммарно в корзине больше 1000р
  // что есть пункт больше чем на 500р
  // что нет скидочных товаров
  const tryPromo = {
    total: Boolean(calcSum(cartData).total.sum > 1000),
    oneBigPosition: false,
    notDiscounted: true
  };
  for (const item of cartData) {
    if (item.count * item.price > 500) tryPromo.oneBigPosition = true;
    if (item.hasOwnProperty("discount")) tryPromo.notDiscounted = false;
  }

  return tryPromo;
};
