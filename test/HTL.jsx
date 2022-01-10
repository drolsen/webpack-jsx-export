/**
  Container is all purpose element that acts as a general parent container for other elements.
  The container element also comes with a large number of layout control form Flex to CSS grids.
*/

import Container from './elements/container.jsx';
import Sly from './elements/sly.jsx';

export default (
  <Container>
    <Container>Hello world!</Container>
    <Sly 
      tagName={Container} 
      text="${properties.jcr:description}"
      list="${page.listChildren}"
      call="${two @ title=properties.jcr:title}"
      attribute={{
        title: '${properties.jcr:title}',
        class: 'custom-class--here',
        id: 'custom-id'
      }}      
    >
      I will be unwrapped and exported
    </Sly>
  </Container>
);
