import likeButtonCyFunc from "./helpers/likeButtonCyFunc";

describe('like button functionality testing', () => {
  it('should visit homepage', () => {
    cy.visit('/')
    cy.contains('Eat');
  });

  it('should go into detail page', () => {
    cy.visit('/');
    cy.get('.card__button').first().click();
    cy.url().should('include', '/detail');
  });

  it('should add favourite restaurant and able to unlike', () => {
    likeButtonCyFunc();
    cy.get('.favourite-page').children().get('.card__button').click();
    cy.get('#favouriteBtn[data-isfav="1"]').click();
    cy.get('.nav__menu-btn').click();
    cy.get('[href="/favourite"]').click();
    cy.url().should('include', '/favourite');
    cy.contains('Nothing here');
  });
});