import footer, { companyInfo } from "@/constants/footer";
import React from "react";
import FooterOption from "./FooterOption";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 text-sm text-white p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {footer.map((option, index) => (
          <div key={index} className="mb-4 sm:mb-0">
            <h3 className="mb-2 font-semibold">{option.heading}</h3>
            <ul className="list-none">
              {option.options.map((item, index) => (
                <FooterOption href={item.href} text={item.text} key={index} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-gray-700 pt-4">
        <p>{companyInfo}</p>
      </div>
      <div className="mt-4 mb-12 md:mb-0 flex flex-col sm:flex-row justify-between items-center">
        <span className="mb-2 sm:mb-0">1 APT = $5.66</span>
        <span>© 2024 retro.top | All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
