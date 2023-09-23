import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { FaDumbbell } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="flex justify-between items-center bg-blue-500 text-white px-2 py-1">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-2xl">Fitness Journal</h1>
          <div className="hidden md:flex md:gap-2 text-xl">
            <Link to="/">
              <p className="flex items-center">
                <AiFillHome />
                <span className="">Home</span>
              </p>
            </Link>
            <Link to="/workouts">
              <p className="flex items-center">
                <FaDumbbell />
                <span className="">Workouts</span>
              </p>
            </Link>
            <Link to="/profile">
              <p className="flex items-center">
                <BsFillPersonFill />
                <span className="">Profile</span>
              </p>
            </Link>
          </div>
        </div>
        <Link>Sign Up</Link>
      </nav>
    </header>
  );
}

function MobileMenu({ isOpen, setIsOpen }) {
  return (
    <div className="md:hidden">
      <GiHamburgerMenu onClick={() => setIsOpen(!isOpen)} />
      <div
        className={`fixed top-0 left-0 w-full h-full bg-blue-500 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center text-4xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-0 left-0"
          >
            X
          </button>
          <ul>
            <li>
              <Link to="/">
                <p className="flex items-center  mb-6">
                  <AiFillHome />
                  <span className="ml-2">Home</span>
                </p>
              </Link>
            </li>
            <li>
              <Link to="/workouts">
                <p className="flex items-center mb-6">
                  <FaDumbbell />
                  <span className="ml-2">Workouts</span>
                </p>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <p className="flex items-center">
                  <BsFillPersonFill />
                  <span className="ml-2">Profile</span>
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
