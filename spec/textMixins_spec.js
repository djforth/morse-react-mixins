const _         = require('lodash');

let textMixins   = require("../src/text_mixins");

describe('textMixins', ()=> {

  describe('capitalize', function() {
    beforeEach(function() {
      spyOn(textMixins, "removeUnderscore").and.returnValue("foo bar");
    });

    it("should capitalize first letter", function() {
      let str = textMixins.capitalize("foo_bar");
      expect(textMixins.removeUnderscore).toHaveBeenCalledWith("foo_bar");

      expect(str).toEqual("Foo bar");
    });

    it("should return empty string if not a number", function() {
      let str = textMixins.capitalize(123);
      expect(textMixins.removeUnderscore).not.toHaveBeenCalled();

      expect(str).toEqual("");
    });
  });

  it("should create an id from arguments", function() {
    let str = textMixins.createId("foo", "Bar", "Phil Collins");
    expect(str).toEqual("foo-bar-phil-collins");
  });

  it("should remove any _ or -", function() {
    let str = textMixins.removeUnderscore("foo-bar_Phil_Collins");
    expect(str).toEqual("foo bar Phil Collins");
  });

});