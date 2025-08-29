// src/components/compost/CompostAnimatedBeam.tsx
"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function CompostAnimatedBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <span className="text-4xl">🥬</span>
          </Circle>
          <Circle ref={div5Ref}>
            <span className="text-4xl">🍅</span>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <span className="text-4xl">🍌</span>
          </Circle>
          <Circle ref={div4Ref} className="size-24">
            <div className="w-20 h-20 relative">
              <Image
                src="/logos/compost.png"
                alt="Compost"
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
          </Circle>
          <Circle ref={div6Ref}>
            <span className="text-4xl">🥕</span>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <span className="text-4xl">🍞</span>
          </Circle>
          <Circle ref={div7Ref}>
            <span className="text-4xl">☕</span>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        gradientStartColor="#46952C"
        gradientStopColor="#7BAC5D"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        gradientStartColor="#46952C"
        gradientStopColor="#7BAC5D"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        gradientStartColor="#46952C"
        gradientStopColor="#7BAC5D"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
        gradientStartColor="#46952C"
        gradientStopColor="#7BAC5D"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
        gradientStartColor="#46952C"
        gradientStopColor="#7BAC5D"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
        gradientStartColor="#46952C"
        gradientStopColor="#7BAC5D"
      />
    </div>
  );
}