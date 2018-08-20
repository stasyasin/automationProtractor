import {by} from 'protractor';

export class MainPOLocators {

  static LOC_DROPDOWN_CARET_SPAN = by.css('#user-links details summary.HeaderNavlink span');

  static LOC_LOGOUT_BUTTON = by.css('#user-links details-menu li button');

  static LOC_SEARCH_RESULT_LINK = '#js-pjax-container .codesearch-results ul li a';

}
