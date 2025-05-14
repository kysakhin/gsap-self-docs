import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export default function TweensRoot() {
  return (
    <div className="bg-[#0d1117] p-6">
      <BreadcrumbMenu />
      <div className="min-h-screen w-full bg-[#0d1117] text-white py-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tween Info Card */}
        <div className="max-w-4xl bg-zinc-800 rounded-3xl p-10 shadow-lg">
          <h1 className="text-5xl font-bold mb-6 text-teal-400">
            🎞️ Tweens in GSAP
          </h1>

          <div className="space-y-5 text-lg leading-relaxed text-gray-300">
            <p>
              A <strong className="text-white">Tween</strong> is the most
              fundamental building block of GSAP animations. It smoothly
              transitions properties of a target over time.
            </p>

            <blockquote className="border-l-4 border-teal-500 pl-4 italic text-teal-300">
              “Tween” = “in-between” → from a start value to an end value over
              time.
            </blockquote>

            <p>Common properties a tween uses:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
              <li>
                <code className="text-teal-300">targets</code>: The element or
                object you want to animate
              </li>
              <li>
                <code className="text-teal-300">duration</code>: Time in seconds
              </li>
              <li>
                <code className="text-teal-300">ease</code>
                {`: Controls the motion flow (e.g. "power3.out")`}
              </li>
              <li>
                <code className="text-teal-300">properties</code>: Like{" "}
                <code>x</code>, <code>opacity</code>, <code>rotation</code>,
                etc.
              </li>
            </ul>

            <p>
              Tweens can also be controlled programmatically using methods like{" "}
              <code className="bg-zinc-700 px-2 py-1 rounded text-teal-300">
                play()
              </code>
              ,{" "}
              <code className="bg-zinc-700 px-2 py-1 rounded text-teal-300">
                pause()
              </code>
              , or{" "}
              <code className="bg-zinc-700 px-2 py-1 rounded text-teal-300">
                restart()
              </code>
              .
            </p>

            <p className="text-gray-400">
              Below is an example of how you&apos;d define a basic tween:
            </p>

            <pre className="bg-black/40 rounded-lg p-4 overflow-x-auto text-sm text-green-300">
              {`gsap.to(".box", {
x: 200,
opacity: 1,
duration: 2,
ease: "power2.inOut"
});`}
            </pre>
          </div>
        </div>

        {/* Links to other tweens */}
        <div className="max-w-4xl bg-zinc-800 rounded-3xl p-10 shadow-lg">
          <h1 className="text-3xl md:text-5xl text-teal-300 font-bold pb-4">
            Links
          </h1>

          <div className="bg-slate-900 rounded-3xl p-6">
            <Link
              href="/tweens/t1"
              className="text-gray-300 hover:text-gray-100 hover:underline transition duration-200"
            >
              Tween 1 - Slide in animation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function BreadcrumbMenu() {
  return (
    <div className="p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
