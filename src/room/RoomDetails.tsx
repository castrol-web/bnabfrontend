import { motion } from "framer-motion";
import { FaCheckCircle, FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { MdShoppingBag } from "react-icons/md";
import UseSpecificRoomStore from "../zustand/UseSpecificRoomStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";

const RoomDetails = () => {
  const { t } = useTranslation();
  const { fetchRoom, loading, room } = UseSpecificRoomStore();
  const { cart, addToCart, removeFromCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedConfig, setSelectedConfig] = useState<any>(null);

  useEffect(() => {
    if (id) fetchRoom(id);
  }, [id]);

  useEffect(() => {
    if (room && room.configurations.length > 0) {
      setSelectedConfig(room.configurations[0]);
    }
  }, [room]);

  const isInCart = cart.some(
    (item) => item._id === id && item.selectedConfiguration?.roomType === selectedConfig?.roomType
  );

  const handleToggleCart = () => {
    if (!room || !selectedConfig) return;

    const roomWithConfig = {
      ...room,
      selectedConfiguration: selectedConfig,
    };

    isInCart
      ? removeFromCart(room._id, selectedConfig.roomType)
      : addToCart(roomWithConfig);
  };

  const handleDirectBooking = () => {
    if (!room || !selectedConfig) return;

    navigate("/checkout", {
      state: {
        directBooking: true,
        room: {
          ...room,
          selectedConfiguration: selectedConfig,
        },
      },
    });
  };

  const reviews = [
    {
      name: "Daniel Vannuth",
      date: "Jan 5th, 2025",
      rating: 5,
      text: t("Great experience, very cozy and clean rooms!"),
    },
    {
      name: "Jennifer Lopez",
      date: "Jan 6th, 2025",
      rating: 4,
      text: t("Loved the service, would book again!"),
    },
  ];

  if (loading) return <p className="mt-28 text-center">{t("Loading room...")}</p>;
  if (!room) return <p className="mt-28 text-center">{t("Room not found.")}</p>;

  return (
    <div className="px-4 md:px-20 py-10 space-y-16 text-base-content mt-28 max-w-5xl mx-auto">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="carousel w-full shadow-lg rounded-lg overflow-hidden">
          {room?.pictures.map((picture, index) => (
            <div key={index} id={`slide${index}`} className="carousel-item relative w-full">
              <img src={picture} className="w-full object-cover max-h-[500px]" alt={`room-${index}`} />
              <a
                href={`#slide${index - 1}`}
                className="btn btn-circle btn-sm absolute left-4 top-1/2 transform -translate-y-1/2"
                aria-label={t("Previous slide")}
              >
                ❮
              </a>
              <a
                href={`#slide${(index + 1) % room.pictures.length}`}
                className="btn btn-circle btn-sm absolute right-4 top-1/2 transform -translate-y-1/2"
                aria-label={t("Next slide")}
              >
                ❯
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-sm uppercase tracking-widest text-gray-400">{t("Start from")}</p>
          <p className="text-2xl font-bold text-red-600 inline-block">${selectedConfig?.price}</p>
          <span className="text-gray-500"> {t("/ night")}</span>
          <p className="text-gray-500">
            {t("Passenger")}: <span className="font-semibold">{selectedConfig?.maxPeople}</span>
          </p>

          <div className="mt-4 text-left max-w-xs mx-auto">
            <label
              htmlFor="config-select"
              className="block mb-1 font-semibold text-gray-300"
            >
              {t("Choose configuration:")}
            </label>
            <div className="text-xs text-gray-400 mb-1">
              {t("Room Type,Beds, Bed Type, Price $/Night")}
            </div>
            <select
              id="config-select"
              className="w-full rounded border border-gray-600 bg-gray-900 text-gray-100 p-2"
              onChange={(e) =>
                setSelectedConfig(
                  room.configurations.find((c) => c.roomType === e.target.value)
                )
              }
              value={selectedConfig?.roomType || ""}
            >
              {room.configurations.map((config) => (
                <option
                  key={config.roomType}
                  value={config.roomType}
                  className="bg-gray-900 text-gray-100"
                >
                  {`${config.roomType} - ${config.numberOfBeds} - ${config.bedType} - ${config.maxPeople}- $${config.price}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <section className="text-center space-y-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-400">{room.title}</h2>
        <p className="text-gray-400">
          {Array.isArray(room.description) ? room.description.join(" ") : room.description}
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-orange-400">{t("Amenities")}</h2>
        <ul className="flex flex-wrap justify-center gap-4">
          {room.amenities.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-green-400">
              <FaCheckCircle />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-orange-400">{t("Reviews")}</h2>
        <div className="space-y-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-lg p-4 flex gap-4 items-start text-gray-300"
            >
              <div className="avatar">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt={review.name} />
                </div>
              </div>
              <div className="text-left flex-1">
                <h4 className="font-semibold text-white">
                  {review.name}{" "}
                  <span className="text-sm text-gray-400 ml-2">{review.date}</span>
                </h4>
                <div className="flex items-center text-yellow-400 mb-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <AiFillStar key={i} />
                  ))}
                </div>
                <p className="text-sm">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center gap-6 max-w-md mx-auto mt-8">
        <button
          type="button"
          onClick={handleToggleCart}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${isInCart
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
            } text-white shadow-lg`}
        >
          {isInCart ? <FaTrashAlt /> : <FaShoppingCart />}
          {isInCart ? t("Remove from Cart") : t("Add to Cart")}
        </button>

        <button
          type="button"
          onClick={handleDirectBooking}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 font-semibold text-white shadow-lg"
        >
          <MdShoppingBag />
          {t("Book Now")}
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
