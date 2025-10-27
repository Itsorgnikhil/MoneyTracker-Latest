export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return '';
  
  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split('.'); // Split into integer and fractional parts
  
  let integerPart = parts[0];
  let fractionalPart = parts[1];

  // Format integer part using Indian numbering system
  if (integerPart.length > 3) {
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    integerPart = formattedOtherNumbers + ',' + lastThree;
  } else {
    integerPart = integerPart; // no change if less than 4 digits
  }

  // Combine integer and fractional parts
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}