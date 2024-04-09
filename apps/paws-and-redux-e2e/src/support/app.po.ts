export const getGreeting = () => cy.get('h1');

export const getGalleryToggle = () =>
  cy.get('[data-test="gallery-toggle"]');

export const getPictureBookToggle = () =>
  cy.get('[data-test="picture-book-toggle"]');

export const getGalleryView = () =>
  cy.get('[data-test="gallery-view"]');

export const getPictureBookView = () =>
  cy.get('[data-test="picture-book-view"]');

export const getGalleryCard = () =>
  cy.get('[data-test="gallery-card"]');

export const getDogTags = () =>
  cy.get('[data-test="dog-tags"]');
