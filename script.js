let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let themeToggle = document.querySelector('#theme-toggle');
let body = document.body;

// Theme toggle functionality
const toggleTheme = () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('light-theme')) {
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
        // Save theme preference
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
        // Save theme preference
        localStorage.setItem('theme', 'dark');
    }
};

// Load saved theme preference
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.querySelector('i').classList.replace('bx-moon', 'bx-sun');
    }
});

themeToggle.addEventListener('click', toggleTheme);

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
};

// Fix scroll functionality
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
            });
        }
    });

    // Hide mobile menu on scroll
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
};

// Project filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.projects-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active from all
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    projectItems.forEach(item => {
      if (filter === 'all') {
        item.style.display = '';
      } else if (item.classList.contains(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.progress-fill');
          progressBars.forEach(bar => {
              const width = bar.style.width;
              bar.style.width = '0%';
              setTimeout(() => {
                  bar.style.width = width;
              }, 100);
          });
      }
  });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
  observer.observe(category);
});

// Add some interactivity to stat cards
document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
      const number = card.querySelector('.stat-number');
      const originalText = number.textContent;
      const numValue = parseInt(originalText);
      
      // Animate the number
      let current = 0;
      const increment = numValue / 20;
      const timer = setInterval(() => {
          current += increment;
          if (current >= numValue) {
              current = numValue;
              clearInterval(timer);
              number.textContent = originalText;
          } else {
              number.textContent = Math.floor(current) + (originalText.includes('+') ? '+' : '');
          }
      }, 50);
  });
});
