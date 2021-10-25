import { Selector, t } from 'testcafe'
import { ClientFunction } from 'testcafe'
import fs from 'fs'

class DownloadPage {

    downloadPageURL() { return ('https://qa-challenge-tabeo.vercel.app/success') }
    thankYouMessage() { return Selector('#__next > main > div > div > h1') }
    purchaseReadyToDownloadMessage() { return Selector('p').withText('Your purchase is ready to be downloaded.') }
    downloadButton() { return Selector('.w-full') }
    priceDisplay() { return Selector('.pl-4 > .ml-2') }

    async checkCurrentURL() {
        const getLocation = ClientFunction(() => document.location.href)
        await t.expect(getLocation()).contains(this.downloadPageURL())
    }

  }
  export default new DownloadPage()
  