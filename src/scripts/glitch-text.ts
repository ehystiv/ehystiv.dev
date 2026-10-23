// Decrypt effect: [data-scramble] elements reveal their text from random glyphs when they scroll into view,
// then fire a short glitch burst. The real text is server-rendered and stays readable by assistive tech:
// it is moved into a visually hidden span, and only an aria-hidden copy is animated.
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$<>/_*+=';
const DURATION = 700;
const BURST = 400;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/** Animations are off when the OS asks for reduced motion or the visitor paused them. */
export const motionDisabled = () =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
	document.documentElement.dataset.motion === 'paused';

// Split the element into a screen-reader copy and an animated visual copy (once)
const prepare = (el: HTMLElement) => {
	const existing = el.querySelector<HTMLElement>(':scope > [data-scramble-visual]');
	if (existing) return { visual: existing, text: existing.dataset.text ?? '' };

	const text = el.textContent?.trim() ?? '';
	const srCopy = document.createElement('span');
	srCopy.className = 'sr-only';
	srCopy.textContent = text;
	const visual = document.createElement('span');
	visual.setAttribute('aria-hidden', 'true');
	visual.dataset.scrambleVisual = '';
	visual.dataset.text = text;
	visual.textContent = text;
	el.replaceChildren(srCopy, visual);
	return { visual, text };
};

export const scramble = (el: HTMLElement, duration = DURATION) => {
	if (motionDisabled()) return;
	const { visual, text } = prepare(el);
	el.classList.add('is-scrambling');

	const start = performance.now();
	const frame = (now: number) => {
		const progress = Math.min((now - start) / duration, 1);
		// Characters lock in left to right; whitespace is never scrambled so line breaks stay put
		const revealed = Math.floor(progress * text.length);
		visual.textContent = [...text]
			.map((char, i) => (i < revealed || /\s/.test(char) ? char : randomGlyph()))
			.join('');

		if (progress < 1) {
			requestAnimationFrame(frame);
			return;
		}
		visual.textContent = text;
		el.classList.remove('is-scrambling');
		el.classList.add('is-glitching');
		setTimeout(() => el.classList.remove('is-glitching'), BURST);
	};
	requestAnimationFrame(frame);
};

const targets = document.querySelectorAll<HTMLElement>('[data-scramble]');

if (!motionDisabled() && targets.length > 0) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				observer.unobserve(entry.target);
				scramble(entry.target as HTMLElement);
			});
		},
		{ threshold: 0.6 }
	);
	targets.forEach((el) => observer.observe(el));
}
