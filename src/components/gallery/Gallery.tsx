import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import UseGalleryStore from "../../zustand/UseGalleryStore";
import Header from "../Header";
import { useTranslation } from "react-i18next";

interface FlattenedImage {
  src: string;
  caption: string;
  category: string;
}

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { fetchGallery, gallery } = UseGalleryStore();
  const [images, setImages] = useState<FlattenedImage[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    if (gallery && gallery.length > 0) {
      const flattened = gallery.flatMap((entry) =>
        entry.pictures.map((pic) => ({
          src: pic,
          caption: entry.caption,
          category: entry.category,
        }))
      );
      setImages(flattened);
    }
  }, [gallery]);

  const uniqueCategories = ["All", ...new Set(gallery.map((g) => g.category))];

  const filteredImages = images.filter(
    (img) => selectedCategory === "All" || img.category === selectedCategory
  );

  const openImage = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(filteredImages[index].src);
  };

  const closeImage = () => setSelectedImage(null);

  const prevImage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex].src);
  };

  const nextImage = () => {
    const newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex].src);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <div className="text-center">
      <Header pageName={t("Gallery")} />

      <div className="flex flex-wrap gap-4 justify-center mt-6 mb-10">
        {uniqueCategories.map((category) => (
          <button
            type="button"
            key={category}
            className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium ${
              selectedCategory === category
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-orange-100"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {t(category)}
          </button>
        ))}
      </div>

      <motion.div
        className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-6 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={`${image.src}-${index}`}
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl cursor-pointer group"
            whileHover={{ scale: 1.03 }}
            onClick={() => openImage(index)}
          >
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {selectedImage && (
        <div
          className="z-30 fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center px-4"
          {...swipeHandlers}
        >
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={closeImage}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors duration-200 text-3xl"
              title={t("Close")}
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-between w-full flex-wrap sm:flex-nowrap gap-4">
                <button
                  type="button"
                  onClick={prevImage}
                  className="text-white bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-all duration-200 w-10 h-10 flex items-center justify-center"
                  title={t("Previous")}
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>

                <img
                  src={selectedImage}
                  alt="Full View"
                  className="max-h-[60vh] sm:max-h-[70vh] w-full sm:w-auto object-contain rounded-lg mx-auto"
                />

                <button
                  type="button"
                  onClick={nextImage}
                  className="text-white bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-all duration-200 w-10 h-10 flex items-center justify-center"
                  title={t("Next")}
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </div>

              <p className="text-white mt-4 text-sm md:text-base italic px-4 max-w-2xl">
                {t(filteredImages.find((img) => img.src === selectedImage)?.caption || "")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
