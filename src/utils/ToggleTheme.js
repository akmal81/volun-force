

const ToggleTheme = () => {
  const htmlElement = document.documentElement;
  const currentTheme =htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
};

export default ToggleTheme;