import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiBookOpen, FiImage, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa';
import { addProduct, getAllProducts } from '../../slices/productSlice';
import { fetchCategories } from '../../services/api';

const emptyDraft = () => ({
  type: 'product',
  name: '',
  author: '',
  publisher: '',
  isbn: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  file: null,
  imageUrl: '',
  imageSource: '',
  make: '',
  model: '',
  trim: '',
  year: '',
  mileage: '',
  fuelType: '',
  transmission: '',
  bodyStyle: '',
  seats: '',
  range: '',
  color: '',
  condition: 'Used',
  location: '',
});

const isCarCategory = (category) => /car|vehicle/i.test(category || '');

const CreateEditProduct = () => {
  const dispatch = useDispatch();
  const [draft, setDraft] = useState(emptyDraft);
  const [queue, setQueue] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchingBooks, setSearchingBooks] = useState(false);
  const [bookCandidates, setBookCandidates] = useState([]);
  const [bookSearchError, setBookSearchError] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [notice, setNotice] = useState(null);
  const imagePreview = useMemo(() => (draft.file ? URL.createObjectURL(draft.file) : ''), [draft.file]);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const loadCategories = async () => {
    setLoadingCategories(true);
    setCategoryError('');
    try {
      const result = await fetchCategories();
      setCategories(Array.isArray(result) ? result : []);
    } catch (error) {
      setCategoryError(error.response?.data?.message || error.message || 'Categories could not be loaded.');
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const updateDraft = (field, value) => {
    if (field === 'name' || field === 'type') {
      setBookCandidates([]);
      setBookSearchError('');
      setDraft((current) => ({ ...current, [field]: value, imageUrl: '', imageSource: '' }));
    } else {
      setDraft((current) => ({ ...current, [field]: value }));
    }
    setNotice(null);
  };

  const searchBookCovers = async () => {
    const query = draft.name.trim();
    if (!query) {
      setBookSearchError('Enter the book title or author before searching.');
      return;
    }

    setSearchingBooks(true);
    setBookSearchError('');
    setBookCandidates([]);
    try {
      const searchQuery = `intitle:${query}${draft.author.trim() ? `+inauthor:${draft.author.trim()}` : ''}`;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=6&printType=books`
      );
      if (!response.ok) throw new Error(`Google Books returned HTTP ${response.status}.`);
      const data = await response.json();
      const matches = (data.items || []).flatMap((item) => {
        const info = item.volumeInfo || {};
        const imageUrl = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;
        if (!imageUrl) return [];
        return [{
          id: item.id,
          title: info.title || 'Untitled book',
          authors: info.authors || [],
          publisher: info.publisher || '',
          isbn: info.industryIdentifiers?.find((identifier) => identifier.type === 'ISBN_13')?.identifier
            || info.industryIdentifiers?.[0]?.identifier
            || '',
          imageUrl: imageUrl.replace(/^http:/, 'https:'),
          sourceUrl: info.infoLink || '',
        }];
      });
      setBookCandidates(matches);
      if (!matches.length) setBookSearchError('No book-cover images were found. You can upload an image instead.');
    } catch (error) {
      setBookSearchError(error.message || 'Book cover search failed. You can upload an image instead.');
    } finally {
      setSearchingBooks(false);
    }
  };

  const addDraftToQueue = (event) => {
    event.preventDefault();
    const price = Number(draft.price);
    const stock = Number(draft.stock);
    if (!draft.name.trim() || !draft.description.trim() || !draft.category || draft.price === '' || !Number.isFinite(price) || price <= 0 || draft.stock === '' || !Number.isInteger(stock) || stock < 0) {
      setNotice({ type: 'error', text: 'Add a name, description, category, positive price, and stock as a whole number (zero is allowed).' });
      return;
    }
    if (carMode && (!isCarCategory(selectedCategory) || !draft.make.trim() || !draft.model.trim() || !draft.year || !Number.isInteger(Number(draft.year)) || Number(draft.year) < 1886 || !draft.fuelType || !draft.transmission)) {
      setNotice({ type: 'error', text: 'Car listings need the car category, make, model, valid year, fuel type, and transmission.' });
      return;
    }

    setQueue((items) => [...items, {
      ...draft,
      type: carMode ? 'car' : draft.type,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }]);
    setDraft(emptyDraft());
    setBookCandidates([]);
    setBookSearchError('');
    setNotice({ type: 'success', text: 'Added to the publishing list. Add another item or publish the list.' });
  };

  const publishQueue = async () => {
    if (!queue.length || publishing) return;
    setPublishing(true);
    setNotice(null);
    let publishedCount = 0;
    let failedItem = null;

    for (const item of queue) {
      const formData = new FormData();
      ['name', 'description', 'price', 'stock', 'category'].forEach((field) => formData.append(field, String(item[field])));

      if (item.type === 'book') {
        ['author', 'publisher', 'isbn'].forEach((field) => {
          if (item[field]) formData.append(field, item[field]);
        });
      }

      if (item.type === 'car') {
        [
          'make', 'model', 'trim', 'year', 'mileage', 'fuelType', 'transmission',
          'bodyStyle', 'seats', 'range', 'color', 'condition', 'location',
        ].forEach((field) => {
          if (item[field] !== '') formData.append(field, String(item[field]));
        });
        formData.append('isPublished', 'true');
      }

      try {
        let imageFile = item.file;
        if (!imageFile && item.imageUrl) {
          const imageResponse = await fetch(item.imageUrl);
          if (!imageResponse.ok) throw new Error('The selected book cover could not be downloaded. Upload an image file and retry.');
          const imageBlob = await imageResponse.blob();
          if (!imageBlob.type.startsWith('image/')) throw new Error('The selected cover was not returned as an image. Upload an image file and retry.');
          imageFile = new File([imageBlob], `${item.name.replace(/[^\w-]+/g, '-')}-cover.jpg`, { type: imageBlob.type });
          formData.append('imageUrl', item.imageUrl);
          formData.append('imageSource', item.imageSource);
        }
        if (imageFile) formData.append('file', imageFile);
        await dispatch(addProduct(formData)).unwrap();
        publishedCount += 1;
      } catch (error) {
        failedItem = { item, error };
        break;
      }
    }

    if (publishedCount > 0) {
      setQueue((items) => items.slice(publishedCount));
      dispatch(getAllProducts());
    }

    if (failedItem) {
      const errorMessage = failedItem.error?.response?.data?.message || failedItem.error?.message || 'The server rejected this item.';
      setNotice({
        type: 'error',
        text: `${publishedCount} item${publishedCount === 1 ? '' : 's'} published. “${failedItem.item.name}” failed: ${errorMessage} Remaining items are still in the list.`,
      });
    } else {
      setNotice({ type: 'success', text: `Published ${publishedCount} item${publishedCount === 1 ? '' : 's'} successfully.` });
    }
    setPublishing(false);
  };

  const selectedCategory = categories.find((item) => item._id === draft.category)?.category || '';
  const carMode = draft.type === 'car' || isCarCategory(selectedCategory);

  return (
    <section className="kk-admin-form-card kk-admin-batch">
      <div className="kk-admin-batch__heading">
        <div>
          <span className="kk-admin-eyebrow">INVENTORY</span>
          <h2>Add products to your catalogue</h2>
          <p>Prepare several products or car listings, review the list, then publish them.</p>
        </div>
        <span className="kk-admin-batch__count">{queue.length} queued</span>
      </div>

      {categoryError && (
        <div className="kk-admin-batch__notice is-error" role="alert">
          Could not load categories: {categoryError}
          <button type="button" onClick={loadCategories}>Retry</button>
        </div>
      )}
      {notice && <div className={`kk-admin-batch__notice is-${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.text}</div>}

      <form className="kk-admin-batch__form" onSubmit={addDraftToQueue}>
        <div className="kk-admin-batch__type">
          <label htmlFor="admin-item-type">Listing type</label>
          <select id="admin-item-type" value={draft.type} onChange={(event) => updateDraft('type', event.target.value)}>
            <option value="product">Product / stationery</option>
            <option value="book">Book</option>
            <option value="car">Car for sale</option>
          </select>
          {draft.type === 'book' && (
            <button className="kk-admin-batch__lookup" type="button" onClick={searchBookCovers} disabled={searchingBooks}>
              <FiSearch aria-hidden="true" /> {searchingBooks ? 'Searching…' : 'Find book cover'}
            </button>
          )}
        </div>

        <label>
          <span>{carMode ? 'Listing title' : 'Name'}</span>
          <input value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} placeholder={draft.type === 'book' ? 'Book title' : carMode ? 'e.g. Toyota RAV4 Hybrid' : 'e.g. Mathematics set'} />
        </label>
        {draft.type === 'book' && (
          <label>
            <span>Author (optional)</span>
            <input value={draft.author} onChange={(event) => updateDraft('author', event.target.value)} placeholder="Author name improves cover matches" />
          </label>
        )}
        {draft.type === 'book' && (
          <>
            <label>
              <span>Publisher (optional)</span>
              <input value={draft.publisher} onChange={(event) => updateDraft('publisher', event.target.value)} placeholder="Publisher" />
            </label>
            <label>
              <span>ISBN (optional)</span>
              <input value={draft.isbn} onChange={(event) => updateDraft('isbn', event.target.value)} placeholder="ISBN-13" />
            </label>
          </>
        )}
        <label>
          <span>Price (RWF)</span>
          <input type="number" min="1" step="1" value={draft.price} onChange={(event) => updateDraft('price', event.target.value)} placeholder="Price" />
        </label>
        <label>
          <span>In stock</span>
          <input type="number" min="0" step="1" value={draft.stock} onChange={(event) => updateDraft('stock', event.target.value)} placeholder="Quantity" />
        </label>
        <label>
          <span>Category</span>
          <select value={draft.category} onChange={(event) => updateDraft('category', event.target.value)} disabled={loadingCategories}>
            <option value="">{loadingCategories ? 'Loading categories…' : 'Select category'}</option>
            {categories.map((category) => <option key={category._id} value={category._id}>{category.category}</option>)}
          </select>
        </label>
        <label className="kk-admin-batch__description">
          <span>Description</span>
          <textarea value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} placeholder="Add useful details customers should know" rows="3" />
        </label>

        {carMode && (
          <div className="kk-admin-batch__car-fields">
            <div className="kk-admin-batch__section-title"><FaCarSide aria-hidden="true" /> Vehicle details <small>Shown on the public car listing</small></div>
            {[
              ['make', 'Make', 'e.g. Toyota'],
              ['model', 'Model', 'e.g. RAV4'],
              ['trim', 'Trim', 'e.g. Limited'],
              ['year', 'Year', 'e.g. 2022'],
              ['mileage', 'Mileage (km)', 'e.g. 32000'],
              ['fuelType', 'Fuel type', 'Choose fuel'],
              ['transmission', 'Transmission', 'Choose transmission'],
              ['bodyStyle', 'Body style', 'e.g. SUV'],
              ['seats', 'Seats', 'e.g. 5'],
              ['range', 'Electric range (km)', 'Optional'],
              ['color', 'Color', 'e.g. Silver'],
              ['location', 'Location', 'e.g. Kigali'],
            ].map(([field, label, placeholder]) => (
              <label key={field}>
                <span>{label}</span>
                {field === 'fuelType' ? (
                  <select value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)}>
                    <option value="">{placeholder}</option>
                    {['Electric', 'Hybrid', 'Petrol', 'Diesel'].map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                ) : field === 'transmission' ? (
                  <select value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)}>
                    <option value="">{placeholder}</option>
                    {['Automatic', 'Manual'].map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                ) : (
                  <input type={['year', 'mileage', 'seats', 'range'].includes(field) ? 'number' : 'text'} min={['mileage', 'seats', 'range'].includes(field) ? '0' : undefined} value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)} placeholder={placeholder} />
                )}
              </label>
            ))}
            <label>
              <span>Condition</span>
              <select value={draft.condition} onChange={(event) => updateDraft('condition', event.target.value)}>
                {['Used', 'New'].map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
          </div>
        )}

        <label className="kk-admin-batch__image">
          <span>{carMode ? 'Car photo' : 'Product image'} (optional; upload overrides a selected book cover)</span>
          <input type="file" accept="image/*" onChange={(event) => updateDraft('file', event.target.files?.[0] || null)} />
        </label>
        {draft.file && <img className="kk-admin-batch__preview" src={imagePreview} alt="Selected image preview" />}

        {bookSearchError && <p className="kk-admin-batch__search-error" role="status">{bookSearchError}</p>}
        {!!bookCandidates.length && (
          <div className="kk-admin-batch__book-results">
            <div className="kk-admin-batch__section-title"><FiBookOpen aria-hidden="true" /> Choose a matching cover <small>Check the title/author before selecting.</small></div>
            {bookCandidates.map((book) => (
              <button
                type="button"
                key={book.id}
                className={`kk-admin-batch__book${draft.imageUrl === book.imageUrl ? ' is-selected' : ''}`}
                onClick={() => setDraft((current) => ({
                  ...current,
                  author: book.authors.join(', ') || current.author,
                  publisher: book.publisher || current.publisher,
                  isbn: book.isbn || current.isbn,
                  imageUrl: book.imageUrl,
                  imageSource: book.sourceUrl,
                  file: null,
                }))}
              >
                <img src={book.imageUrl} alt="" />
                <span><strong>{book.title}</strong><small>{book.authors.join(', ') || 'Author not listed'}</small></span>
                <FiImage aria-hidden="true" />
              </button>
            ))}
          </div>
        )}

        <div className="kk-admin-batch__actions">
          <button type="submit" className="kk-admin-batch__add" disabled={loadingCategories || !categories.length}><FiPlus aria-hidden="true" /> Add to list</button>
        </div>
      </form>

      {queue.length > 0 && (
        <div className="kk-admin-batch__queue">
          <div className="kk-admin-batch__queue-heading">
            <div><h3>Ready to publish</h3><p>Each successful listing is saved to the catalogue before the next one is sent.</p></div>
            <button type="button" className="kk-admin-batch__publish" onClick={publishQueue} disabled={publishing}>
              {publishing ? 'Publishing…' : `Publish ${queue.length} item${queue.length === 1 ? '' : 's'}`}
            </button>
          </div>
          <ol>
            {queue.map((item, index) => (
              <li key={item.id}>
                <span className="kk-admin-batch__number">{String(index + 1).padStart(2, '0')}</span>
                {item.type === 'car' && <FaCarSide aria-label="Car listing" />}
                {item.type === 'book' && <FiBookOpen aria-label="Book" />}
                <div><strong>{item.name}</strong><small>{categories.find((category) => category._id === item.category)?.category || 'Category'} · RWF {Number(item.price).toLocaleString()} · {item.stock} in stock</small></div>
                <button type="button" onClick={() => setQueue((items) => items.filter((queued) => queued.id !== item.id))} disabled={publishing} aria-label={`Remove ${item.name} from publishing list`}><FiTrash2 aria-hidden="true" /></button>
              </li>
            ))}
          </ol>
        </div>
      )}
      <p className="kk-admin-batch__stock-note">Inventory quantity is saved with each product. Automatic stock deductions at checkout require the backend order flow to decrement stock safely.</p>
    </section>
  );
};

export default CreateEditProduct;
