// После загрузки страницы
window.addEventListener("load", () => {
  const preloader = document.getElementById("video-preloader");
  const video = preloader.querySelector("video");

  video.addEventListener("ended", () => {
    gsap.to(preloader, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        preloader.style.display = "none"; // Скрыть прелоадер
      },
    });
  });
});

const sections = document.querySelectorAll(".section");
const body = document.body;

// Функция для переключения секций
function switchSection(targetSection) {
  const currentSection = document.querySelector(".section.active");
  const nextSection = document.querySelector(`.section.${targetSection}`);

  //currentSection.querySelectorAll(".bg").classList.remove("active");

  const elements = document.querySelectorAll(".bg");
  elements.forEach((element) => {
    element.classList.remove("active");
  });

  // Убираем текущую секцию, если она не совпадает с целевой
  if (currentSection && currentSection !== nextSection) {
    gsap.to(currentSection, {
      duration: 0,
      opacity: 0,
      onComplete: () => {
        currentSection.classList.remove("active");
        currentSection.style.display = "none";
      },
    });
  }

  // Показываем следующую секцию
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
        },
      }
    );

    // Меняем класс у body для управления стилями
    body.className = targetSection;

    setTimeout(() => {
      nextSection.querySelector(".bg").classList.add("active");
    }, 50); // Задержка в 50 миллисекунд
  }
}

// Добавляем обработчик событий на весь document
document.addEventListener("click", (event) => {
  // Проверяем клик по логотипу в header
  if (event.target.closest("header .logo")) {
    const currentActiveSection = document.querySelector(".section.active");
    const mainSection = document.querySelector(".section.main-section");

    // Если текущая активная секция - не main-section, переключаем на нее
    if (currentActiveSection !== mainSection) {
      switchSection("main-section");
    }
    return; // Прерываем выполнение, чтобы не обрабатывать другие клики
  }

  // Проверяем клик по секции
  sections.forEach((section) => {
    if (section.contains(event.target)) {
      // Проверяем клик по элементам внутри категории
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

  // Анимация header и main-section при загрузке
  const header = document.querySelector("header");
  const mainSection = document.querySelector(".section.main-section");
  const body = document.body;

  // Устанавливаем overflow: hidden для body
  body.style.overflow = "hidden";

  // Добавляем начальные классы
  header.classList.add("header-animate");
  mainSection.classList.add("main-section-animate");

  // Анимация с помощью GSAP
  gsap.to(header, {
    duration: 1.2,
    opacity: 1,
    delay: 0.5,
    y: 0, // Возвращаем на место
    onComplete: () => {
      header.classList.remove("header-animate"); // Убираем класс после анимации
    },
  });

  gsap.to(mainSection, {
    duration: 1,
    opacity: 1,
    y: 0, // Возвращаем на место
    // delay: 0.5, // Задержка перед анимацией main-section
    onComplete: () => {
      mainSection.classList.remove("main-section-animate"); // Убираем класс после анимации
      body.style.overflow = ""; // Убираем overflow: hidden после завершения анимации
    },
  });

  $(" .btn-blue").click(function () {
    $(".form").addClass("active");
    $(".overlay").addClass("active");
  });
  $(" .overlay").click(function () {
    $(".form").removeClass("active");
    $(".overlay").removeClass("active");
  });
});

// Анимация маркера по первой дуге (видимый сектор)
gsap.to("#marker1", {
  motionPath: {
    path: "#arc1", // Путь, по которому будет двигаться маркер
    start: 0, // Начало анимации по пути
    end: 1, // Конец анимации по пути
    align: "#arc1",
    alignOrigin: [1, 0.5], // Центрирование маркера
    autoRotate: false, // Автоматическое вращение маркера вдоль траектории
  },
  repeat: -1, // Бесконечное повторение
  yoyo: true, // Движение туда и обратно
  duration: 5, // Время для полного цикла
  ease: "power1.inOut", // Плавное изменение скорости
});

// Анимация маркера по второй дуге (видимый сектор)
gsap.to("#marker2", {
  motionPath: {
    path: "#arc2", // Путь, по которому будет двигаться маркер
    start: 1, // Начало анимации по пути
    end: 0, // Конец анимации по пути
    alignOrigin: [1, 0.5],
    align: "#arc2",
    autoRotate: true, // Автоматическое вращение маркера вдоль траектории
  },
  repeat: -1, // Бесконечное повторение
  yoyo: true, // Движение туда и обратно
  duration: 5, // Время для полного цикла (можно настроить)
  ease: "power1.inOut", // Плавное изменение скорости
});
