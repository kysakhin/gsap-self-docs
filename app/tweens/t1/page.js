// "use client";
// import { useRef, useEffect, useState } from "react";
// import gsap from "gsap";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
//
// export default function DemoWithCode() {
//   const ctaRef = useRef(null);
//   const tweenRef = useRef(null);
//   const [showFullCode, setShowFullCode] = useState(false);
//
//   useEffect(() => {
//     tweenRef.current = gsap.fromTo(
//       ctaRef.current,
//       {
//         x: 300,
//         rotation: 15,
//         opacity: 0,
//       },
//       {
//         x: 0,
//         rotation: 0,
//         opacity: 1,
//         duration: 1.5,
//         ease: "back.out(1.7)",
//         paused: true,
//       },
//     );
//   }, []);
//
//   const play = () => tweenRef.current?.play();
//   const reset = () => tweenRef.current?.restart();
//
// const code = `import { useRef, useEffect } from "react";
//  import gsap from "gsap";
//
//  export default function AnimatedCTA() {
// const ctaRef = useRef(null);
// const tweenRef = useRef(null);
//
// useEffect(() => {
//   tweenRef.current = gsap.fromTo(
//     ctaRef.current,
//     { x: 300, rotation: 15, opacity: 0 },
//     { x: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)", paused: true }
//   );
// }, []);
//
// const play = () => tweenRef.current?.play();
// const reset = () => tweenRef.current?.restart();
//
// return (
//   <div className="min-h-screen bg-zinc-900 text-white flex flex-col justify-center items-center gap-6">
//     <div ref={ctaRef} className="bg-indigo-600 shadow-lg rounded-4xl px-6 py-4 w-[300px] text-center opacity-0">
//       <h2 className="text-xl font-semibold mb-2">🔥 Limited Time Offer!</h2>
//       <p className="text-sm">Subscribe now and get 30% off your first month.</p>
//       <button className="mt-4 bg-white text-indigo-600 font-bold py-2 px-4 rounded-2xl hover:bg-gray-100">Subscribe</button>
//     </div>
//
//     <div className="flex gap-4">
//       <button onClick={play} className="bg-green-600 px-4 py-2 rounded-full hover:bg-green-700">Show CTA</button>
//       <button onClick={reset} className="bg-red-600 px-4 py-2 rounded-full hover:bg-red-700">Restart</button>
//     </div>
//   </div>
// );
//  }`;
//
//   return (
//     <div className="bg-[#0d1117] text-white min-h-screen px-6 py-12">
//       <h1 className="text-3xl font-bold mb-6">Animated CTA with GSAP</h1>
//
//       {/* Live demo */}
//       <div className="mb-8">
//         <DemoCTA play={play} reset={reset} ctaRef={ctaRef} />
//       </div>
//
//       {/* Code preview with show more */}
//       <div>
//         <h2 className="text-xl mb-2 font-semibold">Code Snippet</h2>
//         <SyntaxHighlighter language="jsx" style={nightOwl} wrapLines={true}>
//           {showFullCode ? code : code.split("\n").slice(0, 15).join("\n")}
//         </SyntaxHighlighter>
//
//         <button
//           className="mt-2 text-indigo-400 hover:underline"
//           onClick={() => setShowFullCode(!showFullCode)}
//         >
//           {showFullCode ? "Show less ▲" : "Show more ▼"}
//         </button>
//       </div>
//     </div>
//   );
// }
//
// function DemoCTA({ play, reset, ctaRef }) {
//   return (
//     <div className="flex flex-col justify-center items-center gap-6">
//       <div
//         ref={ctaRef}
//         className="bg-indigo-600 shadow-lg rounded-4xl px-6 py-4 w-[300px] text-center opacity-0"
//       >
//         <h2 className="text-xl font-semibold mb-2">🔥 Limited Time Offer!</h2>
//         <p className="text-sm">
//           Subscribe now and get 30% off your first month.
//         </p>
//         <button className="mt-4 bg-white text-indigo-600 font-bold py-2 px-4 rounded-2xl hover:bg-gray-100">
//           Subscribe
//         </button>
//       </div>
//
//       <div className="flex gap-4">
//         <button
//           onClick={play}
//           className="bg-green-600 px-4 py-2 rounded-full hover:bg-green-700"
//         >
//           Show CTA
//         </button>
//         <button
//           onClick={reset}
//           className="bg-red-600 px-4 py-2 rounded-full hover:bg-red-700"
//         >
//           Restart
//         </button>
//       </div>
//     </div>
//   );
// }

// FIX: Go through and fix on a layout.
"use client";
import CodePreviewComponent from "~/components/CodePreviewComponent";
import { useRef, useEffect } from "react"; // Keep if needed elsewhere, not for preview logic passed in
import gsap from "gsap";

export default function MyGsapExample() {
  // 1. Define the JSX structure for the preview
  const previewJSX = (
    <div className="bg-indigo-600 shadow-lg rounded-4xl px-6 py-4 w-[300px] text-center preview-target-element">
      <h2 className="text-xl font-semibold mb-2">🔥 Limited Time Offer!</h2>
      <p className="text-sm">Subscribe now and get 30% off your first month.</p>
      <button className="mt-4 bg-white text-indigo-600 font-bold py-2 px-4 rounded-2xl hover:bg-gray-100">
        Subscribe
      </button>
    </div>
    // Note: Removed the surrounding layout and separate play/reset buttons
    // as CodePreviewComponent provides these.
  );

  // 2. Define the animation logic targeting elements *within* the preview structure
  const renderPreview = (previewRef) => {
    const targetElement = previewRef.current.querySelector(
      ".preview-target-element",
    );

    if (!targetElement) {
      console.warn("Preview target element not found!");
      return null; // Return null or an empty timeline if element isn't ready
    }

    // 3. Define the GSAP animation (matching the concept in the code string)
    const animation = gsap.fromTo(
      targetElement,
      { x: 300, rotation: 15, opacity: 0 }, // From state
      { x: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }, // To state
      // Note: No 'paused: true' here, as CodePreviewComponent controls playback
    );

    return animation; // Must return the GSAP animation instance
  };

  // Attach the preview JSX to the function object
  renderPreview.preview = previewJSX;

  // 4. Define the code string to display (reflecting the structure and animation)
  //    You can simplify this to just the core JSX and the GSAP call.
  const code = `import { useRef, useEffect } from "react";
import gsap from "gsap";

function AnimatedElement({ innerRef }) { // Pass ref down or use selector
  return (
    <div ref={innerRef} className="bg-indigo-600 shadow-lg rounded-4xl px-6 py-4 w-[300px] text-center">
      <h2 className="text-xl font-semibold mb-2">🔥 Limited Time Offer!</h2>
      <p className="text-sm">Subscribe now and get 30% off your first month.</p>
      <button className="mt-4 bg-white text-indigo-600 font-bold py-2 px-4 rounded-2xl hover:bg-gray-100">Subscribe</button>
    </div>
  );
}

// Inside a component or function that runs the animation:
// const ctaRef = useRef(null); // If using refs
// useEffect(() => {
//   const animation = gsap.fromTo(
//     ctaRef.current, // or document.querySelector('.your-selector')
//     { x: 300, rotation: 15, opacity: 0 },
//     { x: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
//   );
//   // animation.play(); // Or control with buttons/scrollTrigger etc.
//   return () => { animation.kill(); }; // Clean up on unmount
// }, []);

// ... render AnimatedElement ...
`; // You can adjust this code string to be more concise if needed.

  return (
    <CodePreviewComponent
      title="GSAP FromTo Animation"
      code={code}
      renderPreview={renderPreview} // Pass the function with the .preview property
      language="jsx" // or 'javascript' if preferred for the animation part
      executeOnMount={false} // Or true, depending on desired initial behavior
    />
  );
}
