import Image, { StaticImageData } from "next/image";
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface SizedImageProps extends DivProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  noCorner?: boolean;
}

const SizedImage: React.FC<SizedImageProps> = ({
  src,
  alt,
  className = "h-[15rem] aspect-3/4",
  imageClassName = "",
  noCorner = false,
}) => {
  return (
    <div
      className={`${className} overflow-hidden relative ${
        noCorner ? "" : "rounded-md"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        className={imageClassName}
        loading="lazy"
        objectFit="cover"
        fill
      />
    </div>
  );
};

export default SizedImage;