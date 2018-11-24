import { TestSuite } from '../dataObjects/TestSuite';
import { Campaign } from '../dataObjects/Campaign';

let fs = require('fs');
let path = require('path');

/**
 * Generate a globalReport for
 */
export function generateGlobalReports(): void {
  // took last campaign folder
  let campaignName: string = getLastCampaignFolderName('Campaign-', './../reports');
  // parse all html files in campaign folder. Note: except globalReport.html and screenshots folder
  let testSuites: TestSuite[] = [];
  fs.readdirSync('./../reports/' + campaignName).filter((file) => {
    if ((file !== 'screenshots') && (file !== 'globalReport.html')) {
      let content = fs.readFileSync('./../reports/' + campaignName + '/' + file, 'utf8').toString();
      let name: string = content.split('<header><h2>')[1].split(' - ')[0];
      let tests: string = content.split('Tests: <strong>')[1].split('</strong>')[0];
      let skipped: string = content.split('Skipped: <strong>')[1].split('</strong>')[0];
      let failures: string = content.split('Failures: <strong>')[1].split('</strong>')[0];
      let time: string = content.split(name + ' - ')[1].split('</h2>')[0];
      let link: string = file;
      let testSuite: TestSuite = new TestSuite(name, tests, skipped, failures, time, link);
      testSuites.push(testSuite);
    }
  });
  let campaign: Campaign = new Campaign(campaignName, testSuites);
  // creating html file
  let htmlText = toHtml(campaign);

  // writing html file
  fs.writeFileSync('./../reports/' + campaignName + '/' + 'globalReport.html', htmlText);

}

export function getLastCampaignFolderName(baseDirName: string, srcPath: string): string {
  let campaign_dir_names = [];

  fs.readdirSync(srcPath).filter((file) => {
    if (fs.statSync(path.join(srcPath, file)).isDirectory() && file.startsWith(baseDirName)) {
      campaign_dir_names.push(file);
    }
  });
  campaign_dir_names.sort();
  return campaign_dir_names[campaign_dir_names.length - 1];
}


export function toHtml(campaign: Campaign): string {
  let html = '<!DOCTYPE html><html><head lang=en>';
  let totalTime: number = 0;
  let totalTests: number = 0;
  let totalSkipped: number = 0;
  let totalFailed: number = 0;
  html += injectClasses();
  html += '<meta charset=UTF-8><title>' + campaign.name + '</title><body>';
  html += '<div><p><table class= "summaryTable" cellspacing="0" cellpadding="0" border="1" align="center" style="width:740px;"><tr><td>' +
    campaign.name + '</td></tr></table>';
  html += '<table cellspacing="0" cellpadding="0" border="1" align="center" style="width:740px;">';
  html += '<tr class="headerTable" style="text-align: center;">';
  html += '<td width="20" height="40"> Test name</td>';
  html += '<td width="20" height="40"> Time Spend</td>';
  html += '<td width="20" height="40"> Tests</td>';
  html += '<td width="20" height="40"> Skipped</td>';
  html += '<td width="20" height="40"> Failed</td>';
  html += '<td width="20" height="40"> Test Status</td>';
  html += '<td width="20" height="40"> Link</td>';
  html += '<td width="20" height="40"> Comment</td></tr>';
  campaign.testSuites.forEach(function(testSuite) {
    if (testSuite.status === 'Passed') {
      html += '<tr class="passed" style="text-align: center;">';
    } else {
      html += '<tr class="failed" style="text-align: center;">';
    }
    html += '<td width="20" height="40">' + testSuite.name + '</td>';
    html += '<td width="20" height="40">' + testSuite.time + '</td>';
    html += '<td width="20" height="40">' + testSuite.tests + '</td>';
    html += '<td width="20" height="40">' + testSuite.skipped + '</td>';
    html += '<td width="20" height="40">' + testSuite.failures + '</td>';
    html += '<td width="20" height="40">' + testSuite.status + '</td>';
    html += '<td width="20" height="40"><a href="' + testSuite.link + '">Report</a></td>';
    html += '<td width="20" height="40">&nbsp;</td>';
    html += '</tr>';
    totalTime += parseFloat(testSuite.time.split('s')[0]);
    totalTests += parseInt(testSuite.tests);
    totalSkipped += parseInt(testSuite.skipped);
    totalFailed += parseInt(testSuite.failures);
  });

  html += '<tr class="headerTable" style="text-align: center;">';
  html += '<td width="20" height="40"> Total TestSuites (' + campaign.testSuites.length + ')</td>';
  html += '<td width="20" height="40">' + totalTime.toFixed(2) + 's</td>';
  html += '<td width="20" height="40">' + totalTests + '</td>';
  html += '<td width="20" height="40">' + totalSkipped + '</td>';
  html += '<td width="20" height="40">' + totalFailed + '</td>';
  html += '<td width="20" height="40">&nbsp;</td>';
  html += '<td width="20" height="40">&nbsp;</td>';
  html += '<td width="20" height="40">&nbsp;</td></tr>';

  html += '</table>';

  html += '</body></html>';
  return html;
}

export function injectClasses(): string {
  let classes = '<style type="text/css">' +
    '.passed {background-color: #ADFF2F;}' +
    '.summaryTable {background-color: #C0C0C0;font-weight: bold;}' +
    '.headerTable {background-color: #C0C0C0;font-weight: bold;}' +
    '.failed {background-color: #FA8072;}</style>';
  return classes;
}

generateGlobalReports();

