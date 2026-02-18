"use client";

import React, { useState, useCallback } from "react";
import { RiSearchLine, RiGift2Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import NavButton from "../NavButton";
import MobileDrawer from "./MobileDrawer";
import navbars from "@/constants/navbar";
import { FaChevronDown } from "react-icons/fa";
import BottomBarButton from "./BottomBarButton";
import useDailyClaimModalStore from "@/store/daily-claim";

const Sidebar: React.FC = () => {
  const { openDailyClaimModal } = useDailyClaimModalStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<boolean[]>(
    new Array(navbars.length).fill(true)
  );

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const navItems = [
    { name: "Menu", icon: FiMenu, onclick: () => toggleDrawer() },
    { name: "Search", icon: RiSearchLine, onclick: () => {} },
    {
      name: "Daily Rewards",
      icon: RiGift2Line,
      onclick: () => openDailyClaimModal(),
    },
  ];

  const renderNavContent = useCallback(
    () => (
      <>
        {navbars.map((navbar, navbarIndex: number) => (
          <div
            className={`p-4 md:border-r-1 border-gray-800 ${
              navbars.length - 1 === navbarIndex ? "" : "border-b"
            }`}
            key={navbarIndex}
          >
            <div
              className={`flex justify-between items-center rounded-sm md:p-1 transition cursor-pointer`}
              onClick={() => navbar.expantion && toggleSection(navbarIndex)}
            >
              <h1 className="text-sm font-semibold select-none">
                {navbar.heading}
              </h1>
              <motion.div
                animate={{ rotate: expandedSections[navbarIndex] ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {navbar.expantion && (
                  <FaChevronDown size={10} className="hidden md:block" />
                )}
              </motion.div>
            </div>
            <AnimatePresence>
              {expandedSections[navbarIndex] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1 overflow-hidden mt-2"
                >
                  {navbar.options.map((item, index) => (
                    <NavButton
                      icon={item.icon}
                      name={item.name}
                      href={item.href}
                      active={item.active}
                      key={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </>
    ),
    [navbars, expandedSections]
  );

  return (
    <>
      <nav className="desktop-sidebar float-left pt-0 text-white hidden md:block md:border-r border-gray-800 bg-primary-light md:bg-primary overflow-y-scroll">
        {renderNavContent()}
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 shadow-lg z-50 bg-primary">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item, index) => (
            <BottomBarButton item={item} key={index} />
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {isDrawerOpen && (
          <MobileDrawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
            {renderNavContent()}
          </MobileDrawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
