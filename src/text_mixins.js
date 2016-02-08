
const _ = require("lodash/core");

module.exports = {
  capitalize(input) {
    if(_.isString(input)){
      return this.removeUnderscore(input).replace(/^./, (match)=> match.toUpperCase());
    }
    return "";
  },

  createId(...args){
    return args.join("-").toLowerCase().replace(/\s/g, "-");
  },

  removeUnderscore(input){
    if(_.isString(input)){
      return input.replace(/_|-/g, " ");
    }

    return "";
  }
};
