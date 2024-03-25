import Link from "next/link";
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import "./component.css";

function Footer() {
  return (
    <div className="footer">
      <div className="address_cont">
        <div className="address">
          <h2>DUET Branch</h2>
          <p>
            House No.: 401/A, Baitul Fazal Mosque(Side), Word- 25, DUET, Gazipur
            City, Gazipur.
          </p>
        </div>
        <div className="divider"></div>
        <div className="address">
          <h2>Salna Branch</h2>
          <p>
            Hazi Mansion, 1st Floor, West Salna Bazar, Kathora Road, Word- 19,
            Gazipur City, Gazipur
          </p>
        </div>
      </div>
      <div className="others">
        <div>
          <p>+88 01712165408</p>
          <p>engineersbd.edd@gmail.com</p>
          <div className="social_links">
            <Link href={"https://www.facebook.com/engineersbd.edd"} target="_blank">
              <FaFacebookSquare className="social_icon" />
            </Link>
            <Link href={"https://www.linkedin.com/company/edd-bd/"} target="_blank">
              <FaLinkedin className="social_icon" />
            </Link>
            <Link href={"https://twitter.com/EngineersDesig1"} target="_blank">
              <FaXTwitter className="social_icon" />
            </Link>
            <Link href={"https://www.youtube.com/channel/UCRn9pnpVXdsH4TJpdaGZgsA"} target="_blank">
              <FaYoutube className="social_icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="copywrite">Devleoped by @Synafeia. 2024</div>
    </div>
  );
}

export default Footer;
