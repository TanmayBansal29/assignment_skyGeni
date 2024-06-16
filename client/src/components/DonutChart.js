// src/components/DoughnutChart.js
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const DoughnutChart = ({ data, totalAcv }) => {
    const svgRef = useRef();
    console.log("totalllll", totalAcv)

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous render

        const width = 500;
        const height = 500;
        const margin = 40;
        const radius = Math.min(width, height) / 2 - margin;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.key))
            .range(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(radius * 0.5) // Adjust innerRadius for doughnut chart
            .outerRadius(radius);

        const keyArc = d3.arc()
            .innerRadius(radius * 0.7) // Place key inside the doughnut chart
            .outerRadius(radius * 0.7);

        const pieData = pie(data);

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', 'white')
            .style('border', 'solid 1px #ddd')
            .style('padding', '10px')
            .style('border-radius', '4px')
            .style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.1)');

        const chartGroup = svg.attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        chartGroup.selectAll('path')
            .data(pieData)
            .join('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.key))
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .on('mouseover', (event, d) => {
                tooltip.style('visibility', 'visible')
                    .text(`${d.data.key}: ${d.data.value}%`);
            })
            .on('mousemove', (event) => {
                tooltip.style('top', `${event.pageY - 10}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden');
            });

        // Add text keys
        chartGroup.selectAll('text')
            .data(pieData)
            .join('text')
            .attr('transform', d => `translate(${keyArc.centroid(d)})`)
            .attr('dy', '0.35em')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .text(d => d.data.key);

            chartGroup.append('text')
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('font-weight', 'bold')
            .attr('dy', '-0.5em')
            .text("Total ACV");

            chartGroup.append('text')
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('font-weight', 'normal')
            .attr('dy', '1.2em')
            .text(`$${totalAcv}`);

    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default DoughnutChart;
