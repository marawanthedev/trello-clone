import React, { useEffect, useState } from 'react';
import trpc from './trpc';  // Make sure you have this import correctly pointing to your trpc setup

const App: React.FC = () => {
  const [users, setUsers] = useState<any>([])


  const fetchUserList = async () => {
    const data = await trpc.user.getById.query({ id: 1 })
    setUsers(data)
    console.log({ data })
  }

  const addCard = async () => {
    const addedCard = await trpc.card.create.mutate({ content: "hi4", status: 'PENDING', userId: 1 })
    console.log({ addedCard })
  }

  useEffect(() => {
    fetchUserList()
  }, [])


  return (
    <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      {/* <h1>Users list</h1> */}
      <button onClick={addCard}>add</button>
      {/* {JSON.stringify(users)} */}
    </div>
  );
};

export default App;
