/**
 * View Transitions Utility
 * Manages smooth transitions between views using the View Transition API
 * with fallback for unsupported browsers
 */

export interface ViewState {
	hub: HTMLElement | null;
	hero: HTMLElement | null;
	name: HTMLElement | null;
	stage: HTMLElement | null;
	backButton: HTMLButtonElement | null;
	activeLabel: HTMLElement | null;
	menuButtons: HTMLButtonElement[];
	panels: HTMLElement[];
	labelsById: Map<string, string>;
}

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isSmallViewport(): boolean {
	return window.matchMedia('(max-width: 640px)').matches;
}

/**
 * Initialize view state by collecting DOM references
 */
export function initializeViewState(): ViewState {
	const hub = document.getElementById('section-hub');
	const hero = document.getElementById('front-hero');
	const name = document.getElementById('front-name');
	const stage = document.getElementById('view-stage');
	const backButton = document.getElementById('back-to-menu') as HTMLButtonElement | null;
	const activeLabel = document.getElementById('active-section-label');
	const menuButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.menu-option'));
	const panels = Array.from(document.querySelectorAll<HTMLElement>('.view-panel'));

	const labelsById = new Map<string, string>();
	menuButtons.forEach((button) => {
		const target = button.dataset.target;
		if (target) labelsById.set(target, button.dataset.label ?? 'Seccion');
	});

	return {
		hub,
		hero,
		name,
		stage,
		backButton,
		activeLabel,
		menuButtons,
		panels,
		labelsById,
	};
}

/**
 * Update a menu button's visual state (active/inactive)
 */
export function setMenuButtonState(button: HTMLButtonElement, selected: boolean): void {
	const line = button.querySelector<HTMLElement>('.menu-option-line');
	button.setAttribute('aria-pressed', selected ? 'true' : 'false');
	button.classList.toggle('text-ink/95', selected);
	button.classList.toggle('font-bold', selected);
	if (line) {
		line.classList.toggle('scale-x-100', selected);
		line.classList.toggle('scale-x-0', !selected);
	}
}

/**
 * Update the open/closed state styling of the hub
 */
export function setOpenStateClasses(state: ViewState, isOpen: boolean): void {
	const { hub, hero, name, stage, activeLabel } = state;

	hub?.classList.toggle('is-open', isOpen);
	hero?.classList.toggle('min-h-[210px]', isOpen);
	hero?.classList.toggle('min-h-[calc(100vh-2rem)]', !isOpen);
	hero?.classList.toggle('py-4', isOpen);
	hero?.classList.toggle('py-8', !isOpen);
	name?.classList.toggle('text-[clamp(1.55rem,3.4vw,2.5rem)]', isOpen);
	name?.classList.toggle('text-[clamp(1.9rem,6.2vw,5.1rem)]', !isOpen);
	stage?.classList.toggle('pointer-events-none', !isOpen);
	stage?.classList.toggle('max-h-0', !isOpen);
	stage?.classList.toggle('opacity-0', !isOpen);
	stage?.classList.toggle('translate-y-4', !isOpen);
	stage?.classList.toggle('pointer-events-auto', isOpen);
	stage?.classList.toggle('max-h-[9999px]', isOpen);
	stage?.classList.toggle('opacity-100', isOpen);
	stage?.classList.toggle('translate-y-0', isOpen);
	stage?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

	if (activeLabel && !isOpen) {
		activeLabel.textContent = 'Selecciona una sección';
	}
}

/**
 * Update the view to show a specific panel
 */
export function updateView(state: ViewState, targetId = ''): void {
	const { menuButtons, panels, hub, stage, activeLabel, labelsById } = state;
	const isOpen = targetId.length > 0;
	const wasOpen = hub?.classList.contains('is-open') ?? false;

	// Update menu button states
	menuButtons.forEach((button) => setMenuButtonState(button, button.dataset.target === targetId));

	// Update panel visibility
	panels.forEach((panel) => {
		panel.hidden = panel.dataset.panel !== targetId;
	});

	// Update hub styling
	setOpenStateClasses(state, isOpen);

	// Update active section label
	if (activeLabel) {
		activeLabel.textContent = isOpen ? labelsById.get(targetId) ?? 'Seccion' : 'Selecciona una sección';
	}

	// Keep hero stable in viewport when opening a section.
	if (isOpen && !wasOpen) {
		hub?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
	}
}

/**
 * Execute a callback with View Transition API support
 * Falls back to direct execution if API is unavailable
 */
export function runWithTransition(callback: () => void): void {
	if (prefersReducedMotion() || isSmallViewport()) {
		callback();
		return;
	}

	if ('startViewTransition' in document) {
		(document as any).startViewTransition(callback);
		return;
	}
	callback();
}
