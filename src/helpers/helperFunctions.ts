const checkDiscount = (
  numNights: number,
  nightsPrice: number
): [number, boolean, number, number] => {
  let discountPercentage: number = 0;
  let hasDiscount: boolean = false;
  let discountAmount: number = 0;
  let discountedPrice: number = nightsPrice;

  if (numNights >= 4 && numNights < 5) {
    discountPercentage = 2;
    hasDiscount = true;
  } else if (numNights >= 5 && numNights < 7) {
    discountPercentage = 3;
    hasDiscount = true;
  } else if (numNights >= 7 && numNights < 28) {
    discountPercentage = 8;
    hasDiscount = true;
  } else if (numNights >= 28) {
    discountPercentage = 30;
    hasDiscount = true;
  }

  discountAmount = nightsPrice * (discountPercentage / 100);

  if (hasDiscount) {
    discountedPrice -= discountAmount;
  }

  return [discountPercentage, hasDiscount, discountedPrice, discountAmount];
};

const CLEANING_FEE = 100;

interface PriceCalculationResult {
  totalPrice: number;
  nightsPrice: number;
  tax: number;
  petFee: number;
  discountPercentage: number;
  hasDiscount: boolean;
  discountedNightsPrice: number;
  averageNightlyPrice: number;
  discountedNightsAmount: number;
  totalBeforeTax: number;
}

export function calculatePrice(
  startDate: moment.Moment,
  endDate: moment.Moment,
  pets: number,
  priceArray: any[],
  numNights: number
): PriceCalculationResult {
  let nightsPrice = 0;

  for (let m = startDate.clone(); m.isBefore(endDate); m.add(1, "days")) {
    const foundPrice = priceArray.find(
      (element) => element.date === m.format("YYYY-MM-DD")
    );

    if (!foundPrice || !foundPrice.price) {
      return {
        totalPrice: 0,
        nightsPrice: 0,
        tax: 0,
        petFee: 0,
        discountPercentage: 0,
        hasDiscount: false,
        discountedNightsPrice: 0,
        averageNightlyPrice: 0,
        discountedNightsAmount: 0,
        totalBeforeTax: 0,
      };
    }

    nightsPrice += Number(foundPrice.price);
  }

  const averageNightlyPrice = nightsPrice / numNights;

  const [discountPercentage, hasDiscount, discountedPrice, discountedAmount] =
    checkDiscount(numNights, nightsPrice);

  let totalBeforeTax = hasDiscount ? discountedPrice : nightsPrice;
  let petFee = pets > 0 ? 150 : 0;

  totalBeforeTax += petFee + CLEANING_FEE;
  const tax = totalBeforeTax * 0.06;
  const totalPrice = totalBeforeTax + tax;

  return {
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    nightsPrice,
    tax: parseFloat(tax.toFixed(2)),
    petFee,
    discountPercentage,
    hasDiscount,
    discountedNightsPrice: parseFloat(discountedPrice.toFixed(2)),
    averageNightlyPrice: parseFloat(averageNightlyPrice.toFixed(2)),
    discountedNightsAmount: parseFloat(discountedAmount.toFixed(2)),
    totalBeforeTax: parseFloat(totalBeforeTax.toFixed(2)),
  };
}

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length === 12 && cleaned.startsWith("01")) {
    // Format for numbers starting with '01' (e.g., 017135988908 => +01 (171) 359-8890)
    return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  } else if (cleaned.length === 10 && cleaned.startsWith("01")) {
    // Format for numbers without country code (e.g., 0171359889 => +01 (171) 359-8890)
    return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }

  return phoneNumber;
};

export function getCurrentDate(): string {
  // Create a new Date object to get the current date
  const currentDate: Date = new Date();

  // Get the individual date components (month, day, and year)
  const year: string = currentDate.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month: string = (currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0"); // Month is zero-based, so add 1
  const day: string = currentDate.getDate().toString().padStart(2, "0");

  // Create the formatted date string in "mm/dd/yy" format
  const formattedDate: string = `${month}/${day}/${year}`;
  return formattedDate;
}

export function calculatePromoCodePrice(
  nightsPrice: number,
  discountedPrice: number,
  promoCodeDiscountPercentage: number,
  petFee: number
): [number, number, number] {
  let currentPrice: number = 0;
  nightsPrice === discountedPrice
    ? (currentPrice = nightsPrice)
    : (currentPrice = discountedPrice);

  const promoCodeDiscountedPrice =
    currentPrice - currentPrice * (promoCodeDiscountPercentage * 0.01);
  let newTotalPrice = promoCodeDiscountedPrice;
  //cleaning fee
  newTotalPrice += 225;
  newTotalPrice += petFee;
  //tax
  const newTax: number = newTotalPrice * 0.06;
  newTotalPrice += newTax;

  return [
    parseFloat(promoCodeDiscountedPrice.toFixed(2)),
    parseFloat(newTotalPrice.toFixed(2)),
    parseFloat(newTax.toFixed(2)),
  ];
}
