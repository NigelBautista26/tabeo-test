import googleLoginPage from "./pages/googleLoginPage"
import mailinatorPage from './pages/mailinatorPage'
import mainPage from "./pages/mainPage"
import checkoutPage from './pages/checkoutPage'
import downloadPage from './pages/downloadPage'
import user from "./fixtures/user.json"

fixture('Subscription Tests')
.page("https://qa-challenge-tabeo.vercel.app/")
.beforeEach(async (t) => {
    await t.setNativeDialogHandler(() => true)
    await t.maximizeWindow()
    await t.click(mainPage.signInButton())
  })

  //Subscription purchase test scenarios...
  test.meta('testID', 'tb-1')("Google sign in with a successful purchase of subscription", async (t) => {
    await mainPage.googleSignIn(t)
    await t.click(mainPage.subscriptionButton())
    await checkoutPage.checkoutSubsciption(t)
    await checkoutPage.successfulAuthentication(t)
    await downloadPage.checkCurrentURL()
})

test.meta('testID', 'tb-2')("Google sign in with a rejected card purchase of subscription", async (t) => {
      await mainPage.googleSignIn(t)
      await t.click(mainPage.subscriptionButton())
      await checkoutPage.rejectedSubscriptionCheckout(t)
      await checkoutPage.successfulAuthentication(t)
      await t.expect(checkoutPage.cardDeclinedMessage().visible).ok()
})

test.meta('testID', 'tb-3')("Google sign in with a failed authentication of purchase of subscription", async (t) => {
      await mainPage.googleSignIn(t)
      await t.click(mainPage.subscriptionButton())
      await checkoutPage.checkoutSubsciption(t)
      await checkoutPage.failedAuthentication(t)
      await t.expect(checkoutPage.unableToSubscribeMessage().visible).ok()
})

test.meta('testID', 'tb-4')("Purchase of subscription with invalid card number", async (t) => {
      await mainPage.googleSignIn(t)
      await t.click(mainPage.subscriptionButton())
      await checkoutPage.checkoutWithInvalidCardNumber(t)
      await t.expect(checkoutPage.invalidCardMessage().visible).ok()
})

test.meta('testID', 'tb-5')("Purchase of subscription with incomplete card number", async (t) => {
      await mainPage.googleSignIn(t)
      await t.click(mainPage.subscriptionButton())
      await checkoutPage.checkoutWithIncompleteCardNumber(t)
      await t.click(checkoutPage.subscribeButton())
      await t.expect(checkoutPage.incompleteCardMessage().visible).ok()
})

  test.meta('testID', 'tb-6')("Cancel the subscription payment", async (t) => {
      await mainPage.googleSignIn(t)
      await t.click(mainPage.subscriptionButton())
      await checkoutPage.checkoutSubsciption(t)
      await checkoutPage.cancelIframe(t)
      await t.expect(checkoutPage.unableToSubscribeMessage().visible).ok()
  })

  test.meta('testID', 'tb-7')("Empty subscription payment", async (t) => {
      await mainPage.googleSignIn(t)
      await t.click(mainPage.subscriptionButton())
      await t.click(checkoutPage.subscribeButton())
      await t.expect(checkoutPage.requiredMessage().visible).ok()
  })

  // This test can be flaky because mailinator sometimes doesnt recieve the new email with the magic link...
  test.meta('testID', 'tb-8')("Email sign in and a successful purchase of subscription", async (t) => {
      await mainPage.emailLogin(t)
      await t.click(mainPage.subscriptionButton())
      await checkoutPage.checkoutSubsciption(t)
      await checkoutPage.successfulAuthentication(t)
    })

