import React, { useEffect, useState } from 'react';
import trpc from './trpc';  // Make sure you have this import correctly pointing to your trpc setup

const App: React.FC = () => {
  const [users, setUsers] = useState<any>([])


  const fetchUserList = async () => {
    const data = await trpc.userList.query()
    setUsers(data)

  }

  useEffect(() => {
    fetchUserList()
  }, [])


  return (
    <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "yellow" }}>
      <h1>Users list</h1>
      {JSON.stringify(users)}
    </div>
  );
};

export default App;
