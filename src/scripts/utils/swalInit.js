import swal from 'sweetalert';

export default async function swalInit() {
  window.addEventListener('offline', () => {
    console.log('offline');
    swal({
      title: 'You\'re offline',
      icon: 'warning',
      text: 'Please check your internet connection!',
      button: 'ok'
    });
  });

  window.addEventListener('online', () => {
    console.log('online');
    swal({
      title: 'You\'re connected',
      icon: 'info',
      button: 'nice'
    });
  });
}