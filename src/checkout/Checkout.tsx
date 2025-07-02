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
  maxPeople: number;
  roomType: string;
}

interface LocationState {
  directBooking?: boolean;
  room?: Room;
}

function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();
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
  const {t} = useTranslation();


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
          endDate: new Date(Date.now() + 86400000), // +1 day
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
      const response = await axios.post(`${url}/api/user/bookings`, { rooms: bookingPayload, totalAmount }, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user?.token || '',
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        // Handle redirection
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

  if (!directBooking && cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="px-6 lg:px-32 mt-32 mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center justify-center">{t("Checkout")}</h1>

      {roomsToBook.map((item) => {
        const range = dateRanges[item._id]?.[0];
        return (
          <motion.div
            key={item._id}
            className="p-6 rounded shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-2">{t(item.title)}</h2>
            <p className="text-sm text-gray-500 mb-2">{t(item.roomType)}</p>
            <p className="text-sm text-gray-400">{t("Max people")}: {item.maxPeople}</p>

            <label className="block mt-2 text-sm font-medium text-gray-700">
             {t("Number of Guests")} 
            </label>
            <input
              type="number"
              min={1}
              max={item.maxPeople}
              value={guestCounts[item._id] || 1}
              onChange={(e) =>
                handleGuestChange(item._id, e.target.value, item.maxPeople)
              }
              className="mt-1 w-24 px-2 py-1 border rounded"
            />

            <div className="relative mt-4">
              <label className="block text-sm mb-1">{t("Check-in - Check-out")}</label>
              <button
                type="button"
                onClick={() =>
                  setCalendarOpen((prev) => ({
                    ...prev,
                    [item._id]: !prev[item._id],
                  }))
                }
                className="w-full px-3 py-2 border rounded text-sm text-left"
              >
                {range?.startDate && range?.endDate
                  ? `${format(range.startDate, "MMM dd")} - ${format(
                    range.endDate,
                    "MMM dd, yyyy"
                  )}`
                  : "Select dates"}
              </button>

              {calendarOpen[item._id] && (
                <div className="absolute z-30 mt-2 shadow-lg">
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

            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">${item.price}{t("/night")}</span>
              {!directBooking && (
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                 {t("Remove")} 
                </button>
              )}
            </div>
          </motion.div>
        );
      })}

      <div className="p-4 rounded mt-6">
        <h2 className="text-lg font-semibold mb-2">{t("Summary")}</h2>
        <ul className="space-y-2 text-sm">
          {roomsToBook.map((room) => {
            const range = dateRanges[room._id]?.[0];
            if (!range?.startDate || !range?.endDate) return null;
            const nights = differenceInDays(range.endDate, range.startDate);
            const subtotal = nights * room.price;
            return (
              <li key={room._id}>
                <span className="font-medium">{room.title}</span> — {nights} night(s) × ${room.price} = <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </li>
            );
          })}
        </ul>

        <div className="text-right mt-4 font-semibold text-lg">
          {t("")}Total: $
          {roomsToBook.reduce((sum, room) => {
            const range = dateRanges[room._id]?.[0];
            if (!range?.startDate || !range?.endDate) return sum;
            const nights = differenceInDays(range.endDate, range.startDate);
            return sum + nights * room.price;
          }, 0).toFixed(2)}
        </div>

        {validationError && (
          <p className="text-red-600 text-sm mt-2 text-right">{validationError}</p>
        )}
      </div>

      <div className="text-right mt-6">
        <button
          type="button"
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
        </button>
      </div>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-md w-full p-6 rounded shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4">
             {t("Confirm Booking")} 
            </Dialog.Title>
            <p className="mb-6">{t("Are you sure you want to confirm your booking?")}</p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="text-gray-500"
              >
               {t("Cancel")}  
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
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