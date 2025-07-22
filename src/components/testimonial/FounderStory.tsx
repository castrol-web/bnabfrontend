import { motion } from "framer-motion";
import { FaQuoteLeft, FaGlassMartiniAlt, FaHotel, FaQuoteRight, FaUtensils } from "react-icons/fa";
import { DiCoffeescript } from "react-icons/di";
import { GiWashingMachine } from "react-icons/gi";
import bart2 from "../../assets/bart2.jpeg"

function FounderStory() {
  return (
    <div className="bg-gray-900 py-16 px-6 lg:px-20 text-white mt-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Image with animation */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <img
              src={bart2}
              alt="Bart Ketelaars"
              className="rounded-2xl shadow-lg w-full object-cover max-h-[800px]"
            />
            <div className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-xl font-semibold text-sm shadow-lg">
              Bart Ketelaars, Founder & CEO
            </div>
          </div>
        </motion.div>

        {/* Right - Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="bg-base-100/10 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/10 shadow-xl space-y-5">
            <div className="text-yellow-400 flex items-center space-x-2 text-lg">
              <FaQuoteLeft />
              <h2 className="text-2xl font-bold">A Journey of Passion & Purpose</h2>
            </div>
            <p>
              My name is <span className="font-semibold text-white">Bart Ketelaars</span>, a colorful traveler with a passion for adventure and hospitality. At 40, I left the Netherlands to start a new life in Tanzania—where Kilimanjaro reaches for the sky and the Serengeti roars with life.
            </p>
            <p>
              In 2023, with my partner <span className="font-semibold text-white">Blanka Claud</span>, I opened a Bed & Breakfast in Moshi. Together, we welcome guests with warmth, comfort, and a deep connection to the natural and cultural beauty of Tanzania.
            </p>
            <p>
              Every stay is more than a room—it's an experience, a friendship, and a memory made for life.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm font-medium mt-4">
              <div className="bg-base-100/10 py-4 rounded-xl">
                <FaHotel className="text-2xl mx-auto mb-1 text-[#FF7F50]" />
                Accommodation
              </div>

              <div className="bg-base-100/10 p-4 rounded-xl">
                <FaUtensils className="text-2xl mx-auto mb-1 text-[#FFA500]" />
                Restaurant
              </div>

              <div className="bg-base-100/10 p-4 rounded-xl">
                <FaGlassMartiniAlt className="text-2xl mx-auto mb-1 text-[#00BFA6]" />
                Bar
              </div>

              <div className="bg-base-100/10 p-4 rounded-xl">
                <DiCoffeescript className="text-2xl mx-auto mb-1 text-[#6F4E37]" />
                Coffee Café
              </div>

              <div className="bg-base-100/10 p-4 rounded-xl">
                <GiWashingMachine className="text-2xl mx-auto mb-1 text-[#1E90FF]" />
                Laundry
              </div>
            </div>


            <div className="text-yellow-400 flex items-center justify-end text-lg mt-4">
              <FaQuoteRight />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FounderStory;
