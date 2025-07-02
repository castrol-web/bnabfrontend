import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiStarSLine } from "react-icons/ri";
import { FaRegStarHalf } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UseRoomStore from "../zustand/UseRoomStore";
import { useCart } from "../context/CartContext";
import Search from "../components/Search";
import { useTranslation } from "react-i18next";

const Rooms = () => {
  const { t } = useTranslation();
  const { rooms, loading, fetchRooms } = UseRoomStore();
  const [imgLoaded, setImgLoaded] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const isInCart = (id: string) => cart.some((item) => item._id === id);

  const handleToggleCart = (room: any) => () => {
    if (!room) return;
    isInCart(room._id) ? removeFromCart(room._id) : addToCart(room);
  };

  const handleBookNow = (room: any) => {
    navigate("/checkout", {
      state: { directBooking: true, room },
    });
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
      ) : Array.isArray(rooms) && rooms.length > 0 ? (
        rooms.map((room, index) => (
          <div
            key={room._id || index}
            className={`flex flex-col-reverse mx-auto ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center justify-between gap-10 mt-10 lg:px-20 px-8`}
          >
            <motion.div
              className="hidden lg:flex w-16 h-[150px] items-center justify-center border-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="transform -rotate-90 text-xs text-gray-600 tracking-wide">
                {(room.roomType?.toUpperCase() || t("ROOM")) + " "}
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
                {Array.from({ length: Math.floor(room.starRating || 0) }).map(
                  (_, i) => (
                    <RiStarSLine key={i} className="text-yellow-500" />
                  )
                )}
                {room.starRating % 1 !== 0 && (
                  <FaRegStarHalf className="text-yellow-500" />
                )}
              </div>

              <h2 className="text-3xl font-bold mb-2">{room.title}</h2>
              <p className="text-gray-600 mb-2">
                {t("Starting from")}{" "}
                <span className="text-red-600 text-2xl font-semibold">
                  ${room.price}/
                </span>
                {t("night")}
              </p>
              <p className="text-gray-500 text-sm mb-4 break-words max-w-full md:max-w-2xl lg:max-w-3xl flex-1">
                {room.description}
              </p>
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>
                  {t("Status")}:{" "}
                  <span
                    className={`font-medium ${
                      room.status === "available"
                        ? "text-green-600"
                        : room.status === "booked"
                        ? "text-orange-400"
                        : "text-red-600"
                    }`}
                  >
                    {t(room.status)}
                  </span>
                </p>
                <p>
                  {t("Deposit")}:{" "}
                  <span className="text-gray-700">{t("Not required")}</span>
                </p>
                <p>
                  {t("Beds")}: <span className="text-gray-700">{room.numberOfBeds}</span>
                </p>
              </div>

              <Link
                to={`/room-details/${room._id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-2"
              >
                {t("View Details")} <IoMdArrowDropright className="ml-1" />
              </Link>

              <div className="flex gap-4 flex-wrap mt-2">
                <button
                  type="button"
                  onClick={handleToggleCart(room)}
                  className={`btn font-semibold rounded-full transition ${
                    isInCart(room._id)
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                >
                  {isInCart(room._id) ? t("Remove from Cart") : t("Add to Cart")}
                </button>

                <button
                  type="button"
                  onClick={() => handleBookNow(room)}
                  className="btn btn-success font-semibold rounded-full text-white"
                >
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
              <figure className="relative rounded-xl shadow-lg overflow-hidden w-full h-[300px]">
                {!imgLoaded && (
                  <div className="absolute inset-0 bg-gray-500 animate-pulse opacity-5" />
                )}
                <img
                  src={room.frontViewPicture}
                  alt={t("Room Front View")}
                  loading={index < 2 ? "eager" : "lazy"}
                  onLoad={() => setImgLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                    imgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
                  }`}
                />
              </figure>
            </motion.div>
          </div>
        ))
      ) : (
        !loading && (
          <p className="text-center text-gray-500 mt-10">{t("No rooms available at the moment.")}</p>
        )
      )}
    </div>
  );
};

export default Rooms;
