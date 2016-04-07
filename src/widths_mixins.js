
// Libraries
const React    = require('react')
    , ReactDOM = require('react-dom')
    , _        = require('lodash/core')
    , includes = require('lodash/includes');

var attrs = [
  'padding-left'
  , 'padding-right'
  , 'margin-left'
  , 'margin-right'
  , 'border-left-width'
  , 'border-right-width'
  , 'width'
];

let elements  = []
  , elm_sizes = [];

function getValue(v){
  return Number(v.replace(/[a-z]|%/g, ''));
}

function getTrueWidth(e){
  let elm =  window.getComputedStyle(e, null)
    , n = 0;
  _.forEach(attrs, (attr)=>{
    let v = getValue(elm.getPropertyValue(attr));
    n += v;
  });

  addElement(e, n);

  return n;
}

function addElement(elm, w){
  if (includes(_.map(elm_sizes, (e)=>e.elm), elm)){
    elm_sizes = _.map(elm_sizes, (e)=>{
      if (e.elm.isEqualNode(elm)) e.width = w;
      return e;
    });
  } else {
    elm_sizes.push({elm: elm, width: w});
  }
}

module.exports = {
  getTrueWidth: getTrueWidth

  , convertRefs: (refs)=>{
    elements = _.values(refs);
    return this;
  }

  , convertDomlist: function(list){
    elements = Array.prototype.slice.call(list);
    return this;
  }

  , convertReactComps: function(refs){
    elements = _.map(_.values(refs), (r)=>{
      if (_.isElement(r)) return r;
      return ReactDOM.findDOMNode(r);
    });
  }

  , getAllWidths: function(){
    return elm_sizes;
  }

  , getWidths: function(list){
    let items, width;
    items = (_.isArray(list)) ? list : elements;
    if (items.length === 0) return 0;

    width  = _.reduce(items, function(p, c){
      let n = (_.isNumber(p)) ? p : getTrueWidth(p);
      n += getTrueWidth(c);
      return n;
    }, 0);

    return width;
  }
};
