import {by} from 'protractor';

export class CommonPOLocators {

  static LOC_SPINNING_ICON = by.css('#best_spinning_icon');

  static LOC_HEADER_LINK = by.css('body header a.HeaderMenu-link');

  static LOC_ANY_BODY_LINK = 'body #js-pjax-container a';

  static LOC_QUICK_SEARCH_INPUT = by.css('body header input[name="q"]');

}
