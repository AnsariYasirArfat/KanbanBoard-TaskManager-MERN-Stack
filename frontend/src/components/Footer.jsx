import React from "react";
import footerLogo from "../assets/footerLogo.png";
const Footer = () => {
  return (
    <footer className="mt-2 d-flex flex-column flex-md-row justify-content-md-between align-items-center p-2">
      <div className=" d-flex flex-md-row align-items-center ms-4 ">
        {/* Insert your footer logo here */}
        <img alt="Logo" width="30" src={footerLogo} className="mainLogo me-2" />
        <p className=" footerName m-0 me-3"> TaskTracker</p>
        {/* Copyright */}
        <p className="m-0 copywrite">
          &copy; {new Date().getFullYear()} TaskTracker.com
        </p>
      </div>
      <div className="footer-info d-flex flex-md-row align-items-center my-2">
        <p className="m-0 me-2">Email: ansariyaseer786@gmail.com</p>
        {/* Hashnode */}
        <a href="https://ansariyasirarfat.hashnode.dev/" className="me-2">
          <img
            src="https://img.icons8.com/color/48/null/hashnode.png"
            alt="hashnode"
            width={30}
          />
        </a>
        {/* GitHub */}
        <a href="https://github.com/AnsariYasirArfat" className="me-2">
          <img
            src="https://img.icons8.com/windows/32/null/github.png"
            alt="github"
            width={30}
          />
        </a>
        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/yaseer-ansari-364a25262/">
          <img
            src="https://img.icons8.com/color/48/null/linkedin.png"
            alt="Linkedin"
            width={30}
          />
        </a>
      </div>
      <div className="me-3">
        <a href="#top">
          <img
            src="https://img.icons8.com/fluency/48/null/double-up.png"
            width={25}
            alt="Back to Top"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
