import React, { useEffect } from 'react';

export default function Admin() {
  useEffect(() => {
    const pass = prompt('Enter password');
    if (pass !== 'admin') {
      window.location.href = '/';
    }
    return;
  }, []);
  return <div>Admin</div>;
}
