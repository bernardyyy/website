// scripts.js - For homepage
document.addEventListener('DOMContentLoaded', function() {
  // Load projects from the JSON file
  fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
      const container = document.getElementById('projects-container');
      
      projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'content';
        
        // Create media element based on type
        let mediaHtml = '';
        if (project.homeMedia) {
          if (project.homeMediaType === 'video') {
            mediaHtml = `<video src="${project.homeMedia}" autoplay loop muted></video>`;
          } else {
            // For both images and GIFs
            mediaHtml = `<img src="${project.homeMedia}" alt="${project.title}">`;
          }
        }
        
        projectDiv.innerHTML = `
    ${mediaHtml}
    <div class="project_item-txt_main">
        <div class="project_item-txt">
            <h3>${project.title}</h3>
            <p class="txt_category">${project.categories ? project.categories.map(cat => cat.text).join(', ') : ''}</p>
        </div>
        <p>${project.year}</p>
    </div>
`;

        
        // Make the entire project div clickable
        projectDiv.style.cursor = 'pointer';
        projectDiv.addEventListener('click', function() {
          window.location.href = `project.html?id=${project.id}`;
        });
        
        container.appendChild(projectDiv);
      });
    })
    .catch(error => {
      console.error('Error loading projects:', error);
    });
});

// project-script.js - For project detail page
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
      document.getElementById('project-category').textContent = project.category.text;
      document.getElementById('project-year').textContent = project.year;
      document.getElementById('project-description').innerHTML = project.description;
      
      // Load project media
      const imagesContainer = document.getElementById('project-images');
      imagesContainer.innerHTML = '';
      
      if (project.projectMedia && project.projectMedia.length > 0) {
        project.projectMedia.forEach(media => {
          const mediaWrapper = document.createElement('div');
          mediaWrapper.className = 'content';
          
          // Create appropriate media element based on type
          if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.data;
            video.controls = true;
            video.autoplay = false;
            video.loop = true;
            video.muted = false;
            mediaWrapper.appendChild(video);
          } else {
            // For both images and GIFs
            const img = document.createElement('img');
            img.src = media.data;
            img.alt = project.subpageTitle;
            mediaWrapper.appendChild(img);
          }
          
          imagesContainer.appendChild(mediaWrapper);
        });
      }
    })
    .catch(error => {
      console.error('Error loading project:', error);
    });
});