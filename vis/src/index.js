var $ = require('jquery');
import { setupChart, runSimulation, stopSimulation } from './chart'

$(document).ready(function() {
  setupChart(document.getElementById('main'));

  var simulationRunning = false;

  function updateActionState() {
    if(simulationRunning) {
      $('#actionButton').val('run simulation');
      simulationRunning = false;
      stopSimulation();
    } else {
      simulationRunning = true;
      $('#actionButton').val('stop simulation');
      runSimulation();
    }
  }

  $('#actionButton').click(updateActionState);

  $(document).keypress(function(k) {
    if(k.key === ' ') { 
      updateActionState();
    }
  });

})

