import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import PhotoModal from "./PhotoModal";

interface Photo {
  id: string;
  url: string;
}

interface PhotoGridProps {
  photos?: Photo[];
}

const PhotoGrid = ({ photos }: PhotoGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Function to get all files from /assets/photos
    const loadPhotos = async () => {
      try {
        const photoFiles = import.meta.glob("/public/assets/photos/*");
        const photoItems: Photo[] = Object.keys(photoFiles).map((path) => ({
          id: path,
          url: path.replace("/public", ""),
        }));
        setLocalPhotos(photoItems);
      } catch (error) {
        console.error("Error loading photos:", error);
      }
    };

    if (!photos) {
      loadPhotos();
    }
  }, [photos]);

  const displayPhotos = photos || localPhotos;

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex =
      (currentIndex - 1 + displayPhotos.length) % displayPhotos.length;
    setSelectedPhoto(displayPhotos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % displayPhotos.length;
    setSelectedPhoto(displayPhotos[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-pink-50 p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayPhotos.map((photo, index) => (
          <Card
            key={photo.id}
            className="group relative overflow-hidden cursor-pointer"
            onClick={() => handlePhotoClick(photo, index)}
          >
            <div className="aspect-square relative">
              <img
                src={photo.url}
                alt="Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoModal
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          photoUrl={selectedPhoto.url}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default PhotoGrid;
