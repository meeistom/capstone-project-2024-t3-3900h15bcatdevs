const url = "http://localhost:3000/";

describe("user add milk bottle happy path", () => {
  it("can access backend", () => {
    cy.visit("http://127.0.0.1:5001");
  });

  it("should navigate to the home page successfully", () => {
    cy.visit(url);
    cy.url().should("include", url);
  });

  it("should be able to open add milk modal", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();
    cy.get("#add-milk-modal").should("be.visible");
  });

  it("should be able to close milk modal", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();
    cy.get('button[name="close-modal"]').click();
    cy.get("#add-milk-modal").should("not.exist");
  });

  it("should have the barcode input automatically focused", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();
    cy.get('input[name="scanner-input"]').should("have.focus");
  });

  it("should be able to enter barcode details", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();

    const validMRN = "5049";
    cy.get('input[name="scanner-input"]').type(validMRN);
    cy.get('input[name="scanner-input"]').should("have.value", validMRN);

    cy.wait(500);

    cy.get('form[name="add-milk-form"]').should("be.visible");
  });

  it("should not progress to the add milk form if the MRN is invalid", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();

    const invalidMRN = "0000";
    cy.get('input[name="scanner-input"]').type(invalidMRN);

    cy.get('form[name="add-milk-form"]').should("not.exist");
  });

  it("should be able to fill in milk details", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();

    const validMRN = "5049";
    cy.get('input[name="scanner-input"]').type(validMRN);

    cy.wait(300);

    const expressDate = "2024-10-31T14:30";
    const expiryDate = "2024-12-31T14:30";
    const milkType = "pdhm";
    const storageType = "fridge";

    cy.get("#milk-type").select(milkType);
    cy.get("#milk-storage").select(storageType);
    cy.get("#express-date").type(expressDate);
    cy.get("#expiry-date").type(expiryDate);

    cy.get("#milk-type").should("have.value", milkType);
    cy.get("#milk-storage").should("have.value", storageType);
    cy.get("#express-date").should("have.value", expressDate);
    cy.get("#expiry-date").should("have.value", expiryDate);

    cy.get("button[name='preview-sticker']").click();

    cy.get('img[alt="sticker"]').should("exist");
  });

  it("should not submit form if not all fields are valid", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();

    const validMRN = "5049";
    cy.get('input[name="scanner-input"]').type(validMRN);

    cy.wait(300);

    cy.get("button[name='preview-sticker']").click();

    cy.get('img[alt="sticker"]').should("not.exist");
  });

  it("should have a confirmation page of the milk submission", () => {
    cy.visit(url);
    cy.get('button[name="scan-btn"]').click();

    const validMRN = "5049";
    cy.get('input[name="scanner-input"]').type(validMRN);

    cy.wait(300);

    const expressDate = "2024-10-31T14:30";
    const expiryDate = "2024-12-31T14:30";
    const milkType = "pdhm";
    const storageType = "fridge";

    cy.get("#milk-type").select(milkType);
    cy.get("#milk-storage").select(storageType);
    cy.get("#express-date").type(expressDate);
    cy.get("#expiry-date").type(expiryDate);

    cy.get("#milk-type").should("have.value", milkType);
    cy.get("#milk-storage").should("have.value", storageType);
    cy.get("#express-date").should("have.value", expressDate);
    cy.get("#expiry-date").should("have.value", expiryDate);

    cy.get("button[name='preview-sticker']").click();
    cy.get('img[alt="sticker"]').should("exist");

    cy.get("button[name='confirm-and-print']").click();
    cy.get('img[alt="Confirmation Icon"]').should("exist");

    cy.get('button[name="return-home"]').click();
    cy.url().should("include", url);
  });
});
