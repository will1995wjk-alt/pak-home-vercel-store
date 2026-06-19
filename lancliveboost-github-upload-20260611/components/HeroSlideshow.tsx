"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/hero-home.png",
    alt: "Home appliances and daily essentials arranged in a modern Pakistani home"
  },
  {
    src: "/images/hero-home-2.png",
    alt: "Home cleaning and organization products neatly arranged in a tidy home"
  },
  {
    src: "/images/hero-home-3.png",
    alt: "Personal care and daily-use products on a bright bathroom counter"
  }
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className={`object-cover object-right transition-opacity duration-1000 ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_42%,rgba(255,255,255,0.74)_68%,rgba(255,255,255,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(20,87,217,0.18),transparent_32%)]" />
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 lg:left-auto lg:right-10 lg:translate-x-0">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all ${
              index === active ? "w-6 bg-brand" : "w-2 bg-brand/30 hover:bg-brand/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
