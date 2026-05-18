import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import './GenericChart.css';

const GenericChart = ({ title, data, type = 'doughnut' }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        
        // Define default mock data if no data is provided
        const defaultData = data || {
            labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
            datasets: [
                {
                    data: [300, 200, 150, 100, 50],
                    backgroundColor: [
                        '#c9aa71', // Gold
                        '#8c00ff', // Purple
                        '#0078d7', // Blue
                        '#d14d4d', // Red
                        '#4db071'  // Green
                    ],
                    hoverBackgroundColor: [
                        '#e6cd98',
                        '#a836ff',
                        '#3b9dff',
                        '#e66767',
                        '#6cd18f'
                    ],
                    borderWidth: 0 // No border to match dark theme better
                }
            ]
        };

        setChartData(defaultData);

        // Options for the chart (responsive, dark theme text, etc)
        const options = {
            plugins: {
                legend: {
                    display: false // Custom HTML legend will be used instead
                }
            },
            cutout: type === 'doughnut' ? '70%' : undefined,
            responsive: true,
            maintainAspectRatio: false
        };

        setChartOptions(options);
    }, [data, type]);

    const legendItems = data && data.customLabels ? data.customLabels : chartData.labels?.map((label, i) => ({
        name: label,
        icon: '',
        color: chartData.datasets?.[0]?.backgroundColor?.[i] || '#ccc',
        count: chartData.datasets?.[0]?.data?.[i] || 0
    }));

    return (
        <div className="generic-chart-container">
            {title && <h3 className="generic-chart-title">{title}</h3>}
            <div className="generic-chart-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="generic-chart-wrapper" style={{ height: '220px' }}>
                    <Chart type={type} data={chartData} options={chartOptions} style={{ width: '100%', height: '100%' }} />
                </div>
                {legendItems && legendItems.length > 0 && (
                    <div className="generic-chart-legend">
                        {legendItems.map((item, idx) => (
                            <div key={idx} className="generic-chart-legend-item">
                                <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
                                {item.icon && <img src={item.icon} alt={item.name} className="legend-icon" />}
                                <span className="legend-label" title={item.name}>{item.name}</span>
                                <span className="legend-value">{item.count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenericChart;
