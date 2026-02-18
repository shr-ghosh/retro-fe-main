"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useWindowWidth } from "@react-hook/window-size";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  about?: string;
}

const Label: React.FC<LabelProps> = ({ label, about, ...props }) => {
  const width = useWindowWidth();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <label className="flex items-center mb-1" {...props}>
        {label}
        {about && (
          <span
            className="relative ml-1 cursor-help"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            <FiAlertCircle size={width < 700 ? 14 : 15} />
            <AnimatePresence>
              {isTooltipVisible && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.1 }}
                  className="absolute left-full top-0 ml-2 p-2 text-xs text-white bg-primary rounded-sm shadow-lg z-10 min-w-40"
                >
                  {about}
                </motion.div>
              )}
            </AnimatePresence>
          </span>
        )}
      </label>
    </div>
  );
};

export default Label;
