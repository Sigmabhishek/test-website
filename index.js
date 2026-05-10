const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const statusRegion = document.querySelector('.screen-reader-status');
const contactForm = document.querySelector('#contact-form');
const contactResponse = document.querySelector('#contact-response');
const examplesContent = document.querySelector('.examples-content');
const happyContent = document.querySelector('.happy-content');
let animationsPaused = false;

if (leftBtn) {
    leftBtn.setAttribute('aria-pressed', 'false');
    leftBtn.addEventListener('click', () => {
        const active = leftBtn.classList.toggle('active');
        document.body.classList.toggle('theme-alt');
        leftBtn.setAttribute('aria-pressed', String(active));
        if (statusRegion) {
            statusRegion.textContent = active ? 'Button color change activated.' : 'Button color change deactivated.';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (rightBtn) {
    rightBtn.setAttribute('aria-pressed', 'false');
    rightBtn.addEventListener('click', () => {
        animationsPaused = !animationsPaused;
        const state = animationsPaused ? 'paused' : 'running';
        if (examplesContent) examplesContent.style.animationPlayState = state;
        if (happyContent) happyContent.style.animationPlayState = state;
        rightBtn.classList.toggle('active');
        rightBtn.setAttribute('aria-pressed', String(animationsPaused));
        if (statusRegion) {
            statusRegion.textContent = animationsPaused ? 'Animations paused.' : 'Animations resumed.';
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!contactResponse) return;

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());
        contactResponse.textContent = 'Sending message...';
        contactResponse.classList.remove('error');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Unable to submit form.');
            contactResponse.textContent = data.message || 'Message sent successfully.';
            contactForm.reset();
        } catch (error) {
            contactResponse.textContent = error.message;
            contactResponse.classList.add('error');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (examplesContent) {
        examplesContent.style.animationPlayState = 'running';
    }
    if (happyContent) {
        happyContent.style.animationPlayState = 'running';
    }
});
