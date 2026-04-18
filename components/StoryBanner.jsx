export default function StoryBanner({ title, text }) {
  return (
    <div className="rounded-xl bg-white/70 border px-4 py-3">
      <div className="text-sm uppercase tracking-wide text-gray-600">{title}</div>
      <div className="font-medium">{text}</div>
    </div>
  );
}
