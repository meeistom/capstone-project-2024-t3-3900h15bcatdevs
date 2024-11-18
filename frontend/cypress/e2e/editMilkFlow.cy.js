const url = 'http://localhost:3000/';
const newExpressedTime = '2024-11-15T10:00';
const newExpirationTime = '2024-11-20T10:00';
const newMilkType = 'HMF';
const newAdditiveType = 'Beneprotein';
const newStorageType = 'defrost';
const newStorageLocation = 'New Room';
const newNotes = 'Updated notes for testing.';

describe('edit milk entry', () => {
  beforeEach(() => {
    cy.visit(url);
    cy.intercept('POST', '**/edit?milk_uid=*', { statusCode: 200 }).as('editMilkEntry');
  });

  it('opens each patient and displays complete milk entry details', () => {
    cy.get('.expand-btn').first().click();
    cy.get('table table tr').find('td').first().click();

    cy.get('.title.fs-2.text-center').should('contain', `Milk ID #`);

    cy.contains('Created at').should('exist'); // Verify "Patient Details" section
    cy.contains('Patient Details')
      .parent()
      .within(() => {
        cy.get('.col').contains('Baby name:');
        cy.get('.col').contains('Baby MRN:');
        cy.get('.col').eq(1).should('not.be.empty'); // Baby Name
        cy.get('.col').eq(3).should('not.be.empty'); // Baby MRN
      });

    // Verify "Milk Details" section
    cy.contains('Milk Details')
      .parent()
      .within(() => {
        cy.get('.col').contains('Expressed time').should('exist');
        cy.get('.col').contains('Expiration time').should('exist');
        cy.contains('Milk Type').should('exist');
        cy.contains('Additive Type').should('exist');
        cy.contains('Storage Type').should('exist');
        cy.contains('Storage Location').should('exist');
      });

    // Verify "Additional Notes" section
    cy.get('.container.text-start')
      .last()
      .within(() => {
        cy.contains('Additional Notes').should('exist');
        cy.get('textarea').should('exist');
      });

    // Start edit mode by clicking the "Edit" button
    cy.get('.modal-container').scrollTo('bottom');
    cy.get('#edit-btn').click();

    // Verfies Edit Milk Entry Mode
    cy.get('.title.fs-2.text-center').should('contain', `Edit Milk Entry`);

    // Modify some fields in edit mode
    cy.get('input[type="datetime-local"]').first().clear().type(newExpressedTime); // New Expressed time
    cy.get('input[type="datetime-local"]').eq(1).clear().type(newExpirationTime); // New Expiration time
    cy.get('select').eq(0).select(newMilkType); // Milk Type

    cy.get('.col')
      .contains('Storage Location')
      .next()
      .find('input')
      .clear()
      .type(newStorageLocation);
    cy.get('textarea').clear().type(newNotes);

    cy.get('.modal-container').scrollTo('bottom');
    cy.get('#save-btn').click();

    cy.wait('@editMilkEntry').its('response.statusCode').should('eq', 200);

    // Verify the changes were saved
    cy.contains('Milk Details')
      .parent()
      .within(() => {
        cy.get('input[type="datetime-local"]').first().should('have.value', newExpressedTime);
        cy.get('input[type="datetime-local"]').eq(1).should('have.value', newExpirationTime);
        cy.get('select').eq(0).should('have.value', newMilkType);
        cy.get('.col').contains('Storage Location').next().should('contain', newStorageLocation);
      });

    cy.get('.container.text-start')
      .last()
      .within(() => {
        cy.get('textarea').should('have.value', newNotes);
      });

    cy.get('#close-modal').within(() => {
      cy.contains('Close').click();
    });

    cy.get('.modal').should('not.exist');
  });
});
