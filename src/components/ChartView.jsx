import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
`;

export default function ChartView({ selected }) {
  if (!selected) return <p>Выберите показатель для отображения графика.</p>;

  const options = {
    title: {
      text: '',
    },
    xAxis: {
      categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    },
    yAxis: {
      title: { text: '' },
    },
    series: [
      {
        name: selected.metric,
        data: selected.trend,
        color: '#037D50',
      },
    ],
    chart: {
      type: 'line',
      height: 400,
      width: 600,
    },
    credits: { enabled: false },
  };

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartWrapper>
  );
}
