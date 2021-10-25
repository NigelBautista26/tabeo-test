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
    iframeSubscriptionPage() { return Selector('body > div:nth-child(1) > iframe') } 
    iframe2SubscriptionPage() { return Selector('#challengeFrame') } 
    iframe3SubscriptionPage() { return Selector('body > div > iframe') } 
    cancelSubscriptionButton() { return Selector('.LightboxModalClose') }
    unableToSubscribeMessage() { return Selector('p', { timeout: 7000 }).withText('We are unable to authenticate your payment method. Please choose a different payment method and try again.') }
    completeAuthenticationButton() { return Selector('#test-source-authorize-3ds', { timeout: 7000 } ) }
    failedAuthenticationButton() { return Selector('#test-source-fail-3ds', { timeout: 7000 } ) }


    async checkout(t) {
      await t.typeText(this.cardNumberField(), cardDetails.cardNumber)
      await t.typeText(this.cardExpiryField(), cardDetails.expiryDate)
      await t.typeText(this.cardCVCField(), cardDetails.cardCVC)
      await t.typeText(this.nameOnCardField(), cardDetails.nameOnCard)
      await t.typeText(this.postalCodeField(), cardDetails.postalCode)
    }

    async rejectedCheckout(t) {
      await t.typeText(this.cardNumberField(), cardDetails.rejectedCardNumber)
      await t.typeText(this.cardExpiryField(), cardDetails.expiryDate)
      await t.typeText(this.cardCVCField(), cardDetails.cardCVC)
      await t.typeText(this.nameOnCardField(), cardDetails.nameOnCard)
      await t.typeText(this.postalCodeField(), cardDetails.postalCode)
    }

    async checkoutWithInvalidCardNumber(t) {
      await t.typeText(this.cardNumberField(), cardDetails.invalidCardNumber)
    }

    async checkoutWithIncompleteCardNumber(t) {
      await t.typeText(this.cardNumberField(), cardDetails.incompleteCardNumber)
    }

  }
  export default new CheckoutPage()