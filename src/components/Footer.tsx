import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaSnapchat,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <div className="mt-32 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 pb-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Navigation */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">{t("Navigation")}</h2>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-orange-400">{t("Home")}</a></li>
            <li><a href="/about" className="hover:text-orange-400">{t("About")}</a></li>
            <li><a href="/contact" className="hover:text-orange-400">{t("Contact")}</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">B&B hotel</h2>
          <p><span className="pr-4">{t("Location")}:</span> Moshi, Tanzania</p>
          <p className="mt-1">{t("Phone")}: +255 111 333 345</p>
          <p>
            {t("Email")}:{" "}
            <a href="mailto:bnb@hotel.com" className="text-blue-400 hover:underline">
              B&B@hotel.com
            </a>
          </p>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">{t("Follow Us")}</h2>
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
        <p>
          {t("Privacy Policy")} • <NavLink to="">{t("Richkid Solutions")}</NavLink> © {year} • {t("All Rights Reserved")}
        </p>
      </div>
    </div>
  );
}

export default Footer;
