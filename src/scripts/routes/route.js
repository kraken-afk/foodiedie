import HomeComponent from '@components/HomePage';

class RouteProxy {
  constructor() {
    this.location = window.location.pathname;
    onpopstate = (event) => this.onpopstateHandler(event);
  }

  pathHandler = {
    notFound: async () => {
      const { default: NotFound} = await import('@components/404');
      return new NotFound();
    },
    default: () => {
      return new HomeComponent();
    },
    detail: async (path) => {
      const id = path.split(':')[1];
      const { default: DetailComponent} = await import('@components/DetailPage');
      return new DetailComponent(id);
    },
    favourite: async () => {
      const { default: FavouriteComponent} = await import('@components/FavouritePage');
      return new FavouriteComponent();
    },
    searchPage: async (path) => {
      const value = path.split('?')[1].split('=')[1];
      const { default: SearchPageComponent} = await import('@components/SearchPage');
      return new SearchPageComponent(value);
    },
  };

  map(path) {
    if (path.includes('detail')) {
      const id = path.split('/').filter(Boolean)[1];
      return `/detail:${id}`;
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
  }

  go(path) {
    window.history.pushState(path, 'route', path);
    this.location = this.map(path);
  }

  getPage() {
    return this.page(this.location);
  }

  async onchange(callback) {
    const { watch } = await import('melanke-watchjs');
    watch(this, 'location', callback);
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

const Route = new RouteProxy();
export default Route;
