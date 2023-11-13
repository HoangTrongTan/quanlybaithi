import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {publicRoutes}  from "./Routes";
import { Fragment } from "react";
import LayoutMain from "./Component/Layout/LayoutMain";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = LayoutMain;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
