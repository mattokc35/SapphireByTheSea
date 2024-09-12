// Define types for the options objects
export type Option = {
  value: number;
  label: string;
};

// Define types for the image objects
export type Image = {
  caption: string;
  src: string;
};

// Define type for review objects
export type Review = {
  text: string;
  rating: number;
  name: string;
  date: string;
};

export interface BookedDate {
  start: Date;
  end: Date;
}

// Define type for host bio
export type HostBio = string;

export interface GuestInfoPaymentPageModalProps {
    startDate: string;
    endDate: string;
    adults: number;
    childrenSelected: number;
    infants: number;
    pets: number;
    price: number;
    nightsPrice: number;
    hasDiscount: boolean;
    discountedNightsPrice: number;
    discountPercentage: number;
    numberOfNights: number;
    petFee: number;
    averageNightlyPrice: number;
    tax: number;
  }
  
  export interface RootState {
    transactionId: string;
  }
  
  export interface ContractEmailData {
    transactionId: string;
    nightsPrice: number;
    petFee: number;
    promoCode: string;
    adults: number;
    children: number;
    promoCodeDiscountPercentage: number;
    promoCodeDiscountPrice: number;
    phoneNumber: string;
    comments: string;
    email: string;
    Owners: string;
    total_rent: number;
    total_guests: number;
    Checkin: string;
    Checkout: string;
    Checkin_Time: string;
    Checkout_Time: string;
    today: string;
    discountedNightsPrice: number;
    discountPercentage: number;
    averageNightlyPrice: number;
    numberOfNights: number;
    tax: number;
    guest: string;
    infants: number;
    pets: number;
  }
  
  export interface PriceLabsDataItem {
    date: string;
    price: number;
    user_price: number;
    uncustomized_price: number;
    min_stay: number;
    booking_status: string;
    booking_status_STLY: string;
    ADR: number;
    ADR_STLY: number;
    booked_date: string;
    booked_date_STLY: string;
    unbookable: number;
    extra_person_fee: number;
    extra_person_fee_trigger: number;
    demand_color: string;
    demand_desc: string;
  }
  
  export interface PriceLabsData {
    id: string;
    pms: string;
    group: string;
    currency: string;
    last_refreshed_at: string;
    data: PriceLabsDataItem[];
  }
  
  export interface PriceArray {
    PriceData: PriceDataGoogleAPI[];
  }
  
  export interface PriceDataGoogleAPI {
    date: string;
    price: number;
  }

  export interface GuestInfoFormData {
    name: string;
    email: string;
    phoneNumber: string;
    comments: string;
    adults: number;
    children: number;
    price: number;
    tax: number;
    pets: number;
    infants: number;
    nightsPrice: number;
    numberOfNights: number;
    discountedNightsPrice: number;
  }
