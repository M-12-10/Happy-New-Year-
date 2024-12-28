import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoPlayer from "./VideoPlayer";

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
    <div className="w-full bg-pink-50 p-6 rounded-xl">
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {displayVideos.map((video) => (
            <div
              key={video.id}
              className="relative flex-shrink-0 w-[300px]"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-pink-100">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
              </div>
            </div>
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
