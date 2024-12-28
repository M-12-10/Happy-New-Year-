import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import PhotoModal from "./PhotoModal";

interface Photo {
  id: string;
  url: string;
  title: string;
}

interface PhotoGridProps {
  photos?: Photo[];
}

const defaultPhotos: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1702580477061-93c85d43d09e",
    title: "Hello Kitty Cafe Visit",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1702665420575-76dc2ad67095",
    title: "Sakura Festival",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1702343800920-aa51c2c6c482",
    title: "Birthday Party",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1702338741265-c449be607f18",
    title: "Summer Picnic",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1702309201661-c5de9ff534d0",
    title: "Christmas Celebration",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1702309714891-34a93bf44a23",
    title: "New Year Party",
  },
];

const PhotoGrid = ({ photos = defaultPhotos }: PhotoGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-pink-50 p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <Card
            key={photo.id}
            className="group relative overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => handlePhotoClick(photo, index)}
          >
            <div className="aspect-square relative">
              <img
                src={photo.url}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-sm font-medium truncate">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoModal
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          photoUrl={selectedPhoto.url}
          photoTitle={selectedPhoto.title}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default PhotoGrid;
