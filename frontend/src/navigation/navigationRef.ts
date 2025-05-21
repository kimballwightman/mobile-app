import {
  createNavigationContainerRef,
  StackActions,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';

// Create a navigation reference that can be used outside of components
export const navigationRef = createNavigationContainerRef();

// Helper functions to navigate from anywhere in the app
export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  } else {
    // Could add a queue mechanism here to handle navigation when the ref is not ready
    console.warn('Navigation ref is not ready yet!');
  }
}

export function push(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.dispatch(StackActions.push(name, params));
  } else {
    console.warn('Navigation ref is not ready yet!');
  }
}

export function replace(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.dispatch(StackActions.replace(name, params));
  } else {
    console.warn('Navigation ref is not ready yet!');
  }
}

export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  } else {
    console.warn('Navigation ref is not ready yet!');
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.warn('Cannot go back or navigation ref is not ready yet!');
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
  return null;
}

// Centralized navigation service
const NavigationService = {
  navigate,
  push,
  replace,
  popToTop,
  goBack,
  getCurrentRoute,
};

export default NavigationService; 