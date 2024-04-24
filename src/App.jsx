import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Expense from "./expense";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Expense,
  },
]);
function App() {
  return (
    <>
      {/* <Album /> */}
      {/* <Expense /> */}
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
