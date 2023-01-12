import swal from 'sweetalert';

export default function installPrompt() {
  window.addEventListener('beforeinstallprompt', (event) => {
    let defferedPrompt = event;
    event.preventDefault();
    setTimeout(() => {
      swal({
        icon: 'info',
        title: 'Install Foodiedie',
        text: 'Add Foodiedie to your homescreen for best experience',
        buttons: ['nah.. im good', 'install'],
      }).then((value) => {
        if (value) defferedPrompt.prompt();
        defferedPrompt = null;
      });
    }, 4000);
  });
}
