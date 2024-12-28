import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

interface VideoPlayerProps {
  isOpen?: boolean;
  onClose?: () => void;
  videoUrl?: string;
}

const VideoPlayer = ({
  isOpen = true,
  onClose = () => {},
  videoUrl = "https://example.com/sample-video.mp4",
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-pink-50 p-6 rounded-xl">
        <div className="space-y-4">
          {/* Video Display Area */}
          <div className="relative aspect-video bg-pink-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=kitty"
                alt="Hello Kitty placeholder"
                className="w-24 h-24 opacity-50"
              />
            </div>
          </div>

          {/* Kawaii-style Controls */}
          <div className="bg-white rounded-full p-4 shadow-md">
            <div className="flex items-center justify-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 text-pink-500"
                onClick={() => {}}
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 text-pink-500"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 text-pink-500"
                onClick={() => {}}
              >
                <SkipForward className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 text-pink-500"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 px-4">
              <div className="h-2 bg-pink-100 rounded-full">
                <div
                  className="h-full w-1/3 bg-pink-400 rounded-full"
                  style={{ width: "33%" }}
                />
              </div>
              <div className="flex justify-between text-sm text-pink-400 mt-1">
                <span>0:00</span>
                <span>3:45</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
