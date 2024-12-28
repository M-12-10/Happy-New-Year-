import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FoodDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  food?: {
    name: string;
    image: string;
  };
}

const defaultFood = {
  name: "Kawaii Bento Box",
  image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1",
};

const FoodDetailModal = ({
  isOpen = true,
  onClose = () => {},
  food = defaultFood,
}: FoodDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-pink-50 max-w-3xl p-0 overflow-hidden">
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodDetailModal;
