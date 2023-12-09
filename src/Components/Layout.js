import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout({ baseURL }) {
  return (
    <main>
      <Header baseURL={baseURL} />
      <Outlet />
    </main>
  );
}
