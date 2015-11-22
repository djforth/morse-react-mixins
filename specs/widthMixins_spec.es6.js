const _         = require('lodash');

let widthMixins   = require("../src/widths_mixins");

let jasmineHelpers = require("react-jasmine");
let createElm      = jasmineHelpers.createElement

describe('widthMixins', ()=> {
  let revert, spy;

  describe('getValue', function() {
    let getValue;
    beforeEach(function() {
      getValue = widthMixins.__get__('getValue')
    });

    it('should convert px unit to number', function() {
      expect(getValue("20px")).toEqual(20)
    });

    it('should convert % unit to number', function() {
      expect(getValue("20%")).toEqual(20)
    });

    it('should convert rem unit to number', function() {
      expect(getValue("20rem")).toEqual(20)
    });
  });

  describe('getTrueWidth', function() {
    let elms, getTrueWidth, holder;

    beforeEach(function() {
      getTrueWidth = widthMixins.__get__('getTrueWidth');
      let i;
      holder = createElm.createHolder("holder", null,"div")

      holder.style.padding = "10px";
      holder.style.margin  = "5px";
      holder.style.width   = "100px";
      holder.style.border  = "1px solid black";
      console.log(holder.getBoundingClientRect())
    });

    afterEach(()=>{
      holder.parentElement.removeChild(holder)
    });

    it('should return the true width of element', function() {
      var width = getTrueWidth(holder);
      // console.log("width is %j", width)
      expect(width).toEqual(132);
    });
  });

  describe('get widths', function() {

    beforeEach(function() {
      spy = jasmine.createSpy("getTrueWidth").and.returnValue(20)
      revert = widthMixins.__set__('getTrueWidth', spy);
    });

    afterEach(()=>{
      revert();
    });

    it('should return width total', function() {
      let width = widthMixins.getWidths(["elm", "elm2"])

      expect(width).toEqual(40);
      expect(spy.calls.count()).toEqual(2);
    });

    it('should use element if nothing passed', function() {
      let elms = widthMixins.__set__("elements", ["elm", "elm2", "elm3"])

      let width = widthMixins.getWidths()

      expect(width).toEqual(60);
      expect(spy.calls.count()).toEqual(3);
    });
  });

  describe('converters', function() {
    beforeEach(function() {
      spy = jasmine.createSpy("getTrueWidth").and.returnValue(20)
      revert = widthMixins.__set__('getTrueWidth', spy);


    });

    afterEach(()=>{
      revert();
    });

    it('should convert refs', function() {
      let refs = {ref1:"elm", ref2:"elm2"}
      widthMixins.convertRefs(refs)
      let elements = widthMixins.__get__("elements")
      expect(elements).toEqual(["elm", "elm2"])
    });
  });

});