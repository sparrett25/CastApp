import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/pages/grant-map.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// ── Grant's pre-loaded waters ──────────────────────────────────
const GRANT_WATERS = [
  {
    id: "backyard-pond",
    name: "Scooter's Backyard Pond",
    note: "Where it all started. Bluegill and catfish. Catch and release.",
    lat: 27.8651,
    lng: -82.5304,
    type: "home",
    scooter: "This is your home water, Grant. You know it better than you think.",
  },
  {
    id: "alafia-river",
    name: "Alafia River",
    note: "Good for bass and snook. Runs fast after rain.",
    lat: 27.8540,
    lng: -82.3790,
    type: "water",
    scooter: "The Alafia runs fast after rain. That's when the snook push up toward the bridges.",
  },
  {
    id: "hillsborough-river",
    name: "Hillsborough River",
    note: "Adventure 2 target. Largemouth Bass country.",
    lat: 27.9706,
    lng: -82.4572,
    type: "water",
    scooter: "I've been watching a bend near the reeds here. I think that's where our Largemouth is hiding.",
  },
  {
    id: "cockroach-bay",
    name: "Cockroach Bay",
    note: "Saltwater. Redfish and snook in the grass flats.",
    lat: 27.6550,
    lng: -82.5190,
    type: "water",
    scooter: "Saltwater is a whole different world, Grant. When you're ready, Cockroach Bay will teach you.",
  },
  {
    id: "buckhorn-lake",
    name: "Buckhorn Lake",
    note: "Scooter's been scouting this one. Bass near the reeds.",
    lat: 27.8920,
    lng: -82.3150,
    type: "water",
    scooter: "I've been scoping a spot near the reeds at Buckhorn Lake. I think that's where our Largemouth is hiding.",
  },
];

// ── localStorage for custom pins ──────────────────────────────
const PINS_KEY = "cast:v1:map-pins";

function loadCustomPins() {
  try {
    const raw = localStorage.getItem(PINS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomPins(pins) {
  try {
    localStorage.setItem(PINS_KEY, JSON.stringify(pins));
  } catch {}
}

// ── Marker colors ─────────────────────────────────────────────
const MARKER_COLORS = {
  home: "#EF9F27",    // amber — home water
  water: "#378ADD",   // blue — known waters
  custom: "#5DCAA5",  // teal — Grant's own pins
};

function makeMarkerEl(type) {
  const el = document.createElement("div");
  el.className = "grant-marker";
  el.style.background = MARKER_COLORS[type] || MARKER_COLORS.custom;
  if (type === "home") {
    el.classList.add("home-marker");
  }
  return el;
}

// ── Pin detail popup ──────────────────────────────────────────
function PinPopup({ pin, onClose }) {
  if (!pin) return null;
  return (
    <motion.div
      className="map-popup"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      <button className="map-popup-close" onClick={onClose}>×</button>
      <div className="map-popup-type-dot" style={{ background: MARKER_COLORS[pin.type] || MARKER_COLORS.custom }} />
      <h3 className="map-popup-name">{pin.name}</h3>
      {pin.note && <p className="map-popup-note">{pin.note}</p>}
      {pin.scooter && (
        <div className="map-popup-scooter">
          <p className="map-popup-attr">Scooter</p>
          <p className="map-popup-voice">"{pin.scooter}"</p>
        </div>
      )}
    </motion.div>
  );
}

// ── Add pin modal ─────────────────────────────────────────────
function AddPinModal({ lngLat, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  return (
    <motion.div
      className="map-add-pin-modal"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="map-add-title">Pin this spot</h3>
      <input
        className="map-add-input"
        placeholder="Name this spot..."
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
      />
      <input
        className="map-add-input"
        placeholder="Any notes? (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <div className="map-add-actions">
        <button
          className="map-add-save"
          onClick={() => name.trim() && onSave({ name: name.trim(), note: note.trim() })}
          disabled={!name.trim()}
        >
          Save pin
        </button>
        <button className="map-add-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function GrantMapPage() {
  const containerRef   = useRef(null);
  const mapRef         = useRef(null);
  const markersRef     = useRef([]);
  const [ready, setReady]             = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [addingAt, setAddingAt]       = useState(null);
  const [customPins, setCustomPins]   = useState(() => loadCustomPins());

  // ── Init map ──────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-82.4572, 27.9000],
      zoom: 10,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      mapRef.current = map;
      setReady(true);
    });

    // Long-press / click on empty area to add pin
    let clickTimer = null;
    map.on("click", (e) => {
      // Only open add-pin if no marker was clicked
      clickTimer = setTimeout(() => {
        setAddingAt({ lng: e.lngLat.lng, lat: e.lngLat.lat });
        setSelectedPin(null);
      }, 100);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Add markers when map is ready ────────────────────────
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Grant's pre-loaded waters
    GRANT_WATERS.forEach(water => {
      const el = makeMarkerEl(water.type);
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([water.lng, water.lat])
        .addTo(map);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedPin(water);
        setAddingAt(null);
      });

      markersRef.current.push(marker);
    });

    // Custom pins
    customPins.forEach(pin => {
      const el = makeMarkerEl("custom");
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedPin(pin);
        setAddingAt(null);
      });

      markersRef.current.push(marker);
    });
  }, [ready, customPins]);

  const handleAddPin = ({ name, note }) => {
    const newPin = {
      id: `custom-${Date.now()}`,
      name,
      note,
      lat: addingAt.lat,
      lng: addingAt.lng,
      type: "custom",
    };
    const updated = [...customPins, newPin];
    setCustomPins(updated);
    saveCustomPins(updated);
    setAddingAt(null);
  };

  return (
    <div className="grant-map-page">

      {/* Header */}
      <div className="map-header">
        <div>
          <h1 className="map-title">His Waters</h1>
          <p className="map-sub">Tap a spot to see it. Tap anywhere else to add a pin.</p>
        </div>
        <div className="map-legend">
          <span className="legend-dot" style={{ background: MARKER_COLORS.home }} />
          <span className="legend-label">Home water</span>
          <span className="legend-dot" style={{ background: MARKER_COLORS.water }} />
          <span className="legend-label">Known waters</span>
          <span className="legend-dot" style={{ background: MARKER_COLORS.custom }} />
          <span className="legend-label">Your pins</span>
        </div>
      </div>

      {/* Map container */}
      <div className="map-canvas-wrap">
        <div ref={containerRef} className="map-canvas" />

        {/* Pin popup */}
        <AnimatePresence>
          {selectedPin && (
            <PinPopup
              pin={selectedPin}
              onClose={() => setSelectedPin(null)}
            />
          )}
        </AnimatePresence>

        {/* Add pin modal */}
        <AnimatePresence>
          {addingAt && (
            <AddPinModal
              lngLat={addingAt}
              onSave={handleAddPin}
              onCancel={() => setAddingAt(null)}
            />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
