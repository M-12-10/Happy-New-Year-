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
        // Get both jpg and png files
        const jpgFiles = import.meta.glob(
          "/public/assets/photos/*.{jpg,jpeg}",
          {
            eager: true,
          },
        );
        const pngFiles = import.meta.glob("/public/assets/photos/*.png", {
          eager: true,
        });

        // Combine both file types and convert to array
        const photoItems: Photo[] = [
          ...Object.entries(jpgFiles).map(([path, module]: [string, any]) => ({
            id: path,
            url: module.default,
          })),
          ...Object.entries(pngFiles).map(([path, module]: [string, any]) => ({
            id: path,
            url: module.default,
          })),
        ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {displayPhotos.map((photo, index) => (
          <Card
            key={photo.id}
            className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white"
            onClick={() => handlePhotoClick(photo, index)}
          >
            <div className="aspect-square relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-float"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animation: `float 2s ease-in-out infinite ${i * 0.5}s`,
                      }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>
              </div>
              <img
                src={photo.url}
                alt="Photo"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
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
