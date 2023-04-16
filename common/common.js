/**
 * 
 * @param {Array} data 
 * @param {String} id 
 * @returns {String}
 */
const addFood = (data = [], id = '') => {
  const newData = data.map((tempFood) => {
    return tempFood.food._id === id && {
      ...tempFood,
      quantity: tempFood.quantity + 1,
    };
  })
  return newData;
}

/**
 * 
 * @param {Array} data 
 * @param {String} id 
 * @returns {Array}
 */
const removeFood = (data = [], id = '') => {
  const newData = data.map((tempFood) => {
    if (tempFood.food._id === id && tempFood.quantity > 0) {
      return {
        ...tempFood,
        quantity: tempFood.quantity - 1
      };
    }
    return tempFood;
  })
  return newData;
}

/**
 * 
 * @param {Array} list 
 * @returns Number
 */
const priceTotal = (list = []) => {
  const initTotal = 0;
  const total = list.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.food.price),
    initTotal,
  )

  return total;
}

export { addFood, removeFood, priceTotal };