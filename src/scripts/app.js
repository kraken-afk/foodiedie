import 'regenerator-runtime'; /* for async await transpile */
import './root';
import './components/Footer';
import '@scss/main.scss';
import '@public/site.webmanifest';
import '@public/images/heros/summary_large_image.png';
import '@public/images/heros/og.png';
import PWAFeature from '@utils/PWAFeature';

PWAFeature.enable();
