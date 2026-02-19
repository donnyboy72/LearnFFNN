// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Sidebar Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#sidebar nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Toggle
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '☰';
    toggle.onclick = () => {
        document.getElementById('sidebar').classList.toggle('open');
    };
    document.body.appendChild(toggle);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !toggle.contains(e.target) &&
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });
});

// PWA Install Prompt
let deferredPrompt;
const installDiv = document.createElement('div');
installDiv.id = 'install-prompt';
installDiv.innerHTML = `
    <p>Install this app for offline use!</p>
    <button id="install-btn">Install App</button>
    <button id="dismiss-btn" style="background:transparent; border:1px solid #555;">Dismiss</button>
`;
document.body.appendChild(installDiv);

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installDiv.style.display = 'flex';
});

document.getElementById('install-btn').addEventListener('click', () => {
    installDiv.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
    });
});

document.getElementById('dismiss-btn').addEventListener('click', () => {
    installDiv.style.display = 'none';
});
