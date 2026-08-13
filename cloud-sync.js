(function () {
  'use strict';

  const firebaseConfig = {
    apiKey: 'AIzaSyDFGJhMaUeRi0kUOMqzu3JEdoQ621m5_LI',
    authDomain: 'svalna-nrnworld.firebaseapp.com',
    projectId: 'svalna-nrnworld',
    storageBucket: 'svalna-nrnworld.firebasestorage.app',
    messagingSenderId: '731246825054',
    appId: '1:731246825054:web:8e1cff0745788933632ecf'
  };

  const copy = {
    en: {
      local: 'Local only', connecting: 'Connecting…', synced: 'Live sync active', offline: 'Offline — changes are queued', error: 'Could not connect',
      create: 'Create household', join: 'Join household', placeholder: 'Enter household code', joining: 'Joining…', created: 'Household created', joined: 'Household joined',
      invalid: 'Check the household code', missing: 'No household was found for that code', leave: 'Disconnect this device', live: 'Everyone using this code sees the same fridge automatically.',
      codeHelp: 'Share this private code with family members. It gives access to your shared fridge.', lead: 'Create a shared household or enter the private code from another family member.', liveTitle: 'Live sync.', data: 'A local copy stays on this device. Household items and settings sync when live sync is active.', privacyTitle: 'Your photos stay on your phone.', privacy: 'Svalna uses no AI, analytics or personal account. Shared item details sync securely through your private household code; product photos remain local.'
    },
    sv: {
      local: 'Endast lokalt', connecting: 'Ansluter…', synced: 'Live-synk är aktiv', offline: 'Offline – ändringar köas', error: 'Kunde inte ansluta',
      create: 'Skapa hushåll', join: 'Anslut till hushåll', placeholder: 'Skriv hushållskoden', joining: 'Ansluter…', created: 'Hushållet skapades', joined: 'Ansluten till hushållet',
      invalid: 'Kontrollera hushållskoden', missing: 'Inget hushåll hittades med den koden', leave: 'Koppla från den här enheten', live: 'Alla som använder koden ser samma kyl automatiskt.',
      codeHelp: 'Dela den privata koden med familjen. Koden ger tillgång till ert gemensamma kylskåp.', lead: 'Skapa ett gemensamt hushåll eller skriv den privata koden från en familjemedlem.', liveTitle: 'Live-synk.', data: 'En lokal kopia finns kvar på enheten. Hushållets varor och inställningar synkas när live-synk är aktiv.', privacyTitle: 'Dina bilder stannar i mobilen.', privacy: 'Svalna använder ingen AI, analys eller personligt konto. Delade varuuppgifter synkas säkert via den privata hushållskoden; produktbilder stannar lokalt.'
    },
    es: {
      local: 'Solo local', connecting: 'Conectando…', synced: 'Sincronización activa', offline: 'Sin conexión; los cambios están en cola', error: 'No se pudo conectar',
      create: 'Crear hogar', join: 'Unirse al hogar', placeholder: 'Introduce el código del hogar', joining: 'Uniéndose…', created: 'Hogar creado', joined: 'Te has unido al hogar',
      invalid: 'Revisa el código del hogar', missing: 'No se encontró ningún hogar con ese código', leave: 'Desconectar este dispositivo', live: 'Todos los que usan este código ven la misma nevera automáticamente.',
      codeHelp: 'Comparte este código privado con tu familia. Da acceso a la nevera compartida.', lead: 'Crea un hogar compartido o introduce el código privado de otro familiar.', liveTitle: 'Sincronización en directo.', data: 'Una copia local permanece en este dispositivo. Los productos y ajustes del hogar se sincronizan cuando la sincronización está activa.', privacyTitle: 'Tus fotos permanecen en el teléfono.', privacy: 'Svalna no usa IA, analítica ni una cuenta personal. Los datos compartidos se sincronizan mediante el código privado; las fotos permanecen locales.'
    },
    tr: {
      local: 'Yalnızca yerel', connecting: 'Bağlanıyor…', synced: 'Canlı eşitleme etkin', offline: 'Çevrimdışı — değişiklikler sırada', error: 'Bağlanılamadı',
      create: 'Hane oluştur', join: 'Haneye katıl', placeholder: 'Hane kodunu gir', joining: 'Katılıyor…', created: 'Hane oluşturuldu', joined: 'Haneye katıldın',
      invalid: 'Hane kodunu kontrol et', missing: 'Bu kodla bir hane bulunamadı', leave: 'Bu cihazın bağlantısını kes', live: 'Bu kodu kullanan herkes aynı buzdolabını otomatik olarak görür.',
      codeHelp: 'Bu özel kodu ailenle paylaş. Kod, ortak buzdolabına erişim sağlar.', lead: 'Ortak bir hane oluştur veya bir aile üyesinin özel kodunu gir.', liveTitle: 'Canlı eşitleme.', data: 'Yerel bir kopya bu cihazda kalır. Canlı eşitleme açıkken hane ürünleri ve ayarları eşitlenir.', privacyTitle: 'Fotoğrafların telefonunda kalır.', privacy: 'Svalna yapay zekâ, analiz veya kişisel hesap kullanmaz. Paylaşılan ürün bilgileri özel hane koduyla eşitlenir; fotoğraflar yerel kalır.'
    }
  };

  let bridge;
  let db;
  let user;
  let householdCode = '';
  let unsubscribe;
  let writeTimer;
  let applyingRemote = false;
  let firebaseReady = false;

  const $ = selector => document.querySelector(selector);
  const lang = () => bridge?.language?.() || 'en';
  const words = () => copy[lang()] || copy.en;

  function setStatus(kind, label) {
    const el = $('#cloudStatus');
    if (!el) return;
    el.className = `cloud-status ${kind}`;
    el.textContent = label;
  }

  function normalizeCode(value) {
    const cleaned = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!cleaned.startsWith('SVAL') || cleaned.length !== 16) return '';
    return `SVAL-${cleaned.slice(4, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}`;
  }

  function generateCode() {
    const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    const token = [...bytes].map(byte => alphabet[byte % alphabet.length]).join('');
    return `SVAL-${token.slice(0, 4)}-${token.slice(4, 8)}-${token.slice(8, 12)}`;
  }

  function safeItem(item) {
    const clean = JSON.parse(JSON.stringify(item));
    if (clean.photo && clean.photo.startsWith('data:')) clean.photo = '';
    return clean;
  }

  function remotePayload(state) {
    return {
      name: state.household?.name || 'Our fridge',
      code: householdCode,
      temperature: Number(state.settings?.temperature ?? 4),
      warning: Number(state.settings?.warning ?? 3),
      items: (state.items || []).map(safeItem),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
  }

  function renderConnection() {
    const connected = Boolean(householdCode);
    $('#connectedHousehold')?.toggleAttribute('hidden', !connected);
    $('#joinHouseholdPanel')?.toggleAttribute('hidden', connected);
    $('#inviteCode') && ($('#inviteCode').textContent = householdCode || '—');
    if (connected && navigator.onLine) setStatus('online', words().synced);
    else if (connected) setStatus('offline', words().offline);
    else setStatus('local', firebaseReady ? words().local : words().connecting);
    applyLanguage();
  }

  function applyLanguage() {
    const w = words();
    const create = $('#createHousehold');
    const join = $('#joinHousehold');
    const input = $('#joinCode');
    const leave = $('#leaveHousehold');
    if (create) create.textContent = w.create;
    if (join) join.textContent = w.join;
    if (input) input.placeholder = w.placeholder;
    if (leave) leave.textContent = w.leave;
    if ($('.family-lead')) $('.family-lead').textContent = w.lead;
    if ($('.live-note b')) $('.live-note b').textContent = w.liveTitle;
    if ($('#liveSyncHelp')) $('#liveSyncHelp').textContent = w.live;
    if ($('#cloudCodeHelp')) $('#cloudCodeHelp').textContent = w.codeHelp;
    if ($('.data-card > div > p:not(.eyebrow)')) $('.data-card > div > p:not(.eyebrow)').textContent = w.data;
    if ($('.privacy-panel h2')) $('.privacy-panel h2').textContent = w.privacyTitle;
    if ($('.privacy-panel > p:last-child')) $('.privacy-panel > p:last-child').textContent = w.privacy;
  }

  async function enableOfflineCache() {
    try {
      await db.enablePersistence({ synchronizeTabs: true });
    } catch (error) {
      if (!['failed-precondition', 'unimplemented'].includes(error.code)) console.warn('Firestore cache:', error);
    }
  }

  async function attach(code, shouldApplyImmediately = true) {
    householdCode = code;
    bridge.setHousehold(code, true);
    unsubscribe?.();
    const ref = db.collection('households').doc(code);
    unsubscribe = ref.onSnapshot({ includeMetadataChanges: true }, async snapshot => {
      if (!snapshot.exists) return;
      if (snapshot.metadata.hasPendingWrites) {
        setStatus(navigator.onLine ? 'online' : 'offline', navigator.onLine ? words().synced : words().offline);
        return;
      }
      applyingRemote = true;
      await bridge.applyRemote(snapshot.data());
      applyingRemote = false;
      setStatus(snapshot.metadata.fromCache ? 'offline' : 'online', snapshot.metadata.fromCache ? words().offline : words().synced);
      renderConnection();
    }, error => {
      console.error('Household sync:', error);
      setStatus('error', words().error);
    });
    renderConnection();
    if (shouldApplyImmediately) {
      const first = await ref.get();
      if (first.exists) {
        applyingRemote = true;
        await bridge.applyRemote(first.data());
        applyingRemote = false;
      }
    }
  }

  async function createHousehold() {
    if (!firebaseReady || !user) return;
    const button = $('#createHousehold');
    button.disabled = true;
    setStatus('working', words().connecting);
    try {
      const code = generateCode();
      householdCode = code;
      const payload = remotePayload(bridge.snapshot());
      payload.ownerId = user.uid;
      payload.memberIds = [user.uid];
      payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection('households').doc(code).set(payload);
      await attach(code, false);
      bridge.notify(words().created);
    } catch (error) {
      console.error('Create household:', error);
      setStatus('error', words().error);
      householdCode = '';
    } finally {
      button.disabled = false;
      renderConnection();
    }
  }

  async function joinHousehold() {
    if (!firebaseReady || !user) return;
    const code = normalizeCode($('#joinCode')?.value);
    if (!code) return bridge.notify(words().invalid);
    const button = $('#joinHousehold');
    button.disabled = true;
    button.textContent = words().joining;
    setStatus('working', words().connecting);
    try {
      const ref = db.collection('households').doc(code);
      const snapshot = await ref.get({ source: 'server' });
      if (!snapshot.exists) return bridge.notify(words().missing);
      await ref.update({
        memberIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      await attach(code, true);
      bridge.notify(words().joined);
    } catch (error) {
      console.error('Join household:', error);
      bridge.notify(error.code === 'permission-denied' ? words().invalid : words().error);
      setStatus('error', words().error);
    } finally {
      button.disabled = false;
      applyLanguage();
    }
  }

  function queueState(state) {
    if (!firebaseReady || !householdCode || applyingRemote) return;
    clearTimeout(writeTimer);
    writeTimer = setTimeout(async () => {
      try {
        await db.collection('households').doc(householdCode).set(remotePayload(state), { merge: true });
      } catch (error) {
        console.error('Queue household update:', error);
        setStatus(navigator.onLine ? 'error' : 'offline', navigator.onLine ? words().error : words().offline);
      }
    }, 180);
  }

  function disconnect() {
    unsubscribe?.();
    unsubscribe = undefined;
    householdCode = '';
    bridge.setHousehold('', false);
    renderConnection();
    bridge.notify(words().local);
  }

  async function init(appBridge) {
    bridge = appBridge;
    renderConnection();
    try {
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      await enableOfflineCache();
      const credential = await firebase.auth().signInAnonymously();
      user = credential.user;
      firebaseReady = true;
      const savedCode = normalizeCode(bridge.snapshot().household?.cloud ? bridge.snapshot().household.code : '');
      if (savedCode) await attach(savedCode, true);
      else renderConnection();
    } catch (error) {
      console.error('Firebase init:', error);
      firebaseReady = false;
      setStatus('error', words().error);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#createHousehold')?.addEventListener('click', createHousehold);
    $('#joinHousehold')?.addEventListener('click', joinHousehold);
    $('#joinCode')?.addEventListener('keydown', event => {
      if (event.key === 'Enter') joinHousehold();
    });
    $('#leaveHousehold')?.addEventListener('click', disconnect);
    window.addEventListener('online', renderConnection);
    window.addEventListener('offline', renderConnection);
  });

  window.SvalnaCloud = { init, queueState, applyLanguage };
})();
