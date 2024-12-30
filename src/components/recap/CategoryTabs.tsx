import React, { useState } from "react";
import { Camera, Utensils, Video, ChevronUp, ChevronDown } from "lucide-react";

interface CategoryTabsProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const tabs = [
  { value: "food", label: "Daily Shenanigans", icon: Utensils },
  { value: "photos", label: "Photo Gallery", icon: Camera },
  { value: "videos", label: "Video Memories", icon: Video },
];

const CategoryTabs = ({
  activeTab = "food",
  onTabChange = () => {},
}: CategoryTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Move to previous tab
  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    setActiveIndex(newIndex);
    onTabChange(tabs[newIndex].value); // Update parent
  };

  // Move to next tab
  const handleNext = () => {
    const newIndex = (activeIndex + 1) % tabs.length;
    setActiveIndex(newIndex);
    onTabChange(tabs[newIndex].value); // Update parent
  };

  const activeTabData = tabs[activeIndex];
  const Icon = activeTabData.icon;

  return (
    <div className="w-full bg-pink-50 p-4 flex flex-col items-center">
      {/* Up Arrow */}
      <button
        onClick={handlePrev}
        className="p-2 rounded-full hover:bg-pink-100 mb-2"
      >
        <ChevronUp className="h-6 w-6 text-pink-500" />
      </button>

      {/* Visible Tab */}
      <button
        className="
          flex items-center gap-2 px-6 py-3 text-base 
          rounded-lg bg-pink-100 text-pink-700 shadow-md
        "
      >
        <Icon className="h-5 w-5" />
        <span>{activeTabData.label}</span>
      </button>

      {/* Down Arrow */}
      <button
        onClick={handleNext}
        className="p-2 rounded-full hover:bg-pink-100 mt-2"
      >
        <ChevronDown className="h-6 w-6 text-pink-500" />
      </button>
    </div>
  );
};

export default CategoryTabs;
