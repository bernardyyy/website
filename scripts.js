// Define the project order/sequence
const projectSequence = [
    'gerber-wishes.html',
    'qalendar.html',
    'morangos-mofados.html',
    'moombi.html'
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
  
  // Run the setup when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', setupProjectNavigation);

  document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });