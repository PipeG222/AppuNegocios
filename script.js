document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                entry.target.classList.remove('disappear');
            } else {
                entry.target.classList.remove('appear');
                entry.target.classList.add('disappear');
            }
        });
    });

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.slideInRight').forEach(element => {
        observer.observe(element);
    });
});