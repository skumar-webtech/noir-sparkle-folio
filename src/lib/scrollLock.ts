import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let lockCount = 0;

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function lockScroll() {
  lockCount += 1;
  if (lockCount > 1) return;

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  lenisInstance?.stop();
}

export function unlockScroll() {
  if (lockCount <= 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  lenisInstance?.start();
}
