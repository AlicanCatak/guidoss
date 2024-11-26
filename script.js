document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".carousel, .poke-container, .video-section, .content");
  
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1 // En az %10'u görünür olduğunda tetiklenir
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target); // Gözlemlemeyi durdur
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      section.classList.add("fade-out"); // Başlangıçta gizli
      observer.observe(section);
    });
  });
  

  // video

  const video = document.getElementById("video");
  video.playbackRate = 0.1; // Hız yarıya düşer