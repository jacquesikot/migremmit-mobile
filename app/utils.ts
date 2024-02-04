// convert amoount to text with , separator - mvoe to utils file
export const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
