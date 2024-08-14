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
    return <div className="text-center p-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="bg-white p-4 border rounded-lg shadow-md">
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
