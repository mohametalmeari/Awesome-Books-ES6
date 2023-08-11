const noBooks = document.getElementById('no-books');
let bks = [];
const CheckAvailability = () => {
  if (localStorage.getItem('books') !== null) {
    bks = JSON.parse(localStorage.getItem('books'));
  }
  if (bks.length === 0) {
    noBooks.style.display = 'block';
  } else {
    noBooks.style.display = 'none';
  }
};
export default CheckAvailability;
