export default async function favouriteClickHandler(db = null, data = null) {
  if (db === null) return;

  const favBtn = document.getElementById('favouriteBtn');
  const { restaurant } = data;

  if (+favBtn.dataset.isfav) {
    await db.remove(restaurant.id);
    favBtn.dataset.isfav = 0;
  } else {
    await db.add(restaurant);
    favBtn.dataset.isfav = 1;
  }
}
