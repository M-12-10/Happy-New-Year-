import React, { useState } from "react";
import CategoryTabs from "./recap/CategoryTabs";
import FoodGrid from "./recap/FoodGrid";
import PhotoGrid from "./recap/PhotoGrid";
import VideoStrip from "./recap/VideoStrip";

const Home = () => {
  const [activeTab, setActiveTab] = useState("food");

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      {/* Header */}
      <div className="bg-pink-50 p-8 text-center border-b border-pink-200">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">
          The Maryam Recap
        </h1>
        <p className="text-pink-400">My Sweetest Memories of 2024</p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Navigation */}
        <CategoryTabs
          activeTab={activeTab}
          onTabChange={(value) => setActiveTab(value)}
        />

        {/* Content Area */}
        <div className="mt-8">
          {activeTab === "food" && <FoodGrid />}
          {activeTab === "photos" && <PhotoGrid />}
          {activeTab === "videos" && <VideoStrip />}
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-20 left-4 animate-bounce delay-100">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=kitty3"
            alt="Hello Kitty decoration"
            className="w-16 h-16 opacity-30"
          />
        </div>
        <div className="fixed bottom-4 right-4 animate-bounce delay-300">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=kitty4"
            alt="Hello Kitty decoration"
            className="w-16 h-16 opacity-30"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-pink-50 py-4 text-center border-t border-pink-200">
        <p className="text-pink-400 text-sm">
          Made with ❤️ and lots of kawaii spirit
        </p>
      </div>
    </div>
  );
};

export default Home;
