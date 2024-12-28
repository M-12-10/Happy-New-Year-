import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

interface FoodDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  food?: {
    name: string;
    image: string;
    date: string;
    location: string;
    description: string;
    rating: number;
  };
}

const defaultFood = {
  name: "Kawaii Bento Box",
  image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1",
  date: "2023-12-25",
  location: "Hello Kitty Cafe, Tokyo",
  description:
    "The most adorable bento box filled with rice shaped like Hello Kitty, colorful vegetables, and tamago!",
  rating: 5,
};

const FoodDetailModal = ({
  isOpen = true,
  onClose = () => {},
  food = defaultFood,
}: FoodDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-pink-50 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-pink-600 flex items-center gap-2">
            {food.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="relative">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
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

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-pink-400">Date</h3>
              <p className="text-gray-700">{food.date}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-pink-400">Location</h3>
              <p className="text-gray-700">{food.location}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-pink-400">
                Description
              </h3>
              <p className="text-gray-700">{food.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-pink-400">Rating</h3>
              <div className="flex items-center gap-1">
                {Array.from({ length: food.rating }).map((_, i) => (
                  <span key={i} className="text-pink-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodDetailModal;
