"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Tour } from "@/lib/tours";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function TourCalendar({ tour }: { tour: Tour }) {
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isAvailableMonth =
    !tour.availableMonths || tour.availableMonths.includes(month + 1);

  const isAvailableDay = (day: number) => {
    const date = new Date(year, month, day);
    if (date < today) return false;
    if (!isAvailableMonth) return false;
    if (!tour.availableDays) return true;
    return tour.availableDays.includes(date.getDay());
  };

  const handleDateClick = (day: number) => {
    if (!isAvailableDay(day)) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    router.push(`/booking?tour=${tour.slug}&date=${dateStr}`);
  };

  const goToPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const available = isAvailableDay(day);
    cells.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={!available}
        className={`w-full aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
          available
            ? "text-dark hover:bg-sky hover:text-white cursor-pointer font-medium"
            : "text-gray-300 cursor-default"
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-sky-pale/30 rounded-xl p-4">
      <h3 className="font-serif text-sm text-dark mb-3 text-center">
        Select a Date
      </h3>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goToPrevMonth}
          className="text-gray-400 hover:text-dark transition-colors text-sm px-2"
        >
          &lt;
        </button>
        <span className="text-sm font-medium text-dark">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={goToNextMonth}
          className="text-gray-400 hover:text-dark transition-colors text-sm px-2"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[10px] text-gray-400 font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
      {!isAvailableMonth && tour.availableMonths && (
        <p className="text-[10px] text-gray-400 text-center mt-2">
          This tour is available in{" "}
          {tour.availableMonths.map((m) => MONTH_NAMES[m - 1]).join(", ")}
        </p>
      )}
    </div>
  );
}
