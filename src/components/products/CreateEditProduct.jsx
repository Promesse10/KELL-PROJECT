import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiPackage, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa';
import { addProduct, getAllProducts } from '../../slices/productSlice';

const emptyDraft = (type = 'stationery') => ({
  type,
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  file: null,
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
  size: '',
  unit: '',
  brand: '',
  material: '',
  warranty: '',
  condition: 'Used',
  location: '',
});

const isCarType = (type) => type === 'car-sale' || type === 'car-rental';

const CreateEditProduct = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [draft, setDraft] = useState(() => emptyDraft(searchParams.get('service') || 'stationery'));
  const [queue, setQueue] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const [notice, setNotice] = useState(null);
  const imagePreview = useMemo(() => (draft.file ? URL.createObjectURL(draft.file) : ''), [draft.file]);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const updateDraft = (field, value) => {
    if (field === 'type') {
      setDraft((current) => ({
        ...current,
        [field]: value,
        file: null,
      }));
    } else {
      setDraft((current) => ({ ...current, [field]: value }));
    }
    setNotice(null);
  };

  const addDraftToQueue = (event) => {
    event.preventDefault();
    const price = Number(draft.price);
    const stock = Number(draft.stock);
    if (!draft.name.trim() || !draft.description.trim() || draft.price === '' || !Number.isFinite(price) || price <= 0 || draft.stock === '' || !Number.isInteger(stock) || stock < 0) {
      setNotice({ type: 'error', text: t('admin.products.validationRequired') });
      return;
    }
    if (carMode && (!draft.make.trim() || !draft.model.trim() || !draft.year || !Number.isInteger(Number(draft.year)) || Number(draft.year) < 1886 || !draft.fuelType || !draft.transmission)) {
      setNotice({ type: 'error', text: t('admin.products.validationCar') });
      return;
    }
    if (!draft.file) {
      setNotice({ type: 'error', text: t('admin.products.validationImage') });
      return;
    }

    setQueue((items) => [...items, {
      ...draft,
      serviceType: isCarType(draft.type) ? 'car' : draft.type,
      type: carMode ? (draft.type === 'car-rental' ? 'car-rental' : 'car-sale') : draft.type,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }]);
    setDraft(emptyDraft(draft.type));
    setNotice({ type: 'success', text: t('admin.products.queued') });
  };

  const publishQueue = async () => {
    if (!queue.length || publishing) return;
    setPublishing(true);
    setNotice(null);
    let publishedCount = 0;
    let failedItem = null;
    let refreshError = null;

    for (const item of queue) {
      const formData = new FormData();
      formData.append('isPublished', 'true');
      formData.append('serviceType', item.serviceType);
      ['name', 'price', 'stock'].forEach((field) => formData.append(field, String(item[field])));
      if (item.category) formData.append('category', String(item.category));
      const specifications = item.type === 'hardware'
        ? [
          item.size && `Size: ${item.size}`,
          item.unit && `Unit: ${item.unit}`,
          item.brand && `Brand: ${item.brand}`,
          item.color && `Color: ${item.color}`,
          item.material && `Material: ${item.material}`,
          item.warranty && `Warranty: ${item.warranty}`,
        ].filter(Boolean).join(' · ')
        : '';
      formData.append('description', [item.description, specifications && `Specifications: ${specifications}`].filter(Boolean).join('\n\n'));

      if (item.type === 'car-sale' || item.type === 'car-rental') {
        [
          'make', 'model', 'trim', 'year', 'mileage', 'fuelType', 'transmission',
          'bodyStyle', 'seats', 'range', 'color', 'condition', 'location',
        ].forEach((field) => {
          if (item[field] !== '') formData.append(field, String(item[field]));
        });
        formData.append('listingType', item.type === 'car-rental' ? 'rent' : 'sale');
      } else if (item.type === 'hardware') {
        ['size', 'unit', 'brand', 'color', 'material', 'warranty'].forEach((field) => {
          if (item[field]) formData.append(field, item[field]);
        });
      }

      try {
        formData.append('file', item.file);
        await dispatch(addProduct(formData)).unwrap();
        publishedCount += 1;
      } catch (error) {
        failedItem = { item, error };
        break;
      }
    }

    if (publishedCount > 0) {
      setQueue((items) => items.slice(publishedCount));
      try {
        await dispatch(getAllProducts()).unwrap();
      } catch (error) {
        refreshError = error;
      }
    }

    if (failedItem) {
      const errorMessage = failedItem.error?.response?.data?.message || failedItem.error?.message || t('admin.products.serverRejected');
      setNotice({
        type: 'error',
        text: `${publishedCount} item${publishedCount === 1 ? '' : 's'} published. “${failedItem.item.name}” failed: ${errorMessage} Remaining items are still in the list.`,
      });
    } else if (refreshError) {
      const errorMessage = refreshError?.response?.data?.message || refreshError.message || t('admin.products.refreshFailed');
      setNotice({
        type: 'error',
        text: t('admin.products.publishedRefreshFailed', { count: publishedCount, error: errorMessage }),
      });
    } else {
      setNotice({ type: 'success', text: t('admin.products.published', { count: publishedCount }) });
    }
    setPublishing(false);
  };

  const carMode = isCarType(draft.type) || draft.type === 'car';
  const isRental = draft.type === 'car-rental';
  const isHardware = draft.type === 'hardware' && !carMode;

  return (
    <section className="kk-admin-form-card kk-admin-batch">
      <div className="kk-admin-batch__heading">
        <div>
          <span className="kk-admin-eyebrow">{t('admin.products.inventoryEyebrow')}</span>
          <h2>{t('admin.products.title')}</h2>
          <p>{t('admin.products.intro')}</p>
        </div>
        <span className="kk-admin-batch__count">{t('admin.products.queuedCount', { count: queue.length })}</span>
      </div>

      {notice && <div className={`kk-admin-batch__notice is-${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.text}</div>}

      <form className="kk-admin-batch__form" onSubmit={addDraftToQueue}>
        <div className="kk-admin-batch__type">
          <label htmlFor="admin-item-type">{t('admin.products.listingType')}</label>
          <select id="admin-item-type" value={draft.type} onChange={(event) => updateDraft('type', event.target.value)}>
            <option value="stationery">{t('admin.products.stationery')}</option>
            <option value="hardware">{t('admin.products.hardware')}</option>
            <option value="food">{t('admin.products.food')}</option>
            <option value="car-sale">{t('admin.products.carSale')}</option>
            <option value="car-rental">{t('admin.products.carRental')}</option>
          </select>
        </div>

        <label>
          <span>{carMode ? t('admin.products.listingTitle') : t('admin.products.name')}</span>
          <input value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} placeholder={carMode ? t('admin.products.carTitleExample') : t('admin.products.itemNameExample')} />
        </label>
        <label>
          <span>{isRental ? t('admin.products.dailyRentalPrice') : t('admin.products.price')}</span>
          <input type="number" min="1" step="1" value={draft.price} onChange={(event) => updateDraft('price', event.target.value)} placeholder={isRental ? t('admin.products.dailyRentalPrice') : t('admin.products.price')} />
        </label>
        <label>
          <span>{carMode ? t('admin.products.vehiclesAvailable') : t('admin.products.stock')}</span>
          <input type="number" min="0" step="1" value={draft.stock} onChange={(event) => updateDraft('stock', event.target.value)} placeholder={carMode ? t('admin.products.vehiclesAvailable') : t('admin.products.quantity')} />
        </label>
        <label className="kk-admin-batch__description">
          <span>{t('admin.products.description')}</span>
          <textarea value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} placeholder={t('admin.products.descriptionHint')} rows="3" />
        </label>

        {isHardware && (
          <div className="kk-admin-batch__car-fields">
            <div className="kk-admin-batch__section-title"><FiPackage aria-hidden="true" /> {t('admin.products.itemSpecifications')} <small>{t('admin.products.specificationsHint')}</small></div>
            {[
              ['size', 'size', 'sizeExample'],
              ['unit', 'unit', 'unitExample'],
              ['brand', 'brand', 'brandExample'],
              ['color', 'color', 'color'],
              ['material', 'material', 'materialExample'],
              ['warranty', 'warranty', 'warrantyExample'],
            ].map(([field, label, placeholder]) => (
              <label key={field}>
                <span>{t(`admin.products.fields.${label}`)}</span>
                <input value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)} placeholder={t(`admin.products.fields.${placeholder}`)} />
              </label>
            ))}
          </div>
        )}

        {carMode && (
          <div className="kk-admin-batch__car-fields">
            <div className="kk-admin-batch__section-title"><FaCarSide aria-hidden="true" /> {t('admin.products.vehicleDetails')} <small>{t('admin.products.vehicleDetailsHint')}</small></div>
            {[
              ['make', 'make', 'makeExample'],
              ['model', 'model', 'modelExample'],
              ['trim', 'trim', 'trimExample'],
              ['year', 'year', 'yearExample'],
              ['mileage', 'mileage', 'mileageExample'],
              ['fuelType', 'fuelType', 'chooseFuel'],
              ['transmission', 'transmission', 'chooseTransmission'],
              ['bodyStyle', 'bodyStyle', 'bodyStyleExample'],
              ['seats', 'seats', 'seatsExample'],
              ['range', 'range', 'optional'],
              ['color', 'color', 'colorExample'],
              ['location', 'location', 'locationExample'],
            ].map(([field, label, placeholder]) => (
              <label key={field}>
                <span>{t(`admin.products.fields.${label}`)}</span>
                {field === 'fuelType' ? (
                  <select value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)}>
                    <option value="">{t(`admin.products.fields.${placeholder}`)}</option>
                    {['Electric', 'Hybrid', 'Petrol', 'Diesel'].map((value) => <option key={value} value={value}>{t(`admin.products.fields.${value.toLowerCase()}`)}</option>)}
                  </select>
                ) : field === 'transmission' ? (
                  <select value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)}>
                    <option value="">{t(`admin.products.fields.${placeholder}`)}</option>
                    {['Automatic', 'Manual'].map((value) => <option key={value} value={value}>{t(`admin.products.fields.${value.toLowerCase()}`)}</option>)}
                  </select>
                ) : (
                  <input type={['year', 'mileage', 'seats', 'range'].includes(field) ? 'number' : 'text'} min={['mileage', 'seats', 'range'].includes(field) ? '0' : undefined} value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)} placeholder={t(`admin.products.fields.${placeholder}`)} />
                )}
              </label>
            ))}
            <label>
              <span>{t('admin.products.fields.condition')}</span>
              <select value={draft.condition} onChange={(event) => updateDraft('condition', event.target.value)}>
                {['Used', 'New'].map((value) => <option key={value} value={value}>{t(`admin.products.fields.${value.toLowerCase()}`)}</option>)}
              </select>
            </label>
          </div>
        )}

        <label className="kk-admin-batch__image">
          <span>{carMode ? t('admin.products.carPhoto') : t('admin.products.productImage')} ({t('admin.products.imageRequired')})</span>
          <input type="file" accept="image/*" onChange={(event) => updateDraft('file', event.target.files?.[0] || null)} />
        </label>
        {draft.file && <img className="kk-admin-batch__preview" src={imagePreview} alt={t('admin.products.imagePreview')} />}

        <div className="kk-admin-batch__actions">
          <button type="submit" className="kk-admin-batch__add"><FiPlus aria-hidden="true" /> {t('admin.products.addToList')}</button>
        </div>
      </form>

      {queue.length > 0 && (
        <div className="kk-admin-batch__queue">
          <div className="kk-admin-batch__queue-heading">
            <div><h3>{t('admin.products.readyToPublish')}</h3><p>{t('admin.products.publishHint')}</p></div>
            <button type="button" className="kk-admin-batch__publish" onClick={publishQueue} disabled={publishing}>
              {publishing ? t('admin.products.publishing') : t('admin.products.publishCount', { count: queue.length })}
            </button>
          </div>
          <ol>
            {queue.map((item, index) => (
              <li key={item.id}>
                <span className="kk-admin-batch__number">{String(index + 1).padStart(2, '0')}</span>
                {(item.type === 'car' || item.type === 'car-sale' || item.type === 'car-rental') && <FaCarSide aria-label="Car listing" />}
                <div><strong>{item.name}</strong><small>{t(`admin.products.${item.type === 'car-sale' ? 'carSale' : item.type === 'car-rental' ? 'carRental' : item.type}`)} · RWF {Number(item.price).toLocaleString()}{item.type === 'car-rental' ? ` ${t('admin.products.perDay')}` : ''} · {item.stock} {item.type === 'car-sale' || item.type === 'car-rental' ? t('admin.products.available') : t('admin.products.inStock')}</small></div>
                <button type="button" onClick={() => setQueue((items) => items.filter((queued) => queued.id !== item.id))} disabled={publishing} aria-label={t('admin.products.removeItem', { name: item.name })}><FiTrash2 aria-hidden="true" /></button>
              </li>
            ))}
          </ol>
        </div>
      )}
      <p className="kk-admin-batch__stock-note">{t('admin.products.stockNote')}</p>
    </section>
  );
};

export default CreateEditProduct;
