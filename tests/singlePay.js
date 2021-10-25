import googleLoginPage from "./pages/googleLoginPage"
import mailinatorPage from './pages/mailinatorPage'
import mainPage from "./pages/mainPage"
import checkoutPage from './pages/checkoutPage'
import downloadPage from './pages/downloadPage'
import user from "./fixtures/user.json"

fixture('single payment Tests')
.page("https://qa-challenge-tabeo.vercel.app/")
.beforeEach(async (t) => {
    await t.setNativeDialogHandler(() => true)
    await t.maximizeWindow()
    await t.click(mainPage.signInButton())
  })

  //Single pay test scenarios...
  test.meta('testID', 'tb-9')("Google sign in with a successful single purchase", async (t) => {
    await t.click(mainPage.signInWithGoogleButton())
    await googleLoginPage.googleLogin(t)
    await t.expect(mainPage.accountName().textContent).contains(user.fullName)
    await t.click(mainPage.singlePayButton())
    await checkoutPage.checkout(t)
    await t.click(checkoutPage.payButton())
    await t.switchToIframe(checkoutPage.iframeSubscriptionPage())
    await t.switchToIframe(checkoutPage.iframe2SubscriptionPage())
    await t.switchToIframe(checkoutPage.iframe3SubscriptionPage())
    await t.click(checkoutPage.completeAuthenticationButton())
    await t.switchToMainWindow()
    await downloadPage.checkCurrentURL()
})

test.meta('testID', 'tb-10')("Google sign in with a rejected card purchase for single payment", async (t) => {
      await t.click(mainPage.signInWithGoogleButton())
      await googleLoginPage.googleLogin(t)
      await t.expect(mainPage.accountName().textContent).contains(user.fullName)
      await t.click(mainPage.singlePayButton())
      await checkoutPage.rejectedCheckout(t)
      await t.click(checkoutPage.payButton())
      await t.switchToIframe(checkoutPage.iframeSubscriptionPage())
      await t.switchToIframe(checkoutPage.iframe2SubscriptionPage())
      await t.switchToIframe(checkoutPage.iframe3SubscriptionPage())
      await t.click(checkoutPage.completeAuthenticationButton())
      await t.switchToMainWindow()
      await t.expect(checkoutPage.cardDeclinedMessage().visible).ok()
})

test.meta('testID', 'tb-11')("Google sign in with a failed authentication of purchase for single payment", async (t) => {
      await t.click(mainPage.signInWithGoogleButton())
      await googleLoginPage.googleLogin(t)
      await t.expect(mainPage.accountName().textContent).contains(user.fullName)
      await t.click(mainPage.singlePayButton())
      await checkoutPage.rejectedCheckout(t)
      await t.click(checkoutPage.payButton())
      await t.switchToIframe(checkoutPage.iframeSubscriptionPage())
      await t.switchToIframe(checkoutPage.iframe2SubscriptionPage())
      await t.switchToIframe(checkoutPage.iframe3SubscriptionPage())
      await t.click(checkoutPage.failedAuthenticationButton())
      await t.switchToMainWindow()
      await t.expect(checkoutPage.unableToSubscribeMessage().visible).ok()
})

test.meta('testID', 'tb-12')("Single purchase with invalid card number", async (t) => {
      await t.click(mainPage.signInWithGoogleButton())
      await googleLoginPage.googleLogin(t)
      await t.expect(mainPage.accountName().textContent).contains(user.fullName)
      await t.click(mainPage.singlePayButton())
      await checkoutPage.checkoutWithInvalidCardNumber(t)
      await t.expect(checkoutPage.invalidCardMessage().visible).ok()
})

test.meta('testID', 'tb-13')("single purchase with incomplete card number", async (t) => {
      await t.click(mainPage.signInWithGoogleButton())
      await googleLoginPage.googleLogin(t)
      await t.expect(mainPage.accountName().textContent).contains(user.fullName)
      await t.click(mainPage.singlePayButton())
      await checkoutPage.checkoutWithIncompleteCardNumber(t)
      await t.click(checkoutPage.payButton())
      await t.expect(checkoutPage.incompleteCardMessage().visible).ok()
})

  test.meta('testID', 'tb-14')("Cancel the single payment", async (t) => {
      await t.click(mainPage.signInWithGoogleButton())
      await googleLoginPage.googleLogin(t)
      await t.expect(mainPage.accountName().textContent).contains(user.fullName)
      await t.click(mainPage.singlePayButton())
      await checkoutPage.checkout(t)
      await t.click(checkoutPage.payButton())
      await t.switchToIframe(checkoutPage.iframeSubscriptionPage())
      await t.click(checkoutPage.cancelSubscriptionButton())
      await t.switchToMainWindow()
      await t.expect(checkoutPage.unableToSubscribeMessage().visible).ok()
  })

  test.meta('testID', 'tb-15')("Empty single payment", async (t) => {
      await t.click(mainPage.signInWithGoogleButton())
      await googleLoginPage.googleLogin(t)
      await t.expect(mainPage.accountName().textContent).contains(user.fullName)
      await t.click(mainPage.singlePayButton())
      await t.click(checkoutPage.payButton())
      await t.expect(checkoutPage.requiredMessage().visible).ok()
  })

  //This test can be flaky because mailinator sometimes doesnt recieve the new email with the magic link...
  test.meta('testID', 'tb-16')("Email sign in and a successful single payment purchase", async (t) => {
      await mainPage.emailLogin(t)
      await t.navigateTo(mailinatorPage.mailinatorPage())
      await t.click(mailinatorPage.recievedEmail())
      await t.switchToIframe(mailinatorPage.iframe())
      await t.click(mailinatorPage.magicLink()).maximizeWindow()
      await t.click(mainPage.subscriptionButton())
      await checkoutPage.checkout(t)
      await t.click(checkoutPage.subscribeButton())
      await t.switchToIframe(checkoutPage.iframeSubscriptionPage())
      await t.switchToIframe(checkoutPage.iframe2SubscriptionPage())
      await t.switchToIframe(checkoutPage.iframe3SubscriptionPage())
      await t.click(checkoutPage.completeAuthenticationButton())
  })
  

