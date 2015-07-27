const _         = require('lodash');

let cssMixins   = require("../src/cssMixin");

describe('cssMixins', ()=> {
  let revert, spy;
  let mockdata = ["foo", {bar:false}];
  let md = {add:"foo", default:"bar"};
  beforeEach(()=> {
    spy    = jasmine.createSpy("cx");
    revert = cssMixins.__set__("cx", spy);
  });

  afterEach(()=>{
    revert();
  });

  describe('checkCss', function() {

    it("should return default if not in object", function() {
      let css = cssMixins.checkCss(md, "phil");
      expect(css).toEqual("bar");
    });

    it("should return default if not in object", function() {
      let css = cssMixins.checkCss(md, "phil");
      expect(css).toEqual("bar");
    });
  });


  it("getClasses should call classnames", function() {
    cssMixins.getClasses("foo")
    expect(spy).toHaveBeenCalledWith("foo");
  });

  it("toggleCss should reverse any boolean object", function() {
    let css = cssMixins.toggleCss(mockdata);

    expect(css[1].bar).toBeTruthy();
  });

});