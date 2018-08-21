export default function shallowEquals (a, b) {
  for (const i in a) {
    // NaN === NaN is false in Javascript
    if(isNaN(b[i]) && isNaN(a[i])) {
      continue
    }
    if (b[i] !== a[i]) {
      console.log('DID NOT MATCH', i, a[i], b[i])
      return false
    }
  }

  for (const i in b) {
    // NaN === NaN is false in Javascript
    if(isNaN(b[i]) && isNaN(a[i])) {
      continue
    }

    if (b[i] !== a[i]) {
      return false
    }
  }

  return true
}
