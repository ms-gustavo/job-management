beforeEach(() => {
  cy.visit("/");
});

describe("Logout", () => {
  it("should logout user", () => {
    cy.loginUser();
    cy.logout();
  });
});
