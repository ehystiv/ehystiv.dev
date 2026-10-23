// Decrypt effect: [data-scramble] elements reveal their text from random glyphs when they scroll into view,
// then fire a short glitch burst. The real text is server-rendered, the script only animates it.
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$<>/_*+=';
const DURATION = 700;
const BURST = 400;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const scramble = (el: HTMLElement) => {
	const finalText = el.dataset.scrambleText ?? el.textContent ?? '';
	el.dataset.scrambleText = finalText;
	el.setAttribute('aria-label', finalText);
	el.classList.add('is-scrambling');

	const start = performance.now();
	const frame = (now: number) => {
		const progress = Math.min((now - start) / DURATION, 1);
		// Characters lock in left to right; whitespace is never scrambled so line breaks stay put
		const revealed = Math.floor(progress * finalText.length);
		el.textContent = [...finalText]
			.map((char, i) => (i < revealed || /\s/.test(char) ? char : randomGlyph()))
			.join('');

		if (progress < 1) {
			requestAnimationFrame(frame);
			return;
		}
		el.textContent = finalText;
		el.removeAttribute('aria-label');
		el.classList.remove('is-scrambling');
		el.classList.add('is-glitching');
		setTimeout(() => el.classList.remove('is-glitching'), BURST);
	};
	requestAnimationFrame(frame);
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll<HTMLElement>('[data-scramble]');

if (!reducedMotion && targets.length > 0) {
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
