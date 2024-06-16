import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../../styles/style.css";

const StackedBarChart = ({ data, keys, colors, width = 800, height = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear existing chart

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.closed_fiscal_quarter))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.sum(keys, (key) => d[key]))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal().domain(keys).range(colors);

    const stackedData = d3.stack().keys(keys)(data);

    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.closed_fiscal_quarter))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    svg
      .append("g")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .attr("transform", `translate(${margin.left},0)`);

    svg
      .append("g")
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr("transform", `translate(0,${height - margin.bottom})`);

    const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', 'white')
            .style('border', 'solid 1px #ddd')
            .style('padding', '10px')
            .style('border-radius', '4px')
            .style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.1)');
    svg
      .selectAll("rect")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").text(`Value: ${d.key}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

      svg.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('fill', d => color(d.key))
      .selectAll('text')
      .data(d => d)
      .enter().append('text')
      .attr('x', d => x(d.data.category) + x.bandwidth() / 2)
      .attr('y', d => y(d[1]) + (y(d[0]) - y(d[1])) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'black')
      .text(d => d.key);

      svg.append('g')
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('fill', d => color(d.key))
      .selectAll('text')
      .data(d => d)
      .join('text')
      .attr('x', d => x(d.data.closed_fiscal_quarter) + x.bandwidth() / 2)
      .attr('y', d => y(d[1]) + (y(d[0]) - y(d[1])) / 2)
      .attr('dy', '0.35em')
      .attr('z-index', 50)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text(d => {
        const value = d[1] - d[0];
        const total = d.data['Existing Customer'] + d.data['New Customer'];
        const percentage = (value / total * 100).toFixed(0);
        return `${d3.format("$.2s")(value)} (${percentage}%)`;
      });

      svg.append('g')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .attr('transform', `translate(${margin.left},0)`);

    svg.append('g')
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr('transform', `translate(0,${height - margin.bottom})`);

  }, [data, keys, colors, width, height]);

  return (
    <>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ border: "1px solid black" }}
      />
    </>
  );
};

export default StackedBarChart;
