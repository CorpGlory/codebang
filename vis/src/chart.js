var echarts = require('echarts');


var option = {
  title: {
    text: 'Numerical method two stabs collision',
  },
  color: ['#3398DB'],
  animation: false,
  grid: {
      left: '1%',
      right: '1%',
      bottom: '40px',
  },
  xAxis: {
      type: 'value',
      boundaryGap: [0, 1],
      min: -1,
      max: 1,
      interval: 0.1
  },
  yAxis: {
      type:'category',
      data: ['1d'],
      show: false
  },
  series: [
    { type: 'bar', stack: '1d', data: [0.1], color: 'red' },
    { type: 'bar', stack: '1d', data: [0.1], color: 'blue' }
  ]
};


export function setupChart(elem) {
  
  // initialize echarts instance with prepared DOM
  var myChart = echarts.init(elem);

  // draw chart
  myChart.setOption(option);

}
