describe('posting a review test', () => {
  it('should add review', () => {
    const randomName = crypto.randomUUID();
    const randomReview = crypto.randomUUID();

    cy.visit('/');
    cy.get('.card__button').first().click();
    cy.url().should('include', '/detail');
    cy.get('input#name').type(randomName);
    cy.get('textarea#review').type(randomReview);
    cy.get('button.submit-btn').click();
    cy.get('.swal-button').click();
    cy.get('.comment-section').last().contains('.comment-section__header__name', randomName);
    cy.get('.comment-section').last().contains('.comment-section__review', randomReview);
  });
});
