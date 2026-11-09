/* ==========================================================================
   SRSystem Login — 공통 동작 (시안 A·B·C 공용)
   - 테마 토글: kit 규칙 (data-theme + localStorage 'epTheme' + themechange 이벤트)
   - 토스트: kit layout.js 의 window.showToast 사용
   - 데모: 실제 인증 없음. ?state=error|fail|loading|caps|request|done 로 상태 미리보기
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var params = new URLSearchParams(location.search);

  var I = {
    eye:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',
    sun:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    x:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    chevUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>'
  };

  /* ── 0. Poly 워드마크 심볼 ─────────────────────────────────────── */
  document.body.insertAdjacentHTML('afterbegin',
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">' +
    '<symbol id="poly-wordmark" viewBox="0 0 247 104"><path fill="currentColor" fill-rule="evenodd" d="M211.2 103.6C210.8 103.2 209.6 102.7 207.7 102C207.2 101.8 206.7 101.6 206.6 101.5C206.5 101.4 206 101.2 205.5 101C205 100.8 204.4 100.6 204.1 100.4C203.5 100.2 201.9 99.5 200.6 99C200.1 98.8 199.3 98.5 198.8 98.2C197.7 97.6 197.6 97.2 198.4 95.8C198.7 95.2 199 94.5 199.1 94.2C199.1 93.9 199.3 93.6 199.4 93.5C199.6 93.4 199.8 92.9 199.9 92.4C200.1 91.9 200.3 91.3 200.5 91.1C200.7 90.9 200.9 90.4 201 90C201.1 89.6 201.3 89 201.5 88.8C201.7 88.5 201.9 88 202.1 87.6C202.2 87.2 202.4 86.7 202.6 86.5C202.7 86.4 202.9 85.9 203 85.5C203.1 85.1 203.3 84.6 203.5 84.3C203.7 84.1 203.9 83.7 203.9 83.4C204 83.1 204.3 82.5 204.5 82.1C204.8 81.6 205 81.1 205 81C205 80.8 205.2 80.4 205.5 80C206.3 78.8 206.1 78 204.9 78C203.9 78 201 77.1 199.4 76.3C197.3 75.2 194.9 73.2 193.7 71.5C193.2 70.9 192.7 70.3 192.5 70C192.1 69.4 191.5 68.4 191 67.3C190.8 66.9 190.5 66.5 190.4 66.3C190.3 66.2 190.1 65.8 190 65.4C189.9 65 189.7 64.4 189.5 64.1C189.3 63.8 189.1 63.3 189 62.9C188.9 62.5 188.6 61.8 188.4 61.4C188.2 61 188 60.5 188 60.3C188 60.1 187.8 59.6 187.6 59.2C187.4 58.8 187.1 58.1 187 57.7C186.9 57.2 186.7 56.7 186.5 56.4C186.4 56.1 186.1 55.5 186 55.1C185.9 54.6 185.6 53.9 185.4 53.5C185.2 53.1 185 52.6 185 52.4C185 52.2 184.8 51.7 184.6 51.3C184.4 50.9 184.1 50.2 184 49.8C183.9 49.4 183.6 48.7 183.4 48.3C183.2 47.8 183 47.3 183 47.2C183 47 182.8 46.5 182.5 45.9C182.2 45.4 182 44.8 182 44.6C182 44.4 181.8 43.9 181.6 43.5C181.4 43.1 181.1 42.4 181 42C180.9 41.6 180.6 40.9 180.4 40.5C180.2 40.1 180 39.6 180 39.4C180 39.2 179.8 38.6 179.5 38.1C179.2 37.5 179 36.9 179 36.8C179 36.6 178.8 36 178.5 35.4C178.2 34.9 178 34.3 178 34.2C178 34 177.8 33.4 177.5 32.9C177.2 32.3 177 31.7 177 31.5C177 31.4 176.8 30.8 176.5 30.2C176.2 29.7 176 29.1 176 28.9C176 28.7 175.8 28.3 175.6 28C175.1 27.4 175.1 26.8 175.4 26.5C175.6 26.4 177.8 26.3 183.6 26.3C187.9 26.3 191.6 26.4 191.7 26.4C191.9 26.6 192.7 28.1 193.1 29.2C194.1 32.1 194.3 32.6 194.7 33.2C194.8 33.6 195 34.1 195 34.2C195 34.4 195.2 35 195.5 35.6C195.8 36.1 196 36.7 196 36.8C196 37 196.2 37.6 196.5 38.1C196.8 38.7 197 39.3 197 39.5C197 39.6 197.2 40.2 197.5 40.8C197.8 41.3 198 41.9 198 42.1C198 42.3 198.2 42.9 198.5 43.4C198.8 44 199 44.5 199 44.7C199 44.8 199.2 45.4 199.5 46C199.8 46.5 200 47.1 200 47.3C200 47.5 200.2 48 200.5 48.6C200.8 49.1 201 49.7 201 49.9C201 50.1 201.2 50.7 201.5 51.2C201.8 51.8 202 52.4 202 52.5C202 52.7 202.2 53.3 202.5 53.9C202.8 54.4 203 55 203 55.2C203 55.3 203.2 55.9 203.5 56.4C203.8 57 204 57.5 204 57.7C204 57.9 204.2 58.3 204.4 58.7C204.6 59.1 204.8 59.7 204.9 60C205 60.4 205.5 61.1 206.1 61.7C207.5 63.4 209.1 63.9 211.1 63.2C211.8 63 212.2 62.7 213 61.9C213.6 61.3 214 60.7 214 60.6C214 60.5 214.2 60 214.5 59.5C214.7 59 215 58.4 215.1 58.1C215.1 57.8 215.3 57.4 215.5 57.2C215.7 56.9 215.9 56.5 215.9 56.2C216 56 216.2 55.4 216.5 54.9C216.8 54.5 217 53.8 217.1 53.5C217.1 53.3 217.3 52.8 217.5 52.6C217.7 52.4 217.9 51.9 218 51.5C218.1 51.1 218.3 50.6 218.5 50.4C218.7 50.2 218.9 49.7 218.9 49.5C219 49.2 219.2 48.5 219.5 48.1C219.8 47.6 220 47 220.1 46.8C220.1 46.5 220.4 46 220.6 45.7C220.8 45.4 221 45 221 44.8C221 44.6 221.2 44.1 221.5 43.6C221.7 43.1 222 42.5 222.1 42.3C222.1 42 222.3 41.6 222.5 41.3C222.7 41.1 222.9 40.7 222.9 40.4C223 40.1 223.3 39.5 223.5 39C223.8 38.5 224 38 224 37.8C224 37.7 224.2 37.3 224.4 36.9C224.6 36.6 224.9 36.1 224.9 35.9C225 35.6 225.3 35 225.5 34.5C225.8 34 226 33.5 226 33.4C226 33.2 226.2 32.7 226.5 32.3C226.7 31.8 227 31.2 227.1 30.9C227.1 30.7 227.3 30.2 227.5 30C227.7 29.8 227.9 29.3 228 29C228.2 28.3 229.3 26.3 229.5 26.3C231.4 26.3 245.7 26.3 245.8 26.4C246.1 26.6 246 27.7 245.6 28.4C245.4 28.8 245.1 29.4 245 29.7C244.9 30.1 244.6 30.6 244.4 31C244.2 31.3 244 31.7 244 31.9C244 32.1 243.8 32.6 243.5 33.1C243.3 33.5 243 34.1 242.9 34.4C242.9 34.7 242.7 35.1 242.5 35.3C242.3 35.6 242.1 36 242.1 36.3C242 36.5 241.8 37.1 241.5 37.6C241.2 38 241 38.6 240.9 38.9C240.9 39.2 240.7 39.6 240.5 39.8C240.3 40.1 240.1 40.5 240.1 40.8C240 41 239.8 41.6 239.5 42.1C239.2 42.5 239 43.1 238.9 43.4C238.9 43.7 238.7 44.1 238.5 44.3C238.3 44.6 238.1 45.1 238 45.5C237.9 45.9 237.7 46.4 237.5 46.6C237.3 46.9 237.1 47.4 237 47.7C236.9 48.1 236.7 48.6 236.5 48.8C236.3 49.1 236.1 49.6 236 50C235.9 50.4 235.7 50.9 235.5 51.1C235.3 51.4 235.1 51.9 235 52.2C234.9 52.6 234.7 53.1 234.5 53.3C234.3 53.6 234.1 54.1 234 54.5C233.9 55 233.7 55.4 233.6 55.5C233.4 55.6 233.2 56.1 233.1 56.6C232.9 57.1 232.7 57.6 232.5 57.9C232.3 58.1 232.1 58.6 232 59C231.9 59.4 231.7 59.9 231.5 60.2C231.3 60.4 231.1 60.9 231 61.2C230.9 61.6 230.6 62.2 230.4 62.6C230.2 63 230 63.5 229.9 63.8C229.9 64.1 229.7 64.4 229.6 64.5C229.4 64.6 229.2 65.1 229.1 65.6C228.9 66.1 228.7 66.7 228.5 66.9C228.3 67.1 228.1 67.6 228 68C227.9 68.4 227.6 68.9 227.4 69.3C227.2 69.6 227 70 227 70.2C227 70.4 226.8 70.9 226.5 71.4C226.3 71.9 226 72.5 225.9 72.7C225.9 73 225.7 73.4 225.5 73.7C225.3 73.9 225.1 74.3 225.1 74.6C225 74.9 224.8 75.5 224.5 75.9C224.2 76.4 224 77 223.9 77.2C223.9 77.5 223.7 77.9 223.5 78.2C223.3 78.4 223.1 78.8 223.1 79.1C223 79.4 222.8 80 222.5 80.4C222.2 80.9 222 81.5 221.9 81.7C221.9 82 221.7 82.4 221.5 82.7C221.3 82.9 221.1 83.3 221.1 83.6C221 83.9 220.8 84.4 220.6 84.8C220.4 85.1 220.1 85.8 219.9 86.3C219.8 86.8 219.5 87.2 219.4 87.3C219.3 87.4 219.1 87.8 219.1 88C219 88.3 218.8 89 218.5 89.4C218.2 89.9 218 90.4 218 90.6C218 90.8 217.8 91.2 217.6 91.6C217.4 91.9 217.1 92.4 217.1 92.6C217 92.9 216.7 93.5 216.5 93.9C216.2 94.4 216 94.9 216 95C216 95.2 215.8 95.7 215.5 96.2C215.3 96.7 215 97.3 214.9 97.6C214.9 97.8 214.7 98.3 214.5 98.5C214.3 98.7 214.1 99.2 214.1 99.4C214 99.7 213.7 100.3 213.5 100.8C213.2 101.3 213 101.9 212.9 102.2C212.9 102.4 212.5 102.9 212.2 103.3L211.6 104L211.2 103.6ZM10 84.8C9.9 84.6 9.8 78.4 9.9 60.7L9.9 36.9L10.6 35.6C11.3 34.2 11.5 33.8 12.5 32.9C14.1 31.3 16.5 30.3 18.8 30.3C19.8 30.3 20.4 30.4 21.5 30.7C23.6 31.4 25 32.5 26.4 34.5C26.9 35.1 27.8 37.3 28 38.5C28.1 39.1 28.3 39.9 28.6 40.4C28.8 40.9 29 41.4 29 41.6C29 41.8 29.2 42.3 29.5 42.8C29.8 43.2 30 43.7 30 43.8C30 44 30.2 44.4 31.7 46.8C33 48.7 34.8 50.5 37.1 51.9C38 52.4 39.3 52.9 41.1 53.3C43.9 54 45.7 54 48.4 53.4C50.4 52.8 51.4 52.4 53.3 51.2C54.3 50.7 56.4 48.7 57.1 47.7C58 46.5 59 45 59 44.8C59 44.7 59.2 44.2 59.4 43.7C60.6 41.2 60.6 35.2 59.4 32.6C59 31.6 58.9 31.4 58.2 30.1C57.5 28.8 55.6 26.8 54.1 25.7C53.1 24.9 51.6 24 51.4 24C51.3 24 50.9 23.8 50.4 23.6C48.4 22.6 48.5 22.6 24.2 22.7C11.9 22.7 1.4 22.6 0.9 22.6L0 22.4L0 14.7L0 7L25.7 7L51.4 7.1L52.5 7.5C53.1 7.7 54 7.9 54.6 8C55.2 8.1 56.1 8.4 56.5 8.6C57 8.8 57.5 9 57.6 9C57.9 9 60.2 10 60.7 10.3C60.8 10.4 61.3 10.7 61.8 10.9C62.2 11.2 62.9 11.5 63.2 11.8C63.5 12 64 12.3 64.3 12.5C64.9 13 66.3 14 66.7 14.4C66.9 14.6 67.5 15.1 67.9 15.5C68.8 16.3 70.7 18.5 71.5 19.6C71.7 19.9 72.2 20.5 72.5 20.9C72.8 21.2 73 21.6 73 21.8C73 21.9 73.2 22.2 73.4 22.5C73.7 22.8 73.9 23.2 74 23.5C74.1 23.8 74.4 24.3 74.6 24.6C74.8 25 75 25.3 75 25.5C75 25.7 75.2 26.1 75.4 26.6C75.7 27 75.9 27.7 76 28.1C76.1 28.6 76.3 29.3 76.5 29.8C77 31 77.7 35.8 77.7 38.2C77.7 40.5 77 45.3 76.5 46.6C76.3 47 76.1 47.8 76 48.2C75.9 48.6 75.7 49.3 75.4 49.8C75.2 50.2 75 50.7 75 50.8C75 51 74.8 51.4 74.6 51.7C74.4 52 74.2 52.5 74.1 52.7C74 52.9 73.8 53.4 73.5 53.7C73.3 54 73 54.5 72.9 54.8C72.2 55.9 71.9 56.4 70.9 57.6C69.3 59.6 66.5 62.3 65.2 63.2C62.3 65.2 61.9 65.4 60.1 66.3C56.7 68 53.8 68.8 50.2 69.2C48 69.4 42.1 69.3 40.2 69C38.6 68.8 35.6 67.9 34.6 67.4C34.1 67.2 33.6 67 33.5 67C33.3 67 32.9 66.8 32.5 66.5C32.1 66.2 31.6 66 31.5 66C31.3 66 31 65.8 30.7 65.6C30.5 65.4 30 65.1 29.7 64.9C28.8 64.5 28.2 64 27.2 63.1C26.4 62.3 25.7 62 25.5 62.3C25.4 62.4 25.3 66.4 25.4 72.9C25.4 78.7 25.4 83.7 25.4 84C25.4 85 25.7 85 17.6 85C11.5 85 10.2 85 10 84.8ZM110.2 84.8C108.9 84.7 104.9 83.7 104.4 83.4C104.1 83.3 103.7 83.2 103.4 83.1C103.1 83 102.5 82.8 101.9 82.5C101.4 82.2 100.7 81.9 100.3 81.8C100 81.6 99.4 81.3 99 81C98.5 80.8 97.9 80.4 97.6 80.3C96.5 79.7 94.1 77.7 92.6 76.3C91.7 75.5 89.2 72.5 88.5 71.6C88.3 71.3 88 70.8 87.8 70.5C87.5 70.2 87.2 69.6 87 69.2C86.8 68.8 86.6 68.5 86.5 68.4C86.4 68.4 86.2 68 86.1 67.5C85.9 67.1 85.7 66.6 85.5 66.3C85.1 65.7 84.3 63.3 83.6 60.8C83.1 58.8 82.8 56.6 82.8 53.4C82.8 48.7 83.2 46.4 84.9 41.8C85.1 41.2 85.4 40.6 85.5 40.3C85.7 40.1 85.9 39.6 86 39.3C86.1 39 86.4 38.5 86.6 38.2C86.8 37.9 87 37.5 87 37.5C87 37.3 87.7 36.3 88.6 34.9C90.3 32.6 93.8 29 96 27.5C96.3 27.3 96.8 27 97.2 26.8C97.5 26.5 98 26.2 98.3 26.1C98.7 25.9 99.1 25.6 99.4 25.4C99.7 25.2 100 25 100 25C100.2 25 100.7 24.8 101.2 24.5C102.9 23.7 104 23.3 105.4 23C106.2 22.8 106.9 22.6 107 22.5C107.5 22.2 110.7 21.8 113.2 21.7C116.2 21.6 120.2 22 121.9 22.5C122.5 22.7 123.3 22.9 123.8 23.1C124.8 23.3 126.1 23.8 127.6 24.5C128.1 24.8 128.7 25 128.7 25C128.9 25 129.8 25.5 131.2 26.5C131.6 26.8 132.1 27 132.1 27C132.2 27 132.5 27.2 132.8 27.5C133.1 27.7 133.7 28.2 134.1 28.5C136 30 138.6 32.7 140.3 35C141.2 36.3 142 37.5 142 37.6C142 37.7 142.2 38.1 142.5 38.5C142.8 38.9 143 39.5 143.1 39.8C143.1 40.1 143.3 40.4 143.4 40.5C143.6 40.6 143.8 41.2 144 41.9C144.2 42.5 144.5 43.2 144.6 43.4C144.7 43.6 144.9 44 144.9 44.4C145 44.8 145.2 45.8 145.4 46.6C146.1 49 146.3 52.9 146 56.5C145.7 60.1 144.4 64.6 142.7 67.7C142.6 67.9 142.3 68.5 142.1 68.9C141.8 69.4 141.5 70 141.2 70.3C141 70.7 140.7 71.2 140.5 71.5C139.4 72.9 137.9 74.8 136.4 76.1C135.9 76.7 135.3 77.2 135.1 77.4C134.9 77.6 134.6 77.9 134.4 78C134.2 78.1 133.6 78.6 133.1 79C132.1 79.7 131.3 80.3 129.9 81C129.6 81.2 129.1 81.5 129 81.6C128.9 81.7 128.4 81.9 128.1 82C127.7 82.1 127.1 82.4 126.8 82.6C126.4 82.8 125.8 83 125.5 83.1C125.2 83.2 124.7 83.3 124.4 83.5C124.2 83.6 122.8 84 121.4 84.3C119 84.8 118.8 84.9 115.1 84.9C113 85 110.8 84.9 110.2 84.8ZM154 84.8C153.9 84.6 153.8 84.3 153.8 84.1C153.8 83.9 153.8 64.9 153.8 41.9L153.8 0L161.6 0L169.3 0L169.4 0.5C169.4 0.8 169.5 19.8 169.5 42.8C169.5 82.9 169.5 84.5 169.2 84.7C168.9 85 168.2 85 161.6 85C155.4 85 154.2 85 154 84.8ZM117.8 69C118.4 68.9 119.2 68.7 119.5 68.5C119.8 68.3 120.3 68.2 120.6 68.1C120.9 68 121.4 67.8 121.7 67.6C122 67.4 122.4 67.2 122.5 67.1C123.8 66.7 128 62.5 128 61.7C128 61.6 128.2 61.3 128.5 60.9C128.8 60.6 129 60.2 129 60C129 59.9 129.2 59.4 129.4 58.9C129.9 57.7 130.4 55.3 130.4 53.4C130.4 51.6 129.9 48.8 129.5 48C129.3 47.7 129.1 47.1 129 46.8C128.9 46.5 128.6 46 128.4 45.7C128.2 45.4 128 45 128 44.9C128 44.8 127.5 44.1 126.9 43.4C125.8 42 123.9 40.4 122.6 39.6C120.4 38.3 117 37.3 114.5 37.3C112.7 37.3 109.5 38 108.3 38.6C107.9 38.8 107.5 39 107.4 39C107.2 39 105.9 39.8 104.9 40.5C103.6 41.5 101 44.3 101 44.8C101 44.9 100.8 45.2 100.5 45.6C100.2 45.9 100 46.3 100 46.5C100 46.6 99.8 47 99.6 47.5C99 48.6 98.5 51.6 98.5 53.3C98.5 55.1 99 58 99.6 59.2C99.8 59.7 100 60.2 100 60.3C100 60.4 100.2 60.7 100.4 61C100.7 61.3 101 61.8 101.1 62.1C101.3 62.7 104 65.6 104.9 66.1C107 67.6 109 68.5 110.8 68.9C112 69.2 116.3 69.2 117.8 69Z"/></symbol></svg>');

  /* ── 1. 테마 토글 (kit 규칙) ───────────────────────────────────── */
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function syncThemeBtn() {
    var b = $('#theme-toggle'); if (!b) return;
    b.innerHTML = isDark() ? I.sun : I.moon;
    b.title = isDark() ? '라이트 모드' : '다크 모드';
    b.setAttribute('aria-label', isDark() ? '라이트 모드로 전환' : '다크 모드로 전환');
  }
  var themeBtn = $('#theme-toggle');
  if (themeBtn) {
    syncThemeBtn();
    themeBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('epTheme', next); } catch (e) {}
      syncThemeBtn();
      window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: next === 'dark' } }));
    });
  }

  function toast(msg, type) {
    if (typeof window.showToast === 'function') window.showToast(msg, type || 'info', 3200);
  }
  /* 폼 상태 이벤트 — 시안별 배경 인터랙션이 구독 (auth:input·focus·blur·loading·success·fail·reset) */
  function emit(type) { window.dispatchEvent(new CustomEvent('auth:' + type)); }

  /* ── 2. 로그인 폼 ─────────────────────────────────────────────── */
  var form = $('#loginForm');
  if (!form) return;
  var idInput   = $('#loginId');
  var pwInput   = $('#password');
  var remember  = $('#rememberId');
  var submitBtn = $('#loginSubmit');
  var googleBtn = $('#googleLogin');
  var alertBox  = $('#loginAlert');
  var pwToggle  = $('#pwToggle');
  var pwWrap    = pwInput.closest('.input-affix');
  var REMEMBER_KEY = 'srsRememberId';
  var forceFail = false;
  var timers = [];
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  try {
    var saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) { idInput.value = saved; remember.checked = true; }
  } catch (e) {}

  /* 비밀번호 표시 */
  pwToggle.innerHTML = I.eye;
  pwToggle.addEventListener('click', function () {
    var show = pwInput.type === 'password';
    pwInput.type = show ? 'text' : 'password';
    pwToggle.innerHTML = show ? I.eyeOff : I.eye;
    pwToggle.setAttribute('aria-pressed', String(show));
    pwToggle.setAttribute('aria-label', show ? '비밀번호 숨기기' : '비밀번호 표시');
    pwInput.focus({ preventScroll: true });
  });

  /* Caps Lock */
  function setCaps(on) { pwWrap.classList.toggle('caps', !!on); }
  function capsFrom(e) { if (e.getModifierState) setCaps(e.getModifierState('CapsLock')); }
  pwInput.addEventListener('keydown', capsFrom);
  pwInput.addEventListener('keyup', capsFrom);
  pwInput.addEventListener('blur', function () { setCaps(false); });

  /* 검증 */
  function setFieldError(input, on) {
    input.closest('.form-group').classList.toggle('has-error', on);
    input.classList.toggle('is-invalid', on);
    input.setAttribute('aria-invalid', on ? 'true' : 'false');
  }
  function showAlert() {
    alertBox.classList.add('show');
    form.classList.remove('shake'); void form.offsetWidth;
    if (!reduceMotion) form.classList.add('shake');
  }
  function hideAlert() { alertBox.classList.remove('show'); }
  [idInput, pwInput].forEach(function (inp) {
    inp.addEventListener('input', function () { if (inp.value) setFieldError(inp, false); hideAlert(); emit('input'); });
  });
  form.addEventListener('focusin', function () { emit('focus'); });
  form.addEventListener('focusout', function () {
    setTimeout(function () { if (!form.contains(document.activeElement)) emit('blur'); }, 0);
  });

  function setLoading(btn, on, text) {
    var label = $('.btn-label', btn);
    if (on) {
      btn.dataset.label = btn.dataset.label || label.textContent;
      label.textContent = text;
      btn.classList.add('is-loading');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
    } else {
      if (btn.dataset.label) label.textContent = btn.dataset.label;
      btn.classList.remove('is-loading');
      btn.disabled = false;
      btn.removeAttribute('aria-busy');
    }
  }
  function setFormDisabled(on) { [idInput, pwInput, remember].forEach(function (el) { el.disabled = on; }); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideAlert();
    var idOk = !!idInput.value.trim();
    var pwOk = !!pwInput.value;
    setFieldError(idInput, !idOk);
    setFieldError(pwInput, !pwOk);
    if (!idOk) { idInput.focus(); return; }
    if (!pwOk) { pwInput.focus(); return; }
    try {
      if (remember.checked) localStorage.setItem(REMEMBER_KEY, idInput.value.trim());
      else localStorage.removeItem(REMEMBER_KEY);
    } catch (err) {}
    setLoading(submitBtn, true, '로그인 중…');
    setFormDisabled(true);
    emit('loading');
    later(function () {
      setLoading(submitBtn, false);
      setFormDisabled(false);
      if (forceFail) { showAlert(); pwInput.select(); emit('fail'); return; }
      toast('로그인되었습니다. 잠시 후 이동합니다.', 'success');
      emit('success');
    }, 1100);
  });

  googleBtn.addEventListener('click', function () {
    setLoading(googleBtn, true, 'Google 계정 확인 중…');
    emit('loading');
    later(function () {
      setLoading(googleBtn, false);
      toast('Google 계정으로 로그인되었습니다.', 'success');
      emit('success');
    }, 1200);
  });

  /* ── 3. 권한 요청 모달 (kit .modal-*) ──────────────────────────── */
  document.body.insertAdjacentHTML('beforeend',
    '<div class="modal-overlay" id="requestModal" aria-hidden="true">' +
      '<div class="modal req-modal" role="dialog" aria-modal="true" aria-labelledby="reqTitle">' +
        '<div class="modal-header">' +
          '<h2 class="modal-title" id="reqTitle">관리자에게 권한 요청</h2>' +
          '<button type="button" class="modal-close" data-close aria-label="닫기">' + I.x + '</button>' +
        '</div>' +
        '<div class="modal-body">' +
          '<ol class="req-steps" aria-label="처리 단계">' +
            '<li class="is-current"><span class="req-dot">1</span><span class="req-label">요청 작성</span></li>' +
            '<li><span class="req-dot">2</span><span class="req-label">SR 등록</span></li>' +
            '<li><span class="req-dot">3</span><span class="req-label">권한 부여</span></li>' +
          '</ol>' +
          '<form class="req-form" id="requestForm" novalidate>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label" for="arName">이름</label><input class="form-input" id="arName" autocomplete="name" required></div>' +
              '<div class="form-group"><label class="form-label" for="arLogin">아이디</label><input class="form-input" id="arLogin" placeholder="로그인할 때 쓰는 아이디" required></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label" for="arAff">소속</label><input class="form-input" id="arAff" placeholder="예: 분당캠퍼스, 본사 IT팀" required></div>' +
              '<div class="form-group"><label class="form-label" for="arContact">연락처</label><input class="form-input" id="arContact" placeholder="휴대전화 또는 이메일" required></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label" for="arReason">요청 사유<span class="label-opt">선택</span></label><textarea class="form-textarea" id="arReason" placeholder="예: 캠퍼스 SR 등록·조회가 필요합니다."></textarea></div>' +
          '</form>' +
          '<div class="req-done" id="requestDone" hidden>' +
            '<span class="req-done-icon">' + I.check + '</span>' +
            '<h3>권한 요청을 보냈어요</h3>' +
            '<p>요청이 SR로 등록되었습니다. 관리자가 확인한 뒤 권한을 부여합니다.</p>' +
            '<dl class="req-summary" id="requestSummary"></dl>' +
          '</div>' +
        '</div>' +
        '<div class="modal-footer" id="requestFooter">' +
          '<button type="button" class="btn btn-secondary" data-close>취소</button>' +
          '<button type="submit" form="requestForm" class="btn btn-primary" id="reqSubmit" disabled><span class="btn-spinner"></span><span class="btn-label">요청 보내기</span></button>' +
        '</div>' +
      '</div>' +
    '</div>');

  var overlay   = $('#requestModal');
  var reqForm   = $('#requestForm');
  var reqDone   = $('#requestDone');
  var reqSubmit = $('#reqSubmit');
  var reqFooter = $('#requestFooter');
  var reqSteps  = $$('.req-steps li', overlay);
  var reqFields = ['#arName', '#arLogin', '#arAff', '#arContact'].map(function (s) { return $(s); });
  var opener = null;

  function syncReqSubmit() { reqSubmit.disabled = !reqFields.every(function (f) { return f.value.trim(); }); }
  reqFields.forEach(function (f) { f.addEventListener('input', syncReqSubmit); });

  function setSteps(done) {
    reqSteps.forEach(function (li, i) {
      li.classList.toggle('is-done', i < done);
      li.classList.toggle('is-current', i === done);
      $('.req-dot', li).innerHTML = i < done ? I.check : String(i + 1);
    });
  }
  function resetRequest() {
    reqForm.hidden = false; reqDone.hidden = true;
    reqFooter.innerHTML = '';
    reqFooter.appendChild(cancelBtn); reqFooter.appendChild(reqSubmit);
    setLoading(reqSubmit, false);
    setSteps(0); syncReqSubmit();
  }
  var cancelBtn = $('[data-close].btn', overlay);

  function openRequest(trigger) {
    opener = trigger || document.activeElement;
    resetRequest();
    if (!$('#arLogin').value && idInput.value) $('#arLogin').value = idInput.value.trim();
    syncReqSubmit();
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    later(function () { $('#arName').focus(); }, 60);
  }
  function closeRequest() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    if (opener && opener.focus) opener.focus({ preventScroll: true });
  }
  function showRequestDone() {
    reqForm.hidden = true; reqDone.hidden = false;
    setSteps(2);
    $('#requestSummary').innerHTML = [['이름', $('#arName').value], ['아이디', $('#arLogin').value], ['소속', $('#arAff').value]]
      .map(function (r) { return '<div><dt>' + r[0] + '</dt><dd></dd></div>'; }).join('');
    $$('#requestSummary dd').forEach(function (dd, i) { dd.textContent = [$('#arName').value, $('#arLogin').value, $('#arAff').value][i]; });
    var ok = document.createElement('button');
    ok.type = 'button'; ok.className = 'btn btn-primary'; ok.textContent = '확인';
    ok.addEventListener('click', closeRequest);
    reqFooter.innerHTML = ''; reqFooter.appendChild(ok);
    ok.focus();
  }

  $('#openRequest').addEventListener('click', function (e) { openRequest(e.currentTarget); });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.closest('[data-close]')) closeRequest();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeRequest();
  });
  reqForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (reqSubmit.disabled) return;
    setLoading(reqSubmit, true, '보내는 중…');
    later(showRequestDone, 900);
  });

  /* 시안 B·C 배경 인터랙션 */
  var skyEl = $('[data-sky-ribbon]');
  if (skyEl) initSkyRibbon(skyEl);
  var posterEl = $('[data-poster-type]');
  if (posterEl) initPosterType(posterEl);

  /* ── 4. 시안 리뷰 도크 ─────────────────────────────────────────── */
  var STATES = [
    ['default', '기본'], ['error', '입력 오류'], ['fail', '로그인 실패'],
    ['loading', '로그인 중'], ['caps', 'Caps Lock'], ['request', '권한 요청'], ['done', '요청 완료']
  ];
  var variant = document.body.getAttribute('data-variant') || 'a';
  var qs = function (state) { return state && state !== 'default' ? '?state=' + state : ''; };
  var currentState = params.get('state') || 'default';

  function applyState(s) {
    clearTimers();
    emit('reset');
    currentState = s;
    forceFail = false;
    closeRequest(); overlay.classList.remove('active');
    hideAlert(); setCaps(false);
    setLoading(submitBtn, false); setLoading(googleBtn, false); setFormDisabled(false);
    setFieldError(idInput, false); setFieldError(pwInput, false);
    if (s === 'default') { return; }
    if (s === 'error') { idInput.value = ''; pwInput.value = ''; form.requestSubmit ? form.requestSubmit() : submitBtn.click(); }
    if (s === 'fail') { idInput.value = 'srs.user'; pwInput.value = 'password1'; showAlert(); forceFail = true; }
    if (s === 'loading') { idInput.value = 'srs.user'; pwInput.value = 'password1'; setLoading(submitBtn, true, '로그인 중…'); setFormDisabled(true); }
    if (s === 'caps') { idInput.value = 'srs.user'; pwInput.value = 'PASS'; setCaps(true); }
    if (s === 'request') { openRequest(); }
    if (s === 'done') {
      openRequest();
      $('#arName').value = '홍길동'; $('#arLogin').value = 'srs.user'; $('#arAff').value = '분당캠퍼스'; $('#arContact').value = '010-0000-0000';
      showRequestDone();
    }
    emit('input');
    if (s === 'loading') emit('loading');
    if (s === 'fail') emit('fail');
    $$('.rd-menu button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.state === s); });
  }

  if (!params.has('clean')) {
    var dock = document.createElement('div');
    dock.className = 'review-dock';
    dock.setAttribute('role', 'toolbar');
    dock.setAttribute('aria-label', '시안 리뷰');
    dock.innerHTML =
      '<span class="rd-label">시안</span>' +
      ['a', 'b', 'c'].map(function (v) {
        return '<a class="rd-pill' + (v === variant ? ' is-active' : '') + '" href="login-' + v + '.html' + qs(currentState) + '" title="시안 ' + v.toUpperCase() + '">' + v.toUpperCase() + '</a>';
      }).join('') +
      '<span class="rd-sep"></span>' +
      '<div class="rd-menu-wrap"><button type="button" class="rd-btn" aria-expanded="false" aria-haspopup="true">상태 ' + I.chevUp + '</button>' +
      '<div class="rd-menu" hidden>' + STATES.map(function (s) { return '<button type="button" data-state="' + s[0] + '">' + s[1] + '</button>'; }).join('') + '</div></div>' +
      '<button type="button" class="rd-close" aria-label="리뷰 도크 숨기기">' + I.x + '</button>';
    document.body.appendChild(dock);
    var menuBtn = $('.rd-btn', dock), menu = $('.rd-menu', dock);
    menuBtn.addEventListener('click', function () {
      var open = menu.hidden; menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('button[data-state]', menu).forEach(function (b) {
      b.addEventListener('click', function () {
        menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false');
        applyState(b.dataset.state);
        history.replaceState(null, '', location.pathname + qs(b.dataset.state));
        $$('.rd-pill', dock).forEach(function (p) { p.href = p.getAttribute('href').split('?')[0] + qs(b.dataset.state); });
      });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.rd-menu-wrap')) { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); } });
    $('.rd-close', dock).addEventListener('click', function () { dock.classList.add('is-hidden'); });
  }

  if (currentState !== 'default') applyState(currentState);
  else if (!('ontouchstart' in window)) { (idInput.value ? pwInput : idInput).focus({ preventScroll: true }); }

  /* ── 5. 시안 A: 진행도 필드 ───────────────────────────────────── */
  var field = $('[data-flow-field]');
  if (field) initFlowField(field);

  function initFlowField(el) {
    var pies = [], tick = 4, timer = null;
    function stageOf(k) { return ((tick - k) % 5 + 5) % 5; }
    function build() {
      el.innerHTML = ''; pies = [];
      var W = el.clientWidth, H = el.clientHeight;
      if (!W || !H) return;
      var cell = Math.max(64, Math.min(116, W / 6.2));
      var d = Math.round(cell * 0.74);
      var R = Math.min(W * 0.84, H * 0.9);
      el.style.setProperty('--field-r', Math.round(R) + 'px');
      var bleed = cell * 0.3;
      var cols = Math.ceil((W + bleed) / cell) + 1;
      var rows = Math.ceil((H + bleed) / cell) + 1;
      var frag = document.createDocumentFragment();
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var cx = W + bleed - (c + 0.5) * cell;
          var cy = -bleed + (r + 0.5) * cell;
          var dist = Math.sqrt((W - cx) * (W - cx) + cy * cy);
          if (dist > R + cell) continue;
          var p = document.createElement('i');
          p.className = 'pie';
          p.style.width = p.style.height = d + 'px';
          p.style.left = Math.round(cx - d / 2) + 'px';
          p.style.top = Math.round(cy - d / 2) + 'px';
          p._k = Math.floor(dist / cell);
          p._delay = Math.round(dist / cell * 110);
          p.style.animationDelay = Math.round(dist / cell * 70) + 'ms';
          frag.appendChild(p); pies.push(p);
        }
      }
      el.appendChild(frag);
      pies.forEach(function (p) { p._s = stageOf(p._k); p.classList.add('s' + p._s); });
    }
    function step() {
      if (document.hidden) return;
      tick++;
      pies.forEach(function (p) {
        var s = stageOf(p._k);
        if (p._s === 4 && s === 0) {
          setTimeout(function () {
            p.classList.add('is-out');
            setTimeout(function () {
              p.style.transition = 'none';
              p.classList.remove('s4'); p.classList.add('s0');
              void p.offsetWidth;
              p.style.transition = '';
              p.classList.remove('is-out');
            }, 380);
          }, p._delay);
        } else {
          p.style.transitionDelay = p._delay + 'ms';
          p.classList.remove('s' + p._s); p.classList.add('s' + s);
        }
        p._s = s;
      });
    }
    build();
    if (!reduceMotion) timer = setInterval(step, 3200);
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 160); });
  }
  /* ── 6. 시안 B: 하늘 리본 — 커서가 지나가면 갈라지고, 타이핑마다 물결 ── */
  function initSkyRibbon(svg) {
    var NS = 'http://www.w3.org/2000/svg';
    var VW = 1440, VH = 600, N = 18, STEP = 36;
    var lines = [], xs = [];
    for (var x0 = -STEP; x0 <= VW + STEP; x0 += STEP) xs.push(x0);
    for (var i = 0; i < N; i++) {
      var t0 = i / (N - 1), op0 = 0.05 + 0.24 * Math.sin(Math.PI * t0);
      var el = document.createElementNS(NS, 'path');
      el.setAttribute('stroke-opacity', op0.toFixed(3));
      svg.appendChild(el);
      lines.push({ el: el, t: t0, op: op0 });
    }
    var rect = svg.getBoundingClientRect();
    var mode = 'idle', focused = false, modeTimer = null;
    var clock = 0, speed = 1, amp = 1, glow = 1, glowSet = 1, last = 0;
    var ptr = { x: 0, y: 0, s: 0 }, ptrT = { x: 0, y: 0, s: 0 };
    var ripples = [];

    function build(now) {
      var breath = 0.82 + 0.18 * Math.sin(clock * 0.55);   /* 리본 폭이 숨쉬듯 */
      var sway = 0.7 * Math.sin(clock * 0.35);              /* 꼬인 마디가 좌우로 흔들림(행진 X) */
      for (var i = 0; i < lines.length; i++) {
        var L = lines[i], ys = [];
        for (var k = 0; k < xs.length; k++) {
          var x = xs[k], u = x / VW;
          var y = 470 - 210 * u
            /* 리본 꼬임 */
            + amp * (L.t - 0.5) * 124 * breath * Math.cos(6.2832 * 0.8 * u + sway)
            /* 정상파: 마루↔골이 제자리에서 오르내림, 라인마다 위상차 → 실크처럼 벌어졌다 모임 */
            + amp * 38 * Math.sin(6.2832 * 0.9 * u + 1.2 + L.t * 0.8) * Math.cos(clock * 0.9 + L.t * 0.6)
            /* 너울: 큰 덩어리가 천천히 오르내리며 굴러감 */
            + amp * 26 * Math.sin(clock * 0.6 + u * 2.2 + L.t * 0.5)
            /* 잔물결: 약하게 옆으로 흐름 */
            + amp * 10 * Math.sin(6.2832 * 1.6 * u - clock * 0.5 + L.t * 1.3);
          if (ptr.s > 0.001) {                       /* 커서 주변 라인이 위아래로 갈라짐 */
            var dx = x - ptr.x, dy = y - ptr.y;
            y += 30 * ptr.s * Math.exp(-(dx * dx) / 45000) * (dy / 80) * Math.exp(0.5 - (dy * dy) / 12800);
          }
          for (var r = 0; r < ripples.length; r++) {  /* 입력 물결: 폼 중심에서 좌우로 퍼짐 */
            var R = ripples[r], age = now - R.t0 - L.t * 90;
            if (age <= 0) continue;
            var fr = age * 0.85, d1 = x - R.x - fr, d2 = x - R.x + fr;
            y -= R.a * Math.exp(-age / 650) * (Math.exp(-(d1 * d1) / 9800) + Math.exp(-(d2 * d2) / 9800));
          }
          ys.push(y);
        }
        var d = 'M' + xs[0] + ' ' + ys[0].toFixed(1);
        for (var m = 1; m < xs.length - 1; m++) {
          d += 'Q' + xs[m] + ' ' + ys[m].toFixed(1) + ' ' + (xs[m] + xs[m + 1]) / 2 + ' ' + ((ys[m] + ys[m + 1]) / 2).toFixed(1);
        }
        d += 'L' + xs[xs.length - 1] + ' ' + ys[ys.length - 1].toFixed(1);
        L.el.setAttribute('d', d);
      }
    }
    build(0);
    if (reduceMotion) return;

    function frame(now) {
      var dt = last ? Math.min(50, now - last) : 16; last = now;
      var sp = mode === 'loading' ? 2.4 : mode === 'success' ? 3.2 : focused ? 0.8 : 1;
      var am = mode === 'loading' ? 1.12 : 1;
      var gl = mode === 'success' ? 1.7 : mode === 'fail' ? 0.55 : focused ? 1.15 : 1;
      speed += (sp - speed) * 0.05;
      amp += (am - amp) * 0.05;
      glow += (gl - glow) * 0.07;
      clock += dt / 1000 * speed;
      ptr.x += (ptrT.x - ptr.x) * 0.12;
      ptr.y += (ptrT.y - ptr.y) * 0.12;
      ptr.s += (ptrT.s - ptr.s) * 0.06;
      ripples = ripples.filter(function (R) { return now - R.t0 < 2600; });
      build(now);
      if (Math.abs(glow - glowSet) > 0.01) {
        glowSet = glow;
        lines.forEach(function (L) { L.el.setAttribute('stroke-opacity', Math.min(0.6, L.op * glow).toFixed(3)); });
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function toVB(cx, cy) { return { x: (cx - rect.left) / rect.width * VW, y: (cy - rect.top) / rect.height * VH }; }
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var p = toVB(e.clientX, e.clientY);
      if (ptrT.s === 0) { ptr.x = p.x; ptr.y = p.y; }
      ptrT.x = p.x; ptrT.y = p.y; ptrT.s = 1;
    }, { passive: true });
    window.addEventListener('mouseout', function (e) { if (!e.relatedTarget) ptrT.s = 0; });
    window.addEventListener('resize', function () { rect = svg.getBoundingClientRect(); });

    function setMode(m, ms) {
      mode = m; clearTimeout(modeTimer);
      if (ms) modeTimer = setTimeout(function () { mode = 'idle'; }, ms);
    }
    function ripple(a) {
      var b = form.getBoundingClientRect();
      ripples.push({ t0: performance.now(), x: toVB(b.left + b.width / 2, 0).x, a: a });
      if (ripples.length > 6) ripples.shift();
    }
    window.addEventListener('auth:focus',   function () { focused = true; });
    window.addEventListener('auth:blur',    function () { focused = false; });
    window.addEventListener('auth:input',   function () { ripple(10); });
    window.addEventListener('auth:loading', function () { setMode('loading'); });
    window.addEventListener('auth:success', function () { setMode('success', 1600); ripple(20); });
    window.addEventListener('auth:fail',    function () { setMode('fail', 900); });
    window.addEventListener('auth:reset',   function () { setMode('idle'); });
  }

  /* ── 7. 시안 C: 포스터 타이포 — 입력할수록 글자가 차오르고, 커서 근처가 밝아짐 ── */
  function initPosterType(el) {
    var spans = $$('span', el);
    var RAMP = [0.6, 0.38, 0.22, 0.13, 0.08, 0.06];
    var fine = window.matchMedia('(pointer: fine)').matches && !reduceMotion;
    var front = 2, frontT = 2, success = false, hold = null, running = false;
    var ptr = { x: 0, y: 0, s: 0 }, ptrT = { x: 0, y: 0, s: 0 };
    var ops = spans.map(function () { return -1; });
    var centers = [], typeTop = 0, unit = 100;

    function rampAt(d) {
      if (d <= -1) return 1;
      if (d < 0) return 1 + (RAMP[0] - 1) * (d + 1);
      var i = Math.floor(d);
      if (i >= RAMP.length - 1) return RAMP[RAMP.length - 1];
      return RAMP[i] + (RAMP[i + 1] - RAMP[i]) * (d - i);
    }
    function progressFront() {   /* 기본 2글자 → 아이디 +2 → 비밀번호 +2 → 로그인 성공 시 전체 */
      return 2 + 2 * Math.min(idInput.value.trim().length / 6, 1) + 2 * Math.min(pwInput.value.length / 8, 1);
    }
    function measure() {
      var r = el.getBoundingClientRect();
      centers = spans.map(function (s) { var b = s.getBoundingClientRect(); return b.left + b.width / 2; });
      typeTop = r.top + r.height * 0.2;
      unit = r.width / spans.length;
    }
    function render(instant) {
      var moving = false;
      for (var i = 0; i < spans.length; i++) {
        var t = rampAt(i - front);
        if (ptr.s > 0.001) {
          var dx = (ptr.x - centers[i]) / (unit * 0.95);
          var v = ptr.y >= typeTop ? 1 : Math.max(0.3, 1 - (typeTop - ptr.y) / (window.innerHeight * 0.9));
          t += (1 - t) * 0.62 * Math.exp(-dx * dx / 2) * v * ptr.s;
        }
        var o = (instant || ops[i] < 0) ? t : ops[i] + (t - ops[i]) * 0.14;
        if (Math.abs(t - o) > 0.003) moving = true; else o = t;
        if (Math.abs(o - ops[i]) > 0.001) { ops[i] = o; spans[i].style.opacity = o.toFixed(3); }
      }
      return moving;
    }
    function frame() {
      front += (frontT - front) * 0.08;
      if (Math.abs(frontT - front) < 0.005) front = frontT;
      ptr.x += (ptrT.x - ptr.x) * 0.18;
      ptr.y = ptrT.y;
      ptr.s += (ptrT.s - ptr.s) * 0.08;
      if (Math.abs(ptrT.s - ptr.s) < 0.002) ptr.s = ptrT.s;
      var moving = render(false) || front !== frontT || ptr.s !== ptrT.s || Math.abs(ptrT.x - ptr.x) > 0.5;
      if (moving) requestAnimationFrame(frame); else running = false;
    }
    function kick() {
      if (reduceMotion) { front = frontT; render(true); return; }
      if (!running) { running = true; requestAnimationFrame(frame); }
    }
    function sync() { if (hold) return; frontT = success ? 8.6 : progressFront(); kick(); }

    window.addEventListener('auth:input',   function () { success = false; sync(); });
    window.addEventListener('auth:reset',   function () { success = false; clearTimeout(hold); hold = null; sync(); });
    window.addEventListener('auth:success', function () { success = true; clearTimeout(hold); hold = null; sync(); });
    window.addEventListener('auth:fail',    function () {
      success = false; clearTimeout(hold); frontT = 2; kick();
      hold = setTimeout(function () { hold = null; sync(); }, 650);
    });
    if (fine) {
      window.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        if (ptr.s < 0.01) ptr.x = e.clientX;
        ptrT.x = e.clientX; ptrT.y = e.clientY; ptrT.s = 1; kick();
      }, { passive: true });
      window.addEventListener('mouseout', function (e) { if (!e.relatedTarget) { ptrT.s = 0; kick(); } });
    }
    window.addEventListener('resize', function () { measure(); kick(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); kick(); });
    measure();
    front = frontT = progressFront();
    render(true);
  }
})();

