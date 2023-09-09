export function getQuerySelect(exclude: string[] = [], include: string[] = []) {
  const selectObject = {};

  include.forEach(key => {
    selectObject[key] = 1;
  });

  exclude.forEach(key => {
    selectObject[key] = 0;
  });

  return selectObject;
}
