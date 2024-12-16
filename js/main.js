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

    nextSection.querySelector(".bg").classList.add("active");
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
  $(" .btn-blue").click(function () {
    $(".form").addClass("active");
  });
});
