document.addEventListener("DOMContentLoaded", function () {
  // Инициализация элементов
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".card-section");
  const card = document.querySelector(".card");
  const notification = document.getElementById("notification");
  const themeToggle = document.querySelector(".theme-toggle");
  const avatarModal = document.getElementById("avatarModal");
  const modalClose = document.querySelector(".modal-close");
  const avatarZoom = document.querySelector(".avatar-zoom");
  const cardAvatar = document.querySelector(".card-avatar");
  const quickActions = document.querySelectorAll(".quick-action");
  const scrollProgress = document.querySelector(
    ".scroll-progress .progress-bar"
  );
  const skillsToggle = document.querySelector(".skills-toggle");
  const skillsList = document.querySelector(".skills-list");
  const timelineYears = document.querySelectorAll(".year");
  const timelineItems = document.querySelectorAll(".card-item");
  const timelineNavPrev = document.querySelector(".prev-year");
  const timelineNavNext = document.querySelector(".next-year");
  const contactCopyButtons = document.querySelectorAll(".contact-copy");
  const formSend = document.querySelector(".form-send");
  const formInput = document.querySelector(".form-input");
  const scheduleCallBtn = document.getElementById("scheduleCall");
  const contactFormBtn = document.getElementById("contactForm");
  const experienceProgress = document.querySelector(".experience-progress");
  const skillBars = document.querySelectorAll(".level-bar");
  const statValues = document.querySelectorAll(".stat-value");

  // Текущее состояние
  let currentTheme = localStorage.getItem("theme") || "light";
  let currentYear = "2023";
  let skillsExpanded = false;

  // Инициализация темы
  function initTheme() {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }

  // Переключение темы
  function toggleTheme() {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);

    showNotification(
      `Тема изменена на ${currentTheme === "dark" ? "темную" : "светлую"}`
    );
  }

  // Переключение секций
  function switchSection(sectionId) {
    // Анимация загрузки
    card.setAttribute("data-loading", "true");

    // Скрыть все секции
    sections.forEach((section) => {
      section.classList.remove("is-active");
    });

    // Убрать активное состояние у всех кнопок
    navButtons.forEach((button) => {
      button.classList.remove("is-active");
      button.removeAttribute("aria-current");
    });

    // Показать выбранную секцию
    const activeSection = document.querySelector(sectionId);
    if (activeSection) {
      setTimeout(() => {
        activeSection.classList.add("is-active");
        card.setAttribute("data-loading", "false");
      }, 300);
    }

    // Активировать соответствующую кнопку
    const activeButton = document.querySelector(
      `.nav-btn[data-section="${sectionId}"]`
    );
    if (activeButton) {
      activeButton.classList.add("is-active");
      activeButton.setAttribute("aria-current", "page");
    }

    // Обновить состояние карточки
    card.setAttribute("data-state", sectionId);

    // Прокрутка вверх секции
    setTimeout(() => {
      card.scrollTop = 0;
    }, 350);
  }

  // Показать уведомление
  function showNotification(message, type = "info") {
    const notificationText = notification.querySelector(".notification-text");
    const notificationIcon = notification.querySelector(".notification-icon");

    notificationText.textContent = message;

    // Установить иконку в зависимости от типа
    switch (type) {
      case "success":
        notificationIcon.className = "notification-icon fas fa-check-circle";
        break;
      case "error":
        notificationIcon.className =
          "notification-icon fas fa-exclamation-circle";
        break;
      case "warning":
        notificationIcon.className =
          "notification-icon fas fa-exclamation-triangle";
        break;
      default:
        notificationIcon.className = "notification-icon fas fa-info-circle";
    }

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  // Анимация частиц при движении мыши
  function initParticles() {
    const particles = document.querySelectorAll(".particle");

    document.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      particles.forEach((particle, index) => {
        const speed = 0.02 * (index + 1);
        const x = (mouseX - 0.5) * 30 * speed;
        const y = (mouseY - 0.5) * 30 * speed;

        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    // Интерактивность при наведении на частицы
    particles.forEach((particle) => {
      particle.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.3)";
        this.style.background = "rgba(255, 255, 255, 0.25)";
      });

      particle.addEventListener("mouseleave", function () {
        this.style.transform = "";
        this.style.background = "";
      });
    });
  }

  // Управление таймлайном
  function initTimeline() {
    function setActiveYear(year) {
      currentYear = year;

      // Обновить активный год
      timelineYears.forEach((y) => {
        if (y.dataset.year === year) {
          y.classList.add("active");
        } else {
          y.classList.remove("active");
        }
      });

      // Показать активный элемент таймлайна
      timelineItems.forEach((item) => {
        if (item.dataset.year === year) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }

    // Клик по году
    timelineYears.forEach((year) => {
      year.addEventListener("click", function () {
        setActiveYear(this.dataset.year);
      });
    });

    // Навигация
    timelineNavPrev.addEventListener("click", function () {
      const years = Array.from(timelineYears).map((y) => y.dataset.year);
      const currentIndex = years.indexOf(currentYear);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : years.length - 1;
      setActiveYear(years[prevIndex]);
    });

    timelineNavNext.addEventListener("click", function () {
      const years = Array.from(timelineYears).map((y) => y.dataset.year);
      const currentIndex = years.indexOf(currentYear);
      const nextIndex = currentIndex < years.length - 1 ? currentIndex + 1 : 0;
      setActiveYear(years[nextIndex]);
    });

    // Автопрокрутка таймлайна
    let timelineInterval = setInterval(() => {
      const years = Array.from(timelineYears).map((y) => y.dataset.year);
      const currentIndex = years.indexOf(currentYear);
      const nextIndex = currentIndex < years.length - 1 ? currentIndex + 1 : 0;
      setActiveYear(years[nextIndex]);
    }, 5000);

    // Остановить автопрокрутку при взаимодействии
    const timelineControls = document.querySelector(".timeline-controls");
    timelineControls.addEventListener("mouseenter", () => {
      clearInterval(timelineInterval);
    });

    timelineControls.addEventListener("mouseleave", () => {
      timelineInterval = setInterval(() => {
        const years = Array.from(timelineYears).map((y) => y.dataset.year);
        const currentIndex = years.indexOf(currentYear);
        const nextIndex =
          currentIndex < years.length - 1 ? currentIndex + 1 : 0;
        setActiveYear(years[nextIndex]);
      }, 5000);
    });
  }

  // Управление навыками
  function initSkills() {
    skillsToggle.addEventListener("click", function () {
      skillsExpanded = !skillsExpanded;

      if (skillsExpanded) {
        skillsList.style.maxHeight = "500px";
        skillsList.style.overflow = "visible";
        this.innerHTML = '<i class="fas fa-chevron-up"></i>';
        this.setAttribute("aria-label", "Скрыть навыки");
      } else {
        skillsList.style.maxHeight = "38px";
        skillsList.style.overflow = "hidden";
        this.innerHTML = '<i class="fas fa-chevron-down"></i>';
        this.setAttribute("aria-label", "Показать все навыки");
      }
    });

    // Интерактивность навыков
    const skillTags = document.querySelectorAll(".skill-tag");
    skillTags.forEach((skill) => {
      skill.addEventListener("click", function () {
        const skillName = this.textContent.trim();
        const skillLevel = this.dataset.skill;
        showNotification(`${skillName}: Уровень ${skillLevel}%`, "info");
      });
    });
  }

  // Копирование текста
  function initCopyButtons() {
    contactCopyButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const text = this.dataset.text;

        navigator.clipboard
          .writeText(text)
          .then(() => {
            showNotification("Текст скопирован в буфер обмена!", "success");
          })
          .catch((err) => {
            console.error("Ошибка копирования: ", err);
            showNotification("Не удалось скопировать текст", "error");
          });
      });
    });
  }

  // Анимация прогресса
  function initProgressAnimations() {
    // Прогресс опыта
    if (experienceProgress) {
      setTimeout(() => {
        const level = experienceProgress.dataset.level;
        experienceProgress.style.width = `${level}%`;
      }, 500);
    }

    // Уровни навыков
    if (skillBars.length > 0) {
      setTimeout(() => {
        skillBars.forEach((bar) => {
          const level = bar.dataset.level;
          bar.style.width = `${level}%`;
        });
      }, 800);
    }

    // Анимация статистики
    if (statValues.length > 0) {
      statValues.forEach((stat) => {
        const target = parseInt(stat.dataset.count);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current);
        }, 16);
      });
    }
  }

  // Управление модальным окном
  function initModal() {
    function openModal() {
      avatarModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      avatarModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    avatarZoom.addEventListener("click", openModal);
    cardAvatar.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);

    avatarModal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });

    // Закрытие по ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && avatarModal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // Быстрые действия
  function initQuickActions() {
    quickActions.forEach((action) => {
      action.addEventListener("click", function () {
        const actionType = this.querySelector("i").className;

        if (actionType.includes("share-alt")) {
          // Поделиться
          if (navigator.share) {
            navigator.share({
              title: "Портфолио Романа - Frontend Developer",
              text: "Посмотрите портфолио фронтенд-разработчика Романа",
              url: window.location.href,
            });
          } else {
            showNotification("Ссылка скопирована в буфер обмена!", "success");
            navigator.clipboard.writeText(window.location.href);
          }
        } else if (actionType.includes("download")) {
          // Скачать резюме
          showNotification(
            "Резюме будет доступно для скачивания скоро!",
            "info"
          );
        } else if (actionType.includes("arrow-up")) {
          // Наверх
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Прогресс скролла
  function initScrollProgress() {
    window.addEventListener("scroll", function () {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + "%";
    });
  }

  // Форма быстрого вопроса
  function initQuickForm() {
    formSend.addEventListener("click", function () {
      const question = formInput.value.trim();

      if (question.length < 5) {
        showNotification("Введите вопрос длиннее 5 символов", "warning");
        return;
      }

      if (question.length > 100) {
        showNotification("Вопрос должен быть короче 100 символов", "warning");
        return;
      }

      // Имитация отправки
      showNotification("Вопрос отправлен! Отвечу в Telegram.", "success");
      formInput.value = "";

      // Анимация отправки
      this.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-paper-plane"></i>';
      }, 2000);
    });

    formInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        formSend.click();
      }
    });
  }

  // Дополнительные кнопки
  function initAdditionalButtons() {
    if (scheduleCallBtn) {
      scheduleCallBtn.addEventListener("click", function () {
        showNotification("Форма планирования звонка откроется скоро!", "info");
      });
    }

    if (contactFormBtn) {
      contactFormBtn.addEventListener("click", function () {
        showNotification(
          "Расширенная форма обратной связи в разработке!",
          "info"
        );
      });
    }
  }

  // Инициализация всех функций
  function init() {
    // Инициализация темы
    initTheme();

    // Обработчики для кнопок навигации
    navButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const sectionId = this.getAttribute("data-section");
        switchSection(sectionId);
      });
    });

    // Переключение темы
    themeToggle.addEventListener("click", toggleTheme);

    // Инициализация частиц
    initParticles();

    // Инициализация таймлайна
    initTimeline();

    // Инициализация навыков
    initSkills();

    // Инициализация кнопок копирования
    initCopyButtons();

    // Инициализация анимаций прогресса
    initProgressAnimations();

    // Инициализация модального окна
    initModal();

    // Инициализация быстрых действий
    initQuickActions();

    // Инициализация прогресса скролла
    initScrollProgress();

    // Инициализация быстрой формы
    initQuickForm();

    // Инициализация дополнительных кнопок
    initAdditionalButtons();

    // Демонстрационное уведомление при загрузке
    setTimeout(() => {
      showNotification("Добро пожаловать в мое портфолио! 👋", "success");
    }, 1000);

    // Активация прогресс-бара опыта
    setTimeout(() => {
      if (experienceProgress) {
        const level = experienceProgress.dataset.level || 85;
        experienceProgress.style.width = `${level}%`;
      }
    }, 500);
  }

  // Запуск инициализации
  init();
});

// Обработка ошибок загрузки изображений
window.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.target.src =
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
      e.target.alt = "Аватар по умолчанию";
    }
  },
  true
);

// Сохранение позиции скролла при перезагрузке
window.addEventListener("beforeunload", function () {
  localStorage.setItem("scrollPosition", window.scrollY);
});

// Восстановление позиции скролла
window.addEventListener("load", function () {
  const scrollPosition = localStorage.getItem("scrollPosition");
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
    localStorage.removeItem("scrollPosition");
  }
});

// Оптимизация производительности для мобильных устройств
if ("IntersectionObserver" in window) {
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        lazyObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    lazyObserver.observe(img);
  });
}

// Офлайн-режим
window.addEventListener("online", function () {
  const notification = document.getElementById("notification");
  const notificationText = notification.querySelector(".notification-text");
  const notificationIcon = notification.querySelector(".notification-icon");

  notificationText.textContent = "Соединение восстановлено!";
  notificationIcon.className = "notification-icon fas fa-wifi";
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
});

window.addEventListener("offline", function () {
  const notification = document.getElementById("notification");
  const notificationText = notification.querySelector(".notification-text");
  const notificationIcon = notification.querySelector(".notification-icon");

  notificationText.textContent = "Отсутствует подключение к интернету";
  notificationIcon.className = "notification-icon fas fa-exclamation-triangle";
  notification.classList.add("show");
});
