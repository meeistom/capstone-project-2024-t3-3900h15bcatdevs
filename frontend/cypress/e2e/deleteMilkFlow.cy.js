describe("delete milk flow", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});
// pressing on delete button opens delete modal
// milk id, baby and mom name is visible
// reason dropdown is visible
// can pick different reason options
// default option shuold be expired
// if other picked, notes should appear and delete button is disabled
// should be able to delete milk entry
// if other is picked, should be able to delete milk entry
