// Optimized version of the Checkout component UI with improved TailwindCSS, DaisyUI, and Framer Motion

import axios from "axios";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange, type RangeKeyDict, type Range } from "react-date-range";
import { format, isBefore, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/UseAuth";
import EmptyCart from "../context/EmptyCart";
const url = import.meta.env.VITE_SERVER_URL;
import { useTranslation } from "react-i18next";

interface Room {
  _id: string;
  title: string;
  price: number;
  specialRequests?: string;
  maxPeople: number;
  roomType: string;
}

interface LocationState {
  directBooking?: boolean;
  room?: Room;
}

function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [specialRequests, setSpecialRequest] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState<Record<string, number>>({});
  const [dateRanges, setDateRanges] = useState<Record<string, Range[]>>({});
  const [calendarOpen, setCalendarOpen] = useState<Record<string, boolean>>({});
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const state = location.state as LocationState;
  const directBooking = state?.directBooking;
  const roomFromDirect = state?.room;
  const roomsToBook: Room[] = directBooking ? [roomFromDirect!] : cart;
  const { isAuthenticated, LoadingUser, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (roomsToBook.length === 0) return;

    const newGuests: Record<string, number> = {};
    const newRanges: Record<string, Range[]> = {};
    const newCalendarToggles: Record<string, boolean> = {};

    roomsToBook.forEach((room) => {
      newGuests[room._id] = 1;
      newRanges[room._id] = [
        {
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          key: "selection",
        },
      ];
      newCalendarToggles[room._id] = false;
    });

    setGuestCounts(newGuests);
    setDateRanges(newRanges);
    setCalendarOpen(newCalendarToggles);
  }, [roomsToBook.length]);

  useEffect(() => {
    if (!LoadingUser && !isAuthenticated) {
      navigate("/login", { state: { from: location } });
    }
  }, [isAuthenticated, LoadingUser, navigate, location]);

  const handleGuestChange = (roomId: string, value: string, maxPeople: number) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > maxPeople) return;
    setGuestCounts((prev) => ({ ...prev, [roomId]: num }));
  };

  const handleDateChange = (roomId: string, ranges: RangeKeyDict) => {
    setDateRanges((prev) => ({
      ...prev,
      [roomId]: [ranges.selection],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialRequest(e.target.value);
  };

  const handleConfirmBooking = async () => {
    setIsConfirmOpen(false);
    for (let room of roomsToBook) {
      const guests = guestCounts[room._id] || 1;
      const range = dateRanges[room._id]?.[0];
      if (!range?.startDate || !range?.endDate || !isBefore(range.startDate, range.endDate)) {
        setValidationError(`Invalid dates selected for ${room.title}`);
        return;
      }
      if (guests > room.maxPeople) {
        setValidationError(`"${room.title}" allows up to ${room.maxPeople} guests.`);
        return;
      }
    }

    const bookingPayload = roomsToBook.map((room) => {
      const range = dateRanges[room._id][0];
      const nights = differenceInDays(range.endDate!, range.startDate!);
      const subtotal = nights * room.price * (guestCounts[room._id] || 1);
      return {
        room: room._id,
        guests: guestCounts[room._id] || 1,
        checkInDate: range.startDate,
        checkOutDate: range.endDate,
        pricePerNight: room.price,
        totalNights: nights,
        subtotal,
      };
    });

    const totalAmount = bookingPayload.reduce((sum, item) => sum + item.subtotal, 0);
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/bookings`, { rooms: bookingPayload, totalAmount, specialRequests }, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user?.token || '',
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        if (directBooking) {
          setTimeout(() => navigate("/"), 2000);
        } else {
          clearCart();
        }
      }
    } catch (err: any) {
      console.error(err.response?.data?.message || err.message);
      toast.error("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!directBooking && cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 md:px-16 mt-32 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-orange-500">
        {t("Checkout")}
      </h1>

      <div className="grid gap-6">
        {roomsToBook.map((item) => {
          const range = dateRanges[item._id]?.[0];
          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-base-300 p-6 shadow-sm bg-base-500"
            >
              <h2 className="text-xl font-semibold text-primary mb-1">{t(item.title)}</h2>
              <p className="text-sm text-gray-400">{t(item.roomType)} • {t("Max people")}: {item.maxPeople}</p>

              <div className="mt-4 sm:flex-row sm:items-center gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">{t("Number of Guests")}</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={item.maxPeople}
                    value={guestCounts[item._id] || 1}
                    onChange={(e) => handleGuestChange(item._id, e.target.value, item.maxPeople)}
                    className="input input-bordered w-24 text-gray-800"
                  />
                </div>
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">{t("Special Requests")}</span>
                  </label>
                  <input
                    type="text"
                    name="specialRequests"
                    placeholder="Enter special request if any"
                    className="input input-bordered w-full text-gray-800"
                    onChange={handleChange}
                    value={specialRequests}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="label">
                  <span className="label-text">{t("Check-in - Check-out")}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setCalendarOpen((prev) => ({ ...prev, [item._id]: !prev[item._id] }))}
                  className="btn btn-outline w-full text-left"
                >
                  {range?.startDate && range?.endDate
                    ? `${format(range.startDate, "MMM dd")} - ${format(range.endDate, "MMM dd, yyyy")}`
                    : "Select dates"}
                </button>

                {calendarOpen[item._id] && (
                  <div className="relative z-30 mt-2">
                    <DateRange
                      editableDateInputs
                      onChange={(ranges) => handleDateChange(item._id, ranges)}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRanges[item._id]}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <span className="text-lg font-medium text-primary">${item.price} {t("/night")}</span>
                {!directBooking && (
                  <button onClick={() => removeFromCart(item._id)} className="btn btn-sm btn-error">
                    {t("Remove")}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 card bg-base-500 shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">{t("Summary")}</h2>
        <ul className="text-sm space-y-2">
          {roomsToBook.map((room) => {
            const range = dateRanges[room._id]?.[0];
            if (!range?.startDate || !range?.endDate) return null;
            const nights = differenceInDays(range.endDate, range.startDate);
            const subtotal = nights * room.price;
            return (
              <li key={room._id}>
                <span className="font-medium">{room.title}</span> — {nights} night(s) × ${room.price} =
                <span className="font-semibold"> ${subtotal.toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
        <div className="text-right text-lg font-bold mt-4">
          Total: $
          {roomsToBook.reduce((sum, room) => {
            const range = dateRanges[room._id]?.[0];
            if (!range?.startDate || !range?.endDate) return sum;
            const nights = differenceInDays(range.endDate, range.startDate);
            return sum + nights * room.price;
          }, 0).toFixed(2)}
        </div>
        {validationError && (
          <p className="text-error mt-2 text-right text-sm">{validationError}</p>
        )}
      </div>

      <div className="mt-6 text-right">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={() => {
            const invalid = roomsToBook.some((room) => {
              const range = dateRanges[room._id]?.[0];
              return !range?.startDate || !range?.endDate || !isBefore(range.startDate, range.endDate);
            });

            if (invalid) {
              setValidationError("Please make sure all rooms have valid check-in and check-out dates.");
              return;
            }

            setValidationError("");
            setIsConfirmOpen(true);
          }}
          className="btn btn-success"
        >
          {loading ? "Processing..." : "Proceed to Booking"}
        </motion.button>
      </div>

      <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-base-100 max-w-md w-full p-6 rounded shadow-xl">
            <Dialog.Title className="text-xl font-bold mb-4">{t("Confirm Booking")}</Dialog.Title>
            <p className="mb-6">{t("Are you sure you want to confirm your booking?")}</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsConfirmOpen(false)} className="btn">
                {t("Cancel")}
              </button>
              <button onClick={handleConfirmBooking} className="btn btn-success">
                {t("Confirm")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <ToastContainer />
    </div>
  );
}

export default Checkout;