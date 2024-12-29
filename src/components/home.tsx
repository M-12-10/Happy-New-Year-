import React, { useState, useEffect } from "react";
import CategoryTabs from "./recap/CategoryTabs";
import FoodGrid from "./recap/FoodGrid";
import PhotoGrid from "./recap/PhotoGrid";
import VideoStrip from "./recap/VideoStrip";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const Home = () => {
  const [activeTab, setActiveTab] = useState("food");
  const { toast } = useToast();

  useEffect(() => {
    // Show toast without duration (persistent)
    toast({
      className: "bg-pink-50 border-pink-200",
      description: (
        <div className="flex flex-col items-center space-y-4 py-2">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=kitty1"
            alt="Hello Kitty"
            className="w-16 h-16"
          />
          <div className="text-center space-y-2">
            <h3 className="font-bold text-pink-600 text-lg">
              Happy New Year, My Love! 💖
            </h3>
            <p className="text-pink-500">
              Here's to another year of creating beautiful memories together.
              You make every moment special! 🌸
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-pink-100 hover:bg-pink-200 border-pink-300"
          >
            <Heart className="mr-2 h-4 w-4 text-pink-500" />
            <span className="text-pink-600">Love You!</span>
          </Button>
        </div>
      ),
    });
  }, [toast]); // Add toast to dependency array

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

      {/* Toast Container */}
      <Toaster />
    </div>
  );
};

export default Home;
