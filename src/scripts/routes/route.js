import HomeComponent from '@components/HomePage';
import DetailComponent from '@components/DetailPage';
import NotFound from '@components/404';

class RouteProxy {
  constructor() {
    this.location = window.location.pathname;
  }

  map(path) {
    if (path.includes('detail')) {
      const id = path.split('/').filter(Boolean)[1];
      console.log(id);
      return '/detail:' + id;
    }

    return path;
  }

  page(path) {
    if (path === '/') {
      return new HomeComponent();
    }

    if (path.includes('/detail')) {
      const id = path.split(':')[1];
      return new DetailComponent(id);
    }

    return new NotFound();
  };

  go(path)  {
    window.history.pushState(null, null, path);
    this.location = this.map(path);
  }

  getPage() {
    return this.page(this.location);
  }
}

const Route = new RouteProxy;
export default Route;