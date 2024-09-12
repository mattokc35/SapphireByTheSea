// app/book/page.tsx (Server Component)
import React from "react";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";
import BookingInputForm from "@/components/forms/booking/BookingInputForm";
import {
  calendarRequest,
  fetchPricesFromGoogleSheets,
} from "@/network/networkRequests";
import { PriceDataGoogleAPI, BookedDate } from "@/types/types";

// Force the component to be treated as dynamic
export const dynamic = "force-dynamic";

export default async function BookPage() {
  let bookedDates: BookedDate[] = [];
  let priceArray: PriceDataGoogleAPI[] = [];
  let loadingError = null;

  try {
    const bookedDatesResponse = await calendarRequest();
    if (bookedDatesResponse && bookedDatesResponse.BookedRanges) {
      bookedDates = bookedDatesResponse.BookedRanges;
    } else {
      throw new Error("BookedRanges is not available.");
    }
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    loadingError = "Failed to fetch calendar data.";
  }

  try {
    const priceDataResponse = await fetchPricesFromGoogleSheets();
    if (priceDataResponse) {
      priceArray = priceDataResponse;
    } else {
      throw new Error("Price data is not available.");
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
    loadingError = "Failed to fetch price data.";
  }

  const isLoading = !bookedDates.length || !priceArray.length;

  return (
    <Container maxWidth="md" sx={{ marginTop: "100px", marginBottom: "50px"}}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom color="#0d4a9a">
          Book Your Stay
        </Typography>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <BookingInputForm bookedDates={bookedDates} priceArray={priceArray} />
        )}
        {loadingError && (
          <Typography color="error" variant="body1">
            {loadingError}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
