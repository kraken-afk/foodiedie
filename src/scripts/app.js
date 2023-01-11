import 'regenerator-runtime'; /* for async await transpile */
import './root';
import './components/Footer';
import '@scss/main.scss';
import '@public/site.webmanifest';
import '@public/images/heros/summary_large_image.png';
import '@public/images/heros/og.png';
import swRegister from '@utils/swRegister';
import installPrompt from '@utils/installPrompt';
import swalInit from '@utils/swalInit';

swRegister();
installPrompt();
swalInit();