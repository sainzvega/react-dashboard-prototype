import React from "react";
let idCoutner = 0;
function getId() {
  return idCoutner++;
}
export class ClassBasedTest extends React.Component {
  constructor() {
    console.log("Construcitng object for first time. Id: ", getId());
    super();
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    return <div>This is a test. Component is {this.state.isMounted}</div>;
  }
}
