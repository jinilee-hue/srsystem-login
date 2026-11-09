/* js/layout.js — Sidebar & Topbar rendering */

const NAV_ITEMS = [
  { icon: 'home',        label: '대시보드',  href: 'index.html' },
  { icon: 'users',       label: '학생 관리', href: 'students.html' },
  { icon: 'book-open',   label: '수강 관리', href: 'courses.html' },
  { icon: 'cal-check',   label: '출결 관리', href: 'attendance.html' },
  { icon: 'bar-chart',   label: '성적 관리', href: 'grades.html' },
  { icon: 'credit-card', label: '수납 관리', href: 'payments.html' },
  { icon: 'user-check',  label: '강사 관리', href: 'teachers.html' },
  { icon: 'bell',        label: '공지사항',  href: 'notices.html' },
  { icon: 'message',     label: '상담 관리', href: 'counseling.html' },
  { icon: 'settings',    label: '설정',      href: 'settings.html' },
  { icon: 'refresh',     label: '컴포넌트 데모', href: 'modal-demo.html' },
];

/* 상단 네비 전용 그룹 구조 (2-depth 드롭다운) */
const TOP_NAV_GROUPS = [
  { label: '대시보드',  icon: 'home',        href: 'index.html' },
  { label: '학생/강사', icon: 'users',       children: [
    { label: '학생 관리', href: 'students.html' },
    { label: '강사 관리', href: 'teachers.html' },
  ]},
  { label: '수강/출결', icon: 'book-open',   children: [
    { label: '수강 관리', href: 'courses.html' },
    { label: '출결 관리', href: 'attendance.html' },
    { label: '성적 관리', href: 'grades.html' },
  ]},
  { label: '수납 관리', icon: 'credit-card', href: 'payments.html' },
  { label: '소통',      icon: 'bell',        children: [
    { label: '공지사항',  href: 'notices.html' },
    { label: '상담 관리', href: 'counseling.html' },
  ]},
  { label: '설정',      icon: 'settings',    href: 'settings.html' },
  { label: '컴포넌트 데모', icon: 'refresh',     href: 'modal-demo.html' },
];

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'book-open': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  'cal-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>`,
  'bar-chart': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  'credit-card': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  'user-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  'layout-side': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>`,
  'layout-top':  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
};

/* Apply saved theme immediately to prevent FOUC */
(function () {
  const t = localStorage.getItem('epTheme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

function _syncThemeBtn() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = dark ? ICONS.sun : ICONS.moon;
  btn.title = dark ? '라이트 모드' : '다크 모드';
  btn.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
}

function initLayout(currentHref) {
  var navMode = localStorage.getItem('epNav') || 'side';
  document.documentElement.setAttribute('data-layout', navMode);

  /* ── 사이드바 (side 모드) ── */
  if (navMode === 'side') {
    var sideEl = document.getElementById('sidebar');
    if (sideEl) {
      var chevSvg = '<svg class="nav-group-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

      var navHtml = TOP_NAV_GROUPS.map(function (group) {
        if (group.children && group.children.length) {
          var isActiveGroup = group.children.some(function (c) { return c.href === currentHref; });
          var childrenHtml = group.children.map(function (child) {
            return '<a href="' + child.href + '" class="nav-item nav-item-child' + (child.href === currentHref ? ' active' : '') + '">' +
              '<span>' + child.label + '</span></a>';
          }).join('');
          return '<div class="nav-group' + (isActiveGroup ? ' open' : '') + '">' +
            '<button class="nav-group-trigger' + (isActiveGroup ? ' active' : '') + '" type="button">' +
              (ICONS[group.icon] || '') +
              '<span>' + group.label + '</span>' +
              chevSvg +
            '</button>' +
            '<div class="nav-group-children">' + childrenHtml + '</div>' +
          '</div>';
        } else {
          return '<a href="' + group.href + '" class="nav-item' + (group.href === currentHref ? ' active' : '') + '">' +
            (ICONS[group.icon] || '') + '<span>' + group.label + '</span></a>';
        }
      }).join('');

      sideEl.innerHTML =
        '<div class="sidebar-logo"><div>' +
          '<span class="sidebar-brand">EduPoly</span>' +
          '<span class="sidebar-tagline">캠퍼스 관리</span>' +
        '</div></div>' +
        '<nav class="sidebar-nav">' + navHtml + '</nav>' +
        '<div class="sidebar-footer"><div class="sidebar-user">' +
          '<div class="user-avatar">이진</div>' +
          '<div class="user-info"><span class="user-name">이진희</span><span class="user-role">관리자</span></div>' +
          '<button class="sidebar-logout" type="button" aria-label="로그아웃">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
          '</button>' +
        '</div></div>';

      /* 그룹 트리거 클릭 → 첫 번째 자식 페이지로 이동 */
      sideEl.querySelectorAll('.nav-group-trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var firstChild = this.closest('.nav-group').querySelector('.nav-item-child');
          if (firstChild && firstChild.href) window.location.href = firstChild.href;
        });
      });

      /* ── 모바일 햄버거 + 오버레이 드로어 ── */
      var _overlay = document.createElement('div');
      _overlay.className = 'sidebar-overlay';
      document.body.appendChild(_overlay);

      var _hamburger = document.createElement('button');
      _hamburger.className = 'hamburger-btn';
      _hamburger.type = 'button';
      _hamburger.setAttribute('aria-label', '메뉴');
      _hamburger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      var _topbarLeft = document.querySelector('.topbar-left');
      if (_topbarLeft) _topbarLeft.insertBefore(_hamburger, _topbarLeft.firstChild);

      function _closeSidebar() {
        sideEl.classList.remove('is-open');
        _overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      _hamburger.addEventListener('click', function () {
        var open = sideEl.classList.toggle('is-open');
        _overlay.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      _overlay.addEventListener('click', _closeSidebar);
      sideEl.querySelectorAll('.nav-item, .nav-item-child').forEach(function (el) {
        el.addEventListener('click', _closeSidebar);
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 640) _closeSidebar();
      });
    }
  }

  /* ── 상단 네비바 (top 모드) — topbar 위에 삽입 ── */
  if (navMode === 'top') {
    var _chevronSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

    /* 네비바 컨테이너 */
    var topnavBar = document.createElement('header');
    topnavBar.className = 'topnav-bar';

    /* 브랜드 */
    var topBrand = document.createElement('div');
    topBrand.className = 'topnav-bar-brand';
    topBrand.innerHTML = '<span class="sidebar-brand">EduPoly</span><span class="sidebar-tagline">캠퍼스 관리</span>';
    topnavBar.appendChild(topBrand);

    /* 네비 아이템 */
    var topnav = document.createElement('nav');
    topnav.className = 'topnav';

    TOP_NAV_GROUPS.forEach(function (group) {
      if (group.children && group.children.length) {
        /* 드롭다운 그룹 */
        var isActiveGroup = group.children.some(function (c) { return c.href === currentHref; });
        var groupEl = document.createElement('div');
        groupEl.className = 'topnav-group';

        var trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'topnav-group-trigger' + (isActiveGroup ? ' active' : '');

        var tIcon = document.createElement('span');
        tIcon.className = 'topnav-item-icon';
        tIcon.innerHTML = ICONS[group.icon] || '';

        var tLabel = document.createElement('span');
        tLabel.textContent = group.label;

        var tChevron = document.createElement('span');
        tChevron.className = 'topnav-group-chevron';
        tChevron.innerHTML = _chevronSvg;

        trigger.appendChild(tIcon);
        trigger.appendChild(tLabel);
        trigger.appendChild(tChevron);

        var dropdown = document.createElement('div');
        dropdown.className = 'topnav-dropdown';
        group.children.forEach(function (child) {
          var a = document.createElement('a');
          a.href = child.href;
          a.className = 'topnav-dropdown-item' + (currentHref === child.href ? ' active' : '');
          a.textContent = child.label;
          dropdown.appendChild(a);
        });

        /* 클릭: 모든 사이즈에서 드롭다운 토글 (position:fixed로 overflow 클리핑 우회) */
        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          var wasOpen = dropdown.classList.contains('dd-open');
          document.querySelectorAll('.topnav-dropdown.dd-open').forEach(function (d) {
            d.classList.remove('dd-open');
            d.removeAttribute('style');
          });
          document.querySelectorAll('.topnav-group-trigger.dd-trigger-open').forEach(function (t) {
            t.classList.remove('dd-trigger-open');
            t.blur();
          });
          topnav.classList.remove('has-dd-open');
          if (!wasOpen) {
            var rect = trigger.getBoundingClientRect();
            if (window.innerWidth <= 1024) {
              dropdown.style.cssText = 'position:fixed;top:' + rect.bottom + 'px;left:0;right:0;width:100%;';
            } else {
              dropdown.style.cssText = 'position:fixed;top:' + rect.bottom + 'px;left:' + rect.left + 'px;min-width:' + Math.round(rect.width) + 'px;';
            }
            dropdown.classList.add('dd-open');
            trigger.classList.add('dd-trigger-open');
            topnav.classList.add('has-dd-open');
          }
        });

        groupEl.appendChild(trigger);
        groupEl.appendChild(dropdown);
        topnav.appendChild(groupEl);
      } else {
        /* 단일 링크 */
        var a = document.createElement('a');
        a.href = group.href;
        a.className = 'topnav-item' + (currentHref === group.href ? ' active' : '');

        var iSpan = document.createElement('span');
        iSpan.className = 'topnav-item-icon';
        iSpan.innerHTML = ICONS[group.icon] || '';

        var lSpan = document.createElement('span');
        lSpan.textContent = group.label;

        a.appendChild(iSpan);
        a.appendChild(lSpan);
        topnav.appendChild(a);
      }
    });

    topnavBar.appendChild(topnav);

    /* 태블릿·모바일 드롭다운: 외부 클릭 시 닫기 */
    document.addEventListener('click', function () {
      document.querySelectorAll('.topnav-dropdown.dd-open').forEach(function (d) {
        d.classList.remove('dd-open');
        d.removeAttribute('style');
      });
      document.querySelectorAll('.topnav-group-trigger.dd-trigger-open').forEach(function (t) {
        t.classList.remove('dd-trigger-open');
        t.blur();
      });
      topnav.classList.remove('has-dd-open');
    });

    /* 액션 버튼 자리 (이후 액션 블록이 채움) */
    var topBarActionsEl = document.createElement('div');
    topBarActionsEl.className = 'topnav-bar-actions';

    var topnavUser = document.createElement('div');
    topnavUser.className = 'topnav-user';
    topnavUser.innerHTML =
      '<button class="icon-btn" type="button" aria-label="로그아웃">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
      '</button>' +
      '<div class="user-avatar">이진</div>';
    topBarActionsEl.appendChild(topnavUser);

    topnavBar.appendChild(topBarActionsEl);

    /* main-content 안 topbar 바로 앞에 삽입 (메뉴가 타이틀보다 위) */
    var mainContent = document.querySelector('.main-content');
    var topbar = document.querySelector('.topbar');
    if (mainContent && topbar) {
      mainContent.insertBefore(topnavBar, topbar);
    } else if (mainContent) {
      mainContent.insertBefore(topnavBar, mainContent.firstChild);
    }

    /* 가장 넓은 1depth 아이템 기준으로 너비 통일 (데스크톱만) */
    document.fonts.ready.then(function () {
      if (window.innerWidth <= 1024) {
        /* 태블릿·모바일: 균등화 없이 활성 항목만 스크롤해서 보이게 */
        var activeItem = topnav.querySelector('.topnav-item.active, .topnav-group-trigger.active');
        if (activeItem) activeItem.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        return;
      }
      var allItems = Array.from(topnav.querySelectorAll('.topnav-item, .topnav-group-trigger'));
      var maxW = 0;
      allItems.forEach(function (el) { maxW = Math.max(maxW, el.offsetWidth); });
      if (maxW > 0) allItems.forEach(function (el) { el.style.width = maxW + 'px'; });
    });

  }

  /* ── 브레드크럼 ── */
  const titleEl = document.querySelector('.topbar-title');
  if (titleEl) {
    const currentItem = NAV_ITEMS.find(item => item.href === currentHref);
    const label = currentItem ? currentItem.label : titleEl.textContent.trim();
    const isHome = currentHref === 'index.html';

    /* top 모드: TOP_NAV_GROUPS에서 부모 그룹 탐색 */
    var parentGroup = null;
    if (navMode === 'top') {
      TOP_NAV_GROUPS.forEach(function (g) {
        if (g.children && g.children.some(function (c) { return c.href === currentHref; })) {
          parentGroup = g;
        }
      });
    }
    var ancestorHtml = parentGroup
      ? '<span class="breadcrumb-ancestor">' + parentGroup.label + '</span><span class="breadcrumb-sep">›</span>'
      : '';

    titleEl.outerHTML = isHome
      ? `<span class="breadcrumb-current">${label}</span>`
      : `<nav class="breadcrumb" aria-label="breadcrumb">
          <a href="index.html" class="breadcrumb-home" title="대시보드">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </a>
          <span class="breadcrumb-sep">›</span>
          ${ancestorHtml}
          <span class="breadcrumb-current">${label}</span>
        </nav>`;
  }

  /* ── 액션 버튼 (테마 토글 + 레이아웃 토글) ── */
  var _themeBtn = document.createElement('button');
  _themeBtn.className = 'icon-btn';
  _themeBtn.id = 'theme-toggle';
  _themeBtn.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('epTheme', next);
    _syncThemeBtn();
    if (typeof setChartDefaults === 'function') setChartDefaults();
    window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: next === 'dark' } }));
  });

  var _layoutBtn = document.createElement('button');
  _layoutBtn.className = 'icon-btn';
  _layoutBtn.id = 'layout-toggle';
  _layoutBtn.innerHTML = navMode === 'top' ? ICONS['layout-side'] : ICONS['layout-top'];
  _layoutBtn.title = navMode === 'top' ? '사이드바 메뉴로 전환' : '상단 메뉴로 전환';
  _layoutBtn.setAttribute('aria-label', _layoutBtn.title);
  _layoutBtn.addEventListener('click', function () {
    var cur = localStorage.getItem('epNav') || 'side';
    localStorage.setItem('epNav', cur === 'top' ? 'side' : 'top');
    location.reload();
  });

  if (navMode === 'top') {
    /* top 모드: topnav-bar-actions에 삽입 */
    var _topBarActions = document.querySelector('.topnav-bar-actions');
    if (_topBarActions) {
      _topBarActions.appendChild(_layoutBtn);
      _topBarActions.appendChild(_themeBtn);
    }
  } else {
    /* side 모드: topbar-actions에 삽입 */
    var _sideActions = document.querySelector('.topbar-actions');
    if (_sideActions) {
      _sideActions.insertBefore(_themeBtn, _sideActions.firstChild);
      _sideActions.insertBefore(_layoutBtn, _sideActions.firstChild);
    }
  }
  _syncThemeBtn();

  /* top 모드: 페이지 고유 버튼(내보내기·알림 등)을 topnav-bar-actions로 이동 */
  if (navMode === 'top') {
    var _topActionsTarget = document.querySelector('.topnav-bar-actions');
    var _pageActions = document.querySelector('.topbar-actions');
    if (_topActionsTarget && _pageActions) {
      var _pageButtons = Array.from(_pageActions.children);
      var _refBtn = _topActionsTarget.firstChild;
      _pageButtons.forEach(function (btn) {
        _topActionsTarget.insertBefore(btn, _refBtn);
      });
    }
  }

  _initTabBar(currentHref);
}

function icon(name) {
  return ICONS[name] || '';
}

/* 모달 오버레이 클릭 시 닫기 */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
});

/* ─── CUSTOM SELECT ─────────────────────────── */
function _csWrapSelect(sel) {
  if (sel.dataset.csInit) return;
  sel.dataset.csInit = '1';

  var options = Array.from(sel.options);
  var selectedIdx = sel.selectedIndex;

  var wrap = document.createElement('div');
  wrap.className = 'cs-wrap';

  var trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'cs-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  var labelSpan = document.createElement('span');
  labelSpan.className = 'cs-label';
  labelSpan.textContent = options[selectedIdx] ? options[selectedIdx].text : '';
  sel._csLabel = labelSpan;

  var chevronSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevronSvg.setAttribute('viewBox', '0 0 24 24');
  chevronSvg.setAttribute('fill', 'none');
  chevronSvg.setAttribute('stroke', 'currentColor');
  chevronSvg.setAttribute('stroke-width', '2');
  chevronSvg.setAttribute('stroke-linecap', 'round');
  chevronSvg.setAttribute('stroke-linejoin', 'round');
  chevronSvg.classList.add('cs-chevron');
  var pl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  pl.setAttribute('points', '6 9 12 15 18 9');
  chevronSvg.appendChild(pl);

  trigger.appendChild(labelSpan);
  trigger.appendChild(chevronSvg);

  var dropdown = document.createElement('div');
  dropdown.className = 'cs-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown._csTrigger = trigger;
  sel._csDropdown = dropdown;
  document.body.appendChild(dropdown);

  var ul = document.createElement('ul');

  options.forEach(function (opt, i) {
    var li = document.createElement('li');
    li.className = 'cs-option' + (i === selectedIdx ? ' selected' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', String(i === selectedIdx));
    li.textContent = opt.text;

    li.addEventListener('click', function (e) {
      e.stopPropagation();
      sel.value = opt.value;
      labelSpan.textContent = opt.text;
      ul.querySelectorAll('.cs-option').forEach(function (o) {
        o.classList.remove('selected');
        o.setAttribute('aria-selected', 'false');
      });
      li.classList.add('selected');
      li.setAttribute('aria-selected', 'true');
      closeDropdown();
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });

    ul.appendChild(li);
  });
  dropdown.appendChild(ul);

  sel.parentNode.insertBefore(wrap, sel);
  wrap.appendChild(trigger);
  sel.style.display = 'none';
  wrap.appendChild(sel);

  /* 가장 긴 옵션 기준 너비 설정 — probe span 방식
     dropdown 자체(.cs-dropdown)는 position:fixed+overflow:hidden 조합으로 offsetWidth가 부정확.
     대신 .cs-option과 동일 폰트·패딩의 임시 span으로 텍스트를 직접 측정한 뒤 삭제한다.
       probe.offsetWidth  = 텍스트 너비 + option 좌우 패딩(14px×2=28px)
       trigW = maxW + 20  = maxW - 28(option pad) + 48(trigger pad 46 + border 2), 최소 110px
       dropW = maxW + 6   = maxW + border 2 + 여유 4px,                             최소 92px  */
  var _calcDropdownWidth = function() {
    var probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;top:0;left:-9999px;visibility:hidden;' +
      'white-space:nowrap;padding:0 14px;border:none;outline:none;pointer-events:none;' +
      'font-size:var(--text-sm);font-family:var(--font-sans);font-weight:400;';
    document.body.appendChild(probe);
    var maxW = 0;
    dropdown.querySelectorAll('.cs-option').forEach(function(li) {
      probe.textContent = li.textContent;
      if (probe.offsetWidth > maxW) maxW = probe.offsetWidth;
    });
    document.body.removeChild(probe);
    var trigW = Math.max(maxW + 20, 110);
    var dropW = Math.max(trigW, maxW + 6, 92);
    trigger.style.width = trigW + 'px';
    dropdown.style.width = dropW + 'px';
  };
  _calcDropdownWidth();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(_calcDropdownWidth);
  }

  function positionDropdown() {
    var rect = trigger.getBoundingClientRect();
    var dropH = dropdown.scrollHeight || 200;
    dropdown.style.left = rect.left + 'px';
    dropdown.style.width = Math.max(rect.width, parseFloat(dropdown.style.width) || 0) + 'px';
    if (window.innerHeight - rect.bottom - 6 < dropH && rect.top > dropH + 6) {
      dropdown.style.top = (rect.top - dropH - 6) + 'px';
    } else {
      dropdown.style.top = (rect.bottom + 6) + 'px';
    }
  }

  function openDropdown() {
    document.querySelectorAll('.cs-dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      if (d._csTrigger) {
        d._csTrigger.classList.remove('open');
        d._csTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    positionDropdown();
    dropdown.classList.add('open');
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    trigger.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (dropdown.classList.contains('open')) closeDropdown();
    else openDropdown();
  });

  trigger.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDropdown();
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (dropdown.classList.contains('open')) closeDropdown();
      else openDropdown();
    }
  });

  dropdown.addEventListener('click', function (e) { e.stopPropagation(); });
}

function initCustomSelects() {
  document.querySelectorAll('select.filter-select, select.form-select').forEach(_csWrapSelect);

  if (!window._csClickBound) {
    window._csClickBound = true;
    document.addEventListener('click', function () {
      document.querySelectorAll('.cs-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
        if (d._csTrigger) {
          d._csTrigger.classList.remove('open');
          d._csTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      document.querySelectorAll('.fp-cal-dropdown.open').forEach(function (d) {
        if (d._close) d._close();
        else d.classList.remove('open');
      });
    });
  }
}

/* Flatpickr 월/연도 → 달력 내부 커스텀 드롭다운 */
function _fpCalDropdown(cal, triggerEl, items, onSelect) {
  var dropdown = document.createElement('div');
  dropdown.className = 'fp-cal-dropdown';
  dropdown.setAttribute('role', 'listbox');
  cal.appendChild(dropdown);

  var ul = document.createElement('ul');
  items.forEach(function(item, i) {
    var li = document.createElement('li');
    li.className = 'cs-option' + (item.selected ? ' selected' : '');
    li.setAttribute('role', 'option');
    li.textContent = item.text;
    li.addEventListener('click', function(e) {
      e.stopPropagation();
      ul.querySelectorAll('.cs-option').forEach(function(o) { o.classList.remove('selected'); });
      li.classList.add('selected');
      close();
      onSelect(item.value, i);
    });
    ul.appendChild(li);
  });
  dropdown.appendChild(ul);

  function open() {
    cal.querySelectorAll('.fp-cal-dropdown.open').forEach(function(d) { d.classList.remove('open'); });
    cal.querySelectorAll('.cs-trigger.open, .cs-year-trigger.open').forEach(function(t) { t.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); });
    var headerH = (cal.querySelector('.flatpickr-months') || {}).offsetHeight || 54;
    dropdown.style.top = headerH + 'px';
    dropdown.classList.add('open');
    triggerEl.classList.add('open');
    triggerEl.setAttribute('aria-expanded', 'true');
    setTimeout(function() {
      var sel = dropdown.querySelector('.cs-option.selected');
      if (sel) sel.scrollIntoView({ block: 'center' });
    }, 10);
  }
  function close() {
    dropdown.classList.remove('open');
    dropdown.style.top = '';
    triggerEl.classList.remove('open');
    triggerEl.setAttribute('aria-expanded', 'false');
  }

  triggerEl.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.contains('open') ? close() : open();
  });
  dropdown.addEventListener('click', function(e) { e.stopPropagation(); });

  dropdown._close = close;
  return { dropdown: dropdown, close: close,
    syncSelected: function(matchFn) {
      ul.querySelectorAll('.cs-option').forEach(function(li) {
        li.classList.toggle('selected', matchFn(li.textContent));
      });
    }
  };
}

function initFlatpickrSelects(fp) {
  var cal = fp.calendarContainer;

  /* ① 월 */
  var monthSel = cal.querySelector('.flatpickr-monthDropdown-months');
  if (monthSel && !monthSel.dataset.csInit) {
    monthSel.dataset.csInit = '1';
    var moOptions = Array.from(monthSel.options);
    var moIdx = fp.currentMonth;

    var moTrigger = document.createElement('button');
    moTrigger.type = 'button';
    moTrigger.className = 'cs-trigger fp-mo-trigger';
    moTrigger.setAttribute('aria-haspopup', 'listbox');
    moTrigger.setAttribute('aria-expanded', 'false');
    var moLabel = document.createElement('span');
    moLabel.className = 'cs-label';
    moLabel.textContent = moOptions[moIdx] ? moOptions[moIdx].text : '';
    monthSel._csLabel = moLabel;
    moTrigger.appendChild(moLabel);

    var moCtrl = _fpCalDropdown(cal, moTrigger,
      moOptions.map(function(o, i) { return { text: o.text, value: o.value, selected: i === moIdx }; }),
      function(val) {
        monthSel.value = val;
        var idx = monthSel.selectedIndex;
        moLabel.textContent = moOptions[idx] ? moOptions[idx].text : '';
        monthSel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    );
    monthSel._csDropdown = moCtrl.dropdown;

    /* 월 드롭다운 열리면 < > 숨김, 닫히면 복원 */
    function _syncMoArrows() {
      var open = moCtrl.dropdown.classList.contains('open');
      var pv = cal.querySelector('.flatpickr-prev-month');
      var nx = cal.querySelector('.flatpickr-next-month');
      if (pv) pv.style.visibility = open ? 'hidden' : '';
      if (nx) nx.style.visibility = open ? 'hidden' : '';
    }
    moTrigger.addEventListener('click', _syncMoArrows);
    document.addEventListener('click', _syncMoArrows);

    monthSel.parentNode.insertBefore(moTrigger, monthSel);
    monthSel.style.display = 'none';
  }

  /* ② 연도 — numInputWrapper를 숨기고 .flatpickr-current-month에 직접 추가 */
  var numWrap = cal.querySelector('.numInputWrapper');
  var currentMonthDiv = cal.querySelector('.flatpickr-current-month');
  if (!numWrap || !currentMonthDiv || currentMonthDiv.dataset.csYearInit) return;
  currentMonthDiv.dataset.csYearInit = '1';

  var curY = fp.currentYear;
  var yrPageBase = curY; /* 현재 표시 중인 년도 범위의 중심 */

  var yrTrigger = document.createElement('button');
  yrTrigger.type = 'button';
  yrTrigger.className = 'cs-trigger cs-year-trigger';
  yrTrigger.setAttribute('aria-haspopup', 'listbox');
  yrTrigger.setAttribute('aria-expanded', 'false');
  var yrLabel = document.createElement('span');
  yrLabel.className = 'cs-label';
  yrLabel.textContent = curY + '년';
  currentMonthDiv._csLabel = yrLabel;
  yrTrigger.appendChild(yrLabel);

  function _yrItems(base) {
    var items = [];
    for (var y = base - 10; y <= base + 10; y++) items.push({ text: String(y), value: y, selected: y === fp.currentYear });
    return items;
  }

  var yrCtrl = _fpCalDropdown(cal, yrTrigger, _yrItems(yrPageBase), function(val) {
    yrLabel.textContent = val + '년';
    fp.jumpToDate(new Date(val, fp.currentMonth, 1));
  });
  currentMonthDiv._csDropdown = yrCtrl.dropdown;

  /* 년도 범위 재렌더링 — < > 화살표로 이동 시 호출 */
  function _refreshYrList(newBase) {
    yrPageBase = newBase;
    var ul = yrCtrl.dropdown.querySelector('ul');
    if (!ul) return;
    ul.innerHTML = '';
    _yrItems(newBase).forEach(function(item) {
      var li = document.createElement('li');
      li.className = 'cs-option' + (item.selected ? ' selected' : '');
      li.textContent = item.text;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(item.selected));
      li.addEventListener('click', function(e) {
        e.stopPropagation();
        ul.querySelectorAll('.cs-option').forEach(function(o) { o.classList.remove('selected'); });
        li.classList.add('selected');
        yrCtrl.close();
        yrLabel.textContent = item.value + '년';
        fp.jumpToDate(new Date(item.value, fp.currentMonth, 1));
      });
      ul.appendChild(li);
    });
  }

  /* 달력 prev/next 화살표 — 년도 드롭다운 열려있을 때 범위 이동(4년씩), 닫혀있으면 정상 동작 */
  var prevArr = cal.querySelector('.flatpickr-prev-month');
  var nextArr = cal.querySelector('.flatpickr-next-month');
  function _yrNav(e) {
    if (!yrCtrl.dropdown.classList.contains('open')) return;
    e.stopImmediatePropagation();
    e.preventDefault();
    _refreshYrList(yrPageBase + (e.currentTarget === prevArr ? -4 : 4));
  }
  if (prevArr) prevArr.addEventListener('click', _yrNav, true);
  if (nextArr) nextArr.addEventListener('click', _yrNav, true);

  /* 년도 드롭다운 열릴 때 — 월 드롭다운이 닫히면서 숨겨진 화살표 복원 + 범위 재중앙 */
  yrTrigger.addEventListener('click', function() {
    var pv = cal.querySelector('.flatpickr-prev-month');
    var nx = cal.querySelector('.flatpickr-next-month');
    if (pv) pv.style.visibility = '';
    if (nx) nx.style.visibility = '';
    if (!yrCtrl.dropdown.classList.contains('open')) return;
    if (yrPageBase !== fp.currentYear) {
      yrPageBase = fp.currentYear;
      _refreshYrList(yrPageBase);
    }
  });

  /* 캘린더 내 모든 numInputWrapper(Range 2번째 포함) 숨김 */
  cal.querySelectorAll('.numInputWrapper').forEach(function(nw) { nw.style.display = 'none'; });
  cal.querySelectorAll('.flatpickr-monthDropdown-months').forEach(function(sel) { sel.style.display = 'none'; });
  currentMonthDiv.appendChild(yrTrigger);
  syncFlatpickrMonthLabel(fp);
}

function syncFlatpickrMonthLabel(fp) {
  var cal = fp.calendarContainer;
  /* 월 */
  var monthSel = cal.querySelector('.flatpickr-monthDropdown-months');
  if (monthSel && monthSel._csLabel) {
    var idx = fp.currentMonth;
    monthSel._csLabel.textContent = monthSel.options[idx] ? monthSel.options[idx].text : '';
    if (monthSel._csDropdown) {
      monthSel._csDropdown.querySelectorAll('.cs-option').forEach(function(o, i) {
        o.classList.toggle('selected', i === idx);
        o.setAttribute('aria-selected', String(i === idx));
      });
    }
  }
  /* 연도 */
  var currentMonthDiv = cal.querySelector('.flatpickr-current-month');
  if (currentMonthDiv && currentMonthDiv._csLabel) {
    currentMonthDiv._csLabel.textContent = fp.currentYear + '년';
    if (currentMonthDiv._csDropdown) {
      currentMonthDiv._csDropdown.querySelectorAll('.cs-option').forEach(function(o) {
        var match = parseInt(o.textContent) === fp.currentYear;
        o.classList.toggle('selected', match);
      });
    }
  }
}

function initCondWraps() {
  document.querySelectorAll('.cond-wrap').forEach(function(wrap) {
    var trigger = wrap.querySelector('.cond-trigger');
    var items   = wrap.querySelectorAll('.cond-item');
    if (!trigger || !items.length) return;
    var probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;top:0;left:-9999px;visibility:hidden;' +
      'white-space:nowrap;padding:0 16px;font-size:var(--text-sm);font-family:var(--font-sans);font-weight:500;';
    document.body.appendChild(probe);
    var maxW = 0;
    items.forEach(function(item) {
      probe.textContent = item.textContent.trim();
      if (probe.offsetWidth > maxW) maxW = probe.offsetWidth;
    });
    document.body.removeChild(probe);
    trigger.style.width = Math.max(maxW + 15, 90) + 'px';
  });
}

/* ─── TOAST ──────────────────────────────────── */
(function () {
  var _container;
  function _getContainer() {
    if (!_container) {
      _container = document.createElement('div');
      _container.className = 'toast-container';
      document.body.appendChild(_container);
    }
    return _container;
  }

  var _ICONS = {
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    danger:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  };

  window.showToast = function (message, type, duration) {
    type     = type     !== undefined ? type     : 'info';
    duration = duration !== undefined ? duration : 3500;

    var container = _getContainer();
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    var iconEl = document.createElement('span');
    iconEl.className = 'toast-icon';
    iconEl.innerHTML = _ICONS[type] || _ICONS.info;

    var msgEl = document.createElement('span');
    msgEl.className = 'toast-msg';
    msgEl.textContent = message;

    var closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', '닫기');
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    toast.appendChild(iconEl);
    toast.appendChild(msgEl);
    toast.appendChild(closeBtn);
    container.appendChild(toast);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { toast.classList.add('show'); });
    });

    function dismiss() {
      toast.classList.remove('show');
      toast.classList.add('hide');
      toast.addEventListener('transitionend', function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, { once: true });
    }
    closeBtn.addEventListener('click', dismiss);
    if (duration > 0) setTimeout(dismiss, duration);
  };
})();

/* ─── BOTTOM TAB BAR ─────────────────────────── */
var _EP_TABS_KEY = 'epTabs';
var _EP_TABS_MAX = 50;

function _getTabStore() {
  try { return JSON.parse(localStorage.getItem(_EP_TABS_KEY)) || []; } catch (e) { return []; }
}
function _setTabStore(tabs) { localStorage.setItem(_EP_TABS_KEY, JSON.stringify(tabs)); }

function _initTabBar(currentHref) {
  var navItem = NAV_ITEMS.find(function (i) { return i.href === currentHref; });
  if (!navItem) return;

  var tabs = _getTabStore();
  var exists = tabs.some(function (t) { return t.href === currentHref; });
  if (!exists) {
    tabs.push({ href: navItem.href, label: navItem.label, icon: navItem.icon });
    if (tabs.length > _EP_TABS_MAX) tabs.shift();
    _setTabStore(tabs);
  }

  var bar = document.createElement('div');
  bar.className = 'tab-bar';

  /* 좌우 네비게이션 버튼 */
  var btnLeft = document.createElement('button');
  btnLeft.type = 'button';
  btnLeft.className = 'tab-bar-nav tab-bar-nav-left';
  btnLeft.setAttribute('aria-label', '이전 탭');
  btnLeft.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

  var btnRight = document.createElement('button');
  btnRight.type = 'button';
  btnRight.className = 'tab-bar-nav tab-bar-nav-right';
  btnRight.setAttribute('aria-label', '다음 탭');
  btnRight.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

  /* 탭 목록 스크롤 영역 */
  var inner = document.createElement('div');
  inner.className = 'tab-bar-inner';

  tabs.forEach(function (tab, idx) {
    var item = document.createElement('a');
    item.href = tab.href;
    item.className = 'tab-item' + (tab.href === currentHref ? ' active' : '');
    item.dataset.tabHref = tab.href;

    var iconSpan = document.createElement('span');
    iconSpan.className = 'tab-item-icon';
    iconSpan.innerHTML = ICONS[tab.icon] || '';

    var labelSpan = document.createElement('span');
    labelSpan.className = 'tab-item-label';
    labelSpan.textContent = tab.label;

    var closeBtn = document.createElement('button');
    closeBtn.className = 'tab-close';
    closeBtn.setAttribute('aria-label', tab.label + ' 탭 닫기');
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    (function (tabHref, tabIdx) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var stored = _getTabStore();
        var newTabs = stored.filter(function (t) { return t.href !== tabHref; });
        _setTabStore(newTabs);
        if (tabHref === currentHref) {
          var dest = newTabs.length
            ? (newTabs[tabIdx - 1] || newTabs[tabIdx] || newTabs[newTabs.length - 1]).href
            : 'index.html';
          window.location.href = dest;
        } else {
          var el = inner.querySelector('[data-tab-href="' + tabHref + '"]');
          if (el) el.parentNode.removeChild(el);
          _syncNavBtns();
        }
      });
    })(tab.href, idx);

    item.appendChild(iconSpan);
    item.appendChild(labelSpan);
    item.appendChild(closeBtn);
    inner.appendChild(item);
  });

  bar.appendChild(btnLeft);
  bar.appendChild(inner);
  bar.appendChild(btnRight);
  document.body.appendChild(bar);

  /* 좌우 버튼 표시/비활성 동기화 */
  var SCROLL_STEP = 160;
  function _syncNavBtns() {
    var overflow = inner.scrollWidth > inner.clientWidth + 1;
    if (overflow) {
      btnLeft.classList.add('visible');
      btnRight.classList.add('visible');
    } else {
      btnLeft.classList.remove('visible');
      btnRight.classList.remove('visible');
    }
    btnLeft.disabled  = inner.scrollLeft <= 0;
    btnRight.disabled = inner.scrollLeft >= inner.scrollWidth - inner.clientWidth - 1;
  }

  btnLeft.addEventListener('click', function () {
    inner.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
  });
  btnRight.addEventListener('click', function () {
    inner.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
  });
  inner.addEventListener('scroll', _syncNavBtns);

  setTimeout(function () {
    _syncNavBtns();
    var activeTab = inner.querySelector('.tab-item.active');
    if (activeTab) activeTab.scrollIntoView({ inline: 'nearest' });
  }, 0);
}

/* OverlayScrollbars 초기화 */
document.addEventListener('DOMContentLoaded', function () {
  initCustomSelects();
  initCondWraps();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initCondWraps);
  }

  if (typeof OverlayScrollbarsGlobal === 'undefined') return;
  var OS = OverlayScrollbarsGlobal.OverlayScrollbars;
  var opts = {
    scrollbars: {
      theme: 'os-theme-poly',
      visibility: 'auto',
      autoHide: 'leave',
      autoHideDelay: 400,
      dragScroll: true,
      clickScroll: true,
    }
  };

  var pc = document.querySelector('.page-content');
  if (pc) OS(pc, opts);

  document.querySelectorAll('.table-wrapper').forEach(function (el) { OS(el, opts); });
  document.querySelectorAll('.modal-body').forEach(function (el) { OS(el, opts); });
});
