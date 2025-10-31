import React, { useState } from 'react';
import styled from 'styled-components';
import ChartView from './ChartView';

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 4px;
  margin-top: 1rem;
  font-family: inherit;
  background-color: white;
  font-size: 0.95rem;
`;

const Th = styled.th`
  text-align: center;
  padding: 10px;
  font-weight: 400;
  color: #333;
  background-color: #f5f5f5;
  font-family: inherit;

  &:nth-child(1) {
    width: 40%;
  }
  &:nth-child(2) {
    width: 18.5%;
    background-color: #edf8ff;
  }
  &:nth-child(3) {
    width: 18.5%;
  }
  &:nth-child(4) {
    width: 23%;
  }
`;

const Td = styled.td`
  padding: 10px;
  cursor: pointer;
  color: #444;
  background-color: ${({ bgColor }) => bgColor || '#f5f5f5'};
  transition: background-color 0.2s ease;
  text-align: ${({ align }) => align || 'left'};
  padding-left: ${({ indent }) => indent || '10px'};
  font-family: inherit;

  &:hover {
    background-color: #f0f0f0;
  }

  &:nth-child(2) {
    background-color: #edf8ff;
    text-align: right;
  }

  &:nth-child(3) {
    text-align: right;
  }

  &:nth-child(4) {
    text-align: right;
  }
`;

const DiffContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: end;
  gap: 2rem;
  width: 100%;
`;

const DiffValue = styled.span`
  text-align: right;
`;

const DiffSpan = styled.span`
  color: ${({ isPositive }) => (isPositive ? '#32870B' : '#FF452F')};
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
`;
const ChartTd = styled.td`
  padding: 0;
  border: none;
`;

const ChartWrapperAnimated = styled.div`
  overflow: hidden;
  transition: all 0.4s ease;
  height: ${({ isVisible }) => (isVisible ? '380px' : '0px')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

export default function DataTable({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (idx) => {
    setSelectedIndex(selectedIndex === idx ? null : idx);
  };

  const calcDiff = (today, yesterday) => {
    const diff = ((today - yesterday) / yesterday) * 100;
    if (isNaN(diff)) return 0;
    return diff;
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th>Показатель</Th>
          <Th>Текущий день</Th>
          <Th>Вчера</Th>
          <Th>Этот день недели</Th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          const diff = calcDiff(row.today, row.yesterday);
          const isPositive = diff >= 0;
          const bgColor = diff > 0 ? '#ECF7E7' : diff < 0 ? '#FEE6E6' : '#f5f5f5';
          const indent = row.parent ? '1.5rem' : '10px';
          const isVisible = selectedIndex === idx;

          return (
            <React.Fragment key={idx}>
              <tr onClick={() => handleSelect(idx)}>
                <Td indent={indent}>{row.metric}</Td>
                <Td>{row.today.toLocaleString()}</Td>
                <Td bgColor={bgColor}>
                  <DiffContainer>
                    <DiffValue>{row.yesterday.toLocaleString()}</DiffValue>
                    <DiffSpan isPositive={isPositive}>{Math.abs(diff).toFixed(1)}%</DiffSpan>
                  </DiffContainer>
                </Td>
                <Td>{row.week.toLocaleString()}</Td>
              </tr>

              <tr>
                <ChartTd colSpan={4}>
                  <ChartWrapperAnimated isVisible={isVisible}>
                    {isVisible && <ChartView selected={row} />}
                  </ChartWrapperAnimated>
                </ChartTd>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
}
