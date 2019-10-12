// Standard HTML elements
type generalChildrenType =
  | HTMLElement
  | HTMLElement[]
  | JSX.Element
  | JSX.Element[]
  | HTMLDivElement
  | HTMLDivElement[];

// Standard react elements
type ReactElement = React.Component | React.SFC | React.PureComponent;

export { generalChildrenType, ReactElement };
