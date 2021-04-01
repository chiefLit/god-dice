import Home from "./pages/home";
import Set from "./pages/set";

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/set',
    exact: true,
    component: Set
  }
]