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
   * Transição da hero
   * A imagem se aproxima, escurece e os textos deixam a tela.
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
   * Novo capítulo: interior do apartamento.
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
});