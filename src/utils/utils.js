export const addItemToArray = (arr, item) => {
  const i = arr.indexOf(item);
  if (i < 0) {
    const newArr = [...arr, item];
    newArr.sort();
    return newArr;
  } else {
    return arr;
  }
};

export const removeItemFromArray = (arr, item) => {
  const i = arr.indexOf(item);
  const newArr = [...arr];
  newArr.splice(i, 1);
  return newArr;
};
