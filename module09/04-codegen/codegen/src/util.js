export default class Util {
  static #transform({ string: [firstLetter, ...rest], upperCase = true }) {
    if (!firstLetter) return '';

    const firstLetterTransformed = upperCase
      ? firstLetter.toUpperCase()
      : firstLetter.toLowerCase();

    return [firstLetterTransformed, ...rest].join('');
  }

  static upperCaseFirstLetter(string) {
    return Util.#transform({ string });
  }

  static lowerCaseFirstLetter(string) {
    return Util.#transform({ string, upperCase: false });
  }
}
