"use client"

import { useState, useEffect } from "react";
import { calculatePrice } from "../helpers/helperFunctions";
import { PriceDataGoogleAPI } from "../types/types";
import {differenceInDays} from "date-fns/differenceInDays";
import moment, { Moment } from "moment";

export const usePriceCalculation = (
  startDate: Moment | null,
  endDate: Moment | null,
  selectValues: {
    selectedAdults: number;
    selectedChildren: number;
    selectedInfants: number;
    selectedPets: number;
  },
  priceArray: PriceDataGoogleAPI[]
) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [nightsPrice, setNightsPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [petFee, setPetFee] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountedNightsPrice, setDiscountedNightsPrice] = useState(0);
  const [averageNightlyPrice, setAverageNightlyPrice] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const nights = differenceInDays(endDate.toDate(), startDate.toDate());
      const priceData = calculatePrice(
        startDate,
        endDate,
        selectValues.selectedPets,
        priceArray,
        nights
      );

      setTotalPrice(priceData[0]);
      setNightsPrice(priceData[1]);
      setTax(priceData[2]);
      setPetFee(priceData[4]);
      setDiscountPercentage(priceData[5]);
      setHasDiscount(priceData[6]);
      setDiscountedNightsPrice(priceData[7]);
      setAverageNightlyPrice(priceData[8]);
      setNumberOfNights(nights);
    }
  }, [startDate, endDate, selectValues, priceArray]);

  return {
    totalPrice,
    nightsPrice,
    tax,
    petFee,
    discountPercentage,
    hasDiscount,
    discountedNightsPrice,
    averageNightlyPrice,
    numberOfNights,
  };
};
