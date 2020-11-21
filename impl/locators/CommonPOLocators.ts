import {by} from 'protractor';

export const CommonPOLocators: any = {
  LOC_SPINNING_ICON: by.css('#best_spinning_icon'),
  LOC_HEADER_LINK: by.css('body header a.HeaderMenu-link'),
  LOC_ANY_BODY_LINK: 'body .application-main a',
  LOC_QUICK_SEARCH_INPUT: by.css('body header input[name="q"]'),
}
