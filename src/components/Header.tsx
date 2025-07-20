import headerImage from "../assets/home2.jpg";

type headerProps = {
  pageName: string;
};

function Header({ pageName }: headerProps) {
  return (
    <div className="items-center lg:mt-24 mt-28">
      <div
        className="hero h-60 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="lg:max-w-4xl items-center sm:max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{pageName}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
