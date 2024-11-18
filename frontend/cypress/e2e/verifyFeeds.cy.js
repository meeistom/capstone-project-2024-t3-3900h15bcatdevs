const url = 'http://localhost:3000/';
const babyBarcode = '0000';
const milkBarcode = 'm???';
const invalidBarcode = '9999';
const mismatchedMilkBarcode = 'm999';

describe('verify feeds flow', () => {
  beforeEach(() => {
    cy.visit(`${url}verify_feed`);
  });

  it('should have the inputs auto-focused', () => {
    cy.get('#scanner-input').should('have.focus');
    cy.get('#scanner-input').type(babyBarcode);
    cy.get('#scanner-input').should('have.focus');
  });

  it('should give an error if the barcode entered is invalid', () => {
    cy.get('#scanner-input').type(invalidBarcode);

    cy.get('#verify-alert').should('be.visible');
  });

  it('should be able to close the error popup and continue scanning', () => {
    cy.get('#scanner-input').type(invalidBarcode);
    cy.get('button[name="close-alert"]').click();
    cy.get('#verify-alert').should('not.be.visible');
  });

  it('should give an error if the bottle and baby do not match', () => {
    cy.get('#scanner-input').type(babyBarcode);
    cy.get('#scanner-input').type(mismatchedMilkBarcode);

    cy.get('#verify-alert').should('be.visible');
  });
});
