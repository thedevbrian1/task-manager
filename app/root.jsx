import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: stylesheet }
  ]
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#f2f1f2]">
        <nav className="bg-[#2eb6b3] p-8">
          <ul className="text-white flex gap-8">
            <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'bg-[#27a7a6] p-3 rounded' : ''}>Dashboard</NavLink></li>
            <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'bg-[#27a7a6] p-3 rounded' : ''}>Projects</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'bg-[#27a7a6] p-3 rounded' : ''}>About</NavLink></li>
          </ul>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
