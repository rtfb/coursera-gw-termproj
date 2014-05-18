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
