import React from "react";

/** Usage:
 * <ChamberLayout title="Gear" sub="Tools for today’s water" papa={<PapaSlot />} >
 *   <div className="tile-grid">…cards…</div>
 * </ChamberLayout>
 */
export default function ChamberLayout({ title, sub, papa, children }) {
  return (
    // add a little top padding for clearance
    <div className="chamber-page pt-6 md:pt-8">
      <div className="chamber-header">
        <div>
          <h1 className="chamber-title">{title}</h1>
          {sub && <p className="chamber-sub">{sub}</p>}
        </div>
        {!!papa && <div className="papa-slot">{papa}</div>}
      </div>
      {children}
    </div>
  );
}