import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoPlayer from "./VideoPlayer";
import { Play, Info } from "lucide-react";

interface Video {
  id: string;
  videoUrl: string;
  title: string;
  duration: string;
}

interface VideoStripProps {
  videos?: Video[];
  onVideoSelect?: (videoId: string) => void;
}

const defaultVideos: Video[] = [
  {
    id: "1",
    videoUrl: "/assets/videos/video1.mp4",
    title: "Birthday Party Celebration",
    duration: "2:30",
  },
  {
    id: "2",
    videoUrl: "/assets/videos/video2.mp4",
    title: "Summer Beach Day",
    duration: "3:45",
  },
  {
    id: "3",
    videoUrl: "/assets/videos/video3.mp4",
    title: "Christmas Morning",
    duration: "4:15",
  },
  {
    id: "4",
    videoUrl: "/assets/videos/video4.mp4",
    title: "Family Picnic",
    duration: "2:50",
  },
];

const VideoStrip = ({
  videos = defaultVideos,
  onVideoSelect = () => {},
}: VideoStripProps) => {
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);
  const [isHovering, setIsHovering] = React.useState<string | null>(null);

  return (
    <div className="w-full bg-pink-50 p-6 rounded-xl">
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative flex-shrink-0 w-[300px] group"
              onMouseEnter={() => setIsHovering(video.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-pink-100">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Play button overlay */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={() => setSelectedVideo(video.id)}
                >
                  <Play className="h-6 w-6 text-pink-500" />
                </Button>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>

                {/* Info button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/70 hover:bg-white"
                >
                  <Info className="h-4 w-4 text-pink-500" />
                </Button>
              </div>

              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {selectedVideo && (
        <VideoPlayer
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          videoUrl={videos.find((v) => v.id === selectedVideo)?.videoUrl}
        />
      )}
    </div>
  );
};

export default VideoStrip;
