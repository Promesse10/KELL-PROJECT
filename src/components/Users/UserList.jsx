import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../slices/userSlice';
import defaultAvatar from '../../assets/Account.png';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="kk-admin-state">Loading customers…</div>;
  }

  if (status === 'failed') {
    return <div className="kk-admin-state is-error">Could not load customers: {error}</div>;
  }

  return (
    <section className="kk-admin-page">
      <div className="kk-admin-page-heading">
        <div>
          <span className="kk-admin-eyebrow">CUSTOMER DIRECTORY</span>
          <h1>Customers</h1>
          <p>View the people who shop with KarKelly.</p>
        </div>
        <span className="kk-admin-count">{users.length} customers</span>
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
              <strong>{user.name || 'Unnamed customer'}</strong>
              <span>{user.email}</span>
            </div>
            <span className="kk-admin-customer__badge">Customer</span>
          </li>
        ))}
        {!users.length && <li className="kk-admin-empty">No customers to display yet.</li>}
      </ul>
    </section>
  );
};

export default UserList;
