import { render } from '@testing-library/react';

import { Button } from './shared-ui';

describe('@paws-and-redux/shared-ui', () => {
  it('Button should render successfully', () => {
    const { baseElement } = render(<Button>Test Button</Button>);
    expect(baseElement).toBeTruthy();
  });
});
