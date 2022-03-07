import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from "./Components/redux/reducer/user";
import Home from './pages/Home/Home'


const App = () => {
  const store = createStore(appReducer);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
            </Routes>
      </Router>
    </Provider>
  );
};

export default App;
