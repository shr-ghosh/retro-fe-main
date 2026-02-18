'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  text: string;
  href: string;
}

const FooterOption: React.FC<Props> = ({ text, href }) => {
  return (
    <li className="mb-2">
      <Link href={href} passHref>
        <motion.span
          className="inline-block text-gray-400 hover:text-gray-200 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {text}
        </motion.span>
      </Link>
    </li>
  );
};

export default FooterOption;
