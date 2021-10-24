import { Selector, t } from 'testcafe'

class MailinatorPage {

    recievedEmail() { return Selector('table').withText('Sign in to qa-challenge-tabeo.vercel.app') }
    magicLink() { return Selector('body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a') }
    mailinatorPage() { return "https://www.mailinator.com/v4/public/inboxes.jsp?to=tabeo1" }
    iframe() { return '#html_msg_body' }

  }
  export default new MailinatorPage()
  