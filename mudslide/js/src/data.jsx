'use strict';

export default function(data, features) {
  for(let i in data) {
    if(features.DEBRISNO == data[i].Debrisno || features.OLD == data[i].Debrisno) {
      if(data[i].County[0] == "台") {
        let temp = "臺";
        for(let j  = 1; j < 3; j++) {
          temp += data[i].County[j];
        }
        data[i].County = temp;
      }

      return data[i];
    }
  }

  return [];
}
