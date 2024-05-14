import React from 'react';
import VideoJS from './components/VideoJS';
import videoTest from './video.mp4';

const App = () => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoTest,
      type: 'video/mp4'
    }]
  };

  return (
    <div className='video-custom'>
      <VideoJS options={videoJsOptions}  />
    </div>
  )
}

export default App;