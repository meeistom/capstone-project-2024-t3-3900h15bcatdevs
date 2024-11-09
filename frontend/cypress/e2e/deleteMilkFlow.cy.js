const url = "http://localhost:3000/";

describe("delete milk flow", () => {
  beforeEach(() => {
    cy.intercept("/home").as("home");
    cy.intercept("/notifications").as("notifications");
    cy.visit(url);
    cy.wait(["@home", "@notifications"]);
  });

  it("should open the delete milk modal when delete button pressed", () => {});
});
// pressing on delete button opens delete modal
// milk id, baby and mom name is visible
// reason dropdown is visible
// can pick different reason options
// default option shuold be expired
// if other picked, notes should appear and delete button is disabled
// should be able to delete milk entry
// if other is picked, should be able to delete milk entry
