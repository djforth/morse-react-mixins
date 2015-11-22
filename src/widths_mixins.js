
const _ = require("lodash");

const attrs = ["padding-left", "padding-right", "margin-left", "margin-right", "border-left-width", "border-right-width", "width"];

let elements  = [];
let elm_sizes = [];

var getValue = (v)=>{
  // console.log(v)
  return Number(v.replace(/[a-z]|%/g, ""));
};

var getTrueWidth = (e)=>{
  let elm =  window.getComputedStyle(e, null);
  let n = 0;
  _.forEach(attrs, (attr)=>{
    let v = getValue(elm.getPropertyValue(attr));
    n += v;
  });
  add_element({elm:e, width:n});
  return n;
};

function add_element(elm, w){
  if(_.includes(elm_sizes, elm)){
    elm_sizes = _.map(elm_sizes, (e)=>{
      if(e.elm === elm) e.width = w;

      return e;
    });
  } else {
    elm_sizes.push({elm:elm, width:w});
  }


}



module.exports = {
  getTrueWidth:getTrueWidth

  , convertRefs:(refs)=>{
    elements = _.values(refs);
    return this;
  }

  , convertDomlist:()=>{
    elements = Array.prototype.slice.call(list);
    return this;
  }

  , getAllWidths:()=>{
    if(elm_sizes.length === 0
          && elements.length > 0){
      this.getWidths();
    }

    return elm_sizes;
  }

  , getWidths:(list)=>{
    let items = (_.isArray(list)) ? list : elements;
    // console.log(list.length, list)
    let width  = _.reduce(items, function(p, c){
      let n = (_.isNumber(p)) ? p : getTrueWidth(p);
      n += getTrueWidth(c);
      return n;
    });

    return width;
  }
};

