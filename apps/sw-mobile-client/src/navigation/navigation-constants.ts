import { AuthenticatedScreens, AuthenticatedStackScreens, ModalScreens, Stacks, UnauthenticatedScreens, UnauthenticatedStackScreens } from './navigation-types';

export const unauthenticated: Record<UnauthenticatedScreens, UnauthenticatedScreens> = {
  'welcome-screen': 'welcome-screen',
  'sign-in-screen': 'sign-in-screen',
  'sign-up-screen': 'sign-up-screen',
  'selector-modal-screen': 'selector-modal-screen',
  'schedule-modal-screen': 'schedule-modal-screen',
};

export const authenticated: Record<AuthenticatedScreens, AuthenticatedScreens> = {
  'selector-modal-screen': 'selector-modal-screen',
  'schedule-modal-screen': 'schedule-modal-screen',
  'home-screen': 'home-screen',
  'explore-screen': 'explore-screen',
  'settings-screen': 'settings-screen',
  'event-screen': 'event-screen',
  'plans-screen': 'plans-screen',
};

/**
 * This is a map of all the screens that are available to the app.
 * Also, lets keep in mind that there are 3 stacks in the app:
 * 1. Authenticated stack
 * 2. Unauthenticated stack
 * 3. Modals stack -- this is available to both authenticated and unauthenticated stacks
 */
export const screens = {
  authenticated,
  unauthenticated,
} as const;

// Stacks
export const rootStack: Record<Stacks, Stacks> = {
  'authenticated-stack': 'authenticated-stack',
  'authenticated-tab': 'authenticated-tab',
  'unauthenticated-stack': 'unauthenticated-stack',
  'modals-stack': 'modals-stack',
};

export const modalStack: Record<ModalScreens, ModalScreens> = {
  'selector-modal-screen': 'selector-modal-screen',
  'schedule-modal-screen': 'schedule-modal-screen',
};

export const authenticatedStack: Record<AuthenticatedStackScreens, AuthenticatedStackScreens> = {
  'event-screen': 'event-screen',
  'plans-screen': 'plans-screen',
};

export const unauthenticatedStack: Record<UnauthenticatedStackScreens, UnauthenticatedStackScreens> = {
  'welcome-screen': 'welcome-screen',
  'sign-in-screen': 'sign-in-screen',
  'sign-up-screen': 'sign-up-screen',
};
