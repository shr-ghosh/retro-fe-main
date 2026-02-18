import React, { useState } from "react";

const ToggleButton = () => {
  const [activeTab, setActiveTab] = useState("casino");
  const tabs = [
    { id: "casino", label: "Casino", disable: false },
    { id: "sports", label: "Sports", disable: true },
  ];

  return (
    <div className="sidebar-width">
      <div className="hidden md:flex p-1 rounded-md bg-gray-800 h-11">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 rounded-md text-sm ${
              activeTab === tab.id
                ? "bg-secondary text-white"
                : tab.disable
                ? "bg-transparent hover:bg-transparent text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white hover:bg-transparent bg-transparent shadow-none"
            }`}
            onClick={() => {
              if (!tab.disable) {
                setActiveTab(tab.id);
              }
            }}
            disabled={tab.disable}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleButton;