var $ = require('jquery');
import { setupChart, runSimulation, stopSimulation } from './chart'

$(document).ready(function() {
  setupChart(document.getElementById('main'));

  var simulationRunning = false;

  $(document).keypress(function(k) {
    if(k.key === ' ') {
      if(simulationRunning) {
        simulationRunning = false;
        stopSimulation();
      } else {
        simulationRunning = true;
        runSimulation();
      }
    }
  });

})

