import _ from 'lodash';

import widthMixins from '../src/widths_mixins';

import { createElement, createHolder } from './utils/createElements';

describe('widthMixins', () => {
  let revert, spy;

  describe('getValue', function() {
    let getValue;
    beforeEach(function() {
      getValue = widthMixins.__get__('getValue');
    });

    it('should convert px unit to number', function() {
      expect(getValue('20px')).toEqual(20);
    });

    it('should convert % unit to number', function() {
      expect(getValue('20%')).toEqual(20);
    });

    it('should convert rem unit to number', function() {
      expect(getValue('20rem')).toEqual(20);
    });
  });

  describe('addElement', function() {
    let elms, addElement, holders;
    beforeEach(() => {
      holders = [];
      holders.push(createHolder('holder0', null, 'div'));
      holders.push(createHolder('holder1', null, 'div'));

      elms = widthMixins.__get__('elmSizes');
      addElement = widthMixins.__get__('addElement');
    });

    afterEach(() => {
      widthMixins.__set__('elmSizes', []);
    });

    it('should add to elms list if new elm added', function() {
      expect(elms.length).toEqual(0);
      addElement(holders[0], 100);
      expect(elms.length).toEqual(1);

      addElement(holders[1], 100);
      expect(elms.length).toEqual(2);
    });

    it('should update if the same element is added', function() {
      addElement(holders[0], 100);
      expect(elms.length).toEqual(1);
      expect(elms[0].width).toEqual(100);

      addElement(holders[0], 200);
      expect(elms.length).toEqual(1);
      expect(elms[0].width).toEqual(200);
    });
  });

  describe('getTrueWidth', function() {
    let elms, addElement, getTrueWidth, holder;

    beforeEach(function() {
      spy = jasmine.createSpy('addElement');
      revert = widthMixins.__set__('addElement', spy);
      getTrueWidth = widthMixins.__get__('getTrueWidth');
      let i;
      holder = createHolder('holder', null, 'div');

      holder.style.padding = '10px';
      holder.style.margin = '5px';
      holder.style.width = '100px';
      holder.style.border = '1px solid black';
    });

    afterEach(() => {
      holder.parentElement.removeChild(holder);
    });

    it('should return the true width of element', function() {
      let width = getTrueWidth(holder);
      // console.log("width is %j", width)
      expect(width).toEqual(132);
    });

    it('shoould add to element list', function() {
      let width = getTrueWidth(holder);
      expect(spy).toHaveBeenCalledWith(holder, 132);
    });
  });

  describe('get widths', function() {
    beforeEach(function() {
      spy = jasmine.createSpy('getTrueWidth').and.returnValue(20);
      revert = widthMixins.__set__('getTrueWidth', spy);
    });

    afterEach(() => {
      revert();
    });

    it('should return width total', function() {
      let width = widthMixins.getWidths(['elm', 'elm2']);

      expect(width).toEqual(40);
      expect(spy.calls.count()).toEqual(2);
    });

    it('should use element if nothing passed', function() {
      let elms = widthMixins.__set__('elements', ['elm', 'elm2', 'elm3']);

      let width = widthMixins.getWidths();

      expect(width).toEqual(60);
      expect(spy.calls.count()).toEqual(3);
    });
  });

  describe('converters', function() {
    beforeEach(function() {
      spy = jasmine.createSpy('getTrueWidth').and.returnValue(20);
      revert = widthMixins.__set__('getTrueWidth', spy);
    });

    afterEach(() => {
      revert();
    });

    it('should convert refs', function() {
      let refs = { ref1: 'elm', ref2: 'elm2' };
      widthMixins.convertRefs(refs);
      let elements = widthMixins.__get__('elements');
      expect(elements).toEqual(['elm', 'elm2']);
    });
  });
});
