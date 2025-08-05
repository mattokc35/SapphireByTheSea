"use client";

import { useState, useEffect } from "react";
import { calculatePrice } from "../helpers/helperFunctions";
import { PriceDataGoogleAPI } from "../types/types";
import { differenceInDays } from "date-fns";
import { Moment } from "moment";

type SelectValues = {
  selectedAdults: number;
  selectedChildren: number;
  selectedInfants: number;
  selectedPets: number;
};

export const usePriceCalculation = (
  startDate: Moment | null,
  endDate: Moment | null,
  selectValues: SelectValues,
  priceArray: PriceDataGoogleAPI[]
) => {
  const [priceDetails, setPriceDetails] = useState({
    totalPrice: 0,
    nightsPrice: 0,
    tax: 0,
    petFee: 0,
    discountPercentage: 0,
    hasDiscount: false,
    discountedNightsPrice: 0,
    averageNightlyPrice: 0,
    numberOfNights: 0,
    discountedNightsAmount: 0,
    totalBeforeTax: 0,
  });

  useEffect(() => {
    if (startDate && endDate) {
      const numberOfNights = differenceInDays(endDate.toDate(), startDate.toDate());

      const result = calculatePrice(
        startDate,
        endDate,
        selectValues.selectedPets,
        priceArray,
        numberOfNights
      );

      setPriceDetails({
        ...result,
        numberOfNights,
      });
    }
  }, [startDate, endDate, selectValues, priceArray]);

  return priceDetails;
};
