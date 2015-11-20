"use strict";

var _ = require("lodash");

module.exports = {
  capitalize: function capitalize(input) {
    if (_.isString(input)) {
      return this.removeUnderscore(input).replace(/^./, function (match) {
        return match.toUpperCase();
      });
    }
    return "";
  },
  createId: function createId() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.join("-").toLowerCase().replace(/\s/g, "-");
  },
  removeUnderscore: function removeUnderscore(input) {
    if (_.isString(input)) {
      return input.replace(/_|-/g, " ");
    }

    return "";
  }
};
//# sourceMappingURL=text_mixins.js.map