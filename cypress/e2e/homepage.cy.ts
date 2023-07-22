
describe("Загрузка приложения", () => {
  it("Главная страница загружена", () => {
    cy.visit('http://localhost:3000/');
    cy.get('.header').contains('Конструктор');
    cy.get('.mainPanel').contains('Соберите бургер')
    cy.get('.ingredient');
  });
});