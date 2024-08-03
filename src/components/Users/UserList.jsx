import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../slices/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
