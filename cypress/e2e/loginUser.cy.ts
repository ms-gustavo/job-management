beforeEach(() => {
  cy.visit("/");
});

describe("Login user", () => {
  it("should login user with pre-existent email and password", () => {
    cy.loginUser();
  });
});
