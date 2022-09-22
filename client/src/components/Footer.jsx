import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-600 text-center py-4">
      <p className="text-slate-400 mx-auto">
        Design and build by{" "}
        <a
          href="https://imcamilomillan.web.app/"
          target="_blank"
          className="text-slate-300 hover:text-purple-500"
        >
          Camilo Millan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
