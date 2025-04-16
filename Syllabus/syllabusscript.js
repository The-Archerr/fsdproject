document.addEventListener('DOMContentLoaded', () => {
    // Handle course title clicks
    const courseTitles = document.querySelectorAll('.course-title');
    courseTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all other courses
            document.querySelectorAll('.course-content.active').forEach(c => {
                if (c !== content) {
                    c.classList.remove('active');
                    c.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current course
            content.classList.toggle('active');
            title.classList.toggle('active');
            
            // If opening, close all units inside
            if (!isActive) {
                content.querySelectorAll('.unit-content.active').forEach(u => {
                    u.classList.remove('active');
                    u.previousElementSibling.classList.remove('active');
                });
            }
        });
    });

    // Handle unit title clicks
    const unitTitles = document.querySelectorAll('.unit-title');
    unitTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            content.classList.toggle('active');
            title.classList.toggle('active');
        });
    });
});