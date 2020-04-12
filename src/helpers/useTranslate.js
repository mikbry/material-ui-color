/* eslint-disable no-bitwise */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const globalTranslate = { use: () => ({ i18n: { language: 'us' }, t: v => v }) };

const useTranslate = _translation => {
  if (_translation) globalTranslate.use = _translation;
  return globalTranslate.use();
};

export default useTranslate;
