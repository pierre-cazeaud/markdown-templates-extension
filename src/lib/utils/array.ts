export const removeItemFromArray = (
  array: any[] | undefined,
  itemValue: any
) => {
  if (!array) return;
  array.splice(array.indexOf(itemValue), 1);
};


export const moveItemInArray = (array: any[], fromIndex: number, toIndex: number) => {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
}