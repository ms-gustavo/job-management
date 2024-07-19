beforeEach(() => {
  cy.visit("/");
});

describe("Job Functions", () => {
  it("should render new job register form ", () => {
    cy.loginUser();
    cy.checkRegisterNewJobForm();
  });

  it("should register a new job", () => {
    cy.loginUser();
    cy.registerNewJob();
  });

  it("should render job list with a job", () => {
    cy.loginUser();
    cy.checkNewJob();
  });

  it("should edit a job status", () => {
    cy.loginUser();
    cy.editJobStatus();
  });

  it("should remove a job", () => {
    cy.loginUser();
    cy.removeJob();
  });
});
