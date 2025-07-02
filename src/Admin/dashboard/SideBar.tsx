import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome, FaUserTie, FaFileAlt} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navItems = [
    { label: "Dashboard", icon: <FaHome />, href: "/admin", end: true },
    { label: "Gallery", icon: <FaUserTie />, href: "/admin/gallery-management" },
    { label: "Rooms", icon: <FaFileAlt />, href: "/admin/room-management" },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Hamburger button */}
            <button
                title="open menu"
                type="button"
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-base-100 border p-2 rounded-lg shadow-lg"
            >
                <FaBars size={20} />
            </button>

            {/* Sidebar (desktop) */}
            <div className="hidden md:flex w-64 h-screen  p-4 shadow-md flex-col fixed left-0 top-0 z-40 border-r border-gray-400">
                <h2 className="text-xl font-bold text-primary mb-6">Admin Panel</h2>
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.href}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-2 mb-2 rounded transition ${isActive ? "bg-primary text-white" : "btn btn-outline"
                            }`
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </div>

            {/* Sidebar (mobile) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween" }}
                        className="fixed top-0 left-0 w-64 h-screen bg-base-200 p-4 shadow-lg z-50"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
                            <button
                                title="close"
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 hover:text-error"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.href}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-2 mb-2 rounded transition ${isActive ? "bg-primary text-white" : "hover:bg-base-300 text-slate-50"
                                    }`
                                }
                                onClick={() => setIsOpen(false)} // auto-close menu
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        ))}
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;