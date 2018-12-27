var $ = require('jquery');
import { setupChart, tick } from './chart'

$(document).ready(function() {
  setupChart(document.getElementById('main'));

  $(document).keypress(function(k) {
    if(k.key === ' ') {
      tick();
    }
  });

})

