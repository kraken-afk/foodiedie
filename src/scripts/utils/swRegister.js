export default async function swRegister() {
  if (!('serviceWorker' in navigator)) return;
  await navigator.serviceWorker.register('./sw.js', {
    scope: '/',
  });
}
