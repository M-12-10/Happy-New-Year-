import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

interface Video {
  id: string;
  videoUrl: string;
}

interface VideoStripProps {
  videos?: Video[];
}

const VideoStrip = ({ videos }: VideoStripProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [localVideos, setLocalVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Load videos directly from the public/assets/videos folder in the GitHub repo
    const loadVideos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/M-12-10/Happy-New-Year-/contents/public/assets/videos",
        );
        const data = await response.json();
        const videoItems: Video[] = data.map((file: any) => ({
          id: file.name,
          videoUrl: file.download_url,
        }));
        setLocalVideos(videoItems);
      } catch (error) {
        console.error("Error loading videos:", error);
      }
    };

    if (!videos) {
      loadVideos();
    }
  }, [videos]);

  const displayVideos = videos || localVideos;

  const handleVideoClick = (videoId: string) => {
    const index = displayVideos.findIndex((v) => v.id === videoId);
    setCurrentIndex(index);
    setSelectedVideo(videoId);
  };

  const handlePrevious = () => {
    const newIndex =
      (currentIndex - 1 + displayVideos.length) % displayVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(displayVideos[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % displayVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(displayVideos[newIndex].id);
  };

  return (
    <div className="w-full bg-pink-50 p-6 min-h-screen">
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {displayVideos.map((video) => (
            <Card
              key={video.id}
              className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="aspect-square relative overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  preload="metadata"
                  muted
                  playsInline
                >
                  <source src={`${video.videoUrl}#t=0.1`} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {selectedVideo && (
        <VideoPlayer
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          videoUrl={displayVideos.find((v) => v.id === selectedVideo)?.videoUrl}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default VideoStrip;
