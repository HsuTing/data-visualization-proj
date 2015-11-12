'use strict';

//import style
import style from './../../css/index';

//import jsx
import L from 'leaflet';
import $ from 'jquery';

import {
  init as Init,
  setPlace as Set,
  resetView as Reset,
  info as Info
} from './map';

import Site from './site';
import Line from './line';

(function() {
  let data = require('json!./../../data/data');
  let rain = require('json!./../../data/rain');
  let line = require('json!./../../data/mudslide-line');
  let map = L.map('map').setView(new L.LatLng(23.619, 120.795), 8);
  let site = {};

  Init(map);
  Set(map);
  Site(map, rain, site);
  Line(map, data, line, site);

  $("#reset").click(function() { Reset(map); });
  $("#set").click(function() { Set(map); });
  $("#info").click(function() { Info(); });
})();
