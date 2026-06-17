import { StarIcon } from "./Icons";

type StarRatingProps = {
  value: number;
  size?: number;
  className?: string;
};

export default function StarRating({ value, size = 16, className }: StarRatingProps) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className={`inline-flex items-center gap-0.5 ${className || ""}`} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rounded >= star;
        const half = !filled && rounded >= star - 0.5;
        return (
          <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
            <StarIcon width={size} height={size} className="absolute inset-0 text-line" fill="currentColor" stroke="none" />
            {(filled || half) ? (
              <span className="absolute inset-0 overflow-hidden" style={{ width: half ? size / 2 : size }}>
                <StarIcon width={size} height={size} className="text-brand" fill="currentColor" stroke="none" />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
