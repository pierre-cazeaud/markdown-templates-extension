export const removeItemFromArray = (
  array: any[] | undefined,
  itemValue: any
) => {
  if (!array) return;
  array.splice(array.indexOf(itemValue), 1);
};
