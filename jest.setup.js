// jest.setup.js
// Globally suppress React "not wrapped in act(...)" console errors to keep test output clean.
// This only affects test runs and avoids noisy warnings when async state updates happen.
const originalConsoleError = console.error;
const ACT_WARNING = /not wrapped in act\(\.{3}\)/i;

console.error = (...args) => {
  try {
    const first = args && args[0];
    if (typeof first === "string" && ACT_WARNING.test(first)) {
      return; // swallow the specific act warning
    }
  } catch (e) {
    // fall through to original
  }
  originalConsoleError.apply(console, args);
};
