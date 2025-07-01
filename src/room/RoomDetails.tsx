import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import UseSpecificRoomStore from "../zustand/UseSpecificRoomStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';

const RoomDetails = () => {
    const { fetchRoom, loading, room } = UseSpecificRoomStore();
    const { cart, addToCart, removeFromCart } = useCart();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchRoom(id);
    }, [id]);

    const isInCart = cart.some((item) => item._id === id);

    const handleToggleCart = () => {
        if (!room) return;
        isInCart ? removeFromCart(room._id) : addToCart(room);
    };

    const navigate = useNavigate();

    const handleDirectBooking = () => {
        navigate("/checkout", {
            state: { directBooking: true, room }, // pass room data
        });
    };

    const reviews = [
        {
            name: "Daniel Vannuth",
            date: "Jan 5th, 2025",
            rating: 5,
            text: "Great experience, very cozy and clean rooms!",
        },
        {
            name: "Jennifer Lopez",
            date: "Jan 6th, 2025",
            rating: 4,
            text: "Loved the service, would book again!",
        },
    ];

    if (loading) return <p className="mt-28 text-center">Loading room...</p>;
    if (!room) return <p className="mt-28 text-center">Room not found.</p>;

    return (
        <div className="px-4 md:px-20 py-10 space-y-16 text-base-content mt-28">
            {/* Carousel */}
            <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="carousel w-full shadow-lg rounded-lg overflow-hidden">
                    {room?.pictures.map((picture, index) => (
                        <div key={index} id={`slide${index}`} className="carousel-item relative w-full">
                            <img
                                src={picture}
                                className="w-full object-cover max-h-[500px]"
                                alt={`room-${index}`}
                            />
                            <a href={`#slide${index - 1}`} className="btn btn-circle btn-sm absolute left-4 top-1/2 transform -translate-y-1/2">❮</a>
                            <a href={`#slide${(index + 1) % room.pictures.length}`} className="btn btn-circle btn-sm absolute right-4 top-1/2 transform -translate-y-1/2">❯</a>
                        </div>
                    ))}
                </div>

                {/* Pricing */}
                <div className="text-center mt-4">
                    <p className="text-sm uppercase tracking-widest text-gray-400">Start from</p>
                    <p className="text-2xl font-bold text-red-600 inline-block">${room.price}</p>
                    <span className="text-gray-500"> / night</span>
                    <p className="text-gray-500">Passenger: <span className="font-semibold">{room.maxPeople}</span></p>
                </div>
            </motion.div>

            {/* Description */}
            <section className="text-center space-y-4 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold">{room.title}</h2>
                <p className="text-gray-600">{Array.isArray(room.description) ? room.description.join(" ") : room.description}</p>
            </section>

            {/* Amenities */}
            <section className="text-center">
                <h2 className="text-3xl font-bold mb-6">Amenities</h2>
                <ul className="flex flex-wrap justify-center gap-4">
                    {room.amenities.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <FaCheckCircle className="text-green-500" />
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Reviews */}
            <section className="text-center max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Reviews</h2>
                <div className="space-y-6">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-base-200 rounded-lg p-4 flex gap-4 items-start">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt={review.name} />
                                </div>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold">
                                    {review.name} <span className="text-sm text-gray-400 ml-2">{review.date}</span>
                                </h4>
                                <div className="flex items-center text-yellow-500 mb-1">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <AiFillStar key={i} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">{review.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Book Now */}
            <div className="text-center mx-96 justify-between flex items-center">
                <button
                    type="button"
                    className="btn btn-success px-8 rounded-full text-white font-bold"
                    onClick={handleDirectBooking}
                >
                    BOOK NOW
                </button>
                {/* Cart Toggle Button */}
                <button
                    type="button"
                    onClick={handleToggleCart}
                    className={`btn font-semibold rounded-full transition ${isInCart ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                        } text-white`}
                >
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default RoomDetails;
