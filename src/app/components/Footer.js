import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter
} from 'react-icons/fa';

import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[url('/images/foot1.png')] bg-no-repeat bg-center bg-cover  text-white">

      <div className="container mx-auto px-15 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        
        <div className="flex flex-col items-center md:items-start">
              <Image
                src="/images/img_Footer_Img.png"
                alt="Coffee cup"
                width={210}
                height={210}
                className="object-contain"
                priority
              />
        </div>
        {/* Location */}
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-4xl font-semibold mb-4 text-justify" style={{ fontFamily: "Fairplay Display" }}>
            Location
          </h3>
          <p className="leading-loose ">
            Jl. Perintis Kemerdekaan VII No.6 Blok
            D4,Tamalanrea Indah, Kec.Tamalanrea,
            Kota Makassar, Sulawesi Selatan 90245
          </p>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-4xl font-semibold mb-4" style={{ fontFamily: "Fairplay Display" }}>
            Contact Us
          </h3>
          <p className="leading-loose">
          +62 810 560 7684 <br/>
          kupliqcafe@gmail.com<br/>
          www.kupliqcafe.com
          </p>
        </div>

        {/* Social Media + Brand */}
        <div className="flex flex-col justify-center items-end">
          <h3 className="text-4xl font-semibold mb-4" style={{ fontFamily: "Fairplay Display" }}>
            Find us on...
          </h3>
          <div className="flex gap-4 text-2xl mb-4">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
            <FaTwitter />
          </div>
          <h1 className="text-4xl font-medium" style={{ fontFamily: "Cormorant Infant, serif" }}>
            Kupliq Cafe
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;