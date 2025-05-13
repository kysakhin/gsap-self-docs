"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Home() {
  // Create refs for elements we want to animate
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const heroBoxRef = useRef(null);

  useEffect(() => {
    // Create a timeline for our animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state - elements are invisible
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 20,
    });
    gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.9 });
    gsap.set(heroBoxRef.current, { opacity: 0, scale: 0.95 });

    // Animate hero section
    tl.to(heroBoxRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.75)",
    })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    // Animate cards with staggered effect
    tl.to(
      cardsRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
      },
      "-=0.4",
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  // Function to add elements to our cardsRef array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen text-gray-200 bg-gradient-to-r from-gray-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div
          ref={heroBoxRef}
          className="container mx-auto max-w-4xl text-center"
        >
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400"
          >
            Personal GSAP Documentation
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            A cleaner, more intuitive reference for GreenSock Animation Platform
            tailored to my workflow and preferences.
          </p>
          <div ref={ctaRef} className="mb-16">
            <Link
              href="/docs"
              className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-8 rounded-md transition-colors inline-block"
            >
              Explore Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              ref={addToCardsRef}
              className="bg-gray-800 rounded-xl border border-gray-700/50 shadow-md p-6 hover:shadow-lg hover:shadow-purple-900/20 transition-shadow"
            >
              <div className="h-12 w-12 bg-purple-900/40 rounded-lg mb-4 flex justify-center items-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Animation Basics
              </h3>
              <p className="text-gray-300">
                Learn the core concepts of tweens, timelines, and easing
                functions to build smooth animations.
              </p>
            </div>

            {/* Card 2 */}
            <div
              ref={addToCardsRef}
              className="bg-gray-800 rounded-xl border border-gray-700/50 shadow-md p-6 hover:shadow-lg hover:shadow-blue-900/20 transition-shadow"
            >
              <div className="h-12 w-12 bg-blue-900/40 rounded-lg mb-4 flex justify-center items-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Plugins & Effects
              </h3>
              <p className="text-gray-300">
                Discover specialized plugins for ScrollTrigger, Draggable, and
                other advanced animation effects.
              </p>
            </div>

            {/* Card 3 */}
            <div
              ref={addToCardsRef}
              className="bg-gray-800 rounded-xl border border-gray-700/50 shadow-md p-6 hover:shadow-lg hover:shadow-green-900/20 transition-shadow"
            >
              <div className="h-12 w-12 bg-green-900/40 rounded-lg mb-4 flex justify-center items-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Code Snippets
              </h3>
              <p className="text-gray-300">
                Ready-to-use code examples organized by effect type for quick
                implementation in your projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
