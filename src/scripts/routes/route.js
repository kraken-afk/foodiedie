import NotFound from '@components/404';
import DetailComponent from '../components/DetailPage';
import HomeComponent from '../components/HomePage';
import FavouriteComponent from '../components/FavouritePage';


class RouteProxy {
  constructor() {
    this.location = window.location.pathname;
    onpopstate = (event) => this.onpopstateHandler(event);
  }

  map(path) {
    if (path.includes('detail')) {
      const id = path.split('/').filter(Boolean)[1];
      return '/detail:' + id;
    }
    return path;
  }

  page(path) {
    if (path === '/') {
      return new HomeComponent()
    }

    if (path.includes('/detail')) {
      const id = path.split(':')[1];
      return new DetailComponent(id);
    }

    if (path === '/favourite') {
      return new FavouriteComponent();
    }

    return new NotFound();
  };

  go(path)  {
    window.history.pushState(path, 'route', path);
    this.location = this.map(path);
  }

  getPage() {
    return this.page(this.location);
  }

  async onchange(callback) {
    const { watch } = await import('melanke-watchjs');
    watch(Route, 'location', callback);
  }

  onpopstateHandler(event) {
    const { state: path } = event;

    if (!path) this.location = '/';
    else this.location = this.map(path);
  }

  back() {
    window.history.back();
  }
}

const Route = new RouteProxy;
export default Route;