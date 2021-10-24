import { Selector, t } from 'testcafe'
import cardDetails from "../fixtures/cardDetails.json"
import user from "../fixtures/googleUser.json"

class SubscriptionPage {

    cardNumberField() { return Selector('#cardNumber') }
    cardExpiryField() { return Selector('#cardExpiry') }
    cardCVCField() { return Selector('#cardCvc') }
    nameOnCardField() { return Selector('#billingName') }
    postalCodeField() { return Selector('#billingPostalCode') }
    saveInfoField() { return Selector('#enableStripePass') }
    mobileNumberield() { return Selector('#phoneNumber') }
    subscribeButton() { return Selector('button').withText('Subscribe') }
    requiredMessage() { return Selector('#required-cardNumber-fieldset', { timeout: 7000 } ) }
    invalidCardMessage() { return Selector('span', { timeout: 7000 } ).withText('Your card number is invalid.') }
    incompleteCardMessage() { return Selector('span', { timeout: 7000 } ).withText('Your card number is incomplete.') }
    iframeSubscriptionPage() { return Selector('body > div:nth-child(1) > iframe') }
    cancelSubscriptionButton() { return Selector('.LightboxModalClose') }
    unableToSubscribeMessage() { return Selector('p', { timeout: 7000 }).withText('We are unable to authenticate your payment method. Please choose a different payment method and try again.') }
    // completeAuthenticationButton() { return Selector('button[type="submit"]#test-source-authorize-3ds') }
    completeAuthenticationButton() { return Selector('#test-source-authorize-3ds', { timeout: 7000 } ) }

    async subscribe(t) {
      await t.typeText(this.cardNumberField(), cardDetails.cardNumber)
      await t.typeText(this.cardExpiryField(), cardDetails.expiryDate)
      await t.typeText(this.cardCVCField(), cardDetails.cardCVC)
      await t.typeText(this.nameOnCardField(), cardDetails.nameOnCard)
      await t.typeText(this.postalCodeField(), cardDetails.postalCode)
      await t.click(this.subscribeButton())
    }

    async subscribeWithInvalidCardNumber(t) {
      await t.typeText(this.cardNumberField(), cardDetails.invalidCardNumber)
    }

    async subscribeWithIncompleteCardNumber(t) {
      await t.typeText(this.cardNumberField(), cardDetails.incompleteCardNumber)
      await t.click(this.subscribeButton())
    }

  }
  export default new SubscriptionPage()