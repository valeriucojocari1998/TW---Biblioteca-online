document.addEventListener('DOMContentLoaded', () => {
  const filterButton = document.getElementById('filter-btn');
  const resetButton = document.getElementById('reset-btn');

  filterButton.addEventListener('click', filterBooks);
  resetButton.addEventListener('click', resetFilters);

  function filterBooks() {
    const priceRange = document.getElementById('price-range').value;
    const inStock = document.getElementById('in-stock').checked;
    const author = document.getElementById('author').value.toLowerCase();
    const categories = Array.from(document.getElementById('categories').selectedOptions).map(option => option.value);
    const creationDate = document.getElementById('creation-date').value;
    const searchText = document.getElementById('search').value;

    const books = document.querySelectorAll('.books article');
    
    books.forEach(book => {
      const bookName = book.querySelector('h3').textContent.toLowerCase();
      const bookPrice = parseFloat(book.querySelector('ul li strong[data-type="price"]').nextSibling.nodeValue);
      const bookInStock = book.querySelector('ul li strong[data-type="inStock"]').nextSibling.nodeValue.trim() === 'Yes';
      const bookAuthor = book.querySelector('ul li strong[data-type="author"]').nextSibling.nodeValue.trim().toLowerCase();
      const bookCategories = book.querySelector('ul li strong[data-type="categories"]').nextSibling.nodeValue.split(',').map(category => category.trim());
      const bookCreationDate = book.querySelector('ul li strong[data-type="creationDate"] time')?.getAttribute('datetime');
      const bookDescription = book.querySelector('p').textContent.toLowerCase();

      const priceMatch = bookPrice <= priceRange;
      const inStockMatch = !inStock || bookInStock;
      const authorMatch = author === '' || bookAuthor.includes(author);
      const categoriesMatch = categories.length === 0 || categories.some(category => bookCategories.includes(category));
      const creationDateMatch = creationDate === '' || bookCreationDate === creationDate;
      const searchTerms = searchText.split(/\s+/);
      const searchMatch = searchTerms.every(term => {

      return bookAuthor.includes(term) || bookName.includes(term);

      });

      if (priceMatch && inStockMatch && authorMatch && categoriesMatch && creationDateMatch && searchMatch) {
        book.style.display = '';
      } else {
        book.style.display = 'none';
      }
    });
  }

  function resetFilters() {
    if (confirm("Are you sure you want to reset the filters?")) {
      document.getElementById('price-range').value = 100;
      document.getElementById('in-stock').checked = false;
      document.getElementById('author').value = '';
      document.getElementById('categories').selectedIndex = -1;
      document.getElementById('creation-date').value = '';
      document.getElementById('search').value = '';

      const books = document.querySelectorAll('.books article');
      books.forEach(book => {
        book.style.display = '';
      });
    }
  }
});
