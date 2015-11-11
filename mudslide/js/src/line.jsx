'use strict';

import $ from 'jquery';
import L from 'leaflet';
import Handle from './data';

export default function(map, data, line, site) {
  let info = {
    DEBRISNO: "名稱",
    DATETIME: "公告時間",
    County: "縣市名",
    Town: "鄉鎮市名",
    Vill: "村里名",
    station1StationName: "參考雨量觀測站(1)",
    station2StationName: "參考雨量觀測站(2)",
    AlertValue: "警戒值"
  }

  let now1 = "";
  let now2 = "";
  L.geoJson(line, {
    style(feature) {
      return {
        color: "red",
        opacity: 1
      }
    },
    onEachFeature(feature, layer) {
      layer.on('click', function() {
/*
  find data
*/
        let output = Handle(data, feature.properties);
        for(let key in output) {
          feature.properties[key] = output[key];
        }

/*
  add info
*/
        let html = "";
        for(let key in info) {
          html += info[key] + "： " + feature.properties[key] + "<br>";
        }
        if(feature.properties.County != undefined) {
          layer.bindPopup(html);
          layer.openPopup();
        }

/*
  remove last point
*/
        if(now1 != "" && now2 != "") {
          map.removeLayer(site[now1]);
          map.removeLayer(site[now2]);
        }

/*
  show new point
*/
        let station1 = feature.properties.County + "-" + feature.properties.station1StationName;
        let station2 = feature.properties.County + "-" + feature.properties.station2StationName;
        if(site[station1] != undefined) {
          site[station1].addTo(map);
          now1 = station1;
        }

        if(site[station2] != undefined) {
          site[station2].addTo(map);
          now2 = station2;
        }
      });
    }
  }).addTo(map);
}
