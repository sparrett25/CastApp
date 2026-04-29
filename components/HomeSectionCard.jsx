// src/components/HomeSectionCard.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function HomeSectionCard({
  title,
  summary,
  open,
  onToggle,
  children,
  cardTheme,
  textTheme,
}) {
  return (
    <section
      className={"home-section-card" + (open ? " is-open" : "")}
      style={{
        background: cardTheme?.bg,
        border: `1px solid ${cardTheme?.border}`,
        backdropFilter: `blur(${cardTheme?.blur || "18px"})`,
        WebkitBackdropFilter: `blur(${cardTheme?.blur || "18px"})`,
        boxShadow: cardTheme?.shadow,
        color: textTheme?.primary,
      }}
    >
      <button type="button" className="home-section-card__head" onClick={onToggle}>
        <div>
          <p className="home-section-card__kicker">{title}</p>
          <p
            className="home-section-card__summary"
            style={{ color: textTheme?.secondary }}
          >
            {summary}
          </p>
        </div>

        <span className="home-section-card__toggle">
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="home-section-card__body"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}