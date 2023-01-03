const theme = {
  init() {
    const currentTheme = localStorage.getItem('theme');

    if (!currentTheme) {
      this.setLocalTheme();
      this.init();
    }
    document.body.className = currentTheme;
  },

  setLocalTheme() {
    localStorage.setItem('theme', 'light');
  },

  changeHandler(scheme) {
    if (scheme !== 'light' && scheme !== 'dark') {
      throw new TypeError('scheme must be either light or dark');
    }
    localStorage.setItem('theme', scheme);
  },
};

export default theme;
