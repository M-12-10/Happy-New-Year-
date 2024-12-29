import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import ReactPlayer from "react-player";

interface Video {
  id: string;
  videoUrl: string;
}

interface VideoStripProps {
  videos?: Video[];
}

const VideoStrip = ({ videos }: VideoStripProps) => {
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);
  const [localVideos, setLocalVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Function to get all files from /assets/videos
    const loadVideos = async () => {
      try {
        const videoFiles = import.meta.glob("/public/assets/videos/*.mp4");
        const videoItems: Video[] = Object.keys(videoFiles).map((path) => ({
          id: path,
          videoUrl: path.replace("/public", ""),
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

  return (
    <div className="w-full bg-pink-50 p-6 min-h-screen">
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {displayVideos.map((video) => (
            <Card
              key={video.id}
              className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="aspect-square relative overflow-hidden">
                <ReactPlayer
                  url={video.videoUrl}
                  width="100%"
                  height="100%"
                  light={true}
                  playIcon={
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  }
                />
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
        />
      )}
    </div>
  );
};

export default VideoStrip;
