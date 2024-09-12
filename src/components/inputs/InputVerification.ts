import { differenceInDays } from "date-fns";
import moment, { Moment } from "moment";
import { BookedDate } from "@/types/types";

const bookingFormValidation = (
  adults: number,
  children: number,
  infants: number,
  startDate: Moment | null,
  endDate: Moment | null,
  bookedDates: BookedDate[]
): [boolean, string] => {
  // Check total number of guests
  const totalGuests = adults + children + infants;
  if (totalGuests > 12) {
    return [true, "Please select a total of 12 guests or fewer"];
  }

  // Check if start date or end date is not selected
  if (!startDate || !endDate) {
    return [true, ""];
  }

  // Calculate number of nights
  const numNights = differenceInDays(endDate.toDate(), startDate.toDate());
  if (numNights < 2 || numNights >= 31) {
    return [true, "Bookings must be 2 or more nights but less than 31 nights"];
  }
  // Check for overlapping booked dates
  const overlappingDate = bookedDates.find((booking) => {
    const bookingStartDate = new Date(booking.start);
    bookingStartDate.setDate(bookingStartDate.getDate() + 1);
    const bookingEndDate = new Date(booking.end);
    bookingEndDate.setDate(bookingEndDate.getDate() - 1);
    return (
      startDate.toDate() <= bookingEndDate &&
      endDate.toDate() >= bookingStartDate
    );
  });
  if (overlappingDate) {
    return [true, "You selected dates that overlap with unavailable dates!"];
  }

  return [false, "Looks Good! :)"];
};

export { bookingFormValidation };
