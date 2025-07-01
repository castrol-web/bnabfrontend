import {
    FaFacebook,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaSnapchat,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className="mt-32 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 pb-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Navigation */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">Navigation</h2>
                    <ul className="space-y-1">
                        <li><a href="/" className="hover:text-orange-400">Home</a></li>
                        <li><a href="/about" className="hover:text-orange-400">About</a></li>
                        <li><a href="/services" className="hover:text-orange-400">Services</a></li>
                        <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">B&B hotel</h2>
                    <p><span className="pr-4">LOCATION:</span>Moshi Tanzania</p>
                    <p className="mt-1">Phone: +255 111 333 345</p>
                    <p>
                        Email:{" "}
                        <a href="mailto:helenusagency@travel.com" className="text-blue-400 hover:underline">
                            B&B@hotel.com
                        </a>
                    </p>
                </div>

                {/* Socials */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">Follow Us</h2>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="/facebook" aria-label="Facebook">
                            <FaFacebook className="text-2xl hover:text-orange-400" />
                        </a>
                        <a href="/twitter" aria-label="Twitter">
                            <FaTwitter className="text-2xl hover:text-orange-400" />
                        </a>
                        <a href="/youtube" aria-label="YouTube">
                            <FaYoutube className="text-2xl hover:text-orange-400" />
                        </a>
                        <a href="/instagram" aria-label="Instagram">
                            <FaInstagram className="text-2xl hover:text-orange-400" />
                        </a>
                        <a href="/snapchat" aria-label="Snapchat">
                            <FaSnapchat className="text-2xl hover:text-orange-400" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 text-sm text-center text-slate-400 py-3 px-4">
                <p>Privacy Policy • <NavLink to="">Richkid Solutions</NavLink>  © {year} • All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;
