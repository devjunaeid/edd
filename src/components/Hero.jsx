import React from "react";
import "./component.css";
import Image from "next/image";
import heroImg from "../../public/hero/h3.png";
import { IoIosArrowDropdown } from "react-icons/io";
import SubToNewsLatter from "./NewsLatter/SubToNewsLatter";

function Hero() {
  return (
    <div className="hero_cont">
      <div className="hero_title">
        <span>Engineer's</span>Design and Development
      </div>
      <div className="hero_sd">
        <p>
          We, wellcome you to one of the best architectural and structual
          consaltration of Gazipur. We always push the limits and creative
          boundaries. With us you can make your dream reality.
        </p>
        <div className="heroLinks">
          <SubToNewsLatter />
          <a href={"#services"} className="service_link">
            Check out our services
            <IoIosArrowDropdown size={20} />
          </a>
        </div>
      </div>
      <Image src={heroImg} className="hero_img" alt="Hero Img" />
    </div>
  );
}

export default Hero;
