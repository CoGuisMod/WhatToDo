import React from "react";
import { motion } from "framer-motion";

const MessageCard = ({ message }) => {
  const card = {
    hidden: { y: -50, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return message === "" ? null : (
    <motion.div
      variants={card}
      initial="hidden"
      animate="show"
      className="absolute top-4 bg-black rounded-xl mx-auto px-4 py-2"
    >
      {message}
    </motion.div>
  );
};

export default MessageCard;
