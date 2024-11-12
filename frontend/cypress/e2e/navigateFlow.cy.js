const url = "http://localhost:3000/";

describe("navigate pages flow", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("should navigate to the home page sucessfully", () => {
    cy.url().should("include", url);
  });

  it("should navigate to the view mothers page successfully", () => {
    cy.get('[data-testid="nav-mothers"]').click();
    cy.url().should("include", "/view_mothers");
  });

  it("should navigate to the view babies page successfully", () => {
    cy.get('[data-testid="nav-milks"]').click();
    cy.url().should("include", "/view_milks");
  });

  it("should navigate to the register page successfully", () => {
    cy.get('[data-testid="nav-register"]').click();
    cy.url().should("include", "/register");
  });

  it("should navigate to the history page successfully", () => {
    cy.get('[data-testid="nav-history"]').click();
    cy.url().should("include", "/history_log");
  });

  it("should navigate to the verify page successfully", () => {
    cy.get('[data-testid="nav-verify"]').click();
    cy.url().should("include", "/verify_feed");
  });

  it("should navigate to the home page successfully from another page", () => {
    cy.get('[data-testid="nav-verify"]').click();
    cy.get('[data-testid="nav-home"]').click();
    cy.url().should("include", url);

    cy.get('[data-testid="nav-babies"]').click();
    cy.get('[data-testid="nav-mg"]').click();
    cy.url().should("include", url);
  });
});
