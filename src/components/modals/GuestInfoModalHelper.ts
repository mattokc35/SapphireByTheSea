import { ContractEmailData, GuestInfoFormData } from "@/types/types";
export const generateProductName = (
  startDate: string,
  endDate: string,
  guestName: string
) => {
  return `Sapphire By The Sea, ${startDate.substr(1, 10)} to ${endDate.substr(1, 10)} for ${guestName}`;
};

export const formatDate = (dateString: string): string => {
  const sanitizedDate = dateString.replace(/\\/g, "").replace(/\"/g, "");
  return new Date(sanitizedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
};

export const resetFormData = (props: {
  tax: number;
  discountedNightsPrice: number;
}) => ({
  name: "",
  email: "",
  phoneNumber: "",
  comments: "",
  tax: props.tax,
  promoCode: "",
  promoCodeDiscountPercentage: 0,
  promoCodeDiscountPrice: props.discountedNightsPrice,
});

export const createContractEmailDataObject = (
  currentDate: string,
  formData: GuestInfoFormData,
  owners: string,
  promoCode: string,
  promoCodeDiscountPercentage: number,
  promoCodeDiscountPrice: number,
  startDate: string,
  endDate: string,
  totalPrice: number,
  petFee: number,
  checkinTime: string,
  checkoutTime: string,
  discountPercentage: number,
  averageNightlyPrice: number,
  numberOfNights: number,
  totalGuests: number
): ContractEmailData => {
  return {
    ...formData,
    Owners: owners,
    promoCode,
    promoCodeDiscountPercentage,
    promoCodeDiscountPrice,
    Checkin: startDate.substr(1, 10),
    total_guests: totalGuests,
    guest: formData.name,
    total_rent: totalPrice,
    petFee,
    Checkout: endDate.substr(1, 10),
    Checkin_Time: checkinTime,
    Checkout_Time: checkoutTime,
    today: currentDate,
    discountPercentage,
    averageNightlyPrice,
    numberOfNights,
  };
};
