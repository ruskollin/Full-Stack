/* eslint-disable linebreak-style */
/* eslint-disable indent */
describe('Blog App', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/api/testing/reset')
    // const user = {
    //   name: 'Meowzy',
    //   username: 'cats',
    //   password: 'cats'
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    // cy.visit('http://localhost:3000')
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type('cats')
      cy.get('#password').type('cats')
      cy.get('#login-button').click()
    })

    it('can create a new blog', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Comfort Foods Lost if Bees Become Extinct')
      cy.get('#author').type('Rob Knight')
      cy.get('#url').type('https://www.independent.co.uk/climate-change/curry-baked-beans-jam-bees-extinct-b1917757.html')
      cy.get('#add-button').click()
      cy.get('#blogs')
        .contains('Comfort Foods Lost if Bees Become Extinct')
    })

      it('can like a blog', function () {
        cy.contains('Comfort Foods Lost if Bees Become Extinct')
          .get('#view-button').click()
          .get('#like-button').click()
        cy.contains('likes: ')
      })

      it('user who created a blog can delete it', function () {
        cy.contains('LOGOUT').click()
        cy.contains('log in').click()
        cy.get('#username').type('cats')
        cy.get('#password').type('cats')
        cy.get('#login-button').click()
        cy.get('#view-button').click()
        cy.get('#blog').should('not.have.text', 'delete')
      })

      it('blogs are ordered according to most likes being first', function () {
        cy.get('#blog').then(($blog) => {
          for (let i = 0; i < $blog.length; i++) {
            if (i < $blog.length - 1) {
              expect(
                ($blog.get('#likes')[i].innerText),
              ).to.be.least(
                ($blog.get('#likes')[i + 1].innerText),
              )
            }
          }
        })
      })
    })
})
