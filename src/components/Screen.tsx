import React from "react";

import Header from "./Header";

type Prop = {};

const App: React.FC<Prop> = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default App;
