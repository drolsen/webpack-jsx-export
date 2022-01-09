/**
  Container is all purpose element that acts as a general parent container for other elements.
  The container element also comes with a large number of layout control form Flex to CSS grids.
*/

import {
  Using,
  Inherit,
  Model,
  Call,
  Code,
  Helper,
  Html,
  If,
  Else
} from '../elements/Razor.jsx';
import Container from '../elements/Container.jsx';

export default (
  <Container>
    <Container>Hello world!</Container>
    <Model path="Sitecore.Project.Thing" />

    <button>
      <Model use="Things.Button.RawValue" />
    </button>
  </Container>
);
