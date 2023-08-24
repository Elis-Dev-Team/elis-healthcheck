const runNumber = Math.floor(Math.random() * 10000000000000);
const url = process.env.HEARD_URL || "https://app.heard.elis.io";

Cypress.Commands.overwrite(
  "type",
  (originalFn, subject, text, options = {}) => {
    options.delay = 500;

    return originalFn(subject, text, options);
  }
);

console.log("RUN NUMBER: ", runNumber);

describe("basic test", () => {
  it("creates heard", () => {
    cy.visit("/signup");
    cy.get("#name").type("test user");
    cy.get("#email").type(`test-${runNumber}@cypress.io`);
    cy.get("#password").type("password");
    cy.get("form").submit();
    cy.url().should("contain", "/heards", { timeout: 10000 });

    cy.visit("/heards/new");
    cy.get("#topic").type("test topic");
    cy.get("#question-1").type("What is your favourite colour?");
    cy.get("#add-question").click();
    cy.get("#question-2").type("What is your favourite animal?");
    cy.get("#chatiness-2").click();
    // cy.get("#collect-names-checkbox").check();
    cy.get("button[type=submit]").click();

    cy.url().should("contain", "/create-success", { timeout: 10000 });
    cy.get("#heard-share-link")
      .invoke("val")
      .then((shareLink) => {
        cy.visit(shareLink);
      });

    cy.url().should("contain", "/welcome");
    cy.get("#welcome-continue-btn").click();

    // cy.url().should("contain", "/details");
    // cy.get("#name").type("test user");
    // cy.get("#start-chat-btn").click();

    cy.contains("What is your favourite colour?", { timeout: 30000 }).should(
      "exist"
    );
    cy.get("#chat-input").type("Green");
    cy.get("#chat-send-btn").click();

    cy.get("#chat-message-2", { timeout: 30000 }).should("exist");
    cy.get("#chat-input").type("Green looks like a grass");
    cy.get("#chat-send-btn").click();

    cy.get("#chat-message-4", { timeout: 30000 }).should("exist");
    cy.get("#chat-input").type("It's a cat");
    cy.get("#chat-send-btn").click();

    cy.get("#chat-message-6", { timeout: 30000 }).should("exist");
    cy.get("#chat-input").type("I like that cats say meow");
    cy.get("#chat-send-btn").click();

    cy.get("#chat-message-8", { timeout: 30000 }).should("exist");
  });
});
