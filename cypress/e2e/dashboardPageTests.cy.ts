beforeEach(() => {
  cy.visit("/");
});

describe("Dashboard Page Tests", () => {
  it("should render dashboard with initial values", () => {
    cy.loginUser();
    cy.checkDashboard();
  });
});
