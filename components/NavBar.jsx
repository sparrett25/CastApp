import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/navbar.css";

function LinkPill({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "cast-nav__link" + (isActive ? " is-active" : "")
      }
    >
      {children}
    </NavLink>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close drawer when a link is tapped on mobile
  const handleLinkClick = () => setOpen(false);

  const links = [
    
	{ to: "/",            label: "Intro"       	},
	{ to: "/home",            label: "Home"       	},
	{ to: "/field-guide",     label: "Field Guide" 	},
	{ to: "/locations",   label: "Locations"  },
    { to: "/map",         label: "Map"        },
    { to: "/plan-trip",   label: "Plan Trip"  },
	{ to: "/catch-ledger",label: "Catch Log"     	},
    { to: "/journal",     label: "Journal"    },
   	{ to: "/papa",   label: "Interact"  },
		
  ];

  return (
    <div className="cast-nav" role="navigation" aria-label="Primary">
      <div className="cast-nav__inner">

        {/* Brand */}
        <div className="cast-nav__brand">
          <span className="cast-brand__name">Cast</span>
        </div>

        {/* Desktop links */}
        <div className="cast-nav__links">
          {links.map(l => (
            <LinkPill key={l.to} to={l.to}>{l.label}</LinkPill>
          ))}
        </div>

        {/* Mobile toggle — Option B amber pill */}
        <button
          className={"cast-nav__toggle" + (open ? " is-open" : "")}
          aria-label="Toggle navigation menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen(v => !v)}
        >
          <div className="toggle-bars">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
          <span className="toggle-label">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="cast-nav__drawer" onClick={handleLinkClick}>
          {links.map(l => (
            <LinkPill key={l.to} to={l.to}>{l.label}</LinkPill>
          ))}
        </div>
      )}
    </div>
  );
}
