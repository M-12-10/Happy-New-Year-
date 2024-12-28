import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import FoodDetailModal from "./FoodDetailModal";

interface FoodItem {
  id: string;
  name: string;
  image: string;
  date: string;
  location: string;
  description: string;
  rating: number;
}

interface FoodGridProps {
  foods?: FoodItem[];
}

const defaultFoods: FoodItem[] = [
  {
    id: "1",
    name: "Kawaii Bento Box",
    image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1",
    date: "2023-12-25",
    location: "Hello Kitty Cafe, Tokyo",
    description:
      "The most adorable bento box filled with rice shaped like Hello Kitty!",
    rating: 5,
  },
  {
    id: "2",
    name: "Pink Macarons",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43",
    date: "2023-12-20",
    location: "Sweet Dreams Bakery",
    description: "Delicate pink macarons with Hello Kitty designs",
    rating: 4,
  },
  {
    id: "3",
    name: "Character Latte",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    date: "2023-12-15",
    location: "Kawaii Coffee Shop",
    description: "A lovely latte with Hello Kitty latte art",
    rating: 5,
  },
  {
    id: "4",
    name: "Cute Cupcakes",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d",
    date: "2023-12-10",
    location: "Ribbon Pastries",
    description: "Pink frosted cupcakes with bow decorations",
    rating: 4,
  },
  {
    id: "5",
    name: "Strawberry Cake",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    date: "2023-12-05",
    location: "Sweet Corner",
    description: "Fresh strawberry cake with Hello Kitty topper",
    rating: 5,
  },
  {
    id: "6",
    name: "Character Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    date: "2023-12-01",
    location: "Cookie Paradise",
    description: "Decorated cookies with kawaii characters",
    rating: 4,
  },
];

const FoodGrid = ({ foods = defaultFoods }: FoodGridProps) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  return (
    <div className="bg-pink-50 p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {foods.map((food) => (
          <Card
            key={food.id}
            className="group relative overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg">{food.name}</h3>
                <p className="text-white/80 text-sm">{food.location}</p>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4 text-pink-500" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                >
                  <Share2 className="h-4 w-4 text-pink-500" />
                </Button>
              </div>
            </div>
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setSelectedFood(food)}
            />
          </Card>
        ))}
      </div>

      {selectedFood && (
        <FoodDetailModal
          isOpen={true}
          onClose={() => setSelectedFood(null)}
          food={selectedFood}
        />
      )}

      {/* Decorative Hello Kitty elements */}
      <div className="fixed top-8 right-8 animate-bounce">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=kitty1"
          alt="Hello Kitty decoration"
          className="w-16 h-16 opacity-50"
        />
      </div>
      <div className="fixed bottom-8 left-8 animate-bounce delay-150">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=kitty2"
          alt="Hello Kitty decoration"
          className="w-16 h-16 opacity-50"
        />
      </div>
    </div>
  );
};

export default FoodGrid;
