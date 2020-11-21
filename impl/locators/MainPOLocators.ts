import {by} from 'protractor';

export const MainPOLocators: any =  {
  LOC_DROPDOWN_CARET_SPAN: by.css('#user-links details summary.HeaderNavlink span'),
  LOC_LOGOUT_BUTTON: by.css('#user-links details-menu button.dropdown-signout'),
  LOC_SEARCH_RESULT_LINK: '#js-pjax-container .codesearch-results ul li a'
}
