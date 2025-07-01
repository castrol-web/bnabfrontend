import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateRange, type RangeKeyDict } from "react-date-range";
import { format, isBefore } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Search = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const handleApplyPromo = (code: string) => {
    const validCodes: { [key: string]: number } = {
      SUMMER25: 25,
      KIDSFREE: 15,
    };
    const discountValue = validCodes[code.toUpperCase()];
    setDiscount(discountValue || 0);
  };

  const handleDateChange = (item: RangeKeyDict) => {
    const range = item.selection;
    setState([
      {
        startDate: range.startDate!,
        endDate: range.endDate!,
        key: "selection",
      },
    ]);
  };

  const handleCheckAvailability = () => {
    const { startDate, endDate } = state[0];
    if (!isBefore(startDate, endDate)) {
      setError("Check-out date must be after check-in.");
      return;
    }
    setError("");
    toast.info(
      `Booking from ${format(startDate, "PPP")} to ${format(
        endDate,
        "PPP"
      )} for ${adults} adults and ${kids} kids. Discount: ${discount}%`
    );
  };

  return (
    <div className="relative opacity-75 z-20 w-full max-w-4xl mx-auto p-4 rounded-lg shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Date Picker */}
        <div className="relative col-span-1">
          <label className="block text-sm mb-1">Check-in - Check-out</label>
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full px-3 py-2 border rounded text-sm text-left"
          >
            {`${format(state[0].startDate, "MMM dd")} - ${format(
              state[0].endDate,
              "MMM dd, yyyy"
            )}`}
          </button>
          {showCalendar && (
            <div className="absolute z-30 mt-2 shadow-lg">
              <DateRange
                editableDateInputs
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
                minDate={new Date()}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Adults & Kids */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm mb-1">Adults</label>
            <select
              title="select number"
              className="w-full border rounded px-3 py-2 text-sm"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm mb-1">Kids</label>
            <select
              title="select number"
              className="w-full border rounded px-3 py-2 text-sm"
              value={kids}
              onChange={(e) => setKids(parseInt(e.target.value))}
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="block text-sm mb-1">Promo Code</label>
          <input
            type="text"
            placeholder="Enter code"
            className="w-full border rounded px-3 py-2 text-sm"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              handleApplyPromo(e.target.value);
            }}
          />
          {discount > 0 && (
            <p className="text-green-500 text-xs mt-1">
              ✅ {discount}% discount applied!
            </p>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleCheckAvailability}
          className="bg-[#F2910A] px-6 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Check Availability
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Search;
