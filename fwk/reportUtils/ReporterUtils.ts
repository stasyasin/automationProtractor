import { TestSuite } from '../models/TestSuite';
import { Campaign } from '../models/Campaign';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Generate a globalReport for
 */
export function generateGlobalReports(): void {
  // took last campaign folder
  const campaignName: string = getLastCampaignFolderName('Campaign-', './reports');
  // parse all html files in campaign folder. Note: except globalReport.html and screenshots folder
  const testSuites: TestSuite[] = [];
  fs.readdirSync('./reports/' + campaignName).filter((file) => {
    if ((file !== 'screenshots') && (file !== 'globalReport.html')) {
      const content = fs.readFileSync('./reports/' + campaignName + '/' + file, 'utf8').toString();
      const name: string = content.split('<header><h2>')[1].split(' - ')[0];
      const tests: string = content.split('Tests: <strong>')[1].split('</strong>')[0];
      const skipped: string = content.split('Skipped: <strong>')[1].split('</strong>')[0];
      const failures: string = content.split('Failures: <strong>')[1].split('</strong>')[0];
      const time: string = content.split(name + ' - ')[1].split('</h2>')[0];
      const link: string = file;
      const status = (parseInt(failures) > 0) || (parseInt(skipped) > 0) ? 'Failed': 'Passed';
      const testSuite: TestSuite = {name, tests, skipped, failures, time, link, status};
      testSuites.push(testSuite);
    }
  });
  const campaign: Campaign = {name: campaignName, testSuites};
  // creating html file
  const htmlText = toHtml(campaign);

  // writing html file
  fs.writeFileSync('./reports/' + campaignName + '/' + 'globalReport.html', htmlText);

}

export function getLastCampaignFolderName(baseDirName: string, srcPath: string): string {
  const campaignDirNames = [];

  fs.readdirSync(srcPath).filter((file) => {
    if (fs.statSync(path.join(srcPath, file)).isDirectory() && file.startsWith(baseDirName)) {
      campaignDirNames.push(file);
    }
  });
  campaignDirNames.sort();
  return campaignDirNames[campaignDirNames.length - 1];
}

export function toHtml(campaign: Campaign): string {
  let totalTime: number = 0;
  let totalTests: number = 0;
  let totalSkipped: number = 0;
  let totalFailed: number = 0;
  campaign.testSuites.forEach((testSuite) => {
    totalTime += parseFloat(testSuite.time.split('s')[0]);
    totalTests += parseInt(testSuite.tests);
    totalSkipped += parseInt(testSuite.skipped);
    totalFailed += parseInt(testSuite.failures);
  });
  const html =
    `<!DOCTYPE html>
    <html>
      <head head lang=en>
          <style type="text/css">
              .passed {background-color: #ADFF2F;}
              .summaryTable {background-color: #C0C0C0;font-weight: bold;}
              .headerTable {background-color: #C0C0C0;font-weight: bold;}
              .headerCell {width: 20px; height: 40px}
              .failed {background-color: #FA8072;}
          </style>
          <title>${campaign.name}</title>
      </head>
      <body>
          <div>
              <table class= "summaryTable" cellspacing="0" cellpadding="0" border="1" align="center" style="width:740px;">
                  <tr><td>${campaign.name}</td></tr>
              </table>
              <table cellspacing="0" cellpadding="0" border="1" align="center" style="width:740px;">
                  <tr class="headerTable" style="text-align: center;">
                      <td> Test name</td>
                      <td> Time Spend</td>
                      <td> Tests</td>
                      <td> Skipped</td>
                      <td> Failed</td>
                      <td> Test Status</td>
                      <td> Link</td>
                      <td> Comment</td></tr>
                      ${generateTableRow(campaign.testSuites)}
                  <tr class="headerTable" style="text-align: center;">
                      <td> Total TestSuites (${campaign.testSuites.length})</td>
                      <td>${totalTime.toFixed(2)}s</td>
                      <td>${totalTests}</td>
                      <td>${totalSkipped}</td>
                      <td>${totalFailed}</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                  </tr>
              </table>
      </body>
    </html>`;
  return html;
}

export function generateTableRow(testSuites: TestSuite[]) {
  let result = '';
  testSuites.forEach((testSuite) => {
    result += `
    <tr class="${testSuite.status === 'Passed' ? 'passed': 'failed'}" style="text-align: center;">
        <td>${testSuite.name}</td>
    <td>${testSuite.time}</td>
    <td>${testSuite.tests}</td>
    <td>${testSuite.skipped}</td>
    <td>${testSuite.failures}</td>
    <td>${testSuite.status}</td>
    <td><a href="${testSuite.link}">Report</a></td>
    <td>&nbsp;</td>
    </tr>`;
  });
  return result;
}

generateGlobalReports();
