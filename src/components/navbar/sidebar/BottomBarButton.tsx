import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: number;
}

interface ItemProps {
  icon: React.ComponentType<IconProps>;
  name: string;
  onclick?: () => void;
}

interface RippleItemProps {
  item: ItemProps;
}

interface RippleState {
  x: number;
  y: number;
  id: number;
}

const BottomBarButton: React.FC<RippleItemProps> = ({ item }) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev, { x, y, id: Date.now() }]);
    if (item.onclick) {
      item.onclick();
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center w-full overflow-hidden cursor-pointer"
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon className="text-2xl text-gray-600" size={16} />
      <span className="text-xs mt-1 text-gray-600">{item.name}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute w-5 h-5 bg-white bg-opacity-70 rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onAnimationComplete={() => {
              setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id));
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default BottomBarButton;
