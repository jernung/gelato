/**
 * Class for handling localization strings.
 */
class GelatoLocale {

  /**
   * Create a new locale instance.
   * @param {object} primary
   * @param {object} [secondary]
   */
  constructor(primary, secondary) {
    this.set(primary, secondary);
  }

  /**
   * Get the locale value at the provided path.
   * @param {string} path
   * @returns {string}
   */
  get(path) {
    return _.get(this._primary, path) || _.get(this._secondary, path);
  }

  /**
   * Set primary and secondary locale objects.
   * @param {object} primary
   * @param {object} [secondary]
   */
  set(primary, secondary) {
    this._primary = primary;
    this._secondary = secondary;
  }

}

Gelato = Gelato || {};

Gelato.Locale = GelatoLocale;
