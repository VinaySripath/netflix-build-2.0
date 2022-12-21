export const generateRandomElement = (elements: any) => {
  const random = elements[Math.floor(Math.random() * elements.length - 1)];
  return random;
};
