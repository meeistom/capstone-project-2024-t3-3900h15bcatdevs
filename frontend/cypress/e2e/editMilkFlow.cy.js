const url = "http://localhost:3000/";

describe("edit milk entry", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.intercept("POST", "**/edit?milk_uid=*", { statusCode: 200 }).as("editMilkEntry");
  });

  it("opens each patient and displays complete milk entry details", () => {
    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row)
        .find("td")
        .first()
        .invoke("text")
        .then((patientId) => {

        cy.wrap($row).click();

        // Verify heading of Milk Entry
        cy.get(".title.fs-2.text-center").should("contain", `Milk ID #${patientId.trim()}`);

        cy.get(".container.text-center").within(() => {
          cy.contains("Created at").should("exist");
        });

        // Verify "Patient Details" section
        cy.contains("Patient Details").parent().within(() => {
          cy.get(".col").contains("Baby name:");
          cy.get(".col").contains("Baby MRN:");
          cy.get(".col").eq(1).should("not.be.empty"); // Baby Name
          cy.get(".col").eq(3).should("not.be.empty"); // Baby MRN
        });

        // Verify "Milk Details" section
        cy.contains("Milk Details").parent().within(() => {
          cy.get(".col").contains("Expressed time").should("exist");
          cy.get(".col").contains("Expiration time").should("exist");
          cy.contains("Milk Type").should("exist");
          cy.contains("Additive Type").should("exist");
          cy.contains("Storage Type").should("exist");
          cy.contains("Storage Location").should("exist");
        });

        // Verify "Additional Notes" section
        cy.get(".container.text-start").last().within(() => {
          cy.contains("Additional Notes").should("exist");
          cy.get("textarea").should("exist");
        });

        // Start edit mode by clicking the "Edit" button
        cy.get("#btn-group").within(() => {
          cy.contains("Edit").click();
        });

        // Modify some fields in edit mode
        cy.get('input[type="datetime-local"]').first().clear().type("2024-11-15T10:00"); // New Expressed time
        cy.get('input[type="datetime-local"]').eq(1).clear().type("2024-11-20T10:00"); // New Expiration time
        cy.get("select").eq(0).select("HMF"); // Milk Type
        cy.get("select").eq(1).select("Beneprotein"); // Additive Type
        cy.get("select").eq(2).select("defrost"); // Storage Type
        cy.get(".col").contains("Storage Location").next().find("input").clear().type("New Room");
        cy.get("textarea").clear().type("Updated notes for testing.");

        cy.get("#btn-group").within(() => {
          cy.contains("Save").click();
        });

        cy.wait("@editMilkEntry").its("response.statusCode").should("eq", 200);

        // Verify the changes were saved
        cy.contains("Milk Details").parent().within(() => {
          cy.get('input[type="datetime-local"]').first().should("have.value", "2024-11-15T10:00");
          cy.get('input[type="datetime-local"]').eq(1).should("have.value", "2024-11-20T10:00");
          cy.get("select").eq(0).should("have.value", "HMF");
          cy.get("select").eq(1).should("have.value", "beneprotein");
          cy.get("select").eq(2).should("have.value", "defrost");
          cy.get(".col").contains("Storage Location").next().should("contain", "New Room");
        });

        cy.get(".container.text-start").last().within(() => {
          cy.get("textarea").should("have.value", "Updated notes for testing.");
        });

        cy.get("#btn-group").within(() => {
          cy.contains("Close").click();
        });

        cy.get(".modal").should("not.exist");
      });
    });
  });
});
