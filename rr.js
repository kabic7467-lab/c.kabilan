// Highlight active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


// Typing effect for rotating locations
const containerText = document.querySelector(".container");
const careers = [
  "MELBOURNE, Australia.",
  "BRISBANE, Australia.",
  "PERTH, Australia.",
  "SYDNEY, Australia."
];

let careerIndex = 0;
let characterIndex = 0;

function updateText() {
  characterIndex++;

  containerText.innerHTML = `
    <h1><span>${careers[careerIndex].slice(0, characterIndex)}</span></h1>
  `;

  if (characterIndex === careers[careerIndex].length) {
    careerIndex++;
    characterIndex = 0;
  }

  if (careerIndex === careers.length) {
    careerIndex = 0;
  }

  setTimeout(updateText, 400);
}

updateText();


// Portfolio filtering
(function () {
  const filterLinks = document.querySelectorAll('#vc a[data-filter]');
  const items = Array.from(document.querySelectorAll('#cv .item'));

  function setActiveLink(el) {
    filterLinks.forEach(l => l.classList.remove('active'));
    el.classList.add('active');
  }

  function filterBy(category) {
    if (category === 'all') {
      items.forEach(it => it.classList.remove('hidden'));
    } else {
      items.forEach(it => {
        const cat = it.dataset.category?.toLowerCase() || '';
        if (cat === category) {
          it.classList.remove('hidden');
        } else {
          it.classList.add('hidden');
        }
      });
    }
  }

  filterLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const chosen = this.dataset.filter?.toLowerCase() || 'all';
      setActiveLink(this);
      filterBy(chosen);
    });
  });

  // keyboard accessibility
  filterLinks.forEach(a => {
    a.setAttribute('tabindex', '0');
    a.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        a.click();
      }
    });
  });

  // show all on load
  filterBy('all');
})();


// Progress counters
const counters = document.querySelectorAll(".num");
const bars = document.querySelectorAll(".progress div");

counters.forEach((counter, i) => {
  let target = +counter.getAttribute("data-val");
  let count = 0;
  let speed = 20;

  let update = setInterval(() => {
    if (count < target) {
      count++;
      counter.textContent = count + "%";
      bars[i].style.width = count + "%";
    } else {
      clearInterval(update);
    }
  }, speed);
});


// Rotating testimonials
const testimonials = [
  { text: "Fantastic service! Boosted our sales by 40%!", author: "Sarah, CEO of TechCo" },
  { text: "Great support team, always available.", author: "John, Marketing Lead" },
  { text: "The best decision we made this year!", author: "Priya, Startup Founder" }
];

let index = 0;
setInterval(() => {
  const blockquote = document.querySelector(".social-proof blockquote p");
  const cite = document.querySelector(".social-proof blockquote cite");

  index = (index + 1) % testimonials.length;
  blockquote.textContent = testimonials[index].text;
  cite.textContent = `- ${testimonials[index].author}`;
}, 4000);
