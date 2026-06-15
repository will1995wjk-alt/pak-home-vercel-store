import { announcementText } from "@/data/homepage";

export default function AnnouncementBar() {
  const parts = announcementText.split("|").map((part) => part.trim());

  return (
    <div className="bg-brand-dark text-white">
      <div className="container flex min-h-9 flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-center text-xs font-bold sm:text-sm">
        {parts.map((part) => (
          <span key={part} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            {part}
          </span>
        ))}
      </div>
    </div>
  );
}
