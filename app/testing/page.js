"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function FeatureReveal() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
    );
  }, []);

  const features = [
    { title: "Uptime", value: "99.98%" },
    { title: "Latency", value: "123ms" },
    { title: "Users", value: "14,230" },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <h2 className="text-3xl font-semibold mb-8">Platform Stats</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-zinc-800 p-6 rounded-2xl shadow-md text-center"
          >
            <p className="text-sm text-gray-400">{feature.title}</p>
            <p className="text-2xl font-bold mt-2">{feature.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
