// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
  // Slideshow
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Auto advance slides every 5 seconds
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      document.querySelector('.nav-links').classList.remove('active');
    });
  });

  // Menu filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      const category = this.getAttribute('data-category');

      // Filter menu items
      menuItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Form validation
  const form = document.getElementById('reservation-form');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();

      let isValid = true;

      // Reset error states
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      // Validate name
      if (name === '') {
        document.getElementById('name').parentElement.classList.add('error');
        isValid = false;
      }

      // Validate email
      if (email === '' || !isValidEmail(email)) {
        document.getElementById('email').parentElement.classList.add('error');
        isValid = false;
      }

      // Validate phone
      if (phone === '' || !isValidPhone(phone)) {
        document.getElementById('phone').parentElement.classList.add('error');
        isValid = false;
      }

      if (isValid) {
        // Form is valid, show success message
        alert('Thank you for your message! We will contact you soon.');
        form.reset();
      }
    });
  }

  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function() {
      document.querySelector('.nav-links').classList.toggle('active');
    });
  }

  // Helper functions
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isValidPhone(phone) {
    const re = /^[0-9\s+\-()]{7,20}$/;
    return re.test(phone);
  }
});