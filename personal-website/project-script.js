document.addEventListener('DOMContentLoaded', function() {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = Number(urlParams.get('id'));
    
    if (!projectId) {
      window.location.href = 'index.html';
      return;
    }
    
    // Load project data
    fetch('projects.json')
      .then(response => response.json())
      .then(projects => {
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
          window.location.href = 'index.html';
          return;
        }
        
        // Update document title
        document.title = `${project.subpageTitle} - Bernard Gerber`;
        
        // Update project details
        document.getElementById('project-title').textContent = project.subpageTitle;
        document.getElementById('project-category').textContent = project.categories 
        ? project.categories.map(cat => cat.text).join(', ') 
        : '';        document.getElementById('project-year').textContent = project.year;
        document.getElementById('project-description').innerHTML = project.description;

        // Load project images
        const imagesContainer = document.getElementById('project-images');
        imagesContainer.innerHTML = '';
        
        if (project.projectImages && project.projectImages.length > 0) {
          project.projectImages.forEach(image => {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'content';
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = project.subpageTitle;
            
            imgWrapper.appendChild(img);
            imagesContainer.appendChild(imgWrapper);
          });
        }
      })
      .catch(error => {
        console.error('Error loading project:', error);
      });
  });