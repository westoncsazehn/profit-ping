// 3rd party
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// local
import {
  ImageSlideShow,
  InstructionListSection,
  INSTRUCTIONS_LIST,
  SLIDESHOW_IMAGES,
  IntroductoryContent
} from './components';
import { InstructionsListType, navigateTo } from '../../store';
import { FAQ_URL, SIGN_IN_URL } from '../common';

// time between slides in ImageSlideShow
const IMAGE_TIMER_COUNT: number = 5000;

const mapDispatchToProps = (dispatch: any) => ({
  navigateTo: (path: string) => dispatch(navigateTo(path))
});
const LandingPage = ({ navigateTo }: { navigateTo: any }) => {
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
    const timeout = setTimeout(goToNextImage, IMAGE_TIMER_COUNT);
    return () => {
      clearTimeout(timeout);
    };
  }, [activeImage]);
  // handlers
  const onFAQClick = () => {
    setActiveImage('');
    navigateTo(FAQ_URL);
  };
  const onGetStartedClick = () => navigateTo(SIGN_IN_URL);

  return (
    <>
      <IntroductoryContent onGetStartedClick={onGetStartedClick}/>
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
export const LandingPageRx = connect(null, mapDispatchToProps)(LandingPage);
export default LandingPageRx;
