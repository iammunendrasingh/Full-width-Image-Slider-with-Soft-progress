document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.querySelector('.progress-bar');
    const slideInterval = 5000; // 4 seconds
    let currentSlide = 0;

    // Create progress segments based on the number of slides
    slides.forEach(() => {
        const progressSegment = document.createElement('div');
        progressSegment.classList.add('progress-segment');
        
        const fillDiv = document.createElement('div');
        fillDiv.classList.add('fill');
        
        progressSegment.appendChild(fillDiv);
        progressBar.appendChild(progressSegment);
    });

    const progressSegments = document.querySelectorAll('.progress-segment .fill');

    function resetProgressSegments() {
        progressSegments.forEach((fillDiv, i) => {
            if (i < currentSlide) {
                // Completed segments should remain filled
                fillDiv.style.transition = 'none';
                fillDiv.style.width = '100%';
            } else if (i === currentSlide) {
                // Current segment should reset and start filling
                fillDiv.style.transition = 'none';
                fillDiv.style.width = '0';
                setTimeout(() => {
                    fillDiv.style.transition = `width ${slideInterval - 200}ms linear`; // Transition slightly less than slideInterval to sync perfectly
                    fillDiv.style.width = '100%';
                }, 100); // Ensure transition happens after reset
            } else {
                // Upcoming segments should remain empty
                fillDiv.style.transition = 'none';
                fillDiv.style.width = '0';
            }
        });
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        resetProgressSegments();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, slideInterval);

    showSlide(currentSlide); // Show the first slide initially
});
