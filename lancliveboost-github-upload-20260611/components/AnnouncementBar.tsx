import { announcementText } from "@/data/homepage";

export default function AnnouncementBar() {
  const parts = announcementText.split("|").map((part) => part.trim());

  return (
    <div className="overflow-hidden bg-brand-dark text-white">
      <div className="flex min-h-9 items-center whitespace-nowrap py-2 text-xs font-bold sm:text-sm">
        <div className="animate-marquee flex min-w-max items-center">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center gap-8 px-4">
              {parts.map((part) => (
                <span key={`${part}-${group}`} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  {part}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
