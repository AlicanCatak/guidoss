document.addEventListener("DOMContentLoaded", function () {
  // Bölüm animasyonları
  const sections = document.querySelectorAll(".carousel, .poke-container, .video-section, .content");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Görünürlüğün %10'unda tetiklenir
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Artık gözlemlemeyi bırak
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.classList.add("fade-out"); // Başlangıçta gizli
    observer.observe(section);
  });

  // Navbar Linklerini Kaydırma
  const menuLinks = document.querySelectorAll(".menu-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar Highlight
  const navbar = document.querySelector(".menu");
  const navbarLinks = document.querySelectorAll(".menu-link");
  const sectionIds = Array.from(menuLinks).map((link) =>
    document.querySelector(link.getAttribute("href"))
  );

  window.addEventListener("scroll", () => {
    let current = "";
    sectionIds.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });
    navbarLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Scroll-to-Top Button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.textContent = "↑";
  scrollToTopBtn.classList.add("scroll-to-top");
  document.body.appendChild(scrollToTopBtn);

  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #BF302E;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    display: none;
    cursor: pointer;
  `;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Video Durdurma ve Oynatma
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });

  // Footer Yılı Güncelleme
  const footerYear = document.querySelector(".footer-bottom p");
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Guido's. Tüm hakları saklıdır.`;
  }
});


// burger


class PhotoCarousel {
  constructor(photoSelector, carouselSelector) {
    this.photos = document.querySelectorAll(photoSelector);
    this.carousel = document.querySelector(carouselSelector);
    this.currentIndex = 0;

    // Fotoğrafların görünümünü başlat
    this.showPhoto(this.currentIndex);

    // Scroll işlemleri için handler fonksiyonu bağla
    this.scrollHandler = this.handleScroll.bind(this);

    // Intersection Observer ile alanı gözlemle
    this.initObserver();
  }

  showPhoto(index) {
    this.photos.forEach((photo, i) => {
      photo.classList.toggle("active", i === index);
    });
  }

  nextPhoto() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.showPhoto(this.currentIndex);
  }

  previousPhoto() {
    this.currentIndex =
      (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.showPhoto(this.currentIndex);
  }

  handleScroll(event) {
    if (event.deltaY > 0) {
      this.nextPhoto();
    } else {
      this.previousPhoto();
    }
  }

  initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Alan görünür olduğunda scroll dinleyiciyi ekle
          document.addEventListener("wheel", this.scrollHandler);
        } else {
          // Alan görünür olmadığında scroll dinleyiciyi kaldır
          document.removeEventListener("wheel", this.scrollHandler);
        }
      });
    });

    observer.observe(this.carousel);
  }
}

// Kullanım
new PhotoCarousel(".photo", ".carousel5");


document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");

  // Kartı göstermek için Intersection Observer kullan
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          card.classList.add("show");
        }
      });
    },
    { threshold: 0.5 } // Kartın %50'si göründüğünde tetiklenir
  );

  observer.observe(document.querySelector(".carousel5"));
});
