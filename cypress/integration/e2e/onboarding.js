/// <reference types="cypress" />

const file = "casablanca.tif";
const fileInput = ".file";

let timestamp = Math.floor(Date.now() / 1000);
const user = {
  username: `testy+${timestamp}`,
  email: `${timestamp}@test.test`,
  password: "password123",
  age: "23",
  bio: "Lorem ipsum dolor sit amet, consectetur.",
  gender: "Female",
  phone: "(123)-456-7890",
  interests: ["cooking", "photo", "dancing", "blogging"],
};

context("Onboarding E2E", () => {
  beforeEach(() => {
    cy.clearCookies().clearLocalStorage();
    cy.visit("/signup");
  });

  it("able to register", () => {
    cy.url().should("include", "/signup");
    cy.get("#username").type(user.username, { delay: 150 });
    cy.get("#email").type(user.email, { delay: 150 });
    cy.get("#psw").type(user.password, { delay: 150 });
    cy.get("#submit").click();

    cy.url().should("include", "/profile/questionnaire");
    cy.get("#age").type(user.age);
    cy.get("#bio").type(user.bio, { delay: 150 });
    cy.contains(user.gender).click();
    cy.get("#phone").type(user.phone);
    cy.get(".nextbtn").click();

    cy.url().should("include", "/profile/more-info");
    cy.intercept("POST", "/api/upload", {
      statusCode: 200,
    }).as("upload");
    cy.fixture(file).then((fileContent) => {
      cy.get('input[type="file"]')
        .attachFile({
          fileContent: fileContent.toString(),
          fileName: file,
          mimeType: "image/tiff",
        })
        .then(() => {
          cy.get("[name='submit']").click();
          cy.wait("@upload");
        });
    });
    user.interests.map((interest) => {
      cy.contains(interest).click();
    });
    cy.contains("Finish Profile").click();

    cy.url().should("include", "/dashboard");
    cy.contains(user.username);
    cy.contains(user.age);
    cy.contains(user.gender);
    cy.contains(user.phone);
    cy.contains(user.bio);
    user.interests.map((interest) => {
      cy.contains(interest);
    });
  });
});
