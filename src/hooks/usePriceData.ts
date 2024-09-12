"use client"

import { useState, useEffect } from "react";
import { fetchPricesFromGoogleSheets } from "../network/networkRequests";
import { PriceDataGoogleAPI } from "../types/types";

export const useFetchPriceData = () => {
  const [priceArray, setPriceArray] = useState<PriceDataGoogleAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const data = await fetchPricesFromGoogleSheets();
        setPriceArray(data);
      } catch (err) {
        console.error("Error fetching price data:", err);
        setError("Failed to fetch price data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, []);

  return { priceArray, loading, error };
};
