window.addEventListener("load", () => {
  const preloader = document.getElementById("video-preloader");
  const video = preloader.querySelector(".video");
  const mobileVideo = preloader.querySelector(".mobile-video");

  video.addEventListener("ended", () => {
    gsap.to(preloader, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        preloader.style.display = "none";
      },
    });
  });
  mobileVideo.addEventListener("ended", () => {
    gsap.to(preloader, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        preloader.style.display = "none";
      },
    });
  });
});

const sections = document.querySelectorAll(".section");
const body = document.body;

let isAnimating = false;

function switchSection(targetSection) {
  if (isAnimating) return;

  isAnimating = true;

  const currentSection = document.querySelector(".section.active");
  const nextSection = document.querySelector(`.section.${targetSection}`);

  //currentSection.querySelectorAll(".bg").classList.remove("active");

  const elements = document.querySelectorAll(".bg");
  elements.forEach((element) => {
    element.classList.remove("active");
  });

  if (currentSection && currentSection !== nextSection) {
    gsap.to(currentSection, {
      duration: 0,
      opacity: 0,
      onComplete: () => {
        currentSection.classList.remove("active");
        currentSection.style.display = "none";
        //  isAnimating = false;
      },
    });
  }

  if (nextSection) {
    nextSection.style.display = "flex";
    gsap.fromTo(
      nextSection,
      {
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
        //scale: 1,
        onComplete: () => {
          nextSection.classList.add("active");
          isAnimating = false;
        },
      }
    );

    body.className = targetSection;

    setTimeout(() => {
      nextSection.querySelector(".bg").classList.add("active");
    }, 50);
  }
}

document.addEventListener("click", (event) => {
  if (event.target.closest("header .logo")) {
    const currentActiveSection = document.querySelector(".section.active");
    const mainSection = document.querySelector(".section.main-section");

    if (currentActiveSection !== mainSection) {
      switchSection("main-section");
    }
    return;
  }

  sections.forEach((section) => {
    if (section.contains(event.target)) {
      const item = event.target.closest(".category .item");
      console.log(item);
      if (item) {
        const targetSection = item.getAttribute("data-section");
        if (targetSection) {
          switchSection(targetSection);
        }
      }
    }
  });
});

$(document).ready(function () {
  //switchSection("main-section");

  const header = document.querySelector("header");
  const mainSection = document.querySelector(".section.main-section");
  const body = document.body;

  body.style.overflow = "hidden";

  header.classList.add("header-animate");
  mainSection.classList.add("main-section-animate");

  gsap.to(header, {
    duration: 1.2,
    opacity: 1,
    delay: 0.5,
    y: 0,
    onComplete: () => {
      header.classList.remove("header-animate");
    },
  });

  gsap.to(mainSection, {
    duration: 1,
    opacity: 1,
    y: 0,
    onComplete: () => {
      mainSection.classList.remove("main-section-animate");
      body.style.overflow = "";
    },
  });

  $(" .btn-blue").click(function () {
    $(".form").addClass("active");
    $(".overlay").addClass("active");
  });
  $(" .bottom p a").click(function () {
    $(".form").addClass("active");
    $(".overlay").addClass("active");
  });
  $(" .overlay").click(function () {
    $(".form").removeClass("active");
    $(".overlay").removeClass("active");
  });
});

gsap.to("#marker1", {
  motionPath: {
    path: "#arc1",
    start: 0,
    end: 1,
    align: "#arc1",
    alignOrigin: [1, 0.5],
    autoRotate: false,
  },
  repeat: -1,
  yoyo: true,
  duration: 5,
  ease: "power1.inOut",
});

gsap.to("#marker2", {
  motionPath: {
    path: "#arc2",
    start: 1,
    end: 0,
    alignOrigin: [1, 0.5],
    align: "#arc2",
    autoRotate: true,
  },
  repeat: -1,
  yoyo: true,
  duration: 5,
  ease: "power1.inOut",
});
