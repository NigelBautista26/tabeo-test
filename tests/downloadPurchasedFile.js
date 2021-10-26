import downloadPage from './pages/downloadPage'
import url from "./fixtures/url.json"

fixture('Download Purchased File Tests')
.beforeEach(async (t) => {
    await t.setNativeDialogHandler(() => true)
    await t.maximizeWindow()
  })

//download purchased file test scenarios...
test.meta('testID', 'tb-17')("Download subscription file", async (t) => {
      await t.navigateTo(url.downloadPage20)
      await t.expect(downloadPage.thankYouMessage().innerText).eql('THANK YOU!')
      await t.expect(downloadPage.purchaseReadyToDownloadMessage().visible).ok()
      await t.expect(downloadPage.priceDisplay().innerText).eql('12 * £20 (£240)')
      await t.click(downloadPage.downloadButton())
})

test.meta('testID', 'tb-18')("Download single pay file", async (t) => {
      await t.navigateTo(url.downloadPage220)
      await t.expect(downloadPage.thankYouMessage().innerText).eql('THANK YOU!')
      await t.expect(downloadPage.purchaseReadyToDownloadMessage().visible).ok()
      await t.expect(downloadPage.priceDisplay().innerText).eql('£220')
      await t.click(downloadPage.downloadButton())
})
  


