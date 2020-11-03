import React from "react";
import { ThemeWrapper, AppContainer, AppRouter, App } from "../index";

const AppRender: React.FC = (props) => {
  return (
    <ThemeWrapper>
      <AppContainer>
        <AppRouter>
          <App />
        </AppRouter>
      </AppContainer>
    </ThemeWrapper>
  );
};

export default AppRender;
