import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites.js";

export default function ChamberTile({ to, icon, title, sub, tags = [], type, id, hoverKeep=false }) {
  const nav = useNavigate();
  const { isFav, toggleFav } = useFavorites(type ?? "misc");
  const fav = id ? isFav(id) : false;

  return (
    <div role="button" onClick={()=>nav(to)} className="no-underline" style={{cursor:"pointer"}}>
      <div className="tile-card" {...(hoverKeep ? {"data-hover":"keep"} : {})}>
        {/* star */}
        {id && (
          <button
            className={`tile-star ${fav ? "is-fav" : ""}`}
            aria-label={fav ? "Remove favorite" : "Add favorite"}
			aria-pressed={fav}
            onClick={(e)=>{ e.stopPropagation(); toggleFav(id); }}
          >★ </button>
        )}

        <div className="tile-row">
          <span className="tile-icon">{icon}</span>
          <div>
            <h3 className="tile-title">{title}</h3>
            {sub && <p className="tile-sub">{sub}</p>}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="tile-meta">
            {tags.map((t,i)=>{
              const obj = typeof t === "string" ? { label:t } : t;
              const cls = obj.variant ? `pill pill--${obj.variant}` : "pill";
              return <span key={i} className={cls}>{obj.icon && <i>{obj.icon}</i>}{obj.label}</span>;
            })}
          </div>
        )}

        <span className="tile-arrow">→</span>
      </div>
    </div>
  );
}
