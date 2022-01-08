/**
  Container is all purpose element that acts as a general parent container for other elements.
  The container element also comes with a large number of layout control form Flex to CSS grids.
*/

export class Container extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node,
    /** Defines if the container should be scrollable */
    scroll: PropTypes.PropTypes.bool
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    scroll: false
  };

  /** Element level options */
  static options = {
    core: true
  };

  render() {
    const {
      tagName,
      className,
      variant,
      children,
      scroll,
      ...attrs
    } = this.props;

    const Tag = tagName;

    const classStack = [
      'container',
      `container--style-${variant}`,
      scroll && 'scroll',
      className
    ].join(' ');

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default Container;
