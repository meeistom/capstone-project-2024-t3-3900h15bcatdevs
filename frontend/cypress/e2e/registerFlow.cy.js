const url = 'http://localhost:3000/';

describe('register flow', () => {
  beforeEach(() => {
    cy.visit(`${url}register`);
  });

  it('should be able to select one or more register options', () => {
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('#toggle-check-mom').should('be.checked');

    cy.get('#start-rgstr-btn').click();
    cy.get('#back-btn').click();

    cy.get('label[for="toggle-check-baby"]').click();
    cy.get('#toggle-check-baby').should('be.checked');

    cy.get('#start-rgstr-btn').click();
  });

  it('should not start registration if no options are picked', () => {
    cy.get('#start-rgstr-btn').should('be.disabled');

    const titleMessage = 'What would you like to register?';
    cy.get('.title').should('contain', titleMessage);
  });

  it('should not proceed to the next step if not all mandatory inputs are filled', () => {
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('#next-btn').should('be.disabled');

    const titleMessage = 'Mother Details';
    cy.get('.title').should('contain', titleMessage);

    cy.get('input[name="mom-mrn"]').type('1234');
    cy.get('#next-btn').should('be.disabled');

    cy.get('.title').should('contain', titleMessage);
  });

  it('should not allow non-numeric input into the MRN input', () => {
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').type('hello there');
    cy.get('input[name="mom-mrn"]').should('have.value', '');

    cy.visit(`${url}register`);
    cy.get('label[for="toggle-check-baby"]').click();
    cy.get('#toggle-check-baby').should('be.checked');

    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="baby-mrn"]').type('hello there');
    cy.get('input[name="baby-mrn"]').should('have.value', '');
  });

  it('should show confirmed details after filling out forms', () => {
    // Only mom form completed
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').type('1234');
    cy.get('input[name="mom-fname"]').type('Your');
    cy.get('input[name="mom-lname"]').type('Mom');

    cy.get('#next-btn').click();

    const titleMessage = 'Confirm Details';
    cy.get('.title').should('contain', titleMessage);
    cy.get('.body').should('contain', 'Mother Details');
    cy.get('.body').should('contain', 'Your');
    cy.get('.body').should('contain', 'Mom');

    cy.get('.body').should('not.contain', 'Baby Details');
    cy.get('.body').should('not.contain', 'Milk Details');

    // All forms completed
    cy.visit(`${url}register`);
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('label[for="toggle-check-baby"]').click();
    cy.get('label[for="toggle-check-milk"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').type('1234');
    cy.get('input[name="mom-fname"]').type('Your');
    cy.get('input[name="mom-lname"]').type('Mom');

    cy.get('#next-btn').click();

    cy.get('input[name="baby-mrn"]').type('4321');
    cy.get('input[name="baby-fname"]').type('My');
    cy.get('input[name="baby-lname"]').type('baby');

    cy.get('#next-btn').click();

    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-11-01T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);

    cy.get('#next-btn').click();

    cy.get('.title').should('contain', titleMessage);
    cy.get('.body').should('contain', 'Mother Details');
    cy.get('.body').should('contain', 'Baby Details');
    cy.get('.body').should('contain', 'Milk Details');
  });

  it('should be able to navigate to a previous form with previous filled in data autofilled', () => {
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('label[for="toggle-check-baby"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').type('1234');
    cy.get('input[name="mom-fname"]').type('Your');
    cy.get('input[name="mom-lname"]').type('Mom');

    cy.get('#next-btn').click();
    cy.get('#back-btn').click();

    cy.get('input[name="mom-mrn"]').should('have.value', '1234');
    cy.get('input[name="mom-fname"]').should('have.value', 'Your');
    cy.get('input[name="mom-lname"]').should('have.value', 'Mom');
  });

  it('should allow user to change options but have prefilled data to be autofilled', () => {
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').type('1234');
    cy.get('input[name="mom-fname"]').type('Your');
    cy.get('input[name="mom-lname"]').type('Mom');

    cy.get('#next-btn').click();
    cy.get('#back-btn').click();
    cy.get('#back-btn').click();

    cy.get('label[for="toggle-check-baby"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').should('have.value', '1234');
    cy.get('input[name="mom-fname"]').should('have.value', 'Your');
    cy.get('input[name="mom-lname"]').should('have.value', 'Mom');
  });

  it('should be able to preview label after form completion', () => {
    cy.get('label[for="toggle-check-milk"]').click();
    cy.get('#start-rgstr-btn').click();

    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-11-01T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';
    const babyMRN = '5049';

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);
    cy.get('#baby-mrn').type(babyMRN);

    cy.get('#next-btn').click();
    cy.get('#next-btn').click();

    cy.get('.body').find('img').should('exist');
  });

  it('should be able to print the generated label', () => {
    cy.get('label[for="toggle-check-milk"]').click();
    cy.get('#start-rgstr-btn').click();

    const expressDate = '2024-10-31T14:30';
    const expiryDate = '2024-11-01T14:30';
    const milkType = 'pdhm';
    const storageType = 'fresh';
    const babyMRN = '5049';

    cy.get('#milk-type').select(milkType);
    cy.get('#milk-storage').select(storageType);
    cy.get('#express-date').type(expressDate);
    cy.get('#expiry-date').type(expiryDate);
    cy.get('#baby-mrn').type(babyMRN);

    cy.get('#next-btn').click();
    cy.get('#next-btn').click();

    cy.get('button[name="rgstr-print-label"]').click();
  });

  it('should not show a label preview if milk was not selected as an option', () => {
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').type('1234');
    cy.get('input[name="mom-fname"]').type('Your');
    cy.get('input[name="mom-lname"]').type('Mom');

    cy.get('#next-btn').click();
    cy.get('#next-btn').click();

    const bodyMessage =
      'Registration has been successfully completed. You may return to the home page now.';
    cy.get('.body').find('img').should('not.exist');
    cy.get('.body').should('contain', bodyMessage);
  });

  it('should include a mom mrn field in baby form if mom was not selected', () => {
    cy.get('label[for="toggle-check-baby"]').click();
    cy.get('#start-rgstr-btn').click();
    cy.get('input[name="mom-mrn"]').should('exist');
  });

  it('should let the user return home after registering', () => {
    cy.get('label[for="toggle-check-mom"]').click();
    cy.get('#start-rgstr-btn').click();

    cy.get('input[name="mom-mrn"]').type('1234');
    cy.get('input[name="mom-fname"]').type('Your');
    cy.get('input[name="mom-lname"]').type('Mom');

    cy.get('#next-btn').click();
    cy.get('#next-btn').click();

    cy.get('button[name="return-home"]').click();
    cy.url().should('include', url);
  });
});
