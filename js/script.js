const selector = document.getElementById('theme-selector');

selector.addEventListener('change', () => {
  document.body.className = ''; // Удаляем старую тему
  const theme = selector.value + '-theme';
  document.body.classList.add(theme);
});
