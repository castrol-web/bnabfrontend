const GoogleMapEmbeded = () => (
    <div className="w-full rounded-xl shadow-md overflow-hidden mt-10">
        <iframe
            title="B&B google location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.053827565724!2d37.3394077739855!3d-3.3368759966378843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1839d98ca9deafdb%3A0x65d8869a79453e0a!2sB%26B%20HOTEL!5e0!3m2!1sen!2stz!4v1749212382248!5m2!1sen!2stz"
            className="border-0"
            width="100%"
            height="400"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    </div>
);

export default GoogleMapEmbeded;
