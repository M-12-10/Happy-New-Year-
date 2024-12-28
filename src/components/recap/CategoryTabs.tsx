import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Camera, Utensils, Video } from "lucide-react";

interface CategoryTabsProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const CategoryTabs = ({
  activeTab = "food",
  onTabChange = () => {},
}: CategoryTabsProps) => {
  return (
    <div className="w-full bg-pink-50 p-4">
      <Tabs
        defaultValue={activeTab}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="w-full max-w-md mx-auto bg-white/50 p-1">
          <TabsTrigger
            value="food"
            className="flex items-center gap-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
          >
            <Utensils className="h-4 w-4" />
            <span>Food Adventures</span>
          </TabsTrigger>
          <TabsTrigger
            value="photos"
            className="flex items-center gap-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
          >
            <Camera className="h-4 w-4" />
            <span>Photo Gallery</span>
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="flex items-center gap-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
          >
            <Video className="h-4 w-4" />
            <span>Video Memories</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="food" className="mt-4">
          {/* Food content will be rendered by parent */}
        </TabsContent>
        <TabsContent value="photos" className="mt-4">
          {/* Photos content will be rendered by parent */}
        </TabsContent>
        <TabsContent value="videos" className="mt-4">
          {/* Videos content will be rendered by parent */}
        </TabsContent>
      </Tabs>

      {/* Decorative Hello Kitty bow */}
      <div className="absolute top-2 right-2">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=kittybow"
          alt="Hello Kitty bow"
          className="w-8 h-8 opacity-70"
        />
      </div>
    </div>
  );
};

export default CategoryTabs;
