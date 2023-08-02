function handleToggleFooter() {
    let footer = document.getElementById('footer-info');
    if (footer.style.display === 'none') {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
}