const url = 'http://localhost:3000/';

describe('delete milk flow', () => {
  beforeEach(() => {
    cy.intercept('/home').as('home');
    cy.intercept('/notifications').as('notifications');
    cy.visit(url);
    cy.wait(['@home', '@notifications']);
  });

  it('should open the delete milk modal when delete button pressed', () => {
    const babyMRN = '1215';
    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-12-31T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';

    cy.get('#scan-btn').click();
    cy.get('input[name="scanner-input"]').type(babyMRN);

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);

    cy.get('#milk-type').should('have.value', milkType);
    cy.get('#milk-storage').should('have.value', storageType);
    cy.get('#express-date').should('have.value', expressDate);
    cy.get('#expiry-date').should('have.value', expiryDate);

    cy.get("button[name='preview-sticker']").click();
    cy.get("button[name='confirm-and-print']").click();
    cy.get('button[name="return-home"]').click();

    cy.reload();

    cy.get('.expand-btn').first().click();
    cy.get('.dlt-btn').first().click();
    cy.get('.modal-title').should('contain', 'Deletion Confirmation');
  });

  it("should have the baby and mother's name and milk ID visible", () => {
    cy.get('.expand-btn').first().click();
    cy.get('.dlt-btn').first().click();
    cy.get('.modal-body').should('contain', 'Milk #');
    cy.get('.modal-body').should('contain', 'belongs to');
    cy.get('.modal-body').should('contain', 'baby of');
  });

  it('should have the reasons for deletion dropdown with different options', () => {
    cy.get('.expand-btn').first().click();
    cy.get('.dlt-btn').first().click();
    cy.get('#milk-removal-reason').should('exist');

    const reasons = ['expired', 'discharged', 'other'];

    reasons.map((reason) => {
      cy.get('#milk-removal-reason').select(reason);
      cy.get('#milk-removal-reason').should('have.value', reason);
    });
  });

  it('should have expired as the default deletion reason', () => {
    cy.get('.expand-btn').first().click();
    cy.get('.dlt-btn').first().click();
    cy.get('#milk-removal-reason').should('have.value', 'expired');
  });

  it('should have notes appear if other is picked as a deletion reason', () => {
    cy.get('.expand-btn').first().click();
    cy.get('.dlt-btn').first().click();
    cy.get('#milk-removal-reason').select('other');
    cy.get('#removal-notes').should('be.visible');

    cy.get('#confirm-dlt-milk-btn').should('be.disabled');

    cy.get('#removal-notes').type('the baby pooped');
    cy.get('#confirm-dlt-milk-btn').should('not.be.disabled');
  });

  it('should be able to delete milk entry', () => {
    // Create milk entry
    const babyMRN = '1215';
    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-12-31T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';

    cy.get('#scan-btn').click();
    cy.get('input[name="scanner-input"]').type(babyMRN);

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);

    cy.get('#milk-type').should('have.value', milkType);
    cy.get('#milk-storage').should('have.value', storageType);
    cy.get('#express-date').should('have.value', expressDate);
    cy.get('#expiry-date').should('have.value', expiryDate);

    cy.get("button[name='preview-sticker']").click();
    cy.get("button[name='confirm-and-print']").click();
    cy.get('button[name="return-home"]').click();

    cy.get('.expand-btn').first().click();
    cy.get('.dlt-btn').first().click();
    cy.get('#confirm-dlt-milk-btn').click();

    cy.get('.modal-title').should('not.exist');
  });

  it('should be able to delete milk entry if other is picked', () => {
    // Create milk entry
    const babyMRN = '1215';
    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-12-31T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';

    cy.get('#scan-btn').click();
    cy.get('input[name="scanner-input"]').type(babyMRN);

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);

    cy.get('#milk-type').should('have.value', milkType);
    cy.get('#milk-storage').should('have.value', storageType);
    cy.get('#express-date').should('have.value', expressDate);
    cy.get('#expiry-date').should('have.value', expiryDate);

    cy.get("button[name='preview-sticker']").click();
    cy.get("button[name='confirm-and-print']").click();
    cy.get('button[name="return-home"]').click();

    cy.get('.expand-btn').first().click();
    cy.get('.dlt-btn').first().click();
    cy.get('#milk-removal-reason').select('other');
    cy.get('#removal-notes').type('the baby pooped');
    cy.get('#confirm-dlt-milk-btn').click();

    cy.get('.modal-title').should('not.exist');
  });
});
