import React, { useState } from "react";
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
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-white">
      {/* Four Bouncing Animated Images in the Corners */}
      <img
        src="https://img.icons8.com/?size=100&id=GYoYivEvwqCz&format=png&color=000000"
        alt="Corner Top Left"
        className="
          animate-bounce
          absolute 
          top-6 left-1 
          w-22 h-auto
          sm:w-16 sm:h-auto 
          md:w-20 md:h-auto
          z-10
        "
      />
      <img
        src="https://img.icons8.com/?size=100&id=GYoYivEvwqCz&format=png&color=000000"
        alt="Corner Top Right"
        className="
          animate-bounce
          absolute 
          top-6 right-1 
          w-22 h-auto 
          sm:w-16 sm:h-auto
          md:w-20 md:h-auto
          z-10
        "
      />

      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent
          className="
            w-full max-w-md sm:max-w-2xl
            bg-gradient-to-b from-pink-50 to-white
            p-0 border-2 border-pink-200
            max-h-[85vh] overflow-y-auto
            z-50 rounded
          "
        >
          <div className="relative p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-4 w-4 hover:bg-pink-100 text-pink-400"
              onClick={() => setShowWelcome(false)}
            ></Button>

            <div className="flex flex-col items-center space-y-6 pt-4">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-pink-600 animate-pulse ">
                  Happy New Year, Meri Jaan! 💖
                </h2>
                <div className="bg-pink-50/80 backdrop-blur-sm p-6 rounded-xl border-2 border-pink-200 shadow-lg">
                  <p className="text-lg text-pink-500 max-w-md mx-auto">
                    To think that this time last year, we were just two randoms
                    added in each other's friendlists, unaware of the other
                    person's existence. However, now, I simply can't imagine my
                    life without you.
                    <br />
                    <br />
                    Everyday, I wake up excited because you are part of my daily
                    routine. I look forward to telling you all about a good day
                    and want to come back to you when I have a bad one. You are
                    beyond amazing and you shine so brightly, you give me
                    purpose and you make me a happier person.
                    <br />
                    <br />
                    With every last bit of conviction that this entire universe
                    can muster up, <b>I LOVE YOU SO MUCH MARYAM!</b>
                    <br />
                    InshaAllah we spend every year together for the rest of all
                    time 🌸
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Button
                  variant="outline"
                  className="bg-pink-100 hover:bg-pink-200 border-pink-300 px-8"
                  onClick={() => setShowWelcome(false)}
                >
                  <Heart className="mr-2 h-5 w-5 text-pink-600" />
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

      {/* Header with decorative image above the text */}
      <div className="bg-pink-50 p-8 border-b border-pink-200">
        {/* Stack everything in a column, centered */}
        <div className="flex flex-col items-center"> 
          <img
            src="public/assets/Screenshot 2024-12-30 140418.png"
            alt="Decorative"
            className="w-40 h-auto rounded-full object-cover shadow-md mb-4"
          />

          <h1 className="text-4xl font-bold text-pink-600 mb-2 text-center">
            The Maryam Recap
          </h1>

          <p className="text-pink-600 text-center">
            My Sweetest Memories of 2024 💘
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <CategoryTabs
          activeTab={activeTab}
          onTabChange={(value) => setActiveTab(value)}
        />

        {/* Render content by active tab */}
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
