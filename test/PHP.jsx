/**
  Container is all purpose element that acts as a general parent container for other elements.
  The container element also comes with a large number of layout control form Flex to CSS grids.
*/

import Container from './elements/Container.jsx';

export default (
  <Container>
    <Container>Hello world!</Container>
    <export>
      <Container>I will be unwrapped and exported</Container>
    </export>
    
    <no-export>
      <Container>I should not be exported!!</Container>
    </no-export>
  </Container>
);
