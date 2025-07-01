import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="hero min-h-1/4 hero-custom-bg mt-10">
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div>
                    <h1 className="mb-5 text-5xl font-bold">B&B Hotel – Your Perfect Stay in Moshi</h1>
                    <p className="mb-5">
                        Whether you're climbing the majestic Mount Kilimanjaro, embarking on a safari adventure, or visiting for business,
                        B&B Hotel is your ideal home away from home.
                        Book your reservation today and experience the comfort, service, and scenery that sets B&B Hotel apart.
                    </p>
                    <Link to="/our-rooms" className="btn btn-primary">Book now</Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;