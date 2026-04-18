import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function CastShell() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
