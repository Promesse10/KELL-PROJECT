


import React from 'react';
import { useTranslation } from 'react-i18next';
import Mkelia from '../assets/Mkelia.png';
import bean from './image-food/bean.jpg';
import rice from './image-food/rice.jpg';
import maize from './image-food/maize.jpg';
import sorghum from './image-food/sorghum.jpg';
import soybean from './image-food/soybean.jpg';
import shopping from '../assets/shopping.png';
import basket from '../assets/basket.png';
import user from '../assets/user.png';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-slate-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder={t('dashboard.search')}
            className="px-4 py-2 border rounded focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.71V4a3 3 0 10-6 0v.29A7.002 7.002 0 002 11v3.159c0 .538-.214 1.055-.595 1.436L0 17h5m10 0a3.001 3.001 0 01-2.829 2H7.83A3.001 3.001 0 015 17m10 0H9"
              ></path>
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={Mkelia}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <h1 className="text-2xl font-bold mb-4">{t('dashboard.title')}</h1>
      <p>{t('dashboard.welcome')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        <div className="bg-white p-4 rounded shadow text-center flex flex-row gap-6 pt-10 pl-14">
          <div><img src={basket} alt="Total Sales" className='w-16 h-16' /></div>
          <div>
            <h2 className="text-xl">{t('dashboard.totalSales')}</h2>
            <p className="text-2xl text-blue-500">$232</p>
            <p className="text-green-500">+343</p>
          </div>
        </div>
        {/* <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl">{t('dashboard.totalExpenses')}</h2>
          <p className="text-2xl text-red-500">$123</p>
          <p className="text-green-500">+343</p>
        </div> */}
        <div className="bg-white p-4 rounded shadow text-center flex flex-row gap-6 pt-10 pl-7">
          <div><img src={user} alt="Total Customers" className='w-16 h-16' /></div>
          <div>
            <h2 className="text-xl">{t('dashboard.totalCustomers')}</h2>
            <p className="text-2xl text-blue-500">313</p>
            <p className="text-red-500">-30</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow text-center flex flex-row gap-6 pt-10 pl-14">
          <div><img src={shopping} alt="Total Orders" className='w-16 h-16' /></div>
          <div>
            <h2 className="text-xl">{t('dashboard.totalOrders')}</h2>
            <p className="text-2xl text-blue-500">100</p>
            <p className="text-red-500">-43</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl mb-4 text-gray-600">{t('dashboard.recentOrders')}</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">{t('dashboard.id')}</th>
                <th className="border px-4 py-2">{t('dashboard.productId')}</th>
                <th className="border px-4 py-2">{t('dashboard.customerName')}</th>
                <th className="border px-4 py-2">{t('dashboard.orderDate')}</th>
                <th className="border px-4 py-2">{t('dashboard.orderTotal')}</th>
                <th className="border px-4 py-2">{t('dashboard.shippingAddress')}</th>
                <th className="border px-4 py-2">{t('dashboard.orderStatus')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">#1</td>
                <td className="border px-4 py-2">#4324</td>
                <td className="border px-4 py-2">Irakoze promesse</td>
                <td className="border px-4 py-2">17 August 2024</td>
                <td className="border px-4 py-2">40,000 {t('dashboard.currency')}</td>
                <td className="border px-4 py-2">Kabuga</td>
                <td className="border px-4 py-2">{t('dashboard.placed')}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">#2</td>
                <td className="border px-4 py-2">#7453</td>
                <td className="border px-4 py-2">Munezero josue</td>
                <td className="border px-4 py-2">15 August 2024</td>
                <td className="border px-4 py-2">15,000 {t('dashboard.currency')}</td>
                <td className="border px-4 py-2">Masaka</td>
                <td className="border px-4 py-2">{t('dashboard.confirmed')}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">#3</td>
                <td className="border px-4 py-2">#5434</td>
                <td className="border px-4 py-2">Dushime christian</td>
                <td className="border px-4 py-2">11 September 2024</td>
                <td className="border px-4 py-2">50,000 {t('dashboard.currency')}</td>
                <td className="border px-4 py-2">Gakenyeri</td>
                <td className="border px-4 py-2">{t('dashboard.shipped')}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">#4</td>
                <td className="border px-4 py-2">#9854</td>
                <td className="border px-4 py-2">Umutoni vanessa</td>
                <td className="border px-4 py-2">26 August 2024</td>
                <td className="border px-4 py-2">100,000 {t('dashboard.currency')}</td>
                <td className="border px-4 py-2">Rusekabuye</td>
                <td className="border px-4 py-2">{t('dashboard.shipped')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4 text-gray-600">{t('dashboard.popularProducts')}</h2>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src={bean} alt="Sack of beans" className="w-10 h-10 object-cover rounded mr-2" />
                <span>{t('dashboard.sackOfBeans')}</span>
              </div>
              <div className="text-right pt-3">
                <p>35,000 {t('dashboard.currency')}</p>
                <p className="text-green-500">120 {t('dashboard.inStock')}</p>
              </div>
            </li>

            <li className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src={maize} alt="Sack of maize" className="w-10 h-10 object-cover rounded mr-2" />
                <span>{t('dashboard.sackOfMaize')}</span>
              </div>
              <div className="text-right pt-3">
                <p>15,000 {t('dashboard.currency')}</p>
                <p className="text-yellow-500">24 {t('dashboard.inStock')}</p>
              </div>
            </li>
            <li className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src={rice} alt="Sack of rice" className="w-10 h-10 object-cover rounded mr-2" />
                <span>{t('dashboard.sackOfRice')}</span>
              </div>
              <div className="text-right pt-3">
                <p>45,000 {t('dashboard.currency')}</p>
                <p className="text-green-500">56 {t('dashboard.inStock')}</p>
              </div>
            </li>
            <li className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src={sorghum} alt="Sack of sorghum" className="w-10 h-10 object-cover rounded mr-2" />
                <span>{t('dashboard.sackOfSorghum')}</span>
              </div>
              <div className="text-right pt-3">
                <p>40,000 {t('dashboard.currency')}</p>
                <p className="text-green-500">98 {t('dashboard.inStock')}</p>
              </div>
            </li>
            <li className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src={soybean} alt="Sack of soybean" className="w-10 h-10 object-cover rounded mr-2" />
                <span>{t('dashboard.sackOfSoybean')}</span>
              </div>
              <div className="text-right pt-3">
                <p>15,000 {t('dashboard.currency')}</p>
                <p className="text-red-500">{t('dashboard.outOfStock')}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

