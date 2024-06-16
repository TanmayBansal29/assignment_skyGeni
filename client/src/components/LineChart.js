// src/components/LineChart.js
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import "../styles/style.css";

const LineChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous render

        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.key))
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        const yAxis = g => g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select('.domain').remove());

        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);

        const line = d3.line()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.key))
            .y(d => y(d.value));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);

            svg.append('g')
            .selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', d => x(d.key))
            .attr('cy', d => y(d.value))
            .attr('r', 4)
            .attr('fill', 'steelblue')
            .on('mouseover', (event, d) => {
                tooltip.style('visibility', 'visible')
                    .text(`Count: ${d.key}, ACV: ${d.value}`);
            })
            .on('mousemove', (event) => {
                tooltip.style('top', `${event.pageY - 10}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden');
            });

        // Create a tooltip div
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', 'white')
            .style('border', 'solid 1px #ddd')
            .style('padding', '10px')
            .style('border-radius', '4px')
            .style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.1)');

    }, [data]);

    return (
        <svg ref={svgRef} width={600} height={400}></svg>
    );
};

export default LineChart;
