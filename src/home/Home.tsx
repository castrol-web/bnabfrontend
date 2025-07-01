import AboutSection from "../about/AboutSection";
import FAQs from "../components/frequentlyaskedquestions/FAQs";
import MainHeader from "../components/MainHeader"
import { TestimonialCarousel } from "../components/testimonial/TestimonialCarousel";

function Home() {
    return (
        <div className="items-center justify-center">
            <MainHeader />
            <AboutSection />
            <FAQs />
            <TestimonialCarousel />
        </div>
    )
}

export default Home