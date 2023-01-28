import React from 'react';
import GlowButton from './GlowButton';

describe('<GlowButton />', () => {
  it('renders', () => {
    cy.mount(<GlowButton>Hello</GlowButton>);
  });

  it('renders children', () => {
    cy.mount(<GlowButton>Hello</GlowButton>);
    cy.get('button').contains('Hello');
  });

  it('triggers the onClick callback', () => {
    const handleClick = cy.spy().as('handleClick');
    cy.mount(<GlowButton onClick={handleClick}>Test</GlowButton>);

    cy.get('button').click();
    cy.get('@handleClick').should('have.been.calledOnce');
  });
});
