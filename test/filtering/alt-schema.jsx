/**
  Container is all purpose element that acts as a general parent container for other elements.
  The container element also comes with a large number of layout control form Flex to CSS grids.
*/

import Container from '../elements/container.jsx';

export default {
  name: 'alt-schema',
  custom: {
    location: {
      source: (
        <Container>
          <Container>Hello world!</Container>
        </Container>
      )
    }
  }
};
