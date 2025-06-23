/**
  Container is all purpose element that acts as a general parent container for other elements.
  The container element also comes with a large number of layout control form Flex to CSS grids.
*/

import Container from '../elements/container.jsx';
import logo from '../../assets/logo.jpg';

export default (
  <Container>
    <Container>Hello world!</Container>
    <img src={logo} alt="this is a logo asset file we have imported as a path" />
  </Container>
);
