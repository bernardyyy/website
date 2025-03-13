document.addEventListener('DOMContentLoaded', function() {
  // Fetch the projects data
  fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
      // Check if we're on the homepage
      const projectsContainer = document.getElementById('projects-container');
      
      if (projectsContainer) {
        // We're on the homepage, display project previews
        displayHomeProjects(projects, projectsContainer);
      } else {
        // Check if we're on a project page
        const projectDetailContainer = document.getElementById('project-detail-container');
        
        if (projectDetailContainer) {
          // We're on a project page, display project details
          // Get the project ID from the URL (e.g., project1.html -> id=1)
          const urlPath = window.location.pathname;
          const projectFileName = urlPath.split('/').pop();
          
          // Find the project that matches this page
          const project = projects.find(p => p.link === projectFileName);
          
          if (project) {
            displayProjectDetail(project, projectDetailContainer);
          }
        }
      }
    })
    .catch(error => console.error('Error loading projects:', error));
});

// Function to display projects on homepage
function displayHomeProjects(projects, container) {
  // Clear any existing content
  container.innerHTML = '';
  
  // Create HTML for each project preview
  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-item';
    
    projectElement.innerHTML = `
      <a href="${project.link}">
        <img src="${project.main_image}" alt="${project.title}" class="project-image">
        <h2 class="project-title">${project.title}</h2>
        <div class="project-meta">
          <span class="project-category">${project.category}</span>
          <span class="project-year">${project.year}</span>
        </div>
      </a>
    `;
    
    container.appendChild(projectElement);
  });
}

// Function to display project details on a project page
function displayProjectDetail(project, container) {
  // Clear any existing content
  container.innerHTML = '';
  
  // Create the project detail HTML
  const detailHTML = `
    <div class="project-detail">
      <h1 class="project-title-large">${project.title_2}</h1>
      
      <div class="project-meta">
        <span class="project-category">${project.category}</span>
        <span class="project-year">${project.year}</span>
      </div>
      
      <div class="project-gallery">
        ${project.project_images.map(img => 
          `<img src="${img}" alt="${project.title}" class="project-detail-image">`
        ).join('')}
      </div>
      
      <div class="project-description">
        <p>${project.description}</p>
      </div>
    </div>
  `;
  
  container.innerHTML = detailHTML;
}