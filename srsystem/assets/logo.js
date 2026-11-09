/* ==========================================================================
   SRSystem 로고 시안 — 1 티켓 · 2 진행 · 3 모노그램
   - [data-srs-logo="1|2|3"]   : 락업(심볼 + 글자) 렌더
   - [data-srs-symbol="1|2|3"] : 심볼만 렌더 (아이콘 크기 비교용)
   - 로그인 화면(.b-mark): ?logo=1|2|3 이면 해당 시안으로 교체, 리뷰 도크에 '로고 1·2·3' 전환 추가
     (같은 번호를 다시 누르면 현재 로고로 돌아감)
   ========================================================================== */
(function () {
  'use strict';

  var NAMES = { '1': '티켓', '2': '진행', '3': '모노그램' };
  var TICKET = 'M10 0H54A10 10 0 0 1 64 10V16A6 6 0 0 0 64 28V34A10 10 0 0 1 54 44H10A10 10 0 0 1 0 34V28A6 6 0 0 0 0 16V10A10 10 0 0 1 10 0Z';
  /* 4등분 원(요청→접수→처리→완료, 12시부터 시계 방향), 조각 사이 간격 1.6 */
  var PIE = [
    ['M25.13 22.87L25.13 1.87A21 21 0 0 1 46.13 22.87Z', 0.28],
    ['M25.13 25.13L46.13 25.13A21 21 0 0 1 25.13 46.13Z', 0.52],
    ['M22.87 25.13L22.87 46.13A21 21 0 0 1 1.87 25.13Z', 0.76],
    ['M22.87 22.87L1.87 22.87A21 21 0 0 1 22.87 1.87Z', 1]
  ];

  var SYMBOL = {
    '1': function () {
      return '<svg class="sl-symbol" viewBox="0 0 64 44" aria-hidden="true">' +
        '<path fill="currentColor" d="' + TICKET + '"/>' +
        '<text x="32" y="29.3" text-anchor="middle">SR</text></svg>';
    },
    '2': function () {
      return '<svg class="sl-symbol sl-pie" viewBox="0 0 48 48" aria-hidden="true">' +
        PIE.map(function (p, i) {
          return '<path fill="currentColor" fill-opacity="' + p[1] + '" style="--i:' + i + '" d="' + p[0] + '"/>';
        }).join('') + '</svg>';
    },
    '3': function () { return '<span class="sl-sr" aria-hidden="true">SR</span>'; }
  };
  var KIND = { '1': 'ticket', '2': 'flow', '3': 'mono' };

  function lockup(v) {
    if (v === '1') {
      return '<span class="srs-logo srs-logo--ticket" role="img" aria-label="SRSystem">' + SYMBOL['1']() +
        '<span class="sl-word" aria-hidden="true">System</span></span>';
    }
    if (v === '2') {
      return '<span class="srs-logo srs-logo--flow" role="img" aria-label="SRSystem">' + SYMBOL['2']() +
        '<span class="sl-word" aria-hidden="true"><b>SR</b>System</span></span>';
    }
    if (v === '3') {
      return '<span class="srs-logo srs-logo--mono" role="img" aria-label="SRSystem — Service Request System">' + SYMBOL['3']() +
        '<span class="sl-rule" aria-hidden="true"></span>' +
        '<span class="sl-desc" aria-hidden="true"><span>Service</span><span>Request</span><span>System</span></span></span>';
    }
    return '';
  }
  function symbol(v) {
    if (!SYMBOL[v]) return '';
    return '<span class="srs-logo srs-logo--' + KIND[v] + ' srs-logo--symbol" role="img" aria-label="SRSystem 심볼">' + SYMBOL[v]() + '</span>';
  }
  function renderAll(root) {
    var r = root || document;
    Array.prototype.forEach.call(r.querySelectorAll('[data-srs-logo]'), function (el) { el.innerHTML = lockup(el.getAttribute('data-srs-logo')); });
    Array.prototype.forEach.call(r.querySelectorAll('[data-srs-symbol]'), function (el) { el.innerHTML = symbol(el.getAttribute('data-srs-symbol')); });
  }
  window.SRSLogo = { lockup: lockup, symbol: symbol, render: renderAll, names: NAMES };
  renderAll();

  /* ── 로그인 화면 연동 ─────────────────────────────────────────── */
  var mark = document.querySelector('.b-mark');
  if (!mark) return;
  var original = mark.innerHTML;

  function setLogo(v) {
    var params = new URLSearchParams(location.search);
    if (SYMBOL[v]) {
      mark.innerHTML = lockup(v);
      mark.setAttribute('data-logo', v);
      params.set('logo', v);
    } else {
      v = '';
      mark.innerHTML = original;
      mark.removeAttribute('data-logo');
      params.delete('logo');
    }
    var qs = params.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    Array.prototype.forEach.call(document.querySelectorAll('.rd-logo-pill'), function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-logo') === v);
    });
  }

  var dock = document.querySelector('.review-dock');
  var closeBtn = dock && dock.querySelector('.rd-close');
  if (closeBtn) {
    closeBtn.insertAdjacentHTML('beforebegin',
      '<span class="rd-sep"></span><span class="rd-label">로고</span>' +
      ['1', '2', '3'].map(function (v) {
        return '<button type="button" class="rd-pill rd-logo-pill" data-logo="' + v + '" title="로고 ' + v + ' · ' + NAMES[v] + ' (다시 누르면 현재 로고)">' + v + '</button>';
      }).join(''));
    Array.prototype.forEach.call(dock.querySelectorAll('.rd-logo-pill'), function (p) {
      p.addEventListener('click', function () { setLogo(p.classList.contains('is-active') ? '' : p.getAttribute('data-logo')); });
    });
  }

  var initial = new URLSearchParams(location.search).get('logo');
  if (SYMBOL[initial]) setLogo(initial);
})();
