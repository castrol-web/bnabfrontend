import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiStarSLine } from "react-icons/ri";
import { FaRegStarHalf, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UseRoomStore from "../zustand/UseRoomStore";
import { useCart } from "../context/CartContext";
import Search from "../components/Search";
import { useTranslation } from "react-i18next";

interface RoomConfiguration {
  roomType: string;
  price: number;
  numberOfBeds: number;
  bedType: string;
  maxPeople: number;
}

interface Room {
  _id: string;
  title: string;
  roomNumber: string;
  description: string;
  amenities: string[];
  configurations: RoomConfiguration[];
  pictures: string[];
  frontViewPicture: string;
  status: string;
  starRating: number;
  createdAt?: string;
}

interface CartItem extends Room {
  selectedConfiguration: RoomConfiguration;
}

const Rooms = () => {
  const { t } = useTranslation();
  const { rooms, loading, fetchRooms } = UseRoomStore();
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [selectedConfigIndex, setSelectedConfigIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchRooms();
  }, []);

  const isInCart = (roomId: string) =>
    cart.some((item) => item._id === roomId);

  const handleToggleCart = (room: Room, configIndex: number) => () => {
    const config = room.configurations[configIndex];
    if (!config) return;

    if (isInCart(room._id)) {
      removeFromCart(room._id, config.roomType);
    } else {
      addToCart({ ...room, selectedConfiguration: config });
    }
  };

  const handleBookNow = (room: Room, configIndex: number) => {
    const config = room.configurations[configIndex];
    if (!config) return;
    const cartItem: CartItem = { ...room, selectedConfiguration: config };
    navigate("/checkout", {
      state: { directBooking: true, room: cartItem },
    });
  };

  const handleConfigChange = (roomId: string, newIndex: number) => {
    setSelectedConfigIndex((prev) => ({ ...prev, [roomId]: newIndex }));
  };

  return (
    <div className="mt-28">
      <Header pageName={t("Our Rooms")} />
      <Search />

      {loading ? (
        <div className="px-4 lg:px-20 space-y-10 mt-10">
          {[...Array(3)].map((_, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col-reverse lg:flex-row items-center gap-10 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-full lg:w-5/12 space-y-3">
                <div className="h-4 bg-base-300 rounded w-1/4"></div>
                <div className="h-6 bg-base-300 rounded w-1/2"></div>
                <div className="h-4 bg-base-300 rounded w-1/3"></div>
                <div className="h-24 bg-base-200 rounded"></div>
                <div className="h-4 bg-base-300 rounded w-1/3"></div>
              </div>
              <div className="w-full lg:w-5/12 h-64 bg-base-200 rounded-xl"></div>
            </motion.div>
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">{t("No rooms available at the moment.")}</p>
      ) : (
        rooms.map((room, index) => {
          const selectedIndex = selectedConfigIndex[room._id] ?? 0;
          const selectedConfig = room.configurations[selectedIndex];

          if (!selectedConfig) {
            return (
              <div key={room._id || index} className="p-4 text-center text-red-600">
                {t("No configurations available for this room.")}
              </div>
            );
          }

          return (
            <div
              key={room._id || index}
              className="flex flex-col-reverse lg:mx-20 mx-5 py-4 lg:flex-row items-center justify-between gap-10 mt-10 lg:px-20 px-8 border border-white/10 shadow-xl bg-white/5 rounded-lg backdrop-blur-md backdrop-saturate-150"
            >
              <motion.div
                className="hidden lg:flex w-16 h-[150px] items-center justify-center border border-white/10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="transform -rotate-90 text-xs text-gray-300 tracking-wide">
                  {(selectedConfig.roomType?.toUpperCase() || t("ROOM")) + " "}
                  <span className="ml-4 font-semibold">{index + 1}</span>
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:w-5/12"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center text-sm gap-2 mb-2">
                  {Array.from({ length: Math.floor(room.starRating || 0) }).map((_, i) => (
                    <RiStarSLine key={i} className="text-yellow-500" />
                  ))}
                  {room.starRating % 1 !== 0 && <FaRegStarHalf className="text-yellow-500" />}
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">{room.title}</h2>
                <p className="text-gray-300 mb-2">
                  {t("Starting from")} <span className="text-red-500 text-2xl font-semibold">${selectedConfig.price}/</span>
                  {t("night")}
                </p>
                <p className="text-gray-400 text-sm mb-4 break-words max-w-full md:max-w-2xl lg:max-w-3xl flex-1">
                  {room.description}
                </p>

                <div className="mb-4">
                  <label htmlFor={`config-select-${room._id}`} className="font-semibold text-white mb-1 block">
                    {t("Choose configuration:")}
                  </label>
                  <div className="text-xs text-gray-400 mb-1">
                    {t("Room Type, Number of Beds, Bed Type, Price per Night")}
                  </div>
                  <select
                    id={`config-select-${room._id}`}
                    value={selectedIndex}
                    onChange={(e) => handleConfigChange(room._id, Number(e.target.value))}
                    className="border border-white/20 bg-white/10 text-white rounded p-2 w-full max-w-xs backdrop-blur-sm"
                  >
                    {room.configurations.map((config, i) => (
                      <option key={i} value={i} className="bg-black text-white">
                        {`${config.roomType} - ${config.numberOfBeds} beds - ${config.bedType} - $${config.price}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-gray-300 space-y-1 mb-4">
                  <p>
                    {t("Status")}: <span className={`font-medium ${room.status === "available"
                      ? "text-green-400"
                      : room.status === "booked"
                        ? "text-orange-400"
                        : "text-red-400"
                      }`}>{t(room.status)}</span>
                  </p>
                  <p>{t("Deposit")}: <span className="text-gray-100">{t("Not required")}</span></p>
                  <p>{t("Beds")}: <span className="text-gray-100">{selectedConfig.numberOfBeds}</span></p>
                  <p>{t("Bed Type")}: <span className="text-gray-100">{selectedConfig.bedType}</span></p>
                </div>

                <Link
                  to={`/room-details/${room._id}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mb-2"
                >
                  {t("View Details")} <IoMdArrowDropright className="ml-1" />
                </Link>

                <div className="flex gap-4 flex-wrap mt-2">
                  <button
                    type="button"
                    onClick={handleToggleCart(room, selectedIndex)}
                    className={`inline-flex items-center gap-2 font-semibold rounded-full px-4 py-2 text-sm shadow-md transition ${isInCart(room._id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                      } text-white`}
                  >
                    {isInCart(room._id) ? <FaCheckCircle /> : <FaShoppingCart />}
                    {isInCart(room._id) ? t("Remove from Cart") : t("Add to Cart")}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBookNow(room, selectedIndex)}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-4 py-2 text-sm shadow-md"
                  >
                    <MdShoppingCartCheckout />
                    {t("Book Now")}
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="w-full lg:w-5/12"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <figure className="relative rounded-xl shadow-xl overflow-hidden w-full h-[300px] border border-white/10">
                  <img
                    src={room.frontViewPicture}
                    alt={t("Room Front View")}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </motion.div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Rooms;
