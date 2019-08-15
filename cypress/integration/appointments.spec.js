describe("Appointment", () => {
  beforeEach(() => {
    cy.request("POST", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    cy.contains("li", "Monday").click();
    cy.get("[alt=Add]")
      .first()
      .click()
      .get("input")
      .type("Lydia Miller-Jones")
      .get("[alt='Sylvia Palmer']")
      .click();
    cy.contains("Save").click();
    cy.contains("Saving").should("exist");
    cy.contains("Saving").should("not.exist");
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .click({ force: true })
      .get("input")
      .clear()
      .type("John")
      .get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "John");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Add]").click();
    cy.contains("Cancel")
      .click()
      .get("[alt=Add]")
      .should("exist");
  });
  it("should delete an interview", () => {
    cy.get("[alt=Delete]").click({ force: true });

    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.get(".appointment__card appointment__card--show").should("not.exist");
  });
});
