document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-button');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalMediaContainer = document.querySelector('.modal-media-container');
    const modalLink = document.querySelector('.modal-link'); // Select the link element

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const image = card.getAttribute('data-image');
            const video = card.getAttribute('data-video');
            const link = card.getAttribute('data-link'); // Grab the link from the data attribute
            
            // Populate the modal with content from the clicked card
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Set the link's href attribute
            if (link) {
                modalLink.href = link;
                modalLink.style.display = 'inline-block'; // Show the link if it exists
            } else {
                modalLink.style.display = 'none'; // Hide the link if no URL is provided
            }

            // Clear previous media content
            modalMediaContainer.innerHTML = '';
            
            // Check if there's a video, and if so, use it. Otherwise, use the image.
            if (video && video !== 'null') {
                const videoEl = document.createElement('video');
                videoEl.src = video;
                videoEl.controls = true;
                videoEl.autoplay = true;
                videoEl.loop = true;
                modalMediaContainer.appendChild(videoEl);
            } else {
                const imgEl = document.createElement('img');
                imgEl.src = image;
                imgEl.alt = title;
                modalMediaContainer.appendChild(imgEl);
            }

            modal.style.display = 'flex';
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        const video = modalMediaContainer.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    // ** Corrected Logic for Closing the Modal by Clicking Outside **
    modal.addEventListener('click', (event) => {
        // This checks if the click happened directly on the modal's backdrop
        // by comparing the target with the current element.
        if (event.target === modal) {
            modal.style.display = 'none';
            const video = modalMediaContainer.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
});