const runNumber = Math.floor(Math.random() * 10000000000000);
const url = "http://localhost:3000";
describe("basic test", () => {
  it("creates heard", () => {
    cy.visit(url + "/signup");
    cy.get("#name").type("test user");
    cy.get("#email").type(`test-${runNumber}@cypress.io`);
    cy.get("#password").type("password");
    cy.get("form").submit();
    cy.url().should("contain", "/heards");

    cy.visit(url + "/heards/new");
    cy.get("#topic").type("test topic");
    cy.get("#question-1").type("What is your favourite colour?");
    cy.get("#chatiness-2").click();
    cy.get("#collect-names-checkbox").check();
    cy.get("button[type=submit]").click();

    cy.url().should("contain", "/create-success");
    cy.get("#heard-share-link")
      .invoke("val")
      .then((shareLink) => {
        cy.visit(shareLink);
      });

    cy.url().should("contain", "/welcome");
    cy.get("#welcome-continue-btn").click();

    cy.url().should("contain", "/details");
    cy.get("#name").type("test user");
    cy.get("#start-chat-btn").click();

    cy.contains("What is your favourite colour?", { timeout: 30000 }).should(
      "exist"
    );
    cy.get("#chat-input").type("Green");
    cy.get("#chat-send-btn").click();
  });
});
