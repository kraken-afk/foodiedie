export default function likeButtonCyFunc() {
  cy.visit('/');
  cy.get('.card__button').first().click();
  cy.url().should('include', '/detail');
  cy.get('.detail__header__description > h1').then(($h1) => {
    const title = $h1.text();
    cy.get('#favouriteBtn[data-isfav="0"]').click();
    cy.get('.nav__menu-btn').click();
    cy.get('[href="/favourite"]').click();
    cy.url().should('include', '/favourite');
    cy.get('.card').contains(title);
  });
};