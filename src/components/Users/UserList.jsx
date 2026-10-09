import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUsers } from '../../slices/userSlice';
import defaultAvatar from '../../assets/Account.png';

const UserList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="kk-admin-state">{t('admin.customers.loading')}</div>;
  }

  if (status === 'failed') {
    return <div className="kk-admin-state is-error">{t('admin.customers.loadError')}: {error}</div>;
  }

  return (
    <section className="kk-admin-page">
      <div className="kk-admin-page-heading">
        <div>
          <span className="kk-admin-eyebrow">{t('admin.customers.eyebrow')}</span>
          <h1>{t('admin.customers.title')}</h1>
          <p>{t('admin.customers.intro')}</p>
        </div>
        <span className="kk-admin-count">{t('admin.customers.count', { count: users.length })}</span>
      </div>
      <ul className="kk-admin-customer-list">
        {users.map((user) => (
          <li key={user._id} className="kk-admin-customer">
            <img 
              src={user.profilePic?.[0]?.url || defaultAvatar}
              alt={user.name}
              className="kk-admin-customer__avatar"
            />
            <div className="kk-admin-customer__identity">
              <strong>{user.name || t('admin.customers.unnamed')}</strong>
              <span>{user.email}</span>
            </div>
            <span className="kk-admin-customer__badge">{t('admin.customers.badge')}</span>
          </li>
        ))}
        {!users.length && <li className="kk-admin-empty">{t('admin.customers.empty')}</li>}
      </ul>
    </section>
  );
};

export default UserList;
