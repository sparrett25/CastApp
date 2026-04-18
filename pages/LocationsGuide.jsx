import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import ChamberTile from "../components/ChamberTile";
import { say } from "../data/say";
import { useMemo, useState } from "react";
import { byFavFirst, useFavorites } from "../hooks/useFavorites";
import { LOCATIONS } from "../data/locations";
import CastBackground from "../components/CastBackground"; // adjust path if needed

const todaySeed = Number(new Date().toISOString().slice(0,10).replaceAll("-",""));



	export default function LocationsGuide(){
  const { favSet } = useFavorites("locations");
  const [favFirst, setFavFirst] = useState(true);
  const shown = useMemo(
    () => favFirst ? byFavFirst(LOCATIONS, x=>x.id, favSet) : LOCATIONS,
    [favFirst, favSet]
  );
  
  return (
  <CastBackground chamberKey="locations">
    <ChamberLayout
      title="Locations"
      sub="Walk the banks: Alafia, Cockroach Bay, and beyond."
      papa={<PapaMini line={say("chamber.locations", todaySeed)} />}
    >
	  <label className="inline-flex items-center gap-2 text-white/75 mb-3">
        <input type="checkbox" checked={favFirst} onChange={e=>setFavFirst(e.target.checked)} />
        Favorites first
      </label>
	  
      <div className="tile-grid">
        {shown.map(l => (
          <ChamberTile
            key={l.id}
            to={`/map?focus=${encodeURIComponent(l.id)}`}
            icon={l.icon}
            title={l.title}
            sub={l.sub}
            tags={l.tags}
            type="locations"   // ⭐
            id={l.id}          // ⭐
          />
        ))}
      </div>
    </ChamberLayout>
	</CastBackground>
  );
}