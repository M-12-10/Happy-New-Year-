import React, { useState, useEffect } from "react";
import CategoryTabs from "./recap/CategoryTabs";
import FoodGrid from "./recap/FoodGrid";
import PhotoGrid from "./recap/PhotoGrid";
import VideoStrip from "./recap/VideoStrip";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Home = () => {
  const [activeTab, setActiveTab] = useState("food");
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="max-w-2xl bg-gradient-to-b from-pink-50 to-white p-0 border-2 border-pink-200">
          <div className="relative p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 hover:bg-pink-100"
              onClick={() => setShowWelcome(false)}
            >
              <X className="h-4 w-4 text-pink-400" />
            </Button>

            <div className="flex flex-col items-center space-y-6 pt-4">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-pink-600">
                  Happy New Year, My Love! 💖
                </h2>
                <p className="text-lg text-pink-500 max-w-md mx-auto">
                  Here's to another year of creating beautiful memories
                  together. You make every moment special! 🌸
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Button
                  variant="outline"
                  className="bg-pink-100 hover:bg-pink-200 border-pink-300 px-8"
                  onClick={() => setShowWelcome(false)}
                >
                  <Heart className="mr-2 h-5 w-5 text-pink-500" />
                  <span className="text-pink-600 text-lg">Love You Too!</span>
                </Button>
                <p className="text-sm text-pink-400 mt-2">
                  Click to see our memories 💕
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
      </div>

      {/* Footer */}
      <div className="bg-pink-50 py-4 text-center border-t border-pink-200">
        <p className="text-pink-400 text-sm">
          Made with lots of ❤️ for my most special person
        </p>
      </div>
    </div>
  );
};

export default Home;
