/* ==========================================================================
   SRSystem Login — 브랜드 전환 (POLY ↔ CANB)
   - <html data-brand> 첫 지정은 head 인라인 스크립트(깜빡임 방지), 이 파일은 탭·저장 담당
   - 마지막 선택 유지: localStorage 'srsBrand' / 링크로 지정: ?brand=canb
   - 탭 키보드: ←/→, Home/End (WAI-ARIA Tabs)
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'srsBrand';

  /* CANB 마크 — canb-english.com 공식 로고(img/logo.svg)의 CANB 심볼 4도형 */
  document.body.insertAdjacentHTML('afterbegin',
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">' +
    '<symbol id="canb-wordmark" viewBox="0 0 113.4 53"><g fill="currentColor"><path d="M30.02 40.63H58.27L44.14 12.37L30.02 40.63Z"/><path d="M14.13 12.37C11.33 12.37 8.6 13.2 6.28 14.75C3.95 16.3 2.14 18.51 1.08 21.09C0.01 23.67 -0.27 26.52 0.27 29.26C0.82 32 2.16 34.52 4.14 36.49C6.11 38.47 8.63 39.82 11.37 40.36C14.11 40.91 16.95 40.63 19.53 39.56C22.11 38.49 24.32 36.68 25.87 34.35C27.42 32.03 28.25 29.3 28.25 26.5H14.13V12.37Z"/><path d="M105.72 26.5C108.46 24.98 110.61 22.6 111.85 19.72C113.09 16.84 113.34 13.63 112.55 10.6C111.77 7.57 110 4.88 107.53 2.96C105.05 1.04 102.01 -0 98.88 0V53C102.01 53 105.05 51.96 107.53 50.04C110 48.12 111.77 45.43 112.55 42.4C113.34 39.37 113.09 36.16 111.85 33.28C110.61 30.4 108.46 28.02 105.72 26.5Z"/><path d="M77.68 12.37C73.94 12.37 70.34 13.86 67.7 16.51C65.05 19.16 63.56 22.75 63.56 26.5V40.63L77.68 26.5L91.81 40.63V26.5C91.81 24.64 91.44 22.81 90.73 21.09C90.02 19.38 88.98 17.82 87.67 16.51C86.36 15.19 84.8 14.15 83.09 13.44C81.38 12.73 79.54 12.37 77.68 12.37Z"/></g></symbol></svg>');

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-brand-tab]'));
  if (!tabs.length) return;
  var panel   = document.getElementById('brandPanel');
  var field   = document.getElementById('brandField');

  function current() { return root.getAttribute('data-brand') === 'canb' ? 'canb' : 'poly'; }

  function sync(b) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-brand-tab') === b;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && panel) panel.setAttribute('aria-labelledby', t.id);
    });
    if (field) field.value = b;
  }

  function apply(b) {
    b = b === 'canb' ? 'canb' : 'poly';
    var changed = b !== current();
    root.setAttribute('data-brand', b);
    try { localStorage.setItem(KEY, b); } catch (e) {}
    sync(b);
    if (!changed) return;
    window.dispatchEvent(new CustomEvent('auth:input'));                      /* 시안 B 리본 물결 */
    window.dispatchEvent(new CustomEvent('brandchange', { detail: { brand: b } }));
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { apply(t.getAttribute('data-brand-tab')); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') n = tabs[0];
      else if (e.key === 'End') n = tabs[tabs.length - 1];
      if (!n) return;
      e.preventDefault();
      n.focus();
      apply(n.getAttribute('data-brand-tab'));
    });
  });

  sync(current());
  try { localStorage.setItem(KEY, current()); } catch (e) {}
})();
