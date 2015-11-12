'use strict';

import $ from 'jquery';
import L from 'leaflet';

export function init(map) {
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 17,
    minZoom: 8,
    attribution: "Imagery from <a href=\"http://giscience.uni-hd.de/\">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
    id: "hsuting.o4lf8mg0",
    accessToken: "pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA"
  }).addTo(map);
}

export function setPlace(map) {
  function setPosition(position) {
    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
}

export function resetView(map) {
  map.setView(new L.LatLng(23.619, 120.795), 8);
};

export function info() {
  $('#show').css({
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 10
  });
  $('#show').show();

  let html = require('html!./info');
  $('#show').html(html);

  $('#close').click(function() {
    $('#show').hide();
    $('#show').html('');
  });
}
