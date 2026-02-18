import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavButtonProps {
  icon?: React.ReactNode;
  name: string;
  href: string;
  active: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, name, href, active }) => {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  const Icon = () => icon;

  const Content = () => (
    <div className="p-2 flex gap-2 items-center select-none md:text-base">
      <Icon />
      <span className="text-sm">{name}</span>
    </div>
  );

  return (
    <div
      className={`rounded-lg transition ${
        isCurrent
          ? "text-secondary"
          : `${active ? "md:hover:text-secondary-lighter text-white" : "text-gray-500"}`
      }`}
    >
      <motion.div
        whileHover={{ x: isCurrent || !active ? 0 : 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="m-0!"
      >
        {active ? (
          <Link href={href}>
            <Content />
          </Link>
        ) : (
          <Content />
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(NavButton);
