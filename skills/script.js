document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');

    // Remove the 'no-transition' class after a short delay to re-enable transitions
    setTimeout(() => {
        nav.classList.remove('no-transition');
    }, 100);

    // Your existing code to handle nav state preservation
    const menuIcon = document.querySelector('.menuIcon');
    const menu = document.getElementById('menu');
    const pageLinks = document.querySelectorAll('#nav .PageButton, #nav #me');

    // Check sessionStorage to see if the nav should be open
    if (sessionStorage.getItem('navOpen') === 'true') {
        nav.classList.add('sexy');
        menuIcon.classList.remove('inactiveIcon');
    }

    menu.addEventListener('click', function(event) {
        // Prevents the click from propagating to the document
        event.stopPropagation();

        // Toggle the 'sexy' class on the nav
        const isNavOpen = nav.classList.toggle('sexy');
        
        // Toggle the 'inactiveIcon' class on the menu icon itself
        menuIcon.classList.toggle('inactiveIcon');

        // Update sessionStorage based on the nav state
        if (isNavOpen) {
            sessionStorage.setItem('navOpen', 'true');
        } else {
            sessionStorage.removeItem('navOpen');
        }
    });

    document.addEventListener('click', function(event) {
        // Check if nav is open and the click is outside of menu and nav
        if (nav.classList.contains('sexy') && !menu.contains(event.target) && !nav.contains(event.target)) {
            nav.classList.remove('sexy');
            menuIcon.classList.add('inactiveIcon'); // Re-add the 'inactiveIcon' class when nav closes
            sessionStorage.removeItem('navOpen'); // Update sessionStorage when nav is closed
        }
    });

    // Add event listeners to each link to preserve nav state when navigating
    pageLinks.forEach(link => {
        link.addEventListener('click', function() {
            sessionStorage.setItem('navOpen', 'true'); // Preserve the nav state when moving to another page
        });
    });
});