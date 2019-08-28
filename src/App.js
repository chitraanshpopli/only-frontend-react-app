import './resources/scss/index.scss';
import Translations from "./resources/js/common/translations";
import $ from 'jquery';
import Backbone from 'backbone';
// eslint-disable-next-line no-unused-vars
import BackboneXhrEvents from 'backbone-xhr-events';

$(document).ready(() => {
  (new Translations()).init();

  Backbone.xhrEvents.on('xhr', (context) => {
    context.on('before-send', () => {
      if (!context.options.doNotScroll) {
        $(window).scrollTop(0);
      }
      $('#loader').hidden = false;
    });
    context.on('complete', () => {
      $('#loader').hidden = true;
    });
  });
});