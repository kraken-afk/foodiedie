import swRegister from '@utils/swRegister';
import installPrompt from '@utils/installPrompt';

const PWAFeature = {
  enable() {
    swRegister();
    installPrompt();
  },
};

export default PWAFeature;
