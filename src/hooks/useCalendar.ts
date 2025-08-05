"use client"

import { useEffect, useState } from "react";
import { BookedDate } from "../types/types";
import { calendarRequest } from "../network/networkRequests";

export const useCalendar = () => {
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const bookedDatesResponse = await calendarRequest();
        setBookedDates(bookedDatesResponse.BookedRanges);
      } catch {
        console.log("Can't get the calendar data");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  return { bookedDates, loading };
};
