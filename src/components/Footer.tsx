import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
   FaTiktok 
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <div className="mt-15 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 pb-6 grid grid-cols-1 md:grid-cols-3 gap-8  items-center justify-center text-center">
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
          <p className="mt-1">{t("Phone")}: +255764338937</p>
          <p>
            {t("Email")}:{" "}
            <a href="mailto:bnabhotel@gmail.com" className="text-blue-400 hover:underline">
              bnabhotel@gmail.com
            </a>
          </p>
        </div>

        {/* Socials */}
        <div className="items-center justify-center text-center mx-auto">
          <h2 className="text-lg font-bold text-white mb-3 text-center">{t("Follow Us")}</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.facebook.com/share/1ETv8qDcU8/?mibextid=wwXIfr" aria-label="Facebook">
              <FaFacebook className="text-2xl text-blue-800 hover:text-blue-400" />
            </a>
            <a href="https://wa.me/+255764338937" aria-label="Whatsapp">
              <FaWhatsapp className="text-2xl hover:text-green-700 text-green-800" />
            </a>
            <div className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-lg p-1">
              <a href="https://www.instagram.com/bbhotel88?igsh=OHQ4eHBhMXQ5eWtp" aria-label="Instagram">
                <FaInstagram className="text-xl text-white hover:text-slate-50" />
              </a>
            </div>
            <div className="bg-gradient-to-tr from-[#69C9D0] via-[#EE1D52] to-[#010101] rounded-lg p-1">
              <a href="https://www.tiktok.com/@bb.hotel4t" aria-label="Tiktok">
                <FaTiktok  className="text-xl text-white hover:text-slate-50" />
              </a>
            </div>
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
