const links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('.section');

const navigate = (x) => {
  for (let i = 0; i < 3; i += 1) {
    links[i].style.color = 'black';
    sections[i].style.display = 'none';
  }
  links[x].style.color = 'blue';
  sections[x].style.display = 'flex';
};

export { navigate, links, sections };