import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import PhotoModal from "./PhotoModal";

interface FoodItem {
  id: string;
  image: string;
}

interface FoodGridProps {
  foods?: FoodItem[];
}

const FoodGrid = ({ foods }: FoodGridProps) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [localFoods, setLocalFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    // Function to get all files from /assets/food
    const loadFoodImages = async () => {
      try {
        const foodFiles = import.meta.glob("/public/assets/food/*");
        const foodItems: FoodItem[] = Object.keys(foodFiles).map((path) => ({
          id: path,
          image: path.replace("/public", ""),
        }));
        setLocalFoods(foodItems);
      } catch (error) {
        console.error("Error loading food images:", error);
      }
    };

    if (!foods) {
      loadFoodImages();
    }
  }, [foods]);

  const displayFoods = foods || localFoods;

  const handleFoodClick = (food: FoodItem, index: number) => {
    setSelectedFood(food);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex =
      (currentIndex - 1 + displayFoods.length) % displayFoods.length;
    setSelectedFood(displayFoods[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % displayFoods.length;
    setSelectedFood(displayFoods[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-pink-50 p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {displayFoods.map((food, index) => (
          <Card
            key={food.id}
            className="group relative overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
            onClick={() => handleFoodClick(food, index)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={food.image}
                alt="Food item"
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        ))}
      </div>

      {selectedFood && (
        <PhotoModal
          isOpen={true}
          onClose={() => setSelectedFood(null)}
          photoUrl={selectedFood.image}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default FoodGrid;
