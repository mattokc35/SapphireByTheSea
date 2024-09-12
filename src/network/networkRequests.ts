import { PriceDataGoogleAPI } from "../types/types";
import { loadStripe } from "@stripe/stripe-js";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_TEST_KEY!
);

const request = async <T>(
  path: string,
  method: string,
  requestData: any = null
): Promise<any> => {
  try {
    const options: RequestInit = {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(BASE_URL);
    if (requestData) {
      options.body = JSON.stringify(requestData);
    }

    const response = await fetch(`${BASE_URL}/${path}`, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return null;
  }
};

export const contractRequest = async (requestData: any): Promise<any> => {
  try {
    const data = await request<any>("create-contract", "POST", requestData);
    window.alert(
      "Booking request successful! We have sent a contract to your email you will need to sign in order to proceed to the payment page."
    );
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const contractStatusRequest = async (requestData: any): Promise<any> => {
  try {
    const data = await request<any>("get-contract-status", "POST", requestData);
    window.alert("Contract Status request sent.");
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const calendarRequest = async (): Promise<any> => {
  return await request<any>("calendar-request", "GET");
};

export const priceRequest = async (): Promise<any> => {
  return await request<any>("price-request", "GET");
};

export const createCheckoutSession = async (
  productName: string,
  priceAmount: string
): Promise<any> => {
  const input = {
    productName: productName,
    priceAmount: priceAmount,
  };
  try {
    const data = await request<any>("create-checkout-session", "POST", input);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const sendContractEmailDataToBackend = async (
  contractEmailDataObject: any
): Promise<any> => {
  try {
    const data = await request<any>(
      "sendDataToBackend",
      "POST",
      contractEmailDataObject
    );
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const createVerificationSession = async (): Promise<boolean> => {
  const stripe = await stripePromise;

  // Check if Stripe is initialized
  if (!stripe) {
    console.error("Stripe has not been initialized.");
    return false;
  }

  try {
    // Make a request to create the verification session
    const response = await request<any>("create-verification-session", "POST");

    // Use the clientSecret returned by your backend
    const { clientSecret } = response;

    // Confirm the identity verification
    const { error } = await stripe.verifyIdentity(clientSecret);

    if (error) {
      console.log("[error]", error);
      return false;
    }

    return true; // Return true if verification is successful
  } catch (error) {
    console.error("Error creating verification session:", error);
    return false;
  }
};

export const verifyPromoCode = async (promoCode: string): Promise<any> => {
  return await request<any>(`verify-promo-code?promoCode=${promoCode}`, "GET");
};

export const fetchPricesFromGoogleSheets = async (): Promise<
  PriceDataGoogleAPI[]
> => {
  try {
    const data = await request<any>("prices-google-sheets", "GET");
    const transformedData: PriceDataGoogleAPI[] = data.prices.map(
      (item: any) => ({
        date: item.date,
        price: item.price,
      })
    );
    return transformedData;
  } catch (error: any) {
    console.error("Error fetching prices from Google Sheets:", error.message);
    return [];
  }
};
