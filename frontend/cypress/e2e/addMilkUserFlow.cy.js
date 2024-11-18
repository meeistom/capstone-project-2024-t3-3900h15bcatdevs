const url = 'http://localhost:3000/';

describe('user add milk bottle happy path', () => {
  beforeEach(() => {
    cy.intercept('/home').as('home');
    cy.intercept('/notifications').as('notifications');
    cy.visit(url);
    cy.wait(['@home', '@notifications']);
    cy.get('#scan-btn').click();
  });

  it('should navigate to the home page successfully', () => {
    cy.url().should('include', url);
  });

  it('should be able to open add milk modal', () => {
    cy.get('#add-milk-modal').should('be.visible');
  });

  it('should be able to close milk modal', () => {
    cy.get('button[name="close-modal"]').click();
    cy.get('#add-milk-modal').should('not.exist');
  });

  it('should have the barcode input automatically focused', () => {
    cy.get('input[name="scanner-input"]').should('have.focus');
  });

  it('should be able to enter barcode details', () => {
    const validMRN = '5049';
    cy.get('input[name="scanner-input"]').type(validMRN);
    cy.get('input[name="scanner-input"]').should('have.value', validMRN);

    cy.wait(500);

    cy.get('form[name="add-milk-form"]').should('exist');
  });

  it('should not progress to the add milk form if the MRN is invalid', () => {
    const invalidMRN = '0000';
    cy.get('input[name="scanner-input"]').type(invalidMRN);

    cy.get('form[name="add-milk-form"]').should('not.exist');
  });

  it('should be able to fill in milk details', () => {
    const validMRN = '5049';
    cy.get('input[name="scanner-input"]').type(validMRN);

    cy.wait(300);

    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-12-31T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);

    cy.get('#milk-type').should('have.value', milkType);
    cy.get('#milk-storage').should('have.value', storageType);
    cy.get('#express-date').should('have.value', expressDate);
    cy.get('#expiry-date').should('have.value', expiryDate);

    cy.get("button[name='preview-sticker']").click();

    cy.get('.body').find('img').should('exist');
  });

  it('should not submit form if not all fields are valid', () => {
    const validMRN = '5049';
    cy.get('input[name="scanner-input"]').type(validMRN);

    cy.wait(300);

    cy.get("button[name='preview-sticker']").click();

    cy.get('.body').find('img').should('not.exist');
  });

  it('should have a confirmation page of the milk submission', () => {
    const validMRN = '5049';
    cy.get('input[name="scanner-input"]').type(validMRN);

    cy.wait(300);

    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-12-31T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);

    cy.get('#milk-type').should('have.value', milkType);
    cy.get('#milk-storage').should('have.value', storageType);
    cy.get('#express-date').should('have.value', expressDate);
    cy.get('#expiry-date').should('have.value', expiryDate);

    cy.get("button[name='preview-sticker']").click();
    cy.get('.body').find('img').should('exist');

    cy.get("button[name='confirm-and-print']").click();
    cy.get('img[alt="Confirmation Icon"]').should('exist');

    cy.get('button[name="return-home"]').click();
    cy.url().should('include', url);
  });
});
