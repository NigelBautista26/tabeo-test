import { Selector, t } from 'testcafe'
import cardDetails from "../fixtures/cardDetails.json"
class CheckoutPage {

    cardNumberField() { return Selector('#cardNumber') }
    cardExpiryField() { return Selector('#cardExpiry') }
    cardCVCField() { return Selector('#cardCvc') }
    nameOnCardField() { return Selector('#billingName') }
    postalCodeField() { return Selector('#billingPostalCode') }
    saveInfoField() { return Selector('#enableStripePass') }
    mobileNumberield() { return Selector('#phoneNumber') }
    subscribeButton() { return Selector('button').withText('Subscribe') }
    payButton() { return Selector('button').withText('Pay £220.00') }
    requiredMessage() { return Selector('#required-cardNumber-fieldset', { timeout: 7000 } ) }
    invalidCardMessage() { return Selector('span', { timeout: 7000 } ).withText('Your card number is invalid.') }
    incompleteCardMessage() { return Selector('span', { timeout: 7000 } ).withText('Your card number is incomplete.') }
    cardDeclinedMessage() { return Selector('span', { timeout: 7000 } ).withText('Your card has been declined.') }
    iframeCheckoutPage() { return Selector('body > div:nth-child(1) > iframe', { timeout: 10000 } ) } 
    iframe2CheckoutPage() { return Selector('#challengeFrame', { timeout: 10000 } ) } 
    iframe3CheckoutPage() { return Selector('body > div > iframe', { timeout: 10000 } ) } 
    cancelSubscriptionButton() { return Selector('.LightboxModalClose') }
    unableToSubscribeMessage() { return Selector('p', { timeout: 7000 }).withText('We are unable to authenticate your payment method. Please choose a different payment method and try again.') }
    completeAuthenticationButton() { return Selector('#test-source-authorize-3ds', { timeout: 7000 } ) }
    failedAuthenticationButton() { return Selector('#test-source-fail-3ds', { timeout: 7000 } ) }
    cancelSavedInfoButton() { return Selector('span', { timeout: 7000 } ).withText('Cancel') }

    async checkout(t) {
      await t.typeText(this.cardExpiryField(), cardDetails.expiryDate)
      await t.typeText(this.cardCVCField(), cardDetails.cardCVC)
      await t.typeText(this.nameOnCardField(), cardDetails.nameOnCard)
      await t.typeText(this.postalCodeField(), cardDetails.postalCode)
    }

    async successfulCheckout(t) {
      await t.typeText(this.cardNumberField(), cardDetails.cardNumber)
      await this.checkout(t)
    }

    async checkoutWithRejectedCard(t) {
      await t.typeText(this.cardNumberField(), cardDetails.rejectedCardNumber)
      await this.checkout(t)
    }

    async checkoutSinglePay(t) {
      await this.successfulCheckout(t)
      await t.click(this.payButton())
      await this.successfulAuthentication(t)
    }

    async cancelCheckoutSinglePay(t) {
      await this.successfulCheckout(t)
      await t.click(this.payButton())
    }

    async checkoutFailedSinglePay(t) {
      await this.successfulCheckout(t)
      await t.click(this.payButton())
      await this.failedAuthentication(t)
    }

    async checkoutSubsciption(t) {
      await this.successfulCheckout(t)
      await t.click(this.subscribeButton())
      await this.successfulAuthentication(t)
    }

    async checkoutFailedSubsciption(t) {
      await this.successfulCheckout(t)
      await t.click(this.subscribeButton())
      await this.failedAuthentication(t)
    }

    async cancelSubscription(t) {
      await this.successfulCheckout(t)
      await t.click(this.subscribeButton())
    }

    async rejectedCheckout(t) {
      await this.checkoutWithRejectedCard(t)
      await t.click(this.payButton())
      await this.successfulAuthentication(t)
    }

    async rejectedSubscriptionCheckout(t) {
      await this.checkoutWithRejectedCard(t)
      await t.click(this.subscribeButton())
      await this.successfulAuthentication(t)
    }

    async checkoutWithInvalidCardNumber(t) {
      await t.typeText(this.cardNumberField(), cardDetails.invalidCardNumber)
    }

    async checkoutWithIncompleteCardNumber(t) {
      await t.typeText(this.cardNumberField(), cardDetails.incompleteCardNumber)
    }

    async iframes(t) {
      await t.switchToIframe(this.iframeCheckoutPage())
      await t.switchToIframe(this.iframe2CheckoutPage())
      await t.switchToIframe(this.iframe3CheckoutPage())
    }

    async successfulAuthentication(t) {
      await this.iframes(t)
      await t.click(this.completeAuthenticationButton())
      await t.switchToMainWindow()
    }

    async failedAuthentication(t) {
      await this.iframes(t)
      await t.click(this.failedAuthenticationButton())
      await t.switchToMainWindow()
    }

    async cancelIframe(t) {
      await t.switchToIframe(this.iframeCheckoutPage())
      await t.click(this.cancelSubscriptionButton())
      await t.switchToMainWindow()
    }

  }
  export default new CheckoutPage()