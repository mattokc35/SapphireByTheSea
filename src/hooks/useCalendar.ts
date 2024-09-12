"use client"

import { useEffect, useState } from "react";
import { calendarRequest } from "../network/networkRequests";

export const useCalendar = () => {
  const [bookedDates, setBookedDates] = useState([]);
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
