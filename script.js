// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Typewriter Effect
  const typingText = document.getElementById('typing-text');
  const phrases = [
    'Software Engineer',
    'Robotics Engineer',
    'Computer Engineer',
    'Electrical Engineer',
    'Mechanical Engineer',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  function typeWriter() {
    if (isPaused) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting && charIndex < currentPhrase.length) {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else if (isDeleting && charIndex > 0) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWriter, 50);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        setTimeout(typeWriter, 1000);
      }, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 500);
    }
  }
  
  if (typingText) {
    setTimeout(typeWriter, 1000);
  }
  
  // Animate skill bars
  const skillLevels = document.querySelectorAll('.skill-level');
  skillLevels.forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.style.width = level + '%';
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  });
  
  // Projects filter functionality
  const filterTags = document.querySelectorAll('.filter-tag');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterTags.length > 0) {
    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Remove active class from all tags
        filterTags.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tag
        tag.classList.add('active');
        
        const filter = tag.getAttribute('data-filter');
        
        // Show/hide projects based on filter
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category');
          
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's a page link (not an anchor on current page)
      if (href.includes('.html') && !href.includes('#')) {
        return;
      }
      
      // If it's an anchor on current page
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // In a real application, you would send this data to a server
      console.log('Contact form submitted:', data);
      
      // Show success message
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      const originalIcon = submitBtn.querySelector('.btn-icon').innerHTML;
      
      submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
      submitBtn.querySelector('.btn-icon').innerHTML = '<i class="fas fa-check"></i>';
      submitBtn.disabled = true;
      
      // Reset form
      this.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.querySelector('.btn-icon').innerHTML = originalIcon;
        submitBtn.disabled = false;
      }, 3000);
    });
  }
  
  // Terminal notification auto-hide
  const terminalNotification = document.querySelector('.terminal-notification');
  if (terminalNotification) {
    setTimeout(() => {
      terminalNotification.style.opacity = '0';
      terminalNotification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        terminalNotification.style.display = 'none';
      }, 500);
    }, 3000);
  }
  
  // Update footer status
  const footerStatus = document.getElementById('footer-status');
  if (footerStatus) {
    const statuses = ['online', 'coding', 'available', 'busy'];
    let statusIndex = 0;
    
    setInterval(() => {
      footerStatus.style.opacity = '0';
      setTimeout(() => {
        statusIndex = (statusIndex + 1) % statuses.length;
        footerStatus.textContent = statuses[statusIndex];
        footerStatus.style.opacity = '1';
      }, 500);
    }, 5000);
  }
  
  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-link');
  
  navLinksAll.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (currentPage === 'index.html' && linkHref === 'index.html') {
      link.classList.add('active');
    } else if (currentPage === 'skills.html' && linkHref === 'skills.html') {
      link.classList.add('active');
    } else if (currentPage === 'projects.html' && linkHref === 'projects.html') {
      link.classList.add('active');
    } else if (currentPage === 'about.html' && linkHref === 'about.html') {
      link.classList.add('active');
    }
  });
  
  // Add active class to current page in footer
  const footerLinks = document.querySelectorAll('.footer-link');
  
  footerLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (currentPage === 'index.html' && linkHref === 'index.html') {
      link.classList.add('active');
    } else if (currentPage === 'skills.html' && linkHref === 'skills.html') {
      link.classList.add('active');
    } else if (currentPage === 'projects.html' && linkHref === 'projects.html') {
      link.classList.add('active');
    } else if (currentPage === 'about.html' && linkHref === 'about.html') {
      link.classList.add('active');
    }
  });
  
  // Add loading animation to project cards
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});