/* eslint-disable linebreak-style */
/* eslint-disable indent */
describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Meowzy',
      username: 'cats',
      password: 'cats'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('cats')
      cy.get('#password').type('cats')
      cy.get('#login-button').click()
      cy.contains('Meowzy is logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('cats')
      cy.get('#password').type('dogs')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
})
