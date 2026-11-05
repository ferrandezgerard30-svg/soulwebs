/* Email chooser: mailto links do nothing on computers without a mail app,
   so clicking any email link opens a small panel with Gmail / Outlook / mail app / copy. */
(function () {
  var es = (document.documentElement.lang || '').toLowerCase().indexOf('es') === 0;
  var T = es ? {
    title: 'Escríbenos', sub: 'Elige cómo quieres enviar el email:', gmail: 'Abrir en Gmail',
    outlook: 'Abrir en Outlook', app: 'Usar mi app de correo', copy: 'Copiar', copied: '¡Copiado!', close: 'Cerrar'
  } : {
    title: 'Email us', sub: 'Choose how you want to send it:', gmail: 'Open in Gmail',
    outlook: 'Open in Outlook', app: 'Use my email app', copy: 'Copy', copied: 'Copied!', close: 'Close'
  };

  var css = '' +
    '.sw-mail-bd{position:fixed;inset:0;background:rgba(42,38,34,.45);display:flex;align-items:center;justify-content:center;padding:16px;z-index:10000;opacity:0;transition:opacity .2s}' +
    '.sw-mail-bd.open{opacity:1}' +
    '.sw-mail{background:#FAF8F4;color:#2A2622;border-radius:20px;max-width:420px;width:100%;padding:28px 24px 22px;box-shadow:0 40px 80px -24px rgba(42,38,34,.35);font-family:Geist,system-ui,sans-serif;position:relative;transform:translateY(8px);transition:transform .25s}' +
    '.sw-mail-bd.open .sw-mail{transform:none}' +
    '.sw-mail h2{font-family:Fraunces,Georgia,serif;font-weight:400;font-size:30px;line-height:1.1;margin:0 0 6px}' +
    '.sw-mail p{margin:0 0 18px;color:#4A453E;font-size:15px}' +
    '.sw-mail-addr{display:flex;gap:8px;align-items:center;background:#F4F1EB;border:1px solid rgba(42,38,34,.12);border-radius:12px;padding:10px 10px 10px 14px;margin-bottom:14px}' +
    '.sw-mail-addr span{flex:1;font-family:"Geist Mono",monospace;font-size:14px;word-break:break-all}' +
    '.sw-mail-addr button,.sw-mail a.sw-opt{font:inherit;cursor:pointer}' +
    '.sw-mail-addr button{background:#2A2622;color:#F4F1EB;border:0;border-radius:8px;padding:8px 12px;font-size:13px;min-width:74px}' +
    '.sw-mail a.sw-opt{display:block;text-align:center;text-decoration:none;color:#2A2622;border:1px solid rgba(42,38,34,.18);border-radius:999px;padding:13px 16px;margin-top:8px;font-size:15px;transition:background .15s}' +
    '.sw-mail a.sw-opt:hover{background:#EBE7DE}' +
    '.sw-mail a.sw-opt.primary{background:#2A2622;color:#F4F1EB;border-color:#2A2622}' +
    '.sw-mail a.sw-opt.primary:hover{background:#4A453E}' +
    '.sw-mail-x{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:1px solid rgba(42,38,34,.15);background:transparent;cursor:pointer;font-size:18px;line-height:1;color:#2A2622}' +
    '.sw-mail :focus-visible{outline:2px solid #2A2622;outline-offset:3px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function parse(href) {
    var q = href.replace(/^mailto:/i, '').split('?');
    var to = decodeURIComponent(q[0] || 'soulwebs2026@gmail.com');
    var p = new URLSearchParams((q[1] || '').replace(/&amp;/g, '&'));
    return { to: to, su: p.get('subject') || '', body: p.get('body') || '' };
  }
  function enc(s) { return encodeURIComponent(s); }

  var last;
  function open(href) {
    var m = parse(href); last = document.activeElement;
    var gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + enc(m.to) + (m.su ? '&su=' + enc(m.su) : '') + (m.body ? '&body=' + enc(m.body) : '');
    var outlook = 'https://outlook.live.com/mail/0/deeplink/compose?to=' + enc(m.to) + (m.su ? '&subject=' + enc(m.su) : '') + (m.body ? '&body=' + enc(m.body) : '');
    var bd = document.createElement('div'); bd.className = 'sw-mail-bd';
    bd.innerHTML = '<div class="sw-mail" role="dialog" aria-modal="true" aria-labelledby="sw-mail-t">' +
      '<button class="sw-mail-x" type="button" aria-label="' + T.close + '">×</button>' +
      '<h2 id="sw-mail-t">' + T.title + '</h2><p>' + T.sub + '</p>' +
      '<div class="sw-mail-addr"><span></span><button type="button" class="sw-copy">' + T.copy + '</button></div>' +
      '<a class="sw-opt primary" target="_blank" rel="noopener">' + T.gmail + '</a>' +
      '<a class="sw-opt" target="_blank" rel="noopener">' + T.outlook + '</a>' +
      '<a class="sw-opt">' + T.app + '</a></div>';
    bd.querySelector('.sw-mail-addr span').textContent = m.to;
    var opts = bd.querySelectorAll('a.sw-opt');
    opts[0].href = gmail; opts[1].href = outlook; opts[2].href = href; opts[2].setAttribute('data-sw-direct', '1');
    function close() { bd.classList.remove('open'); setTimeout(function () { bd.remove(); }, 200); document.removeEventListener('keydown', key); if (last && last.focus) last.focus(); }
    function key(e) { if (e.key === 'Escape') close(); }
    bd.addEventListener('click', function (e) { if (e.target === bd) close(); });
    bd.querySelector('.sw-mail-x').addEventListener('click', close);
    opts.forEach(function (a) { a.addEventListener('click', function () { setTimeout(close, 300); }); });
    var cb = bd.querySelector('.sw-copy');
    cb.addEventListener('click', function () {
      var done = function () { cb.textContent = T.copied; setTimeout(function () { cb.textContent = T.copy; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(m.to).then(done, function () { fallback(); }); } else { fallback(); }
      function fallback() { var r = document.createRange(); r.selectNodeContents(bd.querySelector('.sw-mail-addr span')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); try { document.execCommand('copy'); done(); } catch (e) {} }
    });
    document.addEventListener('keydown', key);
    document.body.appendChild(bd);
    requestAnimationFrame(function () { bd.classList.add('open'); opts[0].focus(); });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || a.hasAttribute('data-sw-direct') || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    // close the mobile menu if it's open
    document.body.classList.remove('menu-open');
    var d = document.getElementById('drawer'), b = document.getElementById('backdrop');
    if (d) d.classList.remove('open'); if (b) b.classList.remove('open');
    open(a.getAttribute('href'));
  });

  // the review form builds a mailto URL in script; route it through the panel too
  window.swOpenMail = open;
})();
