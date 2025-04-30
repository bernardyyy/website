// Define the project order/sequence
const projectSequence = [
  'gerber-wishes.html',
  'qalendar.html',
  'morangos-mofados.html',
  'moombi.html',
  'aprender.html',
  'dump.html'
];

// Function to handle navigation
function setupProjectNavigation() {
  // Get current page URL
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  // Find current page in sequence
  const currentIndex = projectSequence.indexOf(currentPage);
  
  // Only proceed if we're on a project page
  if (currentIndex === -1) return;
  
  // Calculate prev/next indexes with wrap-around
  const prevIndex = currentIndex === 0 ? projectSequence.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projectSequence.length - 1 ? 0 : currentIndex + 1;
  
  // Get the navigation container
  const navContainer = document.getElementById('project-navigation');
  if (!navContainer) return;
  
  // Set the href attributes for navigation links
  const prevLink = document.getElementById('prev-project');
  const nextLink = document.getElementById('next-project');
  
  if (prevLink) prevLink.href = projectSequence[prevIndex];
  if (nextLink) nextLink.href = projectSequence[nextIndex];
}

// Custom cursor implementation
function setupCustomCursor() {
  const cursor = document.querySelector('.cursor');
  
  if (!cursor) return; // Safety check in case cursor element isn't found
  
  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
  });
  
  // Add event listeners for links
  const links = document.querySelectorAll('a, .link');
  links.forEach(link => {
      link.addEventListener('mouseenter', () => {
          cursor.classList.add('grow');
      });
      
      link.addEventListener('mouseleave', () => {
          cursor.classList.remove('grow');
      });
  });
  
  // Add event listeners for text and images
  const contentElements = document.querySelectorAll('p, h1, h2, h3, img');
  contentElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
          cursor.classList.add('blend');
      });
      
      element.addEventListener('mouseleave', () => {
          cursor.classList.remove('blend');
      });
  });
  
  // Make sure cursor is visible when mouse enters the window
  document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
  });
  
  // Hide cursor when mouse leaves the window
  document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
  });
}

// Run both functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupProjectNavigation();
  setupCustomCursor();
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all video container divs
    const videoContainers = document.querySelectorAll('div[style*="padding:56.25%"]');
    
    // Create an Intersection Observer
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          const container = entry.target;
          const iframe = container.querySelector('iframe');
          
          // Get the iframe src and set it (it was stored in a data attribute)
          if (iframe && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            // Stop observing after loading
            observer.unobserve(container);
          }
        }
      });
    }, { rootMargin: "200px" }); // Start loading when within 200px of viewport
    
    // Set up each video container for lazy loading
    videoContainers.forEach(container => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        // Store the original src in a data attribute and remove it from src
        iframe.dataset.src = iframe.src;
        iframe.removeAttribute('src');
        
        // Start observing the container
        videoObserver.observe(container);
      }
    });
  });