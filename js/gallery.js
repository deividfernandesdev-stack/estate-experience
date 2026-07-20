"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".gallery-carousel__viewport");
  const track = document.querySelector(".gallery-carousel__track");

  if (!viewport || !track) {
    console.warn("Galeria: viewport ou track não encontrado.");
    return;
  }

  const cards = Array.from(track.querySelectorAll(".gallery-card"));
  const previousButton = document.querySelector(
    ".gallery-carousel__button--previous"
  );
  const nextButton = document.querySelector(
    ".gallery-carousel__button--next"
  );
  const currentElement = document.querySelector(
    ".gallery-showcase__current"
  );
  const totalElement = document.querySelector(
    ".gallery-showcase__total"
  );
  const progressFill = document.querySelector(
    ".gallery-showcase__progress-fill"
  );

  if (cards.length === 0) {
    console.warn("Galeria: nenhum card encontrado.");
    return;
  }

  let activeIndex = 0;
  let scrollFrame = null;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;

  const formatNumber = (value) => String(value).padStart(2, "0");

  const updateInterface = () => {
    cards.forEach((card, index) => {
      card.classList.toggle("is-active", index === activeIndex);
    });

    if (currentElement) {
      currentElement.textContent = formatNumber(activeIndex + 1);
    }

    if (totalElement) {
      totalElement.textContent = formatNumber(cards.length);
    }

    if (progressFill) {
      progressFill.style.transform =
        `scaleX(${(activeIndex + 1) / cards.length})`;
    }

    if (previousButton) {
      previousButton.disabled = activeIndex === 0;
      previousButton.setAttribute(
        "aria-disabled",
        String(activeIndex === 0)
      );
    }

    if (nextButton) {
      nextButton.disabled = activeIndex === cards.length - 1;
      nextButton.setAttribute(
        "aria-disabled",
        String(activeIndex === cards.length - 1)
      );
    }
  };

  const getCardTargetScrollLeft = (card) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const viewportCenter = viewport.clientWidth / 2;

    return cardCenter - viewportCenter;
  };

  const goToCard = (index, behavior = "smooth") => {
    const targetIndex = Math.max(
      0,
      Math.min(index, cards.length - 1)
    );

    activeIndex = targetIndex;
    updateInterface();

    viewport.scrollTo({
      left: getCardTargetScrollLeft(cards[targetIndex]),
      behavior
    });
  };

  const findClosestCard = () => {
    const viewportCenter =
      viewport.scrollLeft + viewport.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      activeIndex = closestIndex;
      updateInterface();
    }
  };

  previousButton?.addEventListener("click", () => {
    goToCard(activeIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    goToCard(activeIndex + 1);
  });

  viewport.addEventListener(
    "scroll",
    () => {
      if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
      }

      scrollFrame = requestAnimationFrame(() => {
        findClosestCard();
        scrollFrame = null;
      });
    },
    { passive: true }
  );

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToCard(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToCard(activeIndex + 1);
    }
  });

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    isDragging = true;
    dragStartX = event.clientX;
    dragStartScrollLeft = viewport.scrollLeft;

    viewport.classList.add("is-dragging");
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    const movementX = event.clientX - dragStartX;
    viewport.scrollLeft = dragStartScrollLeft - movementX;
  });

  const finishDragging = (event) => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    viewport.classList.remove("is-dragging");

    if (
      event.pointerId !== undefined &&
      viewport.hasPointerCapture(event.pointerId)
    ) {
      viewport.releasePointerCapture(event.pointerId);
    }

    findClosestCard();
    goToCard(activeIndex);
  };

  viewport.addEventListener("pointerup", finishDragging);
  viewport.addEventListener("pointercancel", finishDragging);

  window.addEventListener("resize", () => {
    goToCard(activeIndex, "auto");
  });

  updateInterface();

  requestAnimationFrame(() => {
    goToCard(0, "auto");
  });
});
