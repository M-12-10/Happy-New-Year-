import React, { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface VideoPlayerProps {
  isOpen?: boolean;
  onClose?: () => void;
  videoUrl?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

const VideoPlayer = ({
  isOpen = true,
  onClose = () => {},
  videoUrl = "",
  onPrevious = () => {},
  onNext = () => {},
}: VideoPlayerProps) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSkipBack = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(Math.max(0, currentTime - 10));
  };

  const handleSkipForward = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(Math.min(duration, currentTime + 10));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    playerRef.current?.seekTo(newTime);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentTime = played * duration;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-pink-50 p-6 rounded-xl">
        <div className="space-y-4">
          <div className="relative aspect-video bg-pink-100 rounded-lg overflow-hidden">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={isMuted}
              onProgress={handleProgress}
              onDuration={handleDuration}
              controls={false}
              onClick={handlePlayPause}
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous",
                  },
                  forceVideo: true,
                  forceHLS: false,
                  forceDASH: false,
                },
              }}
            />
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
          </div>

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
                onClick={handlePlayPause}
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
                onClick={handleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
            </div>

            <div className="mt-4 px-4">
              <div
                className="h-2 bg-pink-100 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-pink-400 rounded-full transition-all duration-150"
                  style={{ width: `${played * 100}%` }}
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
