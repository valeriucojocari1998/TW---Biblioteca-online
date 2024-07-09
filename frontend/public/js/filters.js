document.addEventListener('DOMContentLoaded', () => {
  const filterButton = document.getElementById('filter-btn');
  const resetButton = document.getElementById('reset-btn');
  const pageSize = document.getElementById('pagination');
  const pageCount = document.getElementById('page');
  const priceRangeElement = document.getElementById('price-range');
  const inStockElement = document.getElementById('in-stock');
  const authorElement = document.getElementById('author');
  const categoryElement = document.getElementById('categories');
  const creationDateElement = document.getElementById('creation-date');
  const searchTextElement = document.getElementById('search');
  const orderFieldElement = document.getElementById('orderField');
  const orderDirectionElement = document.getElementById('orderDirection');
  addLabels();


  filterButton.addEventListener('click', filterBooks);
  resetButton.addEventListener('click', resetFilters);
  pageSize.addEventListener('change', filterBooks);
  pageCount.addEventListener('change', filterBooks);
  priceRangeElement.addEventListener('change', filterBooks);
  inStockElement.addEventListener('change', filterBooks);
  authorElement.addEventListener('change', filterBooks);
  categoryElement.addEventListener('change', filterBooks);
  creationDateElement.addEventListener('change', filterBooks);
  searchTextElement.addEventListener('change', filterBooks);
  orderFieldElement.addEventListener('change', filterBooks);
  orderDirectionElement.addEventListener('change', filterBooks);

  function filterBooks() {
    const priceRange = document.getElementById('price-range').value;
    const inStock = document.getElementById('in-stock').checked;
    const author = document.getElementById('author').value.toLowerCase();
    const category = document.getElementById('categories').value
    const creationDate = document.getElementById('creation-date').value;
    const searchText = document.getElementById('search').value;
    const pagination = document.getElementById('pagination').value;
    const page = document.getElementById('page').value;
    const orderFieldElement = document.getElementById('orderField').value;
    const orderDirectionElement = document.getElementById('orderDirection').value;

    const books = document.querySelectorAll('.books article');
    let visibleCount = 0;
    let pageNum = parseInt(page);
    let pageSize = parseInt(pagination);
    let skip = (pageNum - 1) * pageSize;
    let take = pageSize;
    
    books.forEach(book => {
      const bookName = book.querySelector('h3').textContent.toLowerCase();
      const bookPrice = parseFloat(book.querySelector('ul li strong[data-type="price"]').nextSibling.nodeValue);
      const bookInStock = book.querySelector('ul li strong[data-type="inStock"]').nextSibling.nodeValue.trim() === 'Yes';
      const bookAuthor = book.querySelector('ul li strong[data-type="author"]').nextSibling.nodeValue.trim().toLowerCase();
      const bookCategories = book.querySelector('ul li strong[data-type="categories"]').nextSibling.nodeValue;
      const bookCreationDate = book.querySelector('ul li strong[data-type="creationDate"] time')?.getAttribute('datetime');

      const priceMatch = bookPrice <= priceRange;
      const inStockMatch = !inStock || bookInStock;
      const authorMatch = author === '' || normalizeDiacritics(bookAuthor).includes(normalizeDiacritics(author));
      const categoriesMatch = !category || category == bookCategories;
      const creationDateMatch = creationDate === '' || bookCreationDate === creationDate;
      const searchTerms = searchText.split(/\s+/);
      const searchMatch = searchTerms.every(term => {

      return normalizeDiacritics(bookAuthor).includes(normalizeDiacritics(term)) || normalizeDiacritics(bookName).includes(normalizeDiacritics(term));

      });

      if (priceMatch && inStockMatch && authorMatch && categoriesMatch && creationDateMatch && searchMatch && skip <= 0 && take > 0) {
        book.style.display = '';
        visibleCount++;
        take--;
      } else {
        book.style.display = 'none';
        skip--;
      }
    });

    const noProductsMessage = document.getElementById('no-products-message');
    noProductsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  function addLabels() {
    const books = document.querySelectorAll('.books article');
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    books.forEach(book => {
      const bookPrice = parseFloat(book.querySelector('ul li strong[data-type="price"]').nextSibling.nodeValue);

      if (bookPrice < minPrice) {
        minPrice = bookPrice;
      }

      if (bookPrice > maxPrice) {
        maxPrice = bookPrice;
      }
    });

    books.forEach(book => {
      const bookPrice = parseFloat(book.querySelector('ul li strong[data-type="price"]').nextSibling.nodeValue);

      if (bookPrice == minPrice) {
        const minLabel = document.createElement('span');
        minLabel.textContent = 'Lowest Price';
        minLabel.style.color = 'green';
        book.appendChild(minLabel);
      }
      
      if (bookPrice == maxPrice) {
        const maxLabel = document.createElement('span');
        maxLabel.textContent = 'Highest Price';
        maxLabel.style.color = 'red';
        book.appendChild(maxLabel);
      }
    })


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
      filterBooks();
    }
  }
});


function normalizeDiacritics(text) {
  if (!text) {
    return text;
  }
  const diacriticsMap = {
    'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T',
    'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
    'Á': 'A', 'À': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Ā': 'A', 'Ă': 'A', 'Ą': 'A', 'Ǎ': 'A',
    'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'ā': 'a', 'ă': 'a', 'ą': 'a', 'ǎ': 'a',
    'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E', 'Ē': 'E', 'Ĕ': 'E', 'Ė': 'E', 'Ę': 'E', 'Ě': 'E',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'ē': 'e', 'ĕ': 'e', 'ė': 'e', 'ę': 'e', 'ě': 'e',
    'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I', 'Ĩ': 'I', 'Ī': 'I', 'Ĭ': 'I', 'Ǐ': 'I', 'Į': 'I', 'İ': 'I',
    'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i', 'ĩ': 'i', 'ī': 'i', 'ĭ': 'i', 'ǐ': 'i', 'į': 'i', 'ı': 'i',
    'Ó': 'O', 'Ò': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O', 'Ō': 'O', 'Ŏ': 'O', 'Ő': 'O',
    'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'ō': 'o', 'ŏ': 'o', 'ő': 'o',
    'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ũ': 'U', 'Ū': 'U', 'Ŭ': 'U', 'Ů': 'U', 'Ű': 'U', 'Ų': 'U',
    'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ũ': 'u', 'ū': 'u', 'ŭ': 'u', 'ů': 'u', 'ű': 'u', 'ų': 'u',
    'Ý': 'Y', 'Ÿ': 'Y', 'Ŷ': 'Y', 'ý': 'y', 'ÿ': 'y', 'ŷ': 'y',
    'Ç': 'C', 'Ć': 'C', 'Ĉ': 'C', 'Ċ': 'C', 'Č': 'C',
    'ç': 'c', 'ć': 'c', 'ĉ': 'c', 'ċ': 'c', 'č': 'c',
    'Ñ': 'N', 'Ń': 'N', 'Ņ': 'N', 'Ň': 'N', 'Ŋ': 'N',
    'ñ': 'n', 'ń': 'n', 'ņ': 'n', 'ň': 'n', 'ŋ': 'n',
    'Ś': 'S', 'Ŝ': 'S', 'Ş': 'S', 'Š': 'S',
    'ś': 's', 'ŝ': 's', 'ş': 's', 'š': 's',
    'Ź': 'Z', 'Ż': 'Z', 'Ž': 'Z',
    'ź': 'z', 'ż': 'z', 'ž': 'z',
    'Ð': 'D', 'ð': 'd',
    'Þ': 'Th', 'þ': 'th',
    'Æ': 'Ae', 'æ': 'ae',
    'Œ': 'Oe', 'œ': 'oe'
  };

  return text.split('').map(char => diacriticsMap[char] || char).join('');
}