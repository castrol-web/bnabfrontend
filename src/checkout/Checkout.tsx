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
import { motion, AnimatePresence } from "framer-motion"; // added AnimatePresence
import { useAuth } from "../hooks/UseAuth";
import EmptyCart from "../context/EmptyCart";
import { useTranslation } from "react-i18next";
const url = import.meta.env.VITE_SERVER_URL;

interface LocationState {
  directBooking?: boolean;
  room?: any;
}

function Checkout() {
  const { cart, clearCart, removeFromCart } = useCart();
  const [specialRequests, setSpecialRequest] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState<Record<string, number>>({});
  const [dateRanges, setDateRanges] = useState<Record<string, Range[]>>({});
  const [calendarOpen, setCalendarOpen] = useState<Record<string, boolean>>({});
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  // New state to track roomsToBook with removal
  const [roomsToBook, setRoomsToBook] = useState<any[]>([]);

  const location = useLocation();
  const state = location.state as LocationState;
  const directBooking = state?.directBooking;
  const roomFromDirect = state?.room;

  // Compose initial roomsToBook once
  useEffect(() => {
    if (directBooking && roomFromDirect) {
      setRoomsToBook([roomFromDirect]);
    } else {
      setRoomsToBook(cart);
    }
  }, [directBooking, roomFromDirect, cart]);

  const { isAuthenticated, LoadingUser, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (roomsToBook.length === 0) return;

    const newGuests: Record<string, number> = {};
    const newRanges: Record<string, Range[]> = {};
    const newCalendarToggles: Record<string, boolean> = {};

    roomsToBook.forEach((room) => {
      const roomKey = `${room._id}-${room.selectedConfiguration.roomType}`;
      newGuests[roomKey] = 1;
      newRanges[roomKey] = [
        {
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          key: "selection",
        },
      ];
      newCalendarToggles[roomKey] = false;
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

  const handleGuestChange = (roomKey: string, value: string, maxPeople: number) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > maxPeople) return;
    setGuestCounts((prev) => ({ ...prev, [roomKey]: num }));
  };

  const handleDateChange = (roomKey: string, ranges: RangeKeyDict) => {
    setDateRanges((prev) => ({
      ...prev,
      [roomKey]: [ranges.selection],
    }));
  };
  const handleRemoveRoom = (roomKey: string) => {
    toast.info(
      <div>
        {t("Are you sure you want to remove this room?")}
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss()}
            className="btn btn-sm btn-outline"
          >
            {t("Cancel")}
          </button>
          <button
            onClick={() => {
              // Remove from local roomsToBook state
              setRoomsToBook((prev) =>
                prev.filter(
                  (room) =>
                    `${room._id}-${room.selectedConfiguration.roomType}` !== roomKey
                )
              );

              // Remove from global cart state as well
              const [roomId, roomType] = roomKey.split("-");
              removeFromCart(roomId, roomType);

              toast.dismiss();
              toast.success(t("Room removed from booking"));
            }}
            className="btn btn-sm btn-error"
          >
            {t("Remove")}
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleConfirmBooking = async () => {
    setIsConfirmOpen(false);

    // Validate inputs
    for (let room of roomsToBook) {
      const roomKey = `${room._id}-${room.selectedConfiguration.roomType}`;
      const guests = guestCounts[roomKey] || 1;
      const range = dateRanges[roomKey]?.[0];
      if (!range?.startDate || !range?.endDate || !isBefore(range.startDate, range.endDate)) {
        setValidationError(`Invalid dates selected for ${room.title} (${room.selectedConfiguration.roomType})`);
        return;
      }
      if (guests > room.selectedConfiguration.maxPeople) {
        setValidationError(`"${room.title}" (${room.selectedConfiguration.roomType}) allows up to ${room.selectedConfiguration.maxPeople} guests.`);
        return;
      }
    }

    const bookingPayload = roomsToBook.map((room) => {
      const roomKey = `${room._id}-${room.selectedConfiguration.roomType}`;
      const range = dateRanges[roomKey][0];
      const nights = differenceInDays(range.endDate!, range.startDate!);
      const guests = guestCounts[roomKey] || 1;
      const subtotal = nights * room.selectedConfiguration.price * guests;
      return {
        room: room._id,
        roomType: room.selectedConfiguration.roomType,
        bedType: room.selectedConfiguration.bedType,
        guests,
        checkInDate: range.startDate,
        checkOutDate: range.endDate,
        pricePerNight: room.selectedConfiguration.price,
        totalNights: nights,
        subtotal,
      };
    });

    const totalAmount = bookingPayload.reduce((sum, item) => sum + item.subtotal, 0);

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/user/bookings`,
        { rooms: bookingPayload, totalAmount, specialRequests },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message || "Room booked successfully");
        setTimeout(() => {
          if (directBooking) {
            navigate("/");
          } else {
            clearCart();
            navigate("/");
          }
        }, 5000);
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message;
      if (error.response?.status === 404 && msg) {
        toast.error(msg)
        navigate("/login", { state: { from: location } })
      } else if (error.response?.status === 401 && msg) {
        toast.error(msg)
        navigate("/login", { state: { from: location } })
      } else if (error.response?.status === 500) {
        toast.error(msg);
      } else {
        toast.error(t("Booking failed.Please try again!"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!directBooking && roomsToBook.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 md:px-16 mt-32 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-orange-500">
        {t("Checkout")}
      </h1>

      <div className="grid gap-6">
        <AnimatePresence>
          {roomsToBook.map((room) => {
            const roomKey = `${room._id}-${room.selectedConfiguration.roomType}`;
            const range = dateRanges[roomKey]?.[0];
            return (
              <motion.div
                key={roomKey}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border border-base-300 p-6 shadow-sm bg-base-500 relative"
              >
                <h2 className="text-xl font-semibold text-primary mb-1">{t(room.title)}</h2>
                <p className="text-sm text-gray-400">
                  {t(room.selectedConfiguration.roomType)} • {t("Max people")}: {room.selectedConfiguration.maxPeople}
                </p>

                <div className="mt-4 sm:flex-row sm:items-center gap-4 flex flex-wrap items-center">
                  <div>
                    <label className="label">
                      <span className="label-text">{t("Number of Guests")}</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={room.selectedConfiguration.maxPeople}
                      value={guestCounts[roomKey] || 1}
                      onChange={(e) => handleGuestChange(roomKey, e.target.value, room.selectedConfiguration.maxPeople)}
                      className="input input-bordered w-24 text-gray-800"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <label className="label">
                      <span className="label-text">{t("Special Requests")}</span>
                    </label>
                    <input
                      type="text"
                      name="specialRequests"
                      placeholder={t("Enter special request if any")}
                      className="input input-bordered w-full text-gray-800"
                      onChange={(e) => setSpecialRequest(e.target.value)}
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
                    onClick={() =>
                      setCalendarOpen((prev) => ({ ...prev, [roomKey]: !prev[roomKey] }))
                    }
                    className="btn btn-outline w-full text-left"
                  >
                    {range?.startDate && range?.endDate
                      ? `${format(range.startDate, "MMM dd")} - ${format(range.endDate, "MMM dd, yyyy")}`
                      : t("Select dates")}
                  </button>

                  {calendarOpen[roomKey] && (
                    <div className="relative z-30 mt-2">
                      <DateRange
                        editableDateInputs
                        onChange={(ranges) => handleDateChange(roomKey, ranges)}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRanges[roomKey]}
                        minDate={new Date()}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-lg font-medium text-primary">${room.selectedConfiguration.price} {t("/night")}</span>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(roomKey)}
                    className="btn btn-error btn-sm ml-4"
                  >
                    {t("Remove")}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-10 card bg-base-500 shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">{t("Summary")}</h2>
        <ul className="text-sm space-y-2">
          {roomsToBook.map((room) => {
            const roomKey = `${room._id}-${room.selectedConfiguration.roomType}`;
            const range = dateRanges[roomKey]?.[0];
            if (!range?.startDate || !range?.endDate) return null;
            const nights = differenceInDays(range.endDate, range.startDate);
            const subtotal = nights * room.selectedConfiguration.price;
            return (
              <li key={roomKey}>
                <span className="font-medium">{room.title}</span> ({room.selectedConfiguration.roomType}) — {nights} night(s) × ${room.selectedConfiguration.price} =
                <span className="font-semibold"> ${(subtotal).toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
        <div className="text-right text-lg font-bold mt-4">
          Total: $
          {roomsToBook.reduce((sum, room) => {
            const roomKey = `${room._id}-${room.selectedConfiguration.roomType}`;
            const range = dateRanges[roomKey]?.[0];
            if (!range?.startDate || !range?.endDate) return sum;
            const nights = differenceInDays(range.endDate, range.startDate);
            return sum + nights * room.selectedConfiguration.price;
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
              const roomKey = `${room._id}-${room.selectedConfiguration.roomType}`;
              const range = dateRanges[roomKey]?.[0];
              return !range?.startDate || !range?.endDate || !isBefore(range.startDate, range.endDate);
            });

            if (invalid) {
              setValidationError(t("Please make sure all rooms have valid check-in and check-out dates."));
              return;
            }

            setValidationError("");
            setIsConfirmOpen(true);
          }}
          className="btn btn-success"
        >
          {loading ? t("Processing...") : t("Proceed to Booking")}
        </motion.button>
      </div>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="bg-base-100 rounded-lg p-6 max-w-md mx-auto z-50">
          <Dialog.Title className="text-xl font-bold mb-4">{t("Confirm Booking")}</Dialog.Title>
          {validationError && <p className="text-error mb-4">{validationError}</p>}
          <p className="mb-6">{t("Are you sure you want to confirm your booking?")}</p>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="btn btn-outline"
            >
              {t("Cancel")}
            </button>
            <button
              onClick={handleConfirmBooking}
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? t("Processing...") : t("Confirm")}
            </button>
          </div>
        </div>
      </Dialog>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Checkout;
