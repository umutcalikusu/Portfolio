import React, { useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Logo from "../assets/logo2.png";
import { Link } from "react-scroll";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#1F2544] text-gray-300">
      <div>
        <img src={Logo} alt="Logo" style={{ width: "50px" }} />
      </div>
      {/* menu */}
      <ul className="hidden md:flex">
        <li>
          <Link to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li>
          <Link to="skills" smooth={true} duration={500}>
            Skills
          </Link>
        </li>
        <li>
          <Link to="work" smooth={true} duration={500}>
            Work
          </Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={500}>
            Contact
          </Link>
        </li>
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10 cursor-pointer">
        {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#1F2544] flex flex-col justify-center items-center z-10"
        }
      >
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="about" smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="skills" smooth={true} duration={500}>
            Skills
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="work" smooth={true} duration={500}>
            Work
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="contact" smooth={true} duration={500}>
            Contact
          </Link>
        </li>
      </ul>

      {/* Social icons */}
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600">
            <a
              className="flex justify-between items-center w-full text-gray-300 px-4"
              href="https://www.linkedin.com/in/umut-%C3%A7al%C4%B1ku%C5%9Fu-705306232?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BuO0dkT2KT0OHhwAp5JvSaA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]">
            <a
              className="flex justify-between items-center w-full text-gray-300 px-4"
              href="https://github.com/umutcalikusu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]">
            <a
              className="flex justify-between items-center w-full text-gray-300 px-4"
              href="mailto:umut54709@gmail.com"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]">
            <a
              className="flex justify-between items-center w-full text-gray-300 px-4"
              href="UmutÇALIKUŞU_en_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Social Icons */}
      <div className="lg:hidden fixed bottom-4 left-0 right-0 flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <a
              href="https://www.linkedin.com/in/umut-%C3%A7al%C4%B1ku%C5%9Fu-705306232?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BuO0dkT2KT0OHhwAp5JvSaA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500"
            >
              <FaLinkedin size={25} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/umutcalikusu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-500"
            >
              <FaGithub size={25} />
            </a>
          </li>
          <li>
            <a
              href="mailto:umut54709@gmail.com"
              className="text-gray-300 hover:text-[#6fc2b0]"
            >
              <HiOutlineMail size={25} />
            </a>
          </li>
          <li>
            <a
              href="UmutÇALIKUŞU_en_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#565f69]"
            >
              <BsFillPersonLinesFill size={25} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
