import NotFound from '@components/404';
import DetailComponent from '../components/DetailPage';
import HomeComponent from '../components/HomePage';
import FavouriteComponent from '../components/FavouritePage';
import SearchPageComponent from '../components/SearchPage';


class RouteProxy {
  constructor() {
    this.location = window.location.pathname;
    onpopstate = (event) => this.onpopstateHandler(event);
  }

  pathHandler = {
    notFound: () => new NotFound(),
    default: () => new HomeComponent(),
    detail: (path) => {
      const id = path.split(':')[1];
      return new DetailComponent(id);
    },
    favourite: () => new FavouriteComponent(),
    searchPage: (path) => {
      const value = path.split('?')[1].split('=')[1];
      return new SearchPageComponent(value);
    },
  };

  map(path) {
    if (path.includes('detail')) {
      const id = path.split('/').filter(Boolean)[1];
      return '/detail:' + id;
    }
    return path;
  }

  page(path) {
    const { pathHandler } = this;
    const title = document.head.querySelector('title');

    if (path === '/') {
      title.textContent = 'Foodiedie';
      return pathHandler.default();
    }

    if (path.includes('/detail')) {
      title.textContent = 'Foodiedie | Detail';
      return pathHandler.detail(path);
    }

    if (path === '/favourite') {
      title.textContent = 'Foodiedie | Favourite';
      return pathHandler.favourite();
    }

    if (path.includes('/search')) {
      title.textContent = 'Foodiedie | Search';
      return pathHandler.searchPage(path);
    }

    return pathHandler.notFound();
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