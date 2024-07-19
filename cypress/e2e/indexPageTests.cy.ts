beforeEach(() => {
  cy.visit("/");
});

describe("Index Page Tests", () => {
  it("should render index page with login form", () => {
    cy.visitIndexPage();
    cy.verifyLoginForm();
  });

  it("should change the form to register after click in register button", () => {
    cy.verifyLoginForm();
    cy.switchToRegisterForm();
    cy.verifyRegisterForm();
  });

  it("should change the theme when click in Theme Toggle button", () => {
    cy.changeTheme();
  });
});
