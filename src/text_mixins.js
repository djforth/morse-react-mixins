
const _ = require("lodash");

module.exports = {
  capitalize(input) {
    if(_.isString(input)){
      return this.removeUnderscore(input).replace(/^./, (match)=> match.toUpperCase());
    }
    return "";
  },

  createId(...args){
    return args.join("-").toLowerCase().replace(" ", "-");
  },

  removeUnderscore(input){
    if(_.isString(input)){
      return input.replace(/_|-/g, " ");
    }

    return "";
  }
};
