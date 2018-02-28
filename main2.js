var ready = function() {
  var vid = document.getElementById('scarring-video');
  if (!vid) return;

  var slider = document.getElementById('range-slider');
  var frameRate = 30;
  var playInitialized = false;
  var videoInitialized = false;
  var sliderInitialized = false;
  var sliderLastValue = 50;

  vid.addEventListener('loadedmetadata', function() {
    console.log('vid.loadedmetadata');
    initializeSlider();
  }, false);

  vid.addEventListener('canplay', function() {
    console.log('vid.canplay');
    if (!sliderInitialized) {
      initializeSlider();
    }
    if (!playInitialized) {
      vid.play();
      playInitialized = true;
    }
  }, false);

  vid.addEventListener('canplaythrough', function() {
    console.log('vid.canplaythrough');
    if (!sliderInitialized) {
      initializeSlider();
    }
    initializeVideo();
  }, false);

  vid.addEventListener('playing', function() {
    console.log('vid.playing');
    vid.pause(); // Pause the video immediately when it starts
  }, false);

  function initializeSlider() {
    console.log('initializeSlider');
    console.log('sliderInitialized: ' + sliderInitialized);

    if (!sliderInitialized) {
      console.log('slider.max: ' + slider.max);
      console.log('slider.value: ' + slider.value);

      var lastFrame = Math.floor(vid.duration * frameRate);
      var middleFrame = Math.floor(lastFrame/2);

      console.log('lastFrame: ' + lastFrame);
      slider.setAttribute("max", lastFrame); // set slider max according to video length

      console.log('middleFrame: ' + middleFrame);
      slider.setAttribute("value", middleFrame); // position slider to middle
      console.log('slider.value: ' + slider.value);

      sliderInitialized = true;
    }
  }

  function initializeVideo() {
    console.log('initializeVideo');
    console.log('vid.currentTime: ' + vid.currentTime);
    console.log('videoInitialized: ' + videoInitialized);

    if (!videoInitialized) {
      // also start video in the middle
      vid.currentTime  = vid.duration/2;
      console.log('vid.currentTime: ' + vid.currentTime);
      videoInitialized = true;
    }
  }

  slider.addEventListener('input', function() {
    console.log('slider.input');
    updateCurrentTime();
  }, false);

  slider.addEventListener('change', function() {
    console.log('slider.change');
    updateCurrentTime();
  }, false);

  function updateCurrentTime() {
    if (slider.value != sliderLastValue){ // don't update current time if same as before
      vid.currentTime = slider.value/frameRate;
      sliderLastValue = slider.value;
    }
  }
};

document.addEventListener("DOMContentLoaded", function(event) { 
  ready();
});
