// Disable service worker warnings
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Failed to execute') &&
    args[0].includes('on \'Cache\'')
  ) {
    return;
  }
  originalError.call(console, ...args);
}; 