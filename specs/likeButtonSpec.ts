import { fixture, expect } from "@open-wc/testing";
import LikeButton from '@components/DetailPage/LikeButton.js';
import favouriteClickHandler from '@components/DetailPage/handlers/favouriteClickHandler';
import openLocalDb from '@utils/indexedDb';

describe('like button test suite', () => {
  let db;

  before(async () => {
    db = await openLocalDb();
  });

  beforeEach(async () => {
    const clickHandler: Function = () => {
      const id: string = crypto.randomUUID();
      return function() {
        favouriteClickHandler(db, { restaurant: { id } });
      }
    };
    fixture(new LikeButton(clickHandler()).render());
  });

  afterEach(async () => {
    const data = await db.getAll();
    if (!data.length) return;
    data.forEach(({ id }) => db.remove(id) );
  });

  it('Should has isfav attribute and has value 0 as default', () => {
    const button = document.getElementById('favouriteBtn');
    expect(button.dataset.isfav).to.equal('0');
  });

  it('Should change value to 1 if button clicked', async () => {
    const button = document.getElementById('favouriteBtn');
    await button.dispatchEvent(new Event('click'));
    expect(button.dataset.isfav).to.equal('1');
  });

  it('Should adding restaurant into indexedDb', async () => {
    const button = document.getElementById('favouriteBtn');
    await button.dispatchEvent(new Event('click'));
    const data = await db.getAll();
    expect(data.length).to.equal(1);
  });

  it('Should delete restaurant from indexedDb if clicked at second time', async () => {
    const button = document.getElementById('favouriteBtn');
    let data;

    await button.dispatchEvent(new Event('click'));

    data = await db.getAll();
    expect(data.length).to.equal(1);

    await button.dispatchEvent(new Event('click'));

    data = await db.getAll();
    expect(data.length).to.equal(0);
  });

  it ('Should set back isfav attribute to zero', async () => {
    const button = document.getElementById('favouriteBtn');

    expect(button.dataset.isfav).to.equal('0');
    await button.dispatchEvent(new Event('click'));

    expect(button.dataset.isfav).to.equal('1');
    await button.dispatchEvent(new Event('click'));

    expect(button.dataset.isfav).to.equal('0');
  });
});
