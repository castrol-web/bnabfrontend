import { motion } from "framer-motion";
import { MdWifi, MdLocationOn, MdSecurity } from "react-icons/md";
import Header from "../components/Header";
import StatsView from "../components/stats/StatsView";
import Hero from "../components/hero/Hero";

function About() {
  return (
    <div className="mt-32">
      <Header pageName="ABOUT US" />

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">We Always Make The Best</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg leading-relaxed">
          <p>
            B&B Hotel, the best hotel in Moshi, is located slightly outside the bustling city center of Moshi, Tanzania —
            near the base of majestic Mount Kilimanjaro. We're just 45 minutes from Kilimanjaro International Airport
            and 5 minutes from the city center — perfect for trekkers, safari adventurers, business travelers, and families alike.
            Our warm, welcoming staff is here to provide top-tier service, comfort, and hospitality.
          </p>
          <p>
            Enjoy our spacious, fully-furnished rooms — available as singles, doubles, twins, or triples — each equipped
            with smart TVs, high-speed Wi-Fi, and views of Mount Kilimanjaro. Guests can relax in our shared lounge,
            savor local and international cuisine at our restaurant, and feel secure with 24/7 security, CCTV, and
            luggage storage. Free parking is also available on site.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              className="p-6 rounded-2xl shadow-lg flex flex-col items-start hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MdWifi className="text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comfort & Connectivity</h3>
              <p>
                Relax in shared lounges with high-speed Wi-Fi, Smart TVs, and stunning Mount Kilimanjaro views.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="p-6 rounded-2xl shadow-lg flex flex-col items-start hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MdLocationOn className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p>
                Just 5 minutes from Moshi town and 45 minutes from the airport — ideal for every kind of traveler.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="p-6 rounded-2xl shadow-lg flex flex-col items-start hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MdSecurity className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe & Friendly</h3>
              <p>
                24/7 security, CCTV, and helpful staff ensure your stay is safe, secure, and memorable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsView />
      <Hero />
    </div>
  );
}

export default About;
