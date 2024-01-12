/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");


/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;
  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});
/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");
    console.log(tab);
    // tab.forEach(tab=>{
    tab.classList.remove("qualification__active");
    // })
    target.classList.add("qualification__active");
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakPoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

let swiper1 = new Swiper(".testimonial__container", {
  loop: true,
  grabCusrsor: true,
  spaceBetween: 48,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});


document.addEventListener('DOMContentLoaded', function () {
  function loadXML() {
    fetch('portfolio.xml') 
      .then(response => response.text())
      .then(xmlString => {
       
        parseXML(new DOMParser().parseFromString(xmlString, 'text/xml'));
      })
      .catch(error => console.error('Error loading XML:', error));
  }

 
  function parseXML(xml) {
    document.getElementById('projects').innerHTML = '';
    xml.querySelectorAll('project').forEach(project => {
      var title = project.querySelector('title').textContent;
      var description = project.querySelector('description').textContent;
      var link = project.querySelector('link').textContent;
      var image = project.querySelector('image').textContent;

      var projectHTML = `<div class="portfolio__content grid swiper-slide">
      <img src="${image}" alt="" class="portfolio__img">
      <div class="portfolio__data">
          <h3 class="portfolio__title">${title}</h3>
          <p class="portfolio__descriotion">${description}</p>
          <a href="${link}" target="_blank"
              class="button button--flex button--small portfolio__button">
              Demo
              <i class="uil uil-arrow-right button__icon"></i>
          </a>
      </div>
  </div>`;

      document.getElementById('projects').innerHTML += projectHTML;
    });
  }

  loadXML();
});

AOS.init({
  offset: 300, 
  duration: 1000
});