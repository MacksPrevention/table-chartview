import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DataTable from './components/DataTable';
import dataJSON from './data/stats.json';

const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  background: #fafcff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  font-family:
    'San Francisco Pro Text',
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif;
`;

export default function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setData(dataJSON.data);
  }, []);

  return (
    <Container>
      <DataTable data={data} selected={selected} onSelect={setSelected} />
    </Container>
  );
}
