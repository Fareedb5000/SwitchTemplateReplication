document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('mode-toggle');
    const toggleLabel = document.getElementById('toggle-label');
    const body = document.body;
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    const introSection = document.querySelector('.intro-section');
    const cta = document.querySelector('.call-to-action');
    const featureSection = document.querySelector('.features-section'); // Added for feature section
    const featureItems = document.querySelectorAll('.feature-item'); // Added for feature items

    // Function to set theme
    function setTheme(theme) {
        body.className = ''; // Clear existing classes
        body.classList.add(theme);
        header.className = 'site-header ' + theme;
        footer.className = 'site-footer ' + theme;
        introSection.className = 'intro-section ' + theme;
        cta.className = 'call-to-action ' + theme;
        featureSection.className = 'features-section ' + theme; // Set class for feature section

        featureItems.forEach(item => {
            item.className = 'feature-item ' + theme; // Set class for feature items
        });

        updateImageVisibility();
    }

    // Check localStorage for saved theme and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        toggle.checked = savedTheme === 'dark';
        toggleLabel.textContent = savedTheme === 'dark' ? 'Turn me light' : 'Turn me dark';
        setTheme(savedTheme);
    } else {
        // Default to dark mode if no theme is saved
        toggle.checked = true;
        setTheme('dark');
    }

    // Function to update image visibility based on theme
    function updateImageVisibility() {
        const lightModeImages = document.querySelectorAll('.light-mode-only');
        const darkModeImages = document.querySelectorAll('.dark-mode-only');
        if (body.classList.contains('dark')) {
            lightModeImages.forEach(img => img.style.display = 'none');
            darkModeImages.forEach(img => img.style.display = 'block');
        } else {
            lightModeImages.forEach(img => img.style.display = 'block');
            darkModeImages.forEach(img => img.style.display = 'none');
        }
    }

    // Call the function to set initial visibility
    updateImageVisibility();

    toggle.addEventListener('change', function () {
        const theme = toggle.checked ? 'dark' : 'light';
        setTheme(theme);
        toggleLabel.textContent = theme === 'dark' ? 'Turn me light' : 'Turn me dark';
        localStorage.setItem('theme', theme); // Save the current theme in localStorage
    });

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add 'fade-in' class to feature items when they are in the viewport
    function onScroll() {
        featureItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('fade-in');
            }
        });
    }

    // Add event listener for scroll
    window.addEventListener('scroll', onScroll);

    // Initial check in case elements are already in the viewport on page load
    onScroll();
});
