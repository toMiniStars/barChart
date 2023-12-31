const data = [
  { date: "1947-01-01", gdp: 243.1 },
  { date: "1948-01-01", gdp: 269.4 },
  { date: "1949-01-01", gdp: 267.3 },
];

const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleBand()
  .domain(data.map(d => d.date))
  .range([0, width])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.gdp)])
  .range([height, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

svg.append("g")
  .attr("id", "y-axis")
  .call(yAxis);

svg.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.date))
  .attr("y", d => yScale(d.gdp))
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - yScale(d.gdp))
  .attr("fill", "steelblue")
  .attr("data-date", d => d.date)
  .attr("data-gdp", d => d.gdp);

svg.append("text")
  .attr("id", "title")
  .attr("x", width / 2)
  .attr("y", -10)
  .attr("text-anchor", "middle")
  .text("Bar Chart with D3.js");
