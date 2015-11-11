'use strict';

import L from 'leaflet';

export default function(map, data, site) {
  let info = {
    SiteName: "測站名",
    County: "縣市名",
    Township: "鄉鎮市名"
  };
  let rain = {
    Rainfall10min: "10分鐘",
    Rainfall1hr: "1小時",
    Rainfall3hr: "3小時",
    Rainfall6hr: "6小時",
    Rainfall12hr: "12小時",
    Rainfall24hr: "24小時"
  };
  let icon = L.icon({
    iconUrl: 'image/marker-icon.png',
    shadowUrl: 'image/marker-shadow.png',
    iconAnchor: [22, 94],
    popupAnchor: [-10, -86],
    shadowAnchor: [22, 94]
  });

  for(let i in data) {
    //change 台 to 臺
    if(data[i].County[0] == "台") {
      data[i].County[0] = "臺";
    }

    let html = "";
    for(let key in info) {
      html += info[key] + "： " + data[i][key] + "<br>";
    }
    for(let key in rain) {
      html += rain[key] + "累積雨量： " + data[i][key] + "mm<br>";
    }

    site[data[i].County + "-" + data[i].SiteName] = L.marker([data[i].TWD67Lat, data[i].TWD67Lon], {icon: icon})
      .bindPopup(html);
  }
}
