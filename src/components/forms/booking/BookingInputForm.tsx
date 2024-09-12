"use client"

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import NumberSelect from "../../inputs/NumberSelect";
import {
  adultOptions,
  petOptions,
  childrenOptions,
  infantOptions,
} from "../../../constants/constants";
import "react-dates/lib/css/_datepicker.css";
import { useRouter } from "next/navigation";
import { bookingFormValidation } from "../../inputs/InputVerification";
import GuestInfoPaymentPageModal from "@/components/modals/GuestInfoPaymentModal";
import { Button, Modal, Box, Typography } from "@mui/material";
import moment, { Moment } from "moment";
import { usePriceCalculation } from "@/hooks/usePriceCalculation";
import { PriceDataGoogleAPI, BookedDate } from "@/types/types";

interface BookingInputFormProps {
  bookedDates: BookedDate[];
  priceArray: PriceDataGoogleAPI[];
}

function BookingInputForm({ bookedDates, priceArray }: BookingInputFormProps) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectValues, setSelectValues] = useState({
    selectedAdults: 1,
    selectedChildren: 0,
    selectedInfants: 0,
    selectedPets: 0,
  });
  const [bookingFormNotValid, setBookingFormNotValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<any>();
  
  const {
    totalPrice,
    nightsPrice,
    tax,
    petFee,
    discountPercentage,
    hasDiscount,
    discountedNightsPrice,
    averageNightlyPrice,
    numberOfNights,
  } = usePriceCalculation(startDate, endDate, selectValues, priceArray);

  useEffect(() => {
    const { selectedAdults, selectedChildren, selectedInfants } = selectValues;
    const isBookingFormValid = bookingFormValidation(
      selectedAdults,
      selectedChildren,
      selectedInfants,
      startDate,
      endDate,
      bookedDates
    );
    setBookingFormNotValid(isBookingFormValid[0]);
    setValidationMessage(isBookingFormValid[1]);
  }, [selectValues, startDate, endDate, bookedDates]);

  const changeHandler = (name: string, value: number) => {
    setSelectValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    handleShow();
  };

  const checkDateBlocked = (date: moment.Moment) => {
    return bookedDates.some(({ start, end }) => {
      const startMoment = moment(start, "YYYY-MM-DD");
      const endMoment = moment(end, "YYYY-MM-DD");
      return date.isBetween(startMoment, endMoment, "day", "()");
    });
  };

  const renderDayContents = (date: Moment) => {
    let found = priceArray.findIndex(
      (element: any) => element.date === date.format("YYYY-MM-DD")
    );
    if (found === -1) {
      return;
    }
    let dayValue = date.format("DD");
    return (
      <div className={`calendar-box`}>
        <p className="calendar-text-day">{dayValue}</p>
      </div>
    );
  };

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="guest-info-payment-modal"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%",
              sm: "600px",
            },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" id="guest-info-payment-modal">
            Guest Information & Payment Form
          </Typography>
          <GuestInfoPaymentPageModal
            startDate={JSON.stringify(startDate)}
            endDate={JSON.stringify(endDate)}
            adults={selectValues.selectedAdults}
            childrenSelected={selectValues.selectedChildren}
            infants={selectValues.selectedInfants}
            pets={selectValues.selectedPets}
            price={parseFloat(totalPrice.toFixed(2))}
            nightsPrice={nightsPrice}
            numberOfNights={numberOfNights}
            hasDiscount={hasDiscount}
            discountPercentage={discountPercentage}
            discountedNightsPrice={discountedNightsPrice}
            averageNightlyPrice={averageNightlyPrice}
            tax={parseFloat((Math.round(tax * 100) / 100).toFixed(2))}
            petFee={petFee}
          />
          <Button
            sx={{ color: "red", marginTop: "10px" }}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <form onSubmit={handleFormSubmit} className="BookingInputForm">
        <Typography variant="body1" textAlign="center" mb={2}>
          Our 3-bedroom home sleeps up to a maximum of 12 guests
        </Typography>
        <div style={{ justifyContent: "center", textAlign: "center", marginBottom: "15px" }}>
          <Typography variant="subtitle1">Select your dates:</Typography>
          <DateRangePicker
            startDate={startDate}
            startDateId="start-date"
            endDate={endDate}
            numberOfMonths={1}
            endDateId="end-date"
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            isDayBlocked={checkDateBlocked}
            renderDayContents={renderDayContents}
          />
        </div>
        <NumberSelect
          id="selectedAdults"
          className="numberSelect"
          label="Adults"
          options={adultOptions}
          value={selectValues.selectedAdults}
          onChange={(selectedOption) =>
            changeHandler("selectedAdults", selectedOption)
          }
        />
        <NumberSelect
          id="selectedChildren"
          className="numberSelect"
          label="Children"
          options={childrenOptions}
          value={selectValues.selectedChildren}
          onChange={(selectedOption) =>
            changeHandler("selectedChildren", selectedOption)
          }
        />
        <NumberSelect
          id="selectedInfants"
          className="numberSelect"
          label="Infants"
          options={infantOptions}
          value={selectValues.selectedInfants}
          onChange={(selectedOption) =>
            changeHandler("selectedInfants", selectedOption)
          }
        />
        <NumberSelect
          className="selectedPets"
          label="Pets"
          options={petOptions}
          value={selectValues.selectedPets}
          onChange={(selectedOption) =>
            changeHandler("selectedPets", selectedOption)
          }
        />
        <div className="totalPriceSection">
          {bookingFormNotValid && (
            <Typography color="error" variant="subtitle2" mb={1}>
              {validationMessage}
            </Typography>
          )}
          <Button
            className="getPriceButton"
            onClick={handleFormSubmit}
            disabled={bookingFormNotValid}
            variant="contained"
            sx={{
              backgroundColor: "#0f52ba",
              color: "#fff",
              width: "100%", // Full width on mobile
              padding: "12px", // Padding for mobile touch targets
              "&:hover": {
                backgroundColor: "#fff",
                color: "#0f52ba",
                transition: "all 0.2s ease-in-out",
              },
              "&:disabled": {
                backgroundColor: "#ccc",
                color: "#666",
              },
            }}
          >
            Get Price
          </Button>
        </div>
      </form>
    </>
  );
}

export default BookingInputForm;
