// 2.18.2021 FC Added index.js for organization
// init variables
var frameNumber = 0,
  playbackConst = 100,
  setHeight,
  vid;
// var vid = $('#v0')[0]; // jquery option

$(document).ready(init);

function init() {
  // get page height from video duration
  // jQuery $('#set-height').val()
  setHeight = document.getElementById("set-height");
  // select video element
  vid = document.getElementById("v0");
  // dynamically set the page height according to video length
  vid.addEventListener("loadedmetadata", function () {
    setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
  });

  // FC call the function outside of the function definition to initialize it
  window.requestAnimationFrame(scrollPlay);

  retrieveKanyeWisdom();
}

// FC: important function from sticky.js that works with main2.css to look for "section" elements and add class ".entered" to them
enterView({
  selector: "section",
  enter: function (el) {
    el.classList.add("entered");
  },
});

// Use requestAnimationFrame for smooth playback
function scrollPlay() {
  var frameNumber = window.pageYOffset / playbackConst;
  vid.currentTime = frameNumber;
  window.requestAnimationFrame(scrollPlay);
}

// FC random AJAX request which I call Kanye for his wisdom
function retrieveKanyeWisdom() {
  let request = $.ajax({
    url: "https://api.kanye.rest",
    success: function (response) {
      // jQuery for the same thing that document.getElementById does  
      let kanyeBlurb = response.quote;
      let kanyeElement = $('#what-does-the-kanye-say');
      kanyeElement.text(kanyeBlurb);
      // CSS element functions that you can customize with jQuery
      kanyeElement.css('font-size','100pt');
      kanyeElement.css('font-variant','small-caps');
      kanyeElement.css('color','white');
    },
    error: function (error) {
        alert('Failed to retrieve the sweet words of Kanye: ' + error);
    }
  });
  //$.get(request).fail(function () {
  //  console.log("Failed to retrieve Kanyes sweet words");
  //});
}
