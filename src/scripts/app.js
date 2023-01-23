import './root';
import '@components/Footer';
import '@utils/skipContentListener';
import '@scss/main.scss';
import '@public/site.webmanifest';
import '@public/images/heros/og.png';
import PWAFeature from '@utils/PWAFeature';

PWAFeature.enable();
