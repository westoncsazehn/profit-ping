// 3rd party
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// local
import {
  ImageSlideShow,
  InstructionListSection,
  INSTRUCTIONS_LIST,
  SLIDESHOW_IMAGES,
  IntroductoryContent
} from './components';
import { InstructionsListType } from '../../store';
import { FAQ_URL } from '../common';

const IMAGE_TIMER_COUNT: number = 5000;

const LandingPage = () => {
  const [instructions] = useState<InstructionsListType[]>(INSTRUCTIONS_LIST);
  const [slideshowImages] = useState<string[]>(SLIDESHOW_IMAGES);
  const [activeImage, setActiveImage] = useState<string>(slideshowImages[0]);
  const navigate = useNavigate();
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
    const timeout = setTimeout(goToNextImage, IMAGE_TIMER_COUNT);
    return () => {
      clearTimeout(timeout);
    };
  }, [activeImage]);
  // handlers
  const onFAQClick = () => {
    setActiveImage('');
    navigate(FAQ_URL);
  };

  return (
    <>
      <IntroductoryContent />
      <InstructionListSection
        instructions={instructions}
        onFAQClick={onFAQClick}
      />
      {slideshowImages ? (
        <ImageSlideShow images={slideshowImages} activeImage={activeImage} />
      ) : null}
    </>
  );
};
export default LandingPage;