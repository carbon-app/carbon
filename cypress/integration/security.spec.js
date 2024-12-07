/* global cy */
import { editorVisible } from '../support'

describe('security', () => {
  it('should not alert from bg query parameter', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    // https://github.com/carbon-app/carbon/issues/192
    cy.visit(`?bg=rgba(171, 184, 195, 1)</style><img src="" onerror="alert('xss')" /><!--`)

    editorVisible()

    expect(stub).not.to.be.called
  })
  it('security headers', () => {
    cy.request('/').should(response => {
      expect(response.headers).to.include({
        'x-frame-options': 'SAMEORIGIN',
        'x-xss-protection': '1; mode=block',
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'no-referrer-when-downgrade',
        'feature-policy': "geolocation 'self'; microphone 'self'; camera 'self'",
      })
    })
  })
  it('/offsets -> Project Wren', () => {
    cy.visit(`/offsets`)
    cy.url().should(
      'eq',
      'https://www.wren.co/join/carbon?utm_campaign=share&utm_medium=profile_referral_link'
    )
  })
  it('/privacy -> Privacy policy', () => {
    cy.visit(`/privacy`)
    cy.url().should(
      'eq',
      'https://carbon-app.notion.site/PRIVACY-POLICY-65f08f57a8a14f91931d778f9a471a7d'
    )
  })
  it('/terms -> Terms', () => {
    cy.visit(`/terms`)
    cy.url().should(
      'eq',
      'https://carbon-app.notion.site/TERMS-OF-USE-d159661077fe4ef2974e6108b36aeece'
    )
  })
})
