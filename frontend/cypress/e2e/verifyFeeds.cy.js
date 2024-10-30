const url = "http://localhost:3000/";
const babyBarcode = "5396615573912";
const milkBarcode = "1234567890128";
const invalidBarcode = "9999999999999";
const mismatchedMilkBarcode = "9876543210982";

describe("verify feeds flow", () => {
  beforeEach(() => {
    cy.visit(`${url}verify_feed`);
  });

  it("should have the inputs auto-focused", () => {
    cy.get("#scanner-input").should("have.focus");
    cy.get("#scanner-input").type(babyBarcode);
    cy.get("#scanner-input").should("have.focus");
  });

  it("should verify a feed successfully", () => {
    cy.get("#scanner-input").type(babyBarcode);
    cy.get("#scanner-input").type(milkBarcode);

    const subtitleMessage = "Verification Complete!";
    cy.get(".subtitle").should("contain", subtitleMessage);
  });

  it("should not matter if the baby or the bottle barcode is entered first", () => {
    cy.get("#scanner-input").type(milkBarcode);
    cy.get("#scanner-input").type(babyBarcode);

    const subtitleMessage = "Verification Complete!";
    cy.get(".subtitle").should("contain", subtitleMessage);
  });

  it("should give an error if the barcode entered is invalid", () => {
    cy.get("#scanner-input").type(invalidBarcode);

    cy.get("#verify-alert").should("be.visible");
  });

  it("should be able to close the error popup and continue scanning", () => {
    cy.get("#scanner-input").type(invalidBarcode);
    cy.get('button[name="close-alert"]').click();
    cy.get("#verify-alert").should("not.be.visible");
  });

  it("should give an error if the bottle and baby do not match", () => {
    cy.get("#scanner-input").type(babyBarcode);
    cy.get("#scanner-input").type(mismatchedMilkBarcode);

    cy.get("#verify-alert").should("be.visible");
  });

  it("should be able to return home after sucessful feed verification", () => {
    cy.get("#scanner-input").type(babyBarcode);
    cy.get("#scanner-input").type(milkBarcode);
    cy.get('button[name="return-home"]').click();
    cy.url().should("include", url);
  });
});
