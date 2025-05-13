"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AnimatedCTA() {
  const ctaRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    // animate the panel in from the right with a little rotation
    tweenRef.current = gsap.fromTo(
      ctaRef.current,
      {
        x: 300,
        rotation: 15,
        opacity: 0,
      },
      {
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
        paused: true,
      },
    );
  }, []);

  const play = () => tweenRef.current?.play();
  const reset = () => tweenRef.current?.restart();

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col justify-center items-center gap-6">
      <div
        ref={ctaRef}
        className="bg-indigo-600 shadow-lg rounded-4xl px-6 py-4 w-[300px] text-center opacity-0"
      >
        <h2 className="text-xl font-semibold mb-2">🔥 Limited Time Offer!</h2>
        <p className="text-sm">
          Subscribe now and get 30% off your first month.
        </p>
        <button className="mt-4 bg-white text-indigo-600 font-bold py-2 px-4 rounded-2xl hover:bg-gray-100">
          Subscribe
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={play}
          className="bg-green-600 px-4 py-2 rounded-full hover:bg-green-700"
        >
          Show CTA
        </button>
        <button
          onClick={reset}
          className="bg-red-600 px-4 py-2 rounded-full hover:bg-red-700"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
