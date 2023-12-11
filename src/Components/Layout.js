import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ baseURL }) {
  return (
    <main>
      <Header baseURL={baseURL} />
      <Outlet />
      <Footer />
    </main>
  );
}
