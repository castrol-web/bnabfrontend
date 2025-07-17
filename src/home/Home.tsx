import AboutSection from "../about/AboutSection";
import FAQs from "../components/frequentlyaskedquestions/FAQs";
import GalleryPreview from "../components/gallery/GalleryPreview";
import MainHeader from "../components/MainHeader"
import { TestimonialCarousel } from "../components/testimonial/TestimonialCarousel";
import Services from "../service/Services";
import ThingsToDo from "../service/ThingsToDo";

function Home() {
    return (
        <div className="items-center justify-center">
            <MainHeader />
            <AboutSection />
            <Services />
            <FAQs />
            <GalleryPreview />
            <TestimonialCarousel />
            <ThingsToDo />
        </div>
    )
}

export default Home