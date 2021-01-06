// If Tables/Charis is checked enable count fields also.
let chairs = document.querySelector('#chairs');
let chairCountRow = document.querySelector('#chairCountRow');
let tables = document.querySelector('#tables');
let tableCountRow = document.querySelector('#tableCountRow');

function toggleChairRow() {
  if (this.checked) {
    chairCountRow.removeAttribute('hidden');
  } else {
    chairCountRow.setAttribute('hidden', false);
  }
}
function toggleTableRow() {
  if (this.checked) {
    tableCountRow.removeAttribute('hidden');
  } else {
    tableCountRow.setAttribute('hidden', false);
  }
}

chairs.addEventListener('change', toggleChairRow);
tables.addEventListener('change', toggleTableRow);

// When submitting a search filter
const searchFormHandler = async (event) => {
  event.preventDefault();

  // Animate button click & old resutls moving out
  animateCSS('#filterBtn','bounce');
  await animateCSS('#searchResults','fadeOutRight');

  // TODO: Get form elements and pass to backend to filter results

  // TODO: Receive filtered results from backend and update search Results area.

  // Animate new results moving in

  animateCSS('#searchResults','backInRight');

};

document
  .querySelector('.search-form')
  .addEventListener('submit', searchFormHandler);