import React, { useState } from 'react';
import { Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/stores/themeStore';
import Image from 'next/image';
import styles from './BarChart.module.css';

interface BarChartProps {
  filterType?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ filterType }) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [selectedChart, setSelectedChart] = useState<number>(1);

  const chartOptions = [
    { value: 1, label: t('dashboard.uiElements.barChart.chart1', 'Chart 1') },
    { value: 2, label: t('dashboard.uiElements.barChart.chart2', 'Chart 2') },
    { value: 3, label: t('dashboard.uiElements.barChart.chart3', 'Chart 3') },
    { value: 4, label: t('dashboard.uiElements.barChart.chart4', 'Chart 4') },
  ];

  return (
    <div className={`${styles.chartContainer} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.chartSelector}>
        <Radio.Group
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
          className={styles.radioGroup}
          size="small"
        >
          {chartOptions.map((option) => (
            <Radio.Button key={option.value} value={option.value} className={styles.radioButton}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      
      <div className={styles.imageContainer}>
        <Image
          src={`/bar-charts/bar-chart-${selectedChart}.svg`}
          alt={`${t('dashboard.uiElements.barChart.title', 'Bar Chart')} ${selectedChart}`}
          width={400}
          height={300}
          className={styles.chartImage}
        />
      </div>
    </div>
  );
};