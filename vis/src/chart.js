var echarts = require('echarts');
var _ = require('lodash');



var mainChart = undefined;

const SYSTEM_WIDTH = 1;
const TICK_LENGTH = 0.01;

var STAB_A_INIT_SPEED = 0.2;
var STAB_B_INIT_SPEED = -0.3;


var slabAWidths = [0.1, 0.2];
var slabBWidths = [0.2, 0.2];

var allSlabsX_ = [];
var allSlabsV_ = [];

function computeInitParams_() {
  var slabsDistanceWidth = SYSTEM_WIDTH - _(slabAWidths).sum() - _(slabBWidths).sum();
  allSlabsX_ = [0];
  allSlabsV_ = [STAB_A_INIT_SPEED];
  let sum = 0;

  for(let i = 0; i < slabAWidths.length; i++) { 
    sum += slabAWidths[i]; 
    allSlabsX_.push(sum);
    allSlabsV_.push(STAB_A_INIT_SPEED);
  }
  sum += slabsDistanceWidth;
  allSlabsX_.push(sum);
  allSlabsV_.push(STAB_B_INIT_SPEED);
  for(let i = 0; i < slabBWidths.length; i++) { 
    sum += slabBWidths[i]; 
    allSlabsX_.push(sum);
    allSlabsV_.push(STAB_B_INIT_SPEED);
  }
}
computeInitParams_();


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
      min: 0,
      max: SYSTEM_WIDTH,
      interval: 0.1
  },
  yAxis: {
      type:'category',
      data: ['1d'],
      show: false
  }, 
  series: allSlabsX_.map(() => ({ type: 'bar', stack: '1d', data: [0] }))
};


function setSystemBar(i, width, color) {
  option.series[i].data = [width];
  option.series[i].color = color;
}

function updateSystemBars() {
  setSystemBar(0, allSlabsX_[0], 'none');
  for(var i = 1; i < allSlabsX_.length; i++) {
    setSystemBar(i, allSlabsX_[i] - allSlabsX_[i - 1], '#ccc');
  }
  option.series[slabAWidths.length + 1].color = 'none';

  mainChart.setOption({ series: option.series });
}


export function tick() {
  for(var i = 0; i < allSlabsX_.length; i++) {
    allSlabsX_[i] = allSlabsX_[i] + TICK_LENGTH * allSlabsV_[i];
  }
  updateSystemBars();
  console.log('tick');
}



export function setupChart(elem) {
  
  // initialize echarts instance with prepared DOM
  mainChart = echarts.init(elem);

  // draw chart
  mainChart.setOption(option);
  updateSystemBars();

}