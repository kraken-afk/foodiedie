export default async function() {
  if (!'serviceWorker' in navigator) return;

  try {
    await navigator.serviceWorker.register('./sw.js', {
      scope: '/'
    });
  } catch (error) {
    console.error('Registration failed with error: ', error);
  }
}