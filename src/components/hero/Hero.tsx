import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Hero() {
    const {t} = useTranslation()
    return (
        <div className="hero min-h-1/4 hero-custom-bg mt-10">
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div>
                    <h1 className="mb-5 text-5xl font-bold">{t("B&B Hotel - Your Perfect Stay in Moshi")}</h1>
                    <p className="mb-5">
                       {t(" Whether you're climbing the majestic Mount Kilimanjaro, embarking on a safari adventure, or visiting for business,B&B Hotel is your ideal home away from home.Book your reservation today and experience the comfort, service, and scenery that sets B&B Hotel apart.")}
                    </p>
                    <Link to="/our-rooms" className="btn btn-primary">{t("Book now")}</Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;