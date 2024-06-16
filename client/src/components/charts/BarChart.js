// src/components/BarChart.js
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import "../../styles/style.css";

const BarChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous render

        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };


        const x = d3.scaleBand()
            .domain(data.map(d => d.key))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        const yAxis = g => g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select('.domain').remove());

        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);
        svg.attr("overflow-y", "visible");

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', 'white')
            .style('border', 'solid 1px #ddd')
            .style('padding', '10px')
            .style('border-radius', '4px')
            .style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.1)');

        svg.append('g')
            .attr('fill', "rgb(157, 23, 77, 0.3)")
            .attr('stroke',"#9d174d")
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', d => x(d.key))
            .attr('y', d => y(d.value))
            .attr('height', d => y(0) - y(d.value))
            .attr('width', x.bandwidth())
            .on('mouseover', function(event, d) {
                tooltip.style('visibility', 'visible')
                    .text(`Quarter: ${d.key}, ACV: ${d.value}`);
                d3.select(this).attr('fill', 'teal');
            })
            .on('mousemove', function(event) {
                tooltip.style('top', `${event.pageY - 10}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', function() {
                tooltip.style('visibility', 'hidden');
                d3.select(this).attr('fill', 'rgb(157, 23, 77, 0.3)');
            });

            svg.append('g')
            .selectAll('text')
            .data(data)
            .join('text')
            .attr('x', d => x(d.key) + x.bandwidth() / 2)
            .attr('y', d => y(d.value) - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .text(d => d.value);

    }, [data]);

    return (
        <svg ref={svgRef} width={500} height={300}></svg>
    );
};

export default BarChart;
