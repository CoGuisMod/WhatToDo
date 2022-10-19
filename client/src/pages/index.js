import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Logo from "../components/Logo";

import HeroImg from "/public/assets/hero.png";

const index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>WhatToDo?</title>
        <meta name="description" content="To do application." />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="px-8 md:px-16 pt-16">
        <section className="flex flex-col md:flex-row gap-x-8 gap-y-10 max-w-7xl mx-auto">
          <div className="w-full max-w-lg">
            <h1 className=" font-semibold text-3xl sm:text-4xl">
              The application that helps you organize and plan <Logo />
            </h1>
            <div className="py-2" />
            <h2 className="text-sm md:text-base">
              Make books, create lists and add thing to do! Orgnize your
              schedule, goals and tasks as easy as that.
            </h2>
            <div className="py-4" />
            <Link href="/signup">
              <span className="cta_button">Register now!</span>
            </Link>
          </div>

          <div className="grow rounded-3xl w-full overflow-hidden image-shadow">
            <Image src={HeroImg} />
          </div>
        </section>
      </main>

      <div className="py-3" />

      <footer className="border-t border-slate-50/10 mt-auto py-4">
        <p className="font-normal text-center text-slate-50/50">
          Designed and built by{" "}
          <a
            href="https://imcamilomillan.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-50 hover:text-purple-500 transition-colors duration-200 ease-in-out"
          >
            Camilo Millan
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default index;
