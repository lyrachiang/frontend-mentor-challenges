import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import {
  Chart as ChartJS,
  type TooltipModel
} from 'chart.js/auto';

import styles from './Chart.module.scss';

import chartData from '@/data/chart.json';

const cx = classNames.bind(styles);

type ContextProps = {
  chart: ChartJS<'bar'>;
  tooltip: TooltipModel<'bar'>;
};

const externalTooltipHandler = (tooltipEl: HTMLDivElement, context: ContextProps) => {
  const { chart, tooltip } = context;

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  const point = tooltip.dataPoints[0];

  tooltipEl.textContent = `$${point.formattedValue}`;

  tooltipEl.style.opacity = '1';
  tooltipEl.style.left = `${chart.canvas.offsetLeft + tooltip.caretX}px`;
  tooltipEl.style.top = `${chart.canvas.offsetTop + tooltip.caretY}px`;
};

const Chart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const tooltipEl = tooltipRef.current;
    const today = new Intl.DateTimeFormat('en-US', {
      weekday: 'short'
    })
      .format(new Date())
      .toLowerCase();

    const chart = new ChartJS(
      chartRef.current,
      {
        type: 'bar',
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false,
              external: (context: ContextProps) => {
                if (!tooltipEl) return;
                externalTooltipHandler(tooltipEl, context);
              }
            }
          },
          scales: {
            x: {
              border: {
                display: false
              },
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 16
                },
                color: 'hsl(28, 10%, 53%)'
              }
            },
            y: {
              display: false
            }
          }
        },
        data: {
          labels: chartData.map(row => row.day),
          datasets: [
            {
              label: '',
              data: chartData.map(row => row.amount),
              backgroundColor: chartData.map(row => row.day === today ? 'hsl(186, 34%, 65%)' : 'hsl(10, 79%, 65%)'),
              hoverBackgroundColor: chartData.map(row => row.day === today ? 'hsl(186, 50%, 80%)' : 'hsl(10, 85%, 80%)'),
              borderRadius: 8,
              borderSkipped: false
            }
          ]
        }
      }
    );

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className={cx('chart-container')}>
      <canvas ref={chartRef} />
      <div
        className={cx('tooltip')}
        ref={tooltipRef}
      />
    </div>
  );
};

export default Chart;
