
const _     = require("lodash");
const cx    = require("classnames");

module.exports = {
  checkCss:function(css, k){
    if(_.has(css, k)){
      return css[k];
    }

    return css.default;
  },

  getClasses:function(css){
    return cx(css);
  },

  setValue:function(arr, key, val){
    return _.map(arr, (value)=>{
      if(_.isObject(value) && _.has(value, key)){
        value[key] = val;
      }

      return value;
    });
  },

  toggleCss:function(arr){
    return _.map(arr, (value)=>{
      if(_.isObject(value)){
        value = _.transform(value, (r, v, k)=> r[k] = !v );
      }

      return value;
    });
  }
};
