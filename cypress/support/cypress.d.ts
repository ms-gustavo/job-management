/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    visitIndexPage(): Chainable<Subject>;
    verifyLoginForm(): Chainable<Subject>;
    verifyRegisterForm(): Chainable<Subject>;
    switchToRegisterForm(): Chainable<Subject>;
    changeTheme(): Chainable<Subject>;
    registerNewUser(): Chainable<Subject>;
    isDashboard(): Chainable<Subject>;
    loginUser(): Chainable<Subject>;
    checkDashboard(): Chainable<Subject>;
    checkJobListWithoutJob(): Chainable<Subject>;
    registerNewJob(): Chainable<Subject>;
    checkRegisterNewJobForm(): Chainable<Subject>;
    checkNewJob(): Chainable<Subject>;
    editJobStatus(): Chainable<Subject>;
    removeJob(): Chainable<Subject>;
    logout(): Chainable<Subject>;
    filterJobByName(): Chainable<Subject>;
  }
}
