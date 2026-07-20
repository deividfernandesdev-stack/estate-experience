"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || typeof gsap === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /*
   * Abertura cinematográfica
   * Simula um movimento de câmera aérea sobre a piscina.
   */

  gsap.set(".hero__image", {
    scale: 1.18,
    yPercent: -7,
    filter: "brightness(0.5)"
  });

  gsap.set(".hero__location", {
    y: 28,
    opacity: 0
  });

  gsap.set(".hero__title-text", {
    yPercent: 115
  });

  gsap.set(".hero__description", {
    y: 35,
    opacity: 0
  });

  gsap.set(".hero__scroll", {
    y: 20,
    opacity: 0
  });

  gsap.set(".hero__scroll-line", {
    scaleX: 0,
    transformOrigin: "left center"
  });

  const heroIntroTimeline = gsap.timeline();

  heroIntroTimeline
    .to(
      ".hero__image",
      {
        scale: 1.04,
        yPercent: 3,
        filter: "brightness(0.95)",
        duration: 9,
        ease: "power1.inOut"
      },
      0
    )

    .to(
      ".hero__location",
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out"
      },
      1.2
    )

    .to(
      ".hero__title-text",
      {
        yPercent: 0,
        duration: 1.8,
        stagger: 0.2,
        ease: "power4.out"
      },
      1.9
    )

    .to(
      ".hero__description",
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out"
      },
      3.2
    )

    .to(
      ".hero__scroll",
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      },
      4.3
    )

    .to(
      ".hero__scroll-line",
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.out"
      },
      4.6
    );

  /*
   * Transição da hero durante o scroll.
   */

  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.4
    }
  });

  heroTimeline
    .to(
      ".hero__image",
      {
        scale: 1.13,
        filter: "brightness(0.38)",
        ease: "none"
      },
      0
    )

    .to(
      ".hero__content",
      {
        yPercent: -25,
        opacity: 0,
        ease: "none"
      },
      0
    )

    .to(
      ".hero__scroll",
      {
        y: -25,
        opacity: 0,
        ease: "none"
      },
      0
    );

  /*
   * Entrada discreta da introdução.
   */

  gsap.from(".introduction__title", {
    y: 70,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",

    scrollTrigger: {
      trigger: ".introduction",
      start: "top 72%",
      once: true
    }
  });

  /*
   * Capítulo 01 — Interior do apartamento.
   */

  const livingLines = gsap.utils.toArray(
    ".living-space__line > span"
  );

  gsap.set(livingLines, {
    xPercent: 110
  });

  gsap.set(".living-space__description", {
    y: 35,
    opacity: 0
  });

  gsap.set(".living-space__media", {
    clipPath: "inset(0 0 100% 0)"
  });

  gsap.set(".living-space__image", {
    scale: 1.12
  });

  const livingTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".living-space",
      start: "top 70%",
      once: true
    }
  });

  livingTimeline
    .to(livingLines, {
      xPercent: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out"
    })

    .to(
      ".living-space__description",
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out"
      },
      "-=0.85"
    )

    .to(
      ".living-space__media",
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.8,
        ease: "power4.inOut"
      },
      "-=0.45"
    )

    .to(
      ".living-space__image",
      {
        scale: 1,
        duration: 2.2,
        ease: "power3.out"
      },
      "<"
    )

    .from(
      ".living-space__detail",
      {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out"
      },
      "-=0.8"
    );

  /*
   * Capítulo 02 — A varanda.
   */

  gsap.set(".balcony-showcase__image", {
    scale: 1.12
  });

  gsap.set(".balcony-showcase__content > *", {
    y: 40,
    opacity: 0
  });

  const balconyTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".balcony-showcase",
      start: "top 72%",
      once: true
    }
  });

  balconyTimeline
    .to(".balcony-showcase__image", {
      scale: 1,
      duration: 2.2,
      ease: "power3.out"
    })

    .to(
      ".balcony-showcase__content > *",
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out"
      },
      "-=1.6"
    );
/*
 * Capítulo 03 — O empreendimento
 */

const buildingSection = document.querySelector(".building-showcase");

if (buildingSection) {
  gsap.set(".building-showcase__content > *", {
    y: 35,
    opacity: 0
  });
  gsap.set(".building-showcase__highlight", {
  y: 25,
  opacity: 0
});

  gsap.set(".building-showcase__image", {
    y: 40,
    opacity: 0,
    scale: 0.94,
    rotateY: -10,
    rotateX: 3
  });

  const buildingTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".building-showcase",
      start: "top 72%",
      once: true
    }
  });

  buildingTimeline
    .to(".building-showcase__content > *", {
      y: 0,
      opacity: 1,
      duration: 1.05,
      stagger: 0.14,
      ease: "power3.out"
    })
    .to(
      ".building-showcase__image",
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 1.8,
        ease: "power4.out"
      },
      "-=1.15"
  
    )
    .to(
  ".building-showcase__highlight",
  {
    y: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.14,
    ease: "power3.out"
  },
  "-=0.7"
);
    

  gsap.to(".building-showcase__image", {
    y: -12,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".building-showcase__image", {
    rotateY: 5,
    scrollTrigger: {
      trigger: ".building-showcase",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2
    }
  });
}});