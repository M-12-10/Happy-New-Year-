import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

interface PhotoModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  photoUrl?: string;
  photoTitle?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

const PhotoModal = ({
  isOpen = true,
  onClose = () => {},
  onPrevious = () => {},
  onNext = () => {},
}: PhotoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-pink-50">
        <DialogHeader className="p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <DialogTitle className="text-white flex justify-between items-center">
            <span>{photoTitle}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[80vh] bg-pink-100">
          <img
            src={photoUrl}
            alt={photoTitle}
            className="w-full h-full object-contain"
          />

          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/30 hover:bg-white/50 ml-4"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/30 hover:bg-white/50 mr-4"
              onClick={onNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/70 hover:bg-white"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/70 hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Hello Kitty decorative element */}
          <div className="absolute top-4 right-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=kitty"
              alt="Hello Kitty decoration"
              className="w-12 h-12 opacity-70"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;
