import swRegister from '@utils/swRegister';
import installPrompt from '@utils/installPrompt';
import swalInit from '@utils/swalInit';

const PWAFeature = {
  enable() {
    swRegister();
    installPrompt();
    swalInit();
  },
};

export default PWAFeature;
