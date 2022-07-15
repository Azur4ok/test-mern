import { useState, useEffect } from 'react';
import { Chart } from './components/Chart';

import { List } from './components/List';

function App() {
  const [calls, setCalls] = useState(null);
  const [query, setQuery] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await fetch('http://localhost:4000/api/getCalls', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...query }),
        });
        const final = await post.clone().json();
        setCalls(final);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="app">
      <div>
        <button onClick={() => setQuery({ ...query, STATUS: 'ANSWERED' })}>
          filter by answered
        </button>
        <button onClick={() => setQuery({ ...query, STATUS: 'MISSED' })}>filter by missed</button>
        <button onClick={() => setQuery({ ...query, SORT: 'desc' })}>sort by new to old</button>
        <button onClick={() => setQuery({ ...query, SORT: 'asc' })}>sort by old to new</button>
        <button onClick={() => setQuery({})}>clear</button>
      </div>
      <List calls={calls} />
      <Chart data={calls} />
    </div>
  );
}

export default App;
