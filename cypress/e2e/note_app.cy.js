describe('Note app', function () {
  // Cypress uses Mocha under the hood, and this one recommends to use fn instead of arrow fn
  beforeEach(function () {
    // Endpoint to erase test DB
    cy.request('POST', '/testing/reset');
    // Create & store user
    const user = {
      name: 'Test User',
      username: 'test',
      password: '1234',
    };
    cy.request('POST', '/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    // cy.contains finds only text
    cy.contains('Note');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
  });

  it('login form can be opened', function () {
    cy.get('#username').type('test');
    cy.get('#password').type('1234');
    cy.get('#login-button').click();

    cy.contains('Test User logged in');
  });

  it('login fails with wrong password', function () {
    cy.get('#username').type('test');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    // Both options are valid. Should provides more assertions
    // https://docs.cypress.io/guides/references/assertions#Common-Assertions
    // cy.contains('wrong credentials');
    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  });

  describe('when logged in', function () {
    // All changes to the browser's state are reversed after each test.
    // Then we need to log in again

    beforeEach(function () {
      // Using forms every time is a bad practice.
      // Cypress recommends that we bypass the UI and do an HTTP request to the backend to log in.

      // Custom commands are declared in cypress/support/commands.js.
      // The code for logging in is as follows:
      cy.login({ username: 'test', password: '1234' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#noteForm').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        // same principle as with Login, avoid using a form and make an HTTP request
        cy.createNote({ content: 'another note cypress' });
      });

      it('it can be set to important', function () {
        // The first command searches for a component containing the text another note cypress,
        // and then for a make important button within it. It then clicks the button.
        cy.contains('another note cypress').contains('make important').click();

        cy.contains('another note cypress').contains('make not important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: true });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        /*
        > Note that we use the command find to search for the button.
        > We cannot use cy.get here, because it always searches from the whole page and would return all 5 buttons on the page.
        <li className='note'>
          <span>{note.content}</span>
          <button onClick={toggleImportance}>{label}</button>
        </li>
        */
        cy.contains('first note').parent().find('button').as('theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });

      it('another one can be made not important', function () {
        cy.contains('second note').parent().find('button').as('theButton').click();
        cy.get('@theButton').should('contain', 'make important');
      });

      it('another one can be made importante and switched back to not important', function () {
        cy.contains('third note').parent().find('button').as('theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make important');
      });
    });
  });
});
