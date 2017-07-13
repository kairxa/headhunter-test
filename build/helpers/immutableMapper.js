export default function (sets, firstSet, secondSet) {
  let copy = firstSet;

  for (let i = 0; i < sets.length; i += 1) {
    copy = copy.setIn(sets[i], copy.getIn(sets[i]).merge(secondSet.getIn(sets[i])));
  }

  return copy;
}
