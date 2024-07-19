beforeEach(() => {
  cy.visit("/");
});

describe("Register New User", () => {
  it("should register new user and redirect to dashboard", () => {
    cy.registerNewUser();
    cy.isDashboard();
  });
});
