/// <reference types="cypress" />

function generateRandomName() {
  const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `cypress${randomString}@test.com`;
}

function generateRandomPassword() {
  return Math.random().toString(36).slice(-10);
}

Cypress.Commands.add("visitIndexPage", () => {
  cy.get("#theme-toggle-button").should("exist");
  cy.get("#welcome-component")
    .should("exist")
    .within(() => {
      cy.get("#welcome-header-text").should("contain.text", "Bem-vindo");
      cy.get("#welcome-body-text").should(
        "contain.text",
        "Essa ferramenta simplifica"
      );
    });
  cy.get("#login-form").should("exist");
});

Cypress.Commands.add("verifyLoginForm", () => {
  cy.get("#login-form")
    .should("exist")
    .within(() => {
      cy.get("#login-form-header").should("contain.text", "Login");
      cy.get("#email-label").should("contain.text", "Email");
      cy.get("#email").should("exist");
      cy.get("#password-label").should("contain.text", "Senha");
      cy.get("#password").should("exist");
      cy.get("#login-button").should("contain.text", "Entrar");
      cy.get("#login-form-footer").should("contain.text", "Não tem cadastro?");
      cy.get("#redirect-to-register").should("contain.text", "Registre-se");
    });
});

Cypress.Commands.add("verifyRegisterForm", () => {
  cy.get("#register-form")
    .should("exist")
    .within(() => {
      cy.get("#register-form-header").should("contain.text", "Registre-se");
      cy.get("#name-label").should("contain.text", "Nome");
      cy.get("#name").should("exist");
      cy.get("#email-label").should("contain.text", "Email");
      cy.get("#email").should("exist");
      cy.get("#password-label").should("contain.text", "Senha");
      cy.get("#password").should("exist");
      cy.get("#register-button").should("contain.text", "Registrar");
      cy.get("#register-form-footer").should(
        "contain.text",
        "Já tem cadastro?"
      );
      cy.get("#redirect-to-login").should("contain.text", "Faça o login");
    });
});

Cypress.Commands.add("switchToRegisterForm", () => {
  cy.get("#redirect-to-register").should("exist").click();
});

Cypress.Commands.add("changeTheme", () => {
  cy.get("#dark-theme-button").should("exist").click();
  cy.get("html").should("have.class", "dark");
});

Cypress.Commands.add("registerNewUser", () => {
  const name = generateRandomName();
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  cy.switchToRegisterForm();
  cy.get("#name").type(name);
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#register-button").click();
  cy.get('div[role="status"]')
    .should("be.visible")
    .and("contain.text", "Usuário criado, aguarde redirecionamento");
});

Cypress.Commands.add("loginUser", () => {
  cy.get("#login-form").should("exist");
  cy.get("#email").type("cypress@test.com");
  cy.get("#password").type("cypresstest");
  cy.get("#login-button").click();
  cy.get('div[role="status"]')
    .should("be.visible")
    .and("contain.text", "Logado com sucesso!");
  cy.isDashboard();
});

Cypress.Commands.add("isDashboard", () => {
  cy.url().should("include", "/dashboard");
});

Cypress.Commands.add("checkDashboard", () => {
  cy.isDashboard();
  cy.get("#welcome-user-container")
    .should("exist")
    .within(() => {
      cy.get("#welcome-user-h1").should(
        "contain.text",
        "Bem vindo, Cypress Test"
      );
      cy.get("#welcome-user-p").should(
        "contain.text",
        "Você tem 0 vagas cadastradas. O que deseja fazer hoje?"
      );
    });
  cy.get("#user-actions-container")
    .should("exist")
    .within(() => {
      cy.get("#register-new-job").should("contain.text", "Registrar Nova Vaga");
      cy.get("#list-all-jobs").should("contain.text", "Listar Vagas");
      cy.get("#logout").should("contain.text", "Logout");
    });

  cy.get("#job-containers")
    .should("exist")
    .within(() => {
      cy.checkJobListWithoutJob();
    });
});

Cypress.Commands.add("checkJobListWithoutJob", () => {
  cy.get("#no-job-registered").should(
    "contain.text",
    "Não há vagas cadastradas"
  );
});

Cypress.Commands.add("checkRegisterNewJobForm", () => {
  cy.get("#register-new-job").click();
  cy.get("#new-job-form")
    .should("exist")
    .within(() => {
      cy.get("#title-label").should("contain.text", "Título da Vaga");
      cy.get("#title").should("exist");
      cy.get("#company-label").should("contain.text", "Empresa");
      cy.get("#company").should("exist");
      cy.get("#status-label").should("contain.text", "Status da Vaga");
      cy.get("#status").should("exist");
      cy.get("#application-label").should("contain.text", "Data de Aplicação");
      cy.get("#appliedAt").should("exist");
      cy.get("#site-label").should("contain.text", "Site da Vaga");
      cy.get("#site").should("exist");
      cy.get("#new-job-button").should("contain.text", "Registrar Vaga");
    });
});

Cypress.Commands.add("registerNewJob", () => {
  cy.get("#register-new-job").click();
  cy.get("#new-job-form").should("exist");
  cy.get("#title").type("Cypress Job Test");
  cy.get("#company").type("Cypress Company Job Test");
  cy.get("#status").select("Análise");
  cy.get("#appliedAt").type("2024-07-19").should("have.value", "2024-07-19");
  cy.get("#site").type("Cypress Site Test");
  cy.get("#new-job-button").click();
  cy.get('div[role="status"]')
    .should("be.visible")
    .and("contain.text", "Aplicação criada com sucesso!");
});

Cypress.Commands.add("checkNewJob", () => {
  cy.get("#sort-jobs-container")
    .should("exist")
    .within(() => {
      cy.get("#order-by-status-button").should(
        "contain.text",
        "Ordenar por Status"
      );
      cy.get("#order-by-date-button").should(
        "contain.text",
        "Ordenar por Data de Aplicação"
      );
    });
  cy.get("#new-job-container")
    .should("exist")
    .within(() => {
      cy.get("#new-job-0").should("exist");
      cy.get("#new-job-title-0").should("contain.text", "Cypress Job Test");
      cy.get("#new-job-company-0").should(
        "contain.text",
        "Cypress Company Job Test"
      );
      cy.get("#new-job-select-container-0").should("exist");
      cy.get("#new-job-status-0").should("contain.text", "Análise");
      cy.get("#new-job-application-0").should("contain.text", "18/07/2024");
      cy.get("#new-job-site-0").should("contain.text", "Cypress Site Test");
      cy.get("#new-job-remove-button-0").should("contain.text", "Excluir");
    });
});

Cypress.Commands.add("editJobStatus", () => {
  cy.get("#new-job-pencil-icon-0").click();
  cy.get("#editing-job-status-0").select("Aprovado");
  cy.get("body").click(0, 0);
  cy.get("#new-job-status-0").should("contain.text", "Aprovado");
});

Cypress.Commands.add("removeJob", () => {
  cy.get("#new-job-remove-button-0").click();
  cy.get('div[role="status"]')
    .should("be.visible")
    .and("contain.text", "Vaga excluída com sucesso!");
});

Cypress.Commands.add("logout", () => {
  cy.get("#logout").click();
  cy.get('div[role="status"]')
    .should("be.visible")
    .and("contain.text", "Você foi deslogado com sucesso!");
  cy.url().should("include", "/");
});
