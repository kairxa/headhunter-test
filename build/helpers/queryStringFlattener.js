export default function (object) {
  let obj = {};
  if (object) {
    obj = JSON.parse(JSON.stringify(object));
  }
  const entries = Object.entries(obj);
  const query = entries.map(entry => entry.join('=')).join('&');
  return `?${query}`;
}
