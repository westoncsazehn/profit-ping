// 3rd party
import React, { useEffect, useState } from 'react';
// local
import {
  ImageSlideShow,
  InstructionListSection,
  INSTRUCTIONS_LIST,
  SLIDESHOW_IMAGES,
  IntroductoryContent
} from './components';
import { InstructionsListType } from '../../store';

const IMAGE_TIMER_COUNT: number = 5000;

export const LandingPage = () => {
  const [instructions] = useState<InstructionsListType[]>(INSTRUCTIONS_LIST);
  const [slideshowImages] = useState<string[]>(SLIDESHOW_IMAGES);
  const [activeImage, setActiveImage] = useState<string>(slideshowImages[0]);
  // calculate next image to display
  const goToNextImage = () => {
    const activeImageIndex: number = slideshowImages.indexOf(activeImage);
    const nextImageIndex: number =
      activeImageIndex < slideshowImages.length - 1
        ? activeImageIndex + 1
        : activeImageIndex === slideshowImages.length - 1
        ? 0
        : activeImageIndex;
    setActiveImage(slideshowImages[nextImageIndex]);
  };
  // cycle through images by setting active image
  useEffect(() => {
    setTimeout(goToNextImage, IMAGE_TIMER_COUNT);
  }, [activeImage]);

  return (
    <>
      <IntroductoryContent />
      <InstructionListSection instructions={instructions} />
      {slideshowImages ? (
        <ImageSlideShow images={slideshowImages} activeImage={activeImage} />
      ) : null}
    </>
  );
};
