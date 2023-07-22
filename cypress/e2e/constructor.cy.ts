const cardSelector = '[class^=card_card]';
const construcorSelector = '[class^=burger-constructor_order__]';

describe("Тест drag and drop и модальных окон в конструкторе", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.viewport(1920, 1080);
    });

    it('Открывается модальное окно при клике на ингредиент', function () {

        cy.get(cardSelector).first().as('ingredient').click();
        cy.get('[class^=modal_]').as('modal');
        cy.get('@modal').find('[class^=modal_btnClose]').click();
    });

    it("Ингредиенты перетаскивается", () => {

        cy.get(cardSelector).contains('булка').first().as('bulk');
        cy.get(cardSelector).contains('Соус').first().as('ingredient');
        cy.get('@bulk').trigger("dragstart");
        cy.get(construcorSelector).trigger("drop");
        cy.get('@ingredient').trigger("dragstart");
        cy.get(construcorSelector).trigger("drop");

    });

    it("Заказ создан", () => {

        cy.get(cardSelector).contains('булка').first().as('bulk');
        cy.get(cardSelector).contains('Соус').first().as('ingredient');
        cy.get('@bulk').trigger("dragstart");
        cy.get(construcorSelector).trigger("drop");
        cy.get('@ingredient').trigger("dragstart");
        cy.get(construcorSelector).trigger("drop");
        cy.get('button').contains('Оформить заказ').click();
        cy.wait(700);
        cy.get('form [type=email]').type('124888@ya.ru');
        cy.get('form [type=password]').type('111111');
        cy.get('form [type=submit]').click();
        cy.get(cardSelector).contains('булка').first().as('bulk');
        cy.get('button').contains('Оформить заказ').click();
        cy.wait(20000);
        cy.get("body").type("{esc}");
    });


})
