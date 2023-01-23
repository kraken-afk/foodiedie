document.addEventListener('DOMContentLoaded', () => {
  const skipContentBtn = document.getElementById('skipcontent');

  skipContentBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let mainContent = document.querySelector('#mainContent');

    mainContent.focus();
    mainContent = null;
  });
});