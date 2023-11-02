export const generateAvatarUrl = (name: string) => {
  if (!name) {
    return "https://ui-avatars.com/api/?name=No+Name&background=000000&color=fff";
  }

  const nameArr = name.split(" ");
  const firstLetter = nameArr[0].charAt(0);
  const secondLetter = nameArr[1] ? nameArr[1].charAt(0) : "";
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `https://ui-avatars.com/api/?name=${firstLetter}${secondLetter}&background=${randomColor}&color=fff`;
};
