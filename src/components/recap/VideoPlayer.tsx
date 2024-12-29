import React, { useRef, useState, useEffect } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        setDuration(videoRef.current?.duration || 0);
      });

      videoRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSkipBack = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10,
      );
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10,
      );
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-pink-50 p-6 rounded-xl">
        <div className="space-y-4">
          {/* Video Display Area */}
          <div className="relative aspect-video bg-pink-100 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain"
              onClick={togglePlay}
            />
          </div>

          {/* Kawaii-style Controls */}
          <div className="bg-white rounded-full p-4 shadow-md">
            <div className="flex items-center justify-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 text-pink-500"
                onClick={handleSkipBack}
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 text-pink-500"
                onClick={togglePlay}
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
                onClick={handleSkipForward}
              >
                <SkipForward className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 text-pink-500"
                onClick={toggleMute}
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
                  className="h-full bg-pink-400 rounded-full transition-all duration-150"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-pink-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
