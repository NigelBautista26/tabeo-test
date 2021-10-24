import { Selector, t } from 'testcafe'
import googleLoginPage from "../pages/googleLoginPage"
import mailinatorPage from '../pages/mailinatorPage'
import mainPage from "../pages/mainPage"
import subscriptionPage from '../pages/subscriptionPage'
import user from "../fixtures/googleUser.json"

fixture('Tabeo Tests')
.page("https://qa-challenge-tabeo.vercel.app/")
.beforeEach(async (t) => {
    await t.setNativeDialogHandler(() => true)
    await t.maximizeWindow()
    await t.click(mainPage.signInButton())
  })

  test.meta('testID', 'tb-1')("Purchase a subscription", async (t) => {
    await t.click(mainPage.signInWithGoogleButton())
    await googleLoginPage.googleLogin(t)
    await t.expect(mainPage.accountName().textContent).contains(user.fullName)
    await t.click(mainPage.subscriptionButton())
    await subscriptionPage.subscribe(t)
    await t.switchToIframe(subscriptionPage.iframeSubscriptionPage())
    await t.click(subscriptionPage.completeAuthenticationButton())
    await t.wait(7000)
})

  test.meta('testID', 'tb-2')("Cancel a subscription payment", async (t) => {
    await t.click(mainPage.signInWithGoogleButton())
    await googleLoginPage.googleLogin(t)
    await t.expect(mainPage.accountName().textContent).contains(user.fullName)
    await t.click(mainPage.subscriptionButton())
    await subscriptionPage.subscribe(t)
    await t.switchToIframe(subscriptionPage.iframeSubscriptionPage())
    await t.click(subscriptionPage.cancelSubscriptionButton())
    await t.switchToMainWindow()
    await t.expect(subscriptionPage.unableToSubscribeMessage().visible).ok()
  })

  test.meta('testID', 'tb-3')("Email sign in", async (t) => {
      await mainPage.emailLogin(t)
      await t.navigateTo(mailinatorPage.mailinatorPage())
      await t.click(mailinatorPage.recievedEmail())
      await t.switchToIframe(mailinatorPage.iframe())
      await t.click(mailinatorPage.magicLink()).maximizeWindow()
  })


