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

function toggle(i) {
  console.log(i);

  var element = document.getElementsByClassName('description')[i];
  console.log(element);
  if (element) {
    // Toggle the 'display' property
    element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
  }
}

$(document).ready(function () {
  function populateProjects() {
    var $projectsContainer = $('#projects-container');

    $.ajax({
      type: "GET",
      url: "portfolio.xml",
      dataType: "xml",
      success: function (xml) {
        var projects = [];

        $(xml).find('project').each(function (index) {
          console.log($(this))
          var title = $(this).find('title').text();
          var description = $(this).find('description').text();
          var image = $(this).find('image').text();
          var link = $(this).find('link').text();
          var name = $(this).find('name').text();
          var category = $(this).find('category').text().toLowerCase();
          var projectHTML = `
          
                      <div>
                      <div class="${category} bg-danger project">
                      <a  href="${link}" target="_blank"><img src="${image}" alt="${title}"></a>
                      
                      <h3>${title}</h3>
                      <a class="readmore" onclick="toggle(${index})">readmore</a>
                      <p class="description" style="display: none;">${description}</p><br>
                      <a href="${link}" target="_blank"
                          class="button button--flex button--small portfolio__button">
                          Demo
                          <i class="uil uil-arrow-right button__icon"></i>
                      </a>
                     </div>
                      </div>
                      
                  `;

          projects.push(projectHTML);
        });

        $projectsContainer.html(projects.join(''));
      },
      error: function (xhr, status, error) {
        console.error("Error fetching XML:", status, error);
      }
    });
  }

  populateProjects();

  $('.filter-btn').on('click', function () {
    var filterValue = $(this).attr('data-filter');

    // Show all projects if 'All' is selected
    if (filterValue === 'all') {
      $('.project').show();
    } else {
      // Hide projects that don't match the selected category
      $('.project').hide().filter('.' + filterValue).show();
    }
  });




});