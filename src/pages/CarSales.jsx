import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBolt, FaCarSide, FaGasPump, FaUsers } from 'react-icons/fa';
import { FiArrowRight, FiSearch, FiX } from 'react-icons/fi';
import carImage from '../assets/car-showroom-sample.png';
import { getProducts } from '../slices/productSlice';
import ServiceStoreHero from '../components/ServiceStoreHero';

const getTextValue = (...values) => {
  const value = values.find((candidate) => candidate !== undefined && candidate !== null && candidate !== '');
  if (typeof value === 'object') return value.name || value.category || '';
  return value === undefined ? '' : String(value);
};

const getVehicleCategory = (vehicle) => getTextValue(vehicle.vehicleCategory, vehicle.bodyStyle, vehicle.category, vehicle.type);
const getVehicleFuel = (vehicle) => getTextValue(vehicle.fuelType, vehicle.fuel, vehicle.engineType);
const getVehicleSeats = (vehicle) => Number(vehicle.seats || vehicle.seatCount || vehicle.capacity || 0);
const getVehicleListingType = (vehicle) => (
  ['rent', 'rental', 'car-rental'].includes(String(vehicle.listingType || '').toLowerCase()) ? 'rent' : 'sale'
);

const vehiclesPerPage = 9;

const CarSales = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [listingType, setListingType] = useState('all');
  const [fuel, setFuel] = useState('all');
  const [seats, setSeats] = useState('all');
  const [maximumPrice, setMaximumPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    dispatch(getProducts({ category: 'carservices', searchTerm: '' }));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedVehicle) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedVehicle(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedVehicle]);

  const filteredVehicles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = vehicles.filter((vehicle) => {
      const vehicleCategory = getVehicleCategory(vehicle);
      const vehicleFuel = getVehicleFuel(vehicle);
      const vehicleSeats = getVehicleSeats(vehicle);
      const matchesListingType = listingType === 'all' || getVehicleListingType(vehicle) === listingType;
      const matchesSearch = `${vehicle.name || ''} ${vehicle.make || ''} ${vehicle.model || ''} ${vehicleCategory} ${vehicleFuel}`.toLowerCase().includes(term);
      const matchesCategory = category === 'all' || vehicleCategory.toLowerCase() === category.toLowerCase();
      const matchesFuel = fuel === 'all' || vehicleFuel.toLowerCase() === fuel.toLowerCase();
      const matchesSeats = seats === 'all' || vehicleSeats === Number(seats);
      const matchesPrice = !maximumPrice || Number(vehicle.price) <= Number(maximumPrice);
      return matchesSearch && matchesCategory && matchesListingType && matchesFuel && matchesSeats && matchesPrice;
    });

    if (sortOrder === 'price-low') filtered.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortOrder === 'price-high') filtered.sort((a, b) => Number(b.price) - Number(a.price));
    if (sortOrder === 'newest') filtered.sort((a, b) => Number(b.year) - Number(a.year));
    return filtered;
  }, [vehicles, searchTerm, category, listingType, fuel, seats, maximumPrice, sortOrder]);
  const pageCount = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const displayedVehicles = filteredVehicles.slice(
    (currentPage - 1) * vehiclesPerPage,
    currentPage * vehiclesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, listingType, fuel, seats, maximumPrice, sortOrder]);

  useEffect(() => {
    if (pageCount > 0 && currentPage > pageCount) setCurrentPage(pageCount);
  }, [currentPage, pageCount]);

  const refreshVehicles = () => {
    dispatch(getProducts({ category: 'carservices', searchTerm: '' }));
  };

  const getFuelLabel = (vehicle) => {
    const value = getVehicleFuel(vehicle).toLowerCase();
    return t(`cars.fuel.${value}`, { defaultValue: getVehicleFuel(vehicle) || t('cars.notListed') });
  };

  const getCategoryLabel = (vehicle) => {
    const value = getVehicleCategory(vehicle).toLowerCase();
    return t(`cars.categories.${value}`, { defaultValue: getVehicleCategory(vehicle) || t('cars.notListed') });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setListingType('all');
    setFuel('all');
    setSeats('all');
    setMaximumPrice('');
    setSortOrder('featured');
    setCurrentPage(1);
  };

  return (
    <main className="car-store">
      <ServiceStoreHero
        namespace="cars"
        image={carImage}
        imageAlt={t('cars.heroImageAlt')}
      />
      <p className="car-store__inventory-note">{t('cars.inventoryNotice')}</p>

      <section className="car-store__catalog" aria-labelledby="car-catalog-title">
        <div className="car-store__heading">
          <div>
            <span className="kk-eyebrow">{t('cars.inventoryEyebrow')}</span>
            <h2 id="car-catalog-title">{t('cars.inventoryTitle')}</h2>
          </div>
          <p>
            {t(status === 'loading' || status === 'idle' ? 'cars.loadingCount' : 'cars.resultCount', {
              count: status === 'succeeded' ? filteredVehicles.length : 0,
            })}
          </p>
        </div>

        <div className="car-store__filters">
          <label className="car-store__search">
            <FiSearch aria-hidden="true" />
            <span className="sr-only">{t('cars.searchPlaceholder')}</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t('cars.searchPlaceholder')}
            />
          </label>
          <label>
            <span>{t('cars.category')}</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">{t('cars.allCategories')}</option>
              <option value="SUV">{t('cars.categories.suv')}</option>
              <option value="Sedan">{t('cars.categories.sedan')}</option>
              <option value="Hatchback">{t('cars.categories.hatchback')}</option>
            </select>
          </label>
          <label>
            <span>{t('cars.listingType')}</span>
            <select value={listingType} onChange={(event) => setListingType(event.target.value)}>
              <option value="all">{t('cars.allListings')}</option>
              <option value="sale">{t('cars.forSale')}</option>
              <option value="rent">{t('cars.forRent')}</option>
            </select>
          </label>
          <label>
            <span>{t('cars.fuelType')}</span>
            <select value={fuel} onChange={(event) => setFuel(event.target.value)}>
              <option value="all">{t('cars.allFuelTypes')}</option>
              <option value="Electric">{t('cars.fuel.electric')}</option>
              <option value="Hybrid">{t('cars.fuel.hybrid')}</option>
              <option value="Petrol">{t('cars.fuel.petrol')}</option>
              <option value="Diesel">{t('cars.fuel.diesel')}</option>
            </select>
          </label>
          <label>
            <span>{t('cars.seats')}</span>
            <select value={seats} onChange={(event) => setSeats(event.target.value)}>
              <option value="all">{t('cars.anySeats')}</option>
              <option value="5">5 {t('cars.seatLabel')}</option>
              <option value="7">7 {t('cars.seatLabel')}</option>
            </select>
          </label>
          <label>
            <span>{t('cars.maximumPrice')}</span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={maximumPrice}
              onChange={(event) => setMaximumPrice(event.target.value)}
              placeholder={t('cars.noMaximum')}
            />
          </label>
          <label>
            <span>{t('cars.sortBy')}</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="featured">{t('cars.sort.featured')}</option>
              <option value="price-low">{t('cars.sort.priceLow')}</option>
              <option value="price-high">{t('cars.sort.priceHigh')}</option>
              <option value="newest">{t('cars.sort.newest')}</option>
            </select>
          </label>
          <button type="button" className="car-store__clear" onClick={clearFilters}>{t('cars.clearFilters')}</button>
        </div>

        {status === 'loading' || status === 'idle' ? (
          <div className="car-store__grid food-store__grid--skeleton" role="status" aria-label={t('cars.loading')}>
            {Array.from({ length: 6 }, (_, index) => (
              <div className="food-product-skeleton" key={index} aria-hidden="true">
                <div className="food-product-skeleton__image" />
                <div className="food-product-skeleton__content"><span /><span /><div><i /><i /></div></div>
              </div>
            ))}
          </div>
        ) : status === 'failed' ? (
          <div className="car-store__empty" role="alert">
            <FaCarSide aria-hidden="true" />
            <p>{t('cars.loadUnavailable')}</p>
            <button type="button" className="kk-button kk-button--outline" onClick={refreshVehicles}>{t('cars.tryAgain')}</button>
          </div>
        ) : filteredVehicles.length ? (
          <div className="car-store__grid">
            {displayedVehicles.map((vehicle) => (
              <article className="car-card" key={vehicle._id}>
                <div className="car-card__image">
                  <img src={vehicle.images?.[0]?.url || carImage} alt={vehicle.name || t('cars.heroImageAlt')} loading="lazy" />
                  {getVehicleListingType(vehicle) === 'rent' && <span className="car-card__listing-type">{t('cars.rentalListing')}</span>}
                  <span className="car-card__fuel">
                    {getVehicleFuel(vehicle).toLowerCase() === 'electric' ? <FaBolt aria-hidden="true" /> : <FaGasPump aria-hidden="true" />}
                    {getFuelLabel(vehicle)}
                  </span>
                </div>
                <div className="car-card__content">
                  <div className="car-card__title-row">
                    <div>
                      <small>{[vehicle.make, vehicle.model, vehicle.year].filter(Boolean).join(' · ')}</small>
                      <h3>{vehicle.name}</h3>
                    </div>
                    <FaCarSide aria-hidden="true" />
                  </div>
                  <div className="car-card__specs">
                    <span><FaUsers aria-hidden="true" /> {getVehicleSeats(vehicle) || t('cars.notListed')} {getVehicleSeats(vehicle) ? t('cars.seatLabel') : ''}</span>
                    <span>{getCategoryLabel(vehicle)}</span>
                    <span>{vehicle.transmission || t('cars.notListed')}</span>
                  </div>
                  <div className="car-card__footer">
                    <div>
                      <small>{getVehicleListingType(vehicle) === 'rent' ? t('cars.dailyRate') : t('cars.price')}</small>
                      <strong>{Number(vehicle.price || 0).toLocaleString()} <small>{t('cart.currency')}{getVehicleListingType(vehicle) === 'rent' ? ` ${t('cars.perDay')}` : ''}</small></strong>
                    </div>
                    <button type="button" onClick={() => setSelectedVehicle(vehicle)} aria-label={t('cars.viewDetails', { car: vehicle.name })}>
                      <FiArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="car-store__empty">
            <FaCarSide aria-hidden="true" />
            <p>{vehicles.length ? t('cars.noResults') : t('cars.noVehiclesYet')}</p>
            {vehicles.length > 0 && <button type="button" className="kk-button kk-button--outline" onClick={clearFilters}>{t('cars.clearFilters')}</button>}
          </div>
        )}
        {pageCount > 1 && (
          <nav className="food-store__pagination" aria-label={t('cars.inventoryTitle')}>
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}>{t('food.previous')}</button>
            <span>{t('food.pageCount', { current: currentPage, total: pageCount })}</span>
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} disabled={currentPage === pageCount}>{t('food.next')}</button>
          </nav>
        )}
      </section>

      <section className="car-store__contact">
        <div>
          <span className="kk-eyebrow">{t('cars.interestedEyebrow')}</span>
          <h2>{t('cars.interestedTitle')}</h2>
          <p>{t('cars.interestedText')}</p>
        </div>
        <button type="button" className="kk-button kk-button--primary" onClick={() => navigate('/', { state: { scrollTo: 'contactus' } })}>
          {t('cars.contactUs')} <FiArrowRight aria-hidden="true" />
        </button>
      </section>

      {selectedVehicle && (
        <div className="car-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedVehicle(null); }}>
          <section className="car-detail" role="dialog" aria-modal="true" aria-labelledby="car-detail-title">
            <button type="button" className="car-detail__close" aria-label={t('cars.closeDetails')} onClick={() => setSelectedVehicle(null)}><FiX /></button>
            <img className="car-detail__image" src={selectedVehicle.images?.[0]?.url || carImage} alt={selectedVehicle.name || t('cars.heroImageAlt')} />
            <div className="car-detail__content">
              <h2 id="car-detail-title">{selectedVehicle.name}</h2>
              <p>{t(getVehicleListingType(selectedVehicle) === 'rent' ? 'cars.rentalDetailNotice' : 'cars.detailNotice')}</p>
              <dl>
                <div><dt>{t('cars.category')}</dt><dd>{getCategoryLabel(selectedVehicle)}</dd></div>
                <div><dt>{t('cars.fuelType')}</dt><dd>{getFuelLabel(selectedVehicle)}</dd></div>
                <div><dt>{t('cars.seats')}</dt><dd>{getVehicleSeats(selectedVehicle) || t('cars.notListed')}</dd></div>
                <div><dt>{t('cars.year')}</dt><dd>{selectedVehicle.year || t('cars.notListed')}</dd></div>
                <div><dt>{t('cars.transmission')}</dt><dd>{selectedVehicle.transmission || t('cars.notListed')}</dd></div>
                <div><dt>{t('cars.mileage')}</dt><dd>{selectedVehicle.mileage || t('cars.notListed')}</dd></div>
                <div><dt>{t('cars.range')}</dt><dd>{selectedVehicle.range || t('cars.notListed')}</dd></div>
              </dl>
              <div className="car-detail__price">
                <span>{getVehicleListingType(selectedVehicle) === 'rent' ? t('cars.dailyRate') : t('cars.price')}</span>
                <strong>{Number(selectedVehicle.price || 0).toLocaleString()} {t('cart.currency')}{getVehicleListingType(selectedVehicle) === 'rent' ? ` ${t('cars.perDay')}` : ''}</strong>
              </div>
              <button
                type="button"
                className="kk-button kk-button--primary"
                onClick={() => { setSelectedVehicle(null); navigate('/', { state: { scrollTo: 'contactus' } }); }}
              >
                {t(getVehicleListingType(selectedVehicle) === 'rent' ? 'cars.askAboutRental' : 'cars.askAboutCar')} <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default CarSales;
