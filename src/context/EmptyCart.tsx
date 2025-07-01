import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card w-full max-w-md bg-base-100 shadow-lg border border-base-200 text-center p-6"
            >
                <div className="flex flex-col items-center space-y-4">
                    <FiShoppingCart className="text-5xl text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-700">
                        Your cart is empty
                    </h2>
                    <p className="text-sm text-gray-500">
                        Looks like you haven’t added any rooms yet.
                    </p>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={() => navigate("/our-rooms")}
                    >
                        Browse Rooms
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default EmptyCart;
