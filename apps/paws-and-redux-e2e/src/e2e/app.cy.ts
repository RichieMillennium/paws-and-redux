import * as pnr from '../support/app.po';

const ALL_BREEDS_ENDPOINT = 'https://dog.ceo/api/breeds/list/all';

describe('paws-and-redux-e2e', () => {
  let breedKeys: string[] = [];
  beforeEach(() => {
    cy.intercept('GET', ALL_BREEDS_ENDPOINT, req => {
      req.alias = 'allbreeds';
    });
    cy.visit('/')
  });

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    pnr.getGreeting().contains(/Paws and Reflect/);
  });

  it('should load breeds on init', () => {
    cy.wait('@allbreeds', { timeout: 10000 }).then(({ response }) => {
      breedKeys = Object.keys(response.body.message);
      expect(breedKeys.length).to.be.gt(0);
    });
  });

  it('should have 2 toggles', () => {
    pnr.getGalleryToggle().should('exist');
    pnr.getPictureBookToggle().should('exist');
  });

  it('should initially show gallery view', () => {
    pnr.getGalleryToggle().should('exist');
  });

  it('should have cards in the gallery', () => {
    pnr.getGalleryCard().should('have.length.greaterThan', 0);
  });

  it('should have breed info in the gallery card', () => {
    pnr.getGalleryCard().first().contains(breedKeys[0]);
  });

  it('should switch to picture book view', () => {
    pnr.getPictureBookToggle().should('exist').click();
    pnr.getPictureBookView().should('exist');
  });

  it('should have dog tags in the picture book view', () => {
    pnr.getPictureBookToggle().should('exist').click();
    pnr.getDogTags().should('exist');
  })
});
