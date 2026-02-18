import React, { useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const controls = useAnimation();
  const [drawerHeight, setDrawerHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      controls.start({ y: 0 });
    } else {
      controls.start({ y: "100%" });
    }
  }, [isOpen, controls]);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 0) {
      controls.set({ y: info.offset.y });
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > drawerHeight * 0.3) {
      closeDrawer();
    } else {
      controls.start({ y: 0 });
    }
  };

  const closeDrawer = async () => {
    await controls.start({ y: "100%" });
    onClose();
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeDrawer}
        />
      )}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-primary shadow-lg rounded-t-lg z-50 max-h-[80vh] overflow-y-auto"
        ref={(node) => {
          if (node) setDrawerHeight(node.getBoundingClientRect().height);
        }}
      >
        <div className="flex justify-between items-center p-4">
          <div className="w-8" />
          <div className="h-1 w-16 bg-gray-300 rounded-full mx-auto" />
          <IoClose size={24} onClick={closeDrawer} className="cursor-pointer" />
        </div>
        <div className="p-4">{children}</div>
      </motion.div>
    </>
  );
};

export default MobileDrawer;
