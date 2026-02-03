import { useEffect, useRef } from "react";
import gsap from "gsap";

type HoverHeartsProps = {
  children: React.ReactNode;
};

function HoverHearts(props: HoverHeartsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(function () {
    const container = containerRef.current;
    if (!container) return;

    function spawnHeart() {
      const heart = document.createElement("span");
      heart.textContent = "💖";

      heart.style.position = "absolute";
      heart.style.left = `${Math.random() * 80 + 10}%`;
      heart.style.bottom = "10px";
      heart.style.fontSize = `${Math.random() * 12 + 14}px`;
      heart.style.pointerEvents = "none";
      heart.style.opacity = "0";

      container!.appendChild(heart);

      gsap.fromTo(
        heart,
        {
          y: 0,
          scale: 0.8,
          opacity: 0,
        },
        {
          y: -80 - Math.random() * 40,
          scale: 1.4,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      gsap.to(heart, {
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "power2.in",
        onComplete: function () {
          heart.remove();
        },
      });
    }

    function onEnter() {
      if (intervalRef.current !== null) return;

      intervalRef.current = window.setInterval(function () {
        spawnHeart();
      }, 180);
    }

    function onLeave() {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return function cleanup() {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

return (
  <div ref={containerRef} className="relative block overflow-hidden rounded-2xl">
    {props.children}
  </div>
);
}

export default HoverHearts;
