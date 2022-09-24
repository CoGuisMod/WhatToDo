import React from "react";
import { Link } from "react-router-dom";

/* Style import */
import "./style.css";

/* Images imports */
import HeroImg from "../../assets/hero.png";

const index = () => {
  return (
    <section className="max-w-7xl w-full h-screen mx-auto pt-24 px-8">
      <div className="flex flex-col md:flex-row gap-y-16">
        <div className="grow max-w-xl pr-8">
          <h1 className="font-medium text-4xl mb-4">
            The application that helps you organize and plan{" "}
            <Link to="/" className="brand">
              <span className="brand-one">What</span>
              <span className="brand-two">To</span>Do
              <span className="brand-three">?</span>
            </Link>
          </h1>
          <p className="mb-8">
            Make books, create lists and add thing to do! Orgnize your schedule,
            goals and tasks as easy as that.
          </p>
          <Link to="/signup" className="home_button">
            Register now!
          </Link>
        </div>
        <div className="grow">
          <img
            src={HeroImg}
            alt="ToDo Skeleton Website"
            className="rounded-3xl w-full overflow-hidden home_hero-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default index;
