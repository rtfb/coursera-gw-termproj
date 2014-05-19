BaseWhatever = null;

(function() {
var allDigits, baseWhatever, funnyCharacters, theAlphabet;
theAlphabet = 'abcdefghijklmnopqrstuvwxyz';
allDigits = '01234567890';
funnyCharacters = '_/.,;~-&=';
baseWhatever = theAlphabet;
return BaseWhatever = {
  encodeFromNumber: function(number) {
    var digit, result;
    result = [];
    while (number > 0) {
      digit = number % baseWhatever.length;
      result.unshift(baseWhatever[digit]);
      number = Math.floor(number / baseWhatever.length);
    }
    return result.join('');
  },
  decodeToNumber: function(string) {
    var digit, result;
    result = 0;
    while (string !== "") {
      digit = baseWhatever.indexOf(string[0]);
      result *= baseWhatever.length;
      result += digit;
      string = string.substring(1);
    }
    return result;
  },
  encodeSet: function(array) {
    var elements, item, prev, result, _i, _len, _ref;
    result = [];
    elements = array.sort(function(a, b) {
      return a - b;
    });
    result.push(capitalize(BaseWhatever.encodeFromNumber(array[0])));
    if (elements.length > 1) {
      prev = array[0];
      _ref = elements.slice(1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        result.push(capitalize(BaseWhatever.encodeFromNumber(item - prev)));
        prev = item;
      }
    }
    return result.join('');
  },
  decodeSet: function(string) {
    var accum, element, elements, result, _i, _len, _ref;
    elements = [];
    string.replace(/[A-Z][a-z]*/g, function(match) {
      return elements.push(BaseWhatever.decodeToNumber(match.toLowerCase()));
    });
    if (elements.length <= 1) {
      return elements;
    } else {
      accum = elements[0];
      result = [elements[0]];
      _ref = elements.slice(1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        accum += element;
        result.push(accum);
      }
      return result;
    }
  }
};
})();

capitalize = function(value) {
    return value.toLowerCase().replace(/(^|[^a-zA-Z])[a-zA-Z]/g, function(x) {
        return x.toString().toUpperCase();
    });
};

// Several stations copied from GHCNM .inv file
var testIDs = [
"62826730000", // Vilnius
"62826629000", // Kaunas
"62626422000", // Riga
"63401489001" // Oslo
];

var fs = require('fs');

function readAllCSVNames() {
    var allCSVNames = fs.readdirSync('../csv/');
    var result = [];
    for (i in allCSVNames) {
        var id = allCSVNames[i].match(/([0-9]+)/);
        result.push(id[1]);
    }
    result.sort();
    return result;
}

function readSelection() {
    var array = fs.readFileSync('./all_years/contdata.txt').toString().split("\n");
    var stationIDs = [];
    for (i in array) {
        if (array[i] === "") {
            continue;
        }
        var id = array[i].match(/([0-9]+)/);
        stationIDs.push(id[1]);
        //console.log(id[1]);
    }
    return stationIDs;
}

var stationIDToIndex = new Object();

var allStations = readAllCSVNames();
for (i in allStations) {
    stationIDToIndex[allStations[i]] = i;
}

console.log(stationIDToIndex[testIDs[0]]);
console.log(stationIDToIndex[testIDs[1]]);
console.log(stationIDToIndex[testIDs[2]]);
console.log(stationIDToIndex[testIDs[3]]);

function IDsToIndexes(ids) {
    result = [];
    for (i in ids) {
        result.push(stationIDToIndex[ids[i]]);
    }
    return result;
}

var stationIDs = readSelection();
var stationArray = IDsToIndexes(stationIDs);
var packed = BaseWhatever.encodeSet(stationArray);
console.log(packed);
