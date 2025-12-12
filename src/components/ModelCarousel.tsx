'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Model3DViewer = dynamic(() => import('./Model3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="canvas-container flex items-center justify-center">
      <span className="loader"></span>
    </div>
  ),
});

export interface PetModel {
  id: string;
  name: string;
  breed: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  modelUrl: string;
  scale: number;
  author: string;
  authorUrl: string;
  modelSourceUrl: string;
  license: string;
  licenseUrl: string;
}

interface ModelCarouselProps {
  models: PetModel[];
  title?: string;
}

export default function ModelCarousel({ models, title = 'Meet Our Friends' }: ModelCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextModel = () => {
    setCurrentIndex((prev) => (prev + 1) % models.length);
  };

  const prevModel = () => {
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length);
  };

  const currentModel = models[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {title && (
        <h2 className="text-3xl md:text-4xl font-display text-center text-royal-900 mb-8">
          {title}
        </h2>
      )}
      
      <div className="relative">
        {/* Navigation arrows */}
        <button
          onClick={prevModel}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                     w-12 h-12 rounded-full bg-white shadow-lg 
                     flex items-center justify-center
                     hover:bg-royal-50 transition-colors duration-200
                     border border-royal-200"
          aria-label="Previous model"
        >
          <svg
            className="w-6 h-6 text-royal-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextModel}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                     w-12 h-12 rounded-full bg-white shadow-lg 
                     flex items-center justify-center
                     hover:bg-royal-50 transition-colors duration-200
                     border border-royal-200"
          aria-label="Next model"
        >
          <svg
            className="w-6 h-6 text-royal-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* 3D Model Viewer */}
        <div className="mx-12">
          <Model3DViewer
            modelUrl={currentModel.modelUrl}
            scale={currentModel.scale}
            autoRotate={true}
            petType={currentModel.type === 'cat' ? 'cat' : 'dog'}
          />
        </div>

        {/* Model info */}
        <div className="text-center mt-6">
          <h3 className="text-2xl font-display text-royal-800">{currentModel.name}</h3>
          <p className="text-royal-600 text-lg">{currentModel.breed}</p>
          <span className="inline-block mt-2 px-4 py-1 bg-royal-100 text-royal-700 
                          rounded-full text-sm font-medium capitalize">
            {currentModel.type}
          </span>
        </div>

        {/* Attribution */}
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            3D Model: &quot;{currentModel.name}&quot; by{' '}
            <a
              href={currentModel.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-600 hover:underline"
            >
              {currentModel.author}
            </a>{' '}
            - Licensed under{' '}
            <a
              href={currentModel.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-600 hover:underline"
            >
              {currentModel.license}
            </a>
          </p>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {models.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-royal-600 w-8'
                : 'bg-royal-200 hover:bg-royal-300'
            }`}
            aria-label={`Go to model ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
