/**
 *
 * @param name
 * @param backgroundHexColor ex '#000000'
 * @returns
 */
export const generateAvatarUrl = (name: string, backgroundHexColor?: string) => {
  const nameArr = name ? name?.split(" ") : [];
  const firstLetter = nameArr[0].charAt(0);
  const secondLetter = nameArr[1] ? nameArr[1].charAt(0) : "";
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const backgroundColor = backgroundHexColor ? backgroundHexColor.substring(1) : randomColor;
  return `https://ui-avatars.com/api/?name=${firstLetter}${secondLetter}&background=${backgroundColor}&color=fff`;
};
