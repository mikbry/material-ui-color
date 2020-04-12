/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useTranslate from '../src/helpers/useTranslate';

test('useTranslate init', () => {
  expect(useTranslate).toBeDefined();
});

test('useTranslate', () => {
  const hook = () => ({ t: v => v, i18n: { language: 'fr' } });
  let { t, i18n } = useTranslate(hook);
  expect(i18n.language).toEqual('fr');
  let v = t('test');
  expect(v).toEqual('test');
  ({ t, i18n } = useTranslate());
  expect(i18n.language).toEqual('fr');
  v = t('test');
  expect(v).toEqual('test');
});
