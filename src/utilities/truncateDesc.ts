export const truncate = (description: string, requiredLength: number) => {
  return description.length > requiredLength
    ? description.substring(0, requiredLength - 1) + "..."
    : description;
};
