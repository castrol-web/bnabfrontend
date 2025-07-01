type headerProps ={
    pageName:string;
}

function Header({pageName}:headerProps) {
    return (
        <div className="items-center mt-16">
            <div
                className="hero h-60 hero-custom-bg" 
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="lg:max-w-4xl items-center sm:max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{pageName}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header