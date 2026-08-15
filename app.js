(() => {
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const DAY=86400000, DB_NAME='svalna-local', STORE='state', STATE_KEY='main';
let suppressCloudSave=false;
const locale={en:'en-GB',sv:'sv-SE',es:'es-ES',tr:'tr-TR'};
const I={
 en:{overview:'Overview',fridge:'Fridge',family:'Family',settings:'Settings',local:'Stored safely on this device.',hello:'Good morning.',subtitle:'Your fridge remembers for you.',situation:'Right now',calm:'Your fridge feels calm',calmText:'Nothing needs attention today.',attention:'A few things need you',attentionText:'Use the most urgent items first.',fresh:'Fresh',soon:'Use soon',urgent:'Today',lessWaste:'Less waste',eatFirst:'Eat first',showAll:'Show all',yourFridge:'Your fridge',allFridge:'Everything in the fridge',search:'Search item or category…',all:'All',soonShort:'Soon',today:'Today',airy:'Plenty of room',empty:'Add your first item and Svalna will keep track.',add:'Add item',inventoryLead:'Find, sort and use what needs a little care first.',overviewLead:'A clear overview',together:'At home, together',familyTitle:"The family's fridge",familyLead:'Share the same fridge without an account — using a simple offline file.',householdCode:'Household code',ourFridge:'Our fridge',codeHelp:'The code identifies the right backup. The contents travel in the file.',shareFile:'Share offline file',howShare:'How offline sharing works',steps:['Export the household file from the up-to-date phone.','Send the file to your family using any app.','Import the file into Svalna on each phone.'],noLive:'No live sync yet.',noLiveText:'Without a server, phones cannot update automatically. Each device calculates dates and shows notifications locally.',importHouse:'Import household file',yourWay:'Make it yours',settingsLead:'Fine-tune how Svalna calculates and reminds.',temperature:'Fridge temperature',tempHelp:'Affects estimated dates for fruit and vegetables.',warn:'Warn in advance',warnHelp:'Items turn yellow — and Svalna reminds you — when they reach this threshold.',notifications:'Notifications',notifyHelp:'Allow notifications from the browser.',activate:'Enable',remindTitle:'Svalna reminder',language:'Language',languageHelp:'Choose the language used in Svalna.',theme:'Theme',themeHelp:'Choose light or dark appearance.',themeLight:'Light',themeDark:'Dark',themeToast:'Theme changed',yourData:'Your data',dataHelp:'Everything stays on this device. Export a backup before changing phones.',export:'Export backup',import:'Import backup',reset:'Reset demo data',private:'Offline & private',privateTitle:'Your food list never leaves your phone.',privateText:'Svalna uses no AI, analytics or account. Notifications while the app is fully closed cannot be guaranteed by every mobile browser.',newItem:'New in the fridge',addTitle:'Add item',photoHelp:'A photo makes it easy to find',takePhoto:'Take photo',choosePhoto:'Choose image',photoDate:'Photographing the date?',photoDateText:'The image is stored locally. Enter the date below — Svalna does not claim to read it automatically.',name:'Name',namePh:'For example cherry tomatoes',category:'Category',quantity:'Quantity',quantityPh:'For example 6',added:'Added / purchased',howCount:'How should we calculate?',printed:'Printed best-before',estimate:'Estimate shelf life',unknownDate:'I don\'t know',noDate:'No date',unknownHint:'No best-before date — Svalna can\'t estimate when to use it.',bestBefore:'Best before',produce:'Fresh produce type',cancel:'Cancel',save:'Save item',inFridge:'In your fridge',remove:'Remove',edit:'Edit',consumed:'Mark used',resetTitle:'Reset everything?',resetText:'Your items and settings will be replaced with demo data. This cannot be undone.',keep:'Keep my data',yesReset:'Yes, reset',days:'days',day:'day',left:'left',expired:'expired',expiresToday:'use today',estimated:'Estimated',printedLabel:'Printed date',addedLabel:'Added',status:'Status',estimateDisclaimer:'This is a storage estimate, not a food-safety guarantee. Always look, smell and use your judgement.',saved:'Item saved',removed:'Item removed',used:'Marked as used',copied:'Code copied',exported:'Backup exported',imported:'Household imported',invalidFile:'The file could not be imported',resetDone:'Demo data restored',permission:'Notification permission',notifyGranted:'Notifications are enabled. Open Svalna regularly for date checks.',notifyDenied:'Notifications are blocked in browser settings.',notifyUnsupported:'This browser does not support notifications.',notifyOn:'Reminders enabled',notifyOff:'Reminders turned off',notifyOffHelp:'Notifications are off. Enable to get reminders when items are about to expire.',deactivate:'Turn off',tempToast:'Temperature updated — estimates recalculated',warningToast:'Warning threshold updated',langToast:'Language changed',items:'items',item:'item',editTitle:'Edit item',photoStored:'Your selected image',join:'Import',or:'or',categories:['Vegetables','Fruit & berries','Dairy & eggs','Drinks','Sauces','Leftovers','Other'],produceTypes:['Tomato','Berries / strawberries','Leafy greens / salad','Broccoli','Cucumber','Pepper','Apple','Citrus','Carrot','Other fruit or vegetable'],undo:'Undo',listNav:'List',statsNav:'Stats',listTitle:'Shopping list',listLead:'Things to pick up on your next trip — with smart suggestions from the fridge.',listSuggest:'From the fridge',listEmpty:'Nothing to pick up yet',listClear:'Clear done',listPlace:'Add an item…',listAdd:'Add',addedToList:'Added to list',toList:'To list',statsTitle:'This week',statsUsed:'used',statsWasted:'wasted',buyAgain:'Buy again',buyAgainHelp:'Your recent items — one tap to add.',themeSystem:'System',ideasTitle:'Quick ideas',ideasEmpty:'Add a few items and recipe ideas will appear here.',installTitle:'Install Svalna as an app',installText:'Add Svalna to your home screen — it works offline and opens like a real app.',installBtn:'Install',installLater:'Not now',installDone:'Svalna has been installed!',iosInstall:'On iPhone or iPad: tap Share, then "Add to Home Screen".',installHint:'Open your browser menu and choose "Add to Home screen" or "Install app".'},
 sv:{overview:'Översikt',fridge:'Kylen',family:'Familj',settings:'Inställningar',local:'Lagrar tryggt på den här enheten.',hello:'God morgon.',subtitle:'Ditt kylskåp minns åt dig.',situation:'Läget just nu',calm:'Kylen känns lugn',calmText:'Inget behöver tas om hand idag.',attention:'Några varor behöver dig',attentionText:'Använd de mest brådskande först.',fresh:'Fräscht',soon:'Använd snart',urgent:'Idag',lessWaste:'Mindre svinn',eatFirst:'Ät först',showAll:'Visa alla',yourFridge:'Din kyl',allFridge:'Allt i kylen',search:'Sök vara eller kategori…',all:'Alla',soonShort:'Snart',today:'Idag',airy:'Här var det luftigt',empty:'Lägg till din första vara så håller Svalna koll.',add:'Lägg till vara',inventoryLead:'Hitta, sortera och använd det som behöver lite kärlek först.',overviewLead:'Samlad överblick',together:'Tillsammans hemma',familyTitle:'Familjens kylminne',familyLead:'Dela samma kyl utan konto – med en enkel offline-fil.',householdCode:'Hushållskod',ourFridge:'Vårt kylskåp',codeHelp:'Koden hjälper er känna igen rätt backup. Själva innehållet följer med i filen.',shareFile:'Dela offline-fil',howShare:'Så fungerar offline-delning',steps:['Exportera hushållets fil från den mobil som är uppdaterad.','Skicka filen till familjen med valfri app.','Importera filen i Svalna på varje mobil.'],noLive:'Ingen live-synk ännu.',noLiveText:'Utan server kan mobilerna inte uppdateras automatiskt. Varje enhet räknar datum och visar aviseringar lokalt.',importHouse:'Importera hushållsfil',yourWay:'På ditt sätt',settingsLead:'Finjustera hur Svalna räknar och påminner.',temperature:'Kylskåpstemperatur',tempHelp:'Påverkar uppskattade datum för frukt och grönt.',warn:'Varna i förväg',warnHelp:'Varor blir gula — och Svalna påminner dig — när de når gränsen.',notifications:'Aviseringar',notifyHelp:'Tillåt aviseringar från webbläsaren.',activate:'Aktivera',remindTitle:'Svalna påminnelse',language:'Språk',languageHelp:'Välj språket som används i Svalna.',theme:'Tema',themeHelp:'Välj ljust eller mörkt utseende.',themeLight:'Ljust',themeDark:'Mörkt',themeToast:'Temat ändrades',yourData:'Din data',dataHelp:'Allt ligger lokalt på enheten. Exportera en backup innan du byter mobil.',export:'Exportera backup',import:'Importera backup',reset:'Återställ demodata',private:'Offline & privat',privateTitle:'Din matlista lämnar aldrig mobilen.',privateText:'Svalna använder ingen AI, ingen analys och inget konto. Aviseringar när appen är helt stängd kan inte garanteras av alla mobila webbläsare.',newItem:'Ny i kylen',addTitle:'Lägg till vara',photoHelp:'En bild gör varan lätt att hitta',takePhoto:'Ta bild',choosePhoto:'Välj bild',photoDate:'Fotograferar du datumet?',photoDateText:'Bilden sparas lokalt. Skriv sedan in datumet nedan – Svalna påstår inte att bilden läses automatiskt.',name:'Namn',namePh:'Till exempel kvisttomater',category:'Kategori',quantity:'Mängd',quantityPh:'Till exempel 6 st',added:'Inlagd / köpt',howCount:'Hur räknar vi?',printed:'Tryckt bäst före',estimate:'Uppskatta hållbarhet',unknownDate:'Jag vet inte',noDate:'Utan datum',unknownHint:'Vi sparar varan utan bäst före-datum — Svalna kan inte uppskatta när den ska användas.',bestBefore:'Bäst före',produce:'Typ av färskvara',cancel:'Avbryt',save:'Spara vara',inFridge:'I ditt kylskåp',remove:'Ta bort',edit:'Redigera',consumed:'Markera använd',resetTitle:'Återställa allt?',resetText:'Alla egna varor och inställningar ersätts med demodata. Det går inte att ångra.',keep:'Behåll min data',yesReset:'Ja, återställ',days:'dagar',day:'dag',left:'kvar',expired:'förfallen',expiresToday:'använd idag',estimated:'Uppskattat',printedLabel:'Tryckt datum',addedLabel:'Inlagd',status:'Status',estimateDisclaimer:'Detta är en förvaringsuppskattning, inte en garanti för livsmedelssäkerhet. Titta, lukta och använd ditt omdöme.',saved:'Varan sparades',removed:'Varan togs bort',used:'Markerad som använd',copied:'Koden kopierades',exported:'Backup exporterad',imported:'Hushållet importerades',invalidFile:'Filen kunde inte importeras',resetDone:'Demodata återställd',permission:'Aviseringstillstånd',notifyGranted:'Aviseringar är aktiva. Öppna Svalna regelbundet för datumkontroll.',notifyDenied:'Aviseringar är blockerade i webbläsaren.',notifyUnsupported:'Webbläsaren saknar stöd för aviseringar.',notifyOn:'Påminnelser på',notifyOff:'Påminnelser avstängda',notifyOffHelp:'Aviseringar är avstängda. Aktivera för påminnelser när varor snart går ut.',deactivate:'Stäng av',tempToast:'Temperaturen uppdaterades – uppskattningar omräknade',warningToast:'Varningsgränsen uppdaterades',langToast:'Språket ändrades',items:'varor',item:'vara',editTitle:'Redigera vara',photoStored:'Din valda bild',join:'Importera',or:'eller',categories:['Grönsaker','Frukt & bär','Mejeri & ägg','Dryck','Såser','Rester','Övrigt'],produceTypes:['Tomat','Bär / jordgubbar','Bladgrönt / sallad','Broccoli','Gurka','Paprika','Äpple','Citrus','Morot','Annan frukt eller grönsak'],undo:'Ångra',listNav:'Lista',statsNav:'Statistik',listTitle:'Inköpslista',listLead:'Saker att handla nästa gång – med smarta förslag från kylen.',listSuggest:'Från kylen',listEmpty:'Inget att handla ännu',listClear:'Rensa klara',listPlace:'Lägg till en vara…',listAdd:'Lägg till',addedToList:'Tillagd i listan',toList:'Till listan',statsTitle:'Den här veckan',statsUsed:'använda',statsWasted:'slängda',buyAgain:'Köp igen',buyAgainHelp:'Dina senaste varor – ett tryck för att lägga till.',themeSystem:'Systemet',ideasTitle:'Snabba idéer',ideasEmpty:'Lägg till några varor så dyker receptidéer upp här.',installTitle:'Installera Svalna som app',installText:'Lägg Svalna på hemskärmen – fungerar offline och öppnas som en riktig app.',installBtn:'Installera',installLater:'Inte nu',installDone:'Svalna är installerad!',iosInstall:'På iPhone eller iPad: tryck Dela och välj "Lägg till på hemskärmen".',installHint:'Öppna webbläsarens meny och välj "Lägg till på hemskärmen" eller "Installera app".'},
 es:{overview:'Resumen',fridge:'Nevera',family:'Familia',settings:'Ajustes',local:'Guardado de forma segura en este dispositivo.',hello:'Buenos días.',subtitle:'Tu nevera recuerda por ti.',situation:'Ahora mismo',calm:'Todo está tranquilo',calmText:'Nada requiere atención hoy.',attention:'Algunos alimentos te necesitan',attentionText:'Usa primero los más urgentes.',fresh:'Fresco',soon:'Usar pronto',urgent:'Hoy',lessWaste:'Menos desperdicio',eatFirst:'Consume primero',showAll:'Ver todo',yourFridge:'Tu nevera',allFridge:'Todo en la nevera',search:'Buscar alimento o categoría…',all:'Todo',soonShort:'Pronto',today:'Hoy',airy:'Hay mucho espacio',empty:'Añade tu primer alimento y Svalna lo controlará.',add:'Añadir alimento',inventoryLead:'Encuentra, ordena y usa primero lo que necesita atención.',overviewLead:'Vista general',together:'Juntos en casa',familyTitle:'La nevera familiar',familyLead:'Comparte la misma nevera sin cuenta mediante un archivo offline.',householdCode:'Código del hogar',ourFridge:'Nuestra nevera',codeHelp:'El código identifica la copia correcta. El contenido viaja en el archivo.',shareFile:'Compartir archivo offline',howShare:'Cómo funciona el uso compartido',steps:['Exporta el archivo desde el móvil actualizado.','Envía el archivo a tu familia con cualquier app.','Importa el archivo en Svalna en cada móvil.'],noLive:'Aún no hay sincronización en vivo.',noLiveText:'Sin servidor, los móviles no pueden actualizarse solos. Cada dispositivo calcula las fechas y muestra avisos localmente.',importHouse:'Importar archivo familiar',yourWay:'A tu manera',settingsLead:'Ajusta cómo Svalna calcula y recuerda.',temperature:'Temperatura de la nevera',tempHelp:'Afecta a las fechas estimadas de frutas y verduras.',warn:'Avisar con antelación',warnHelp:'Los alimentos se vuelven amarillos — y Svalna te recuerda — al llegar al límite.',notifications:'Notificaciones',notifyHelp:'Permite notificaciones del navegador.',activate:'Activar',remindTitle:'Recordatorio de Svalna',language:'Idioma',languageHelp:'Elige el idioma de Svalna.',theme:'Tema',themeHelp:'Elige apariencia clara u oscura.',themeLight:'Claro',themeDark:'Oscuro',themeToast:'Tema cambiado',yourData:'Tus datos',dataHelp:'Todo permanece en este dispositivo. Exporta una copia antes de cambiar de móvil.',export:'Exportar copia',import:'Importar copia',reset:'Restaurar datos de demo',private:'Offline y privado',privateTitle:'Tu lista nunca sale del teléfono.',privateText:'Svalna no usa IA, analítica ni cuentas. No todos los navegadores garantizan avisos con la app cerrada.',newItem:'Nuevo en la nevera',addTitle:'Añadir alimento',photoHelp:'Una foto ayuda a encontrarlo',takePhoto:'Hacer foto',choosePhoto:'Elegir imagen',photoDate:'¿Fotografías la fecha?',photoDateText:'La imagen se guarda localmente. Escribe la fecha abajo: Svalna no afirma leerla automáticamente.',name:'Nombre',namePh:'Por ejemplo, tomates cherry',category:'Categoría',quantity:'Cantidad',quantityPh:'Por ejemplo, 6',added:'Añadido / comprado',howCount:'¿Cómo calculamos?',printed:'Fecha impresa',estimate:'Estimar duración',unknownDate:'No lo sé',noDate:'Sin fecha',unknownHint:'Lo guardamos sin fecha de caducidad: Svalna no puede calcular cuándo usarlo.',bestBefore:'Consumo preferente',produce:'Tipo de producto fresco',cancel:'Cancelar',save:'Guardar',inFridge:'En tu nevera',remove:'Eliminar',edit:'Editar',consumed:'Marcar usado',resetTitle:'¿Restaurar todo?',resetText:'Tus alimentos y ajustes se reemplazarán con datos de demo. No se puede deshacer.',keep:'Conservar mis datos',yesReset:'Sí, restaurar',days:'días',day:'día',left:'restantes',expired:'caducado',expiresToday:'usar hoy',estimated:'Estimado',printedLabel:'Fecha impresa',addedLabel:'Añadido',status:'Estado',estimateDisclaimer:'Es una estimación de conservación, no una garantía de seguridad alimentaria. Observa, huele y usa tu criterio.',saved:'Alimento guardado',removed:'Alimento eliminado',used:'Marcado como usado',copied:'Código copiado',exported:'Copia exportada',imported:'Hogar importado',invalidFile:'No se pudo importar el archivo',resetDone:'Datos de demo restaurados',permission:'Permiso de notificación',notifyGranted:'Notificaciones activadas. Abre Svalna regularmente para revisar fechas.',notifyDenied:'Las notificaciones están bloqueadas.',notifyUnsupported:'Este navegador no admite notificaciones.',notifyOn:'Recordatorios activados',notifyOff:'Recordatorios desactivados',notifyOffHelp:'Notificaciones desactivadas. Actívalas para recibir recordatorios cuando los alimentos estén por caducar.',deactivate:'Desactivar',tempToast:'Temperatura actualizada; estimaciones recalculadas',warningToast:'Aviso actualizado',langToast:'Idioma cambiado',items:'alimentos',item:'alimento',editTitle:'Editar alimento',photoStored:'Tu imagen',join:'Importar',or:'o',categories:['Verduras','Fruta y bayas','Lácteos y huevos','Bebidas','Salsas','Sobras','Otros'],produceTypes:['Tomate','Bayas / fresas','Hojas verdes / ensalada','Brócoli','Pepino','Pimiento','Manzana','Cítricos','Zanahoria','Otra fruta o verdura'],undo:'Deshacer',listNav:'Lista',statsNav:'Estadísticas',listTitle:'Lista de la compra',listLead:'Lo que debes comprar en tu próximo viaje, con sugerencias de la nevera.',listSuggest:'De la nevera',listEmpty:'Nada que comprar todavía',listClear:'Vaciar marcados',listPlace:'Añadir un artículo…',listAdd:'Añadir',addedToList:'Añadido a la lista',toList:'A la lista',statsTitle:'Esta semana',statsUsed:'usados',statsWasted:'desechados',buyAgain:'Volver a comprar',buyAgainHelp:'Tus artículos recientes: un toque para añadir.',themeSystem:'Sistema',ideasTitle:'Ideas rápidas',ideasEmpty:'Añade algunos alimentos y aquí aparecerán ideas de recetas.',installTitle:'Instala Svalna como app',installText:'Ten Svalna en tu pantalla de inicio: funciona sin conexión y se abre como una app real.',installBtn:'Instalar',installLater:'Ahora no',installDone:'¡Svalna ha sido instalada!',iosInstall:'En iPhone o iPad: toca Compartir y elige "Añadir a pantalla de inicio".',installHint:'Abre el menú del navegador y elige "Añadir a pantalla de inicio" o "Instalar app".'},
 tr:{overview:'Genel bakış',fridge:'Buzdolabı',family:'Aile',settings:'Ayarlar',local:'Bu cihazda güvenle saklanır.',hello:'Günaydın.',subtitle:'Buzdolabın senin için hatırlar.',situation:'Şu anda',calm:'Dolap sakin görünüyor',calmText:'Bugün ilgilenmen gereken bir şey yok.',attention:'Bazı ürünler seni bekliyor',attentionText:'Önce en acil ürünleri kullan.',fresh:'Taze',soon:'Yakında kullan',urgent:'Bugün',lessWaste:'Daha az israf',eatFirst:'Önce bunları ye',showAll:'Tümünü göster',yourFridge:'Buzdolabın',allFridge:'Buzdolabındaki her şey',search:'Ürün veya kategori ara…',all:'Tümü',soonShort:'Yakında',today:'Bugün',airy:'Burada bolca yer var',empty:'İlk ürünü ekle, Svalna takip etsin.',add:'Ürün ekle',inventoryLead:'Önce ilgilenmen gereken ürünleri bul, sırala ve kullan.',overviewLead:'Toplu görünüm',together:'Evde birlikte',familyTitle:'Ailenin buzdolabı',familyLead:'Hesap olmadan, basit bir çevrimdışı dosyayla aynı dolabı paylaş.',householdCode:'Hane kodu',ourFridge:'Buzdolabımız',codeHelp:'Kod doğru yedeği tanımlar. İçerik dosyanın içinde taşınır.',shareFile:'Çevrimdışı dosyayı paylaş',howShare:'Çevrimdışı paylaşım nasıl çalışır',steps:['Güncel telefondan hane dosyasını dışa aktar.','Dosyayı herhangi bir uygulamayla ailene gönder.','Her telefonda dosyayı Svalna’ya aktar.'],noLive:'Henüz canlı eşitleme yok.',noLiveText:'Sunucu olmadan telefonlar otomatik güncellenemez. Her cihaz tarihleri hesaplar ve bildirimleri yerel gösterir.',importHouse:'Hane dosyasını içe aktar',yourWay:'Senin tarzın',settingsLead:'Svalna’nın nasıl hesaplayıp hatırlatacağını ayarla.',temperature:'Buzdolabı sıcaklığı',tempHelp:'Meyve ve sebzelerin tahmini tarihlerini etkiler.',warn:'Önceden uyar',warnHelp:'Ürünler sınıra gelince sarıya döner — Svalna sana hatırlatır.',notifications:'Bildirimler',notifyHelp:'Tarayıcı bildirimlerine izin ver.',activate:'Etkinleştir',remindTitle:'Svalna hatırlatma',language:'Dil',languageHelp:'Svalna’da kullanılacak dili seç.',theme:'Tema',themeHelp:'Açık veya koyu görünüm seç.',themeLight:'Açık',themeDark:'Koyu',themeToast:'Tema değiştirildi',yourData:'Verilerin',dataHelp:'Her şey bu cihazda kalır. Telefon değiştirmeden önce yedek al.',export:'Yedeği dışa aktar',import:'Yedeği içe aktar',reset:'Demo verilerini sıfırla',private:'Çevrimdışı ve özel',privateTitle:'Yiyecek listen telefonundan çıkmaz.',privateText:'Svalna yapay zekâ, analiz veya hesap kullanmaz. Uygulama tamamen kapalıyken bildirimler her tarayıcıda garanti edilemez.',newItem:'Dolaba yeni',addTitle:'Ürün ekle',photoHelp:'Fotoğraf ürünü bulmayı kolaylaştırır',takePhoto:'Fotoğraf çek',choosePhoto:'Görsel seç',photoDate:'Tarihi mi çekiyorsun?',photoDateText:'Görsel yerel saklanır. Tarihi aşağıya yaz — Svalna otomatik okuduğunu iddia etmez.',name:'Ad',namePh:'Örneğin çeri domates',category:'Kategori',quantity:'Miktar',quantityPh:'Örneğin 6 adet',added:'Eklenme / satın alma',howCount:'Nasıl hesaplayalım?',printed:'Basılı son tarih',estimate:'Raf ömrünü tahmin et',unknownDate:'Bilmiyorum',noDate:'Tarihsiz',unknownHint:'Son kullanma tarihi olmadan kaydediyoruz: Svalna ne zaman kullanılacağını tahmin edemez.',bestBefore:'Tavsiye edilen tüketim',produce:'Taze ürün türü',cancel:'İptal',save:'Ürünü kaydet',inFridge:'Buzdolabında',remove:'Sil',edit:'Düzenle',consumed:'Kullanıldı işaretle',resetTitle:'Her şey sıfırlansın mı?',resetText:'Ürün ve ayarların demo verileriyle değiştirilecek. Bu işlem geri alınamaz.',keep:'Verilerimi koru',yesReset:'Evet, sıfırla',days:'gün',day:'gün',left:'kaldı',expired:'süresi geçti',expiresToday:'bugün kullan',estimated:'Tahmini',printedLabel:'Basılı tarih',addedLabel:'Eklendi',status:'Durum',estimateDisclaimer:'Bu bir saklama tahminidir, gıda güvenliği garantisi değildir. Görünüşe, kokuya ve kendi değerlendirmenize güvenin.',saved:'Ürün kaydedildi',removed:'Ürün silindi',used:'Kullanıldı işaretlendi',copied:'Kod kopyalandı',exported:'Yedek dışa aktarıldı',imported:'Hane içe aktarıldı',invalidFile:'Dosya içe aktarılamadı',resetDone:'Demo verileri geri yüklendi',permission:'Bildirim izni',notifyGranted:'Bildirimler açık. Tarih kontrolü için Svalna’yı düzenli aç.',notifyDenied:'Bildirimler tarayıcı ayarlarında engelli.',notifyUnsupported:'Bu tarayıcı bildirimleri desteklemiyor.',notifyOn:'Hatırlatmalar açık',notifyOff:'Hatırlatmalar kapalı',notifyOffHelp:'Bildirimler kapalı. Ürünler yakında sona erdiğinde hatırlatma almak için etkinleştir.',deactivate:'Kapat',tempToast:'Sıcaklık güncellendi — tahminler yeniden hesaplandı',warningToast:'Uyarı sınırı güncellendi',langToast:'Dil değiştirildi',items:'ürün',item:'ürün',editTitle:'Ürünü düzenle',photoStored:'Seçtiğin görsel',join:'İçe aktar',or:'veya',categories:['Sebzeler','Meyve ve yemişler','Süt ürünleri ve yumurta','İçecekler','Soslar','Artan yemekler','Diğer'],produceTypes:['Domates','Yemişler / çilek','Yapraklı yeşillik / salata','Brokoli','Salatalık','Biber','Elma','Narenciye','Havuç','Diğer meyve veya sebze'],undo:'Geri al',listNav:'Liste',statsNav:'İstatistik',listTitle:'Alışveriş listesi',listLead:'Bir sonraki alışverişte alacakların — dolaptan akıllı önerilerle.',listSuggest:'Buzdolabından',listEmpty:'Henüz alışveriş yok',listClear:'Tamamlananları temizle',listPlace:'Ürün ekle…',listAdd:'Ekle',addedToList:'Listeye eklendi',toList:'Listeye',statsTitle:'Bu hafta',statsUsed:'kullanıldı',statsWasted:'atıldı',buyAgain:'Tekrar al',buyAgainHelp:'Son ürünlerin — eklemek için bir dokunuş.',themeSystem:'Sistem',ideasTitle:'Hızlı fikirler',ideasEmpty:'Birkaç ürün ekle, tarif fikirleri burada görünecek.',installTitle:"Svalna'yı uygulama olarak yükle",installText:"Svalna'yı ana ekranına ekle — çevrimdışı çalışır, gerçek bir uygulama gibi açılır.",installBtn:'Yükle',installLater:'Şimdi değil',installDone:'Svalna yüklendi!',iosInstall:"iPhone veya iPad'de: Paylaş'a dokunup \"Ana Ekrana Ekle\"yi seçin.",installHint:"Tarayıcı menüsünü açıp 'Ana Ekrana Ekle' veya 'Uygulamayı Yükle'yi seçin."}
};
let state, filter='all', currentDetail=null, pendingPhoto='';
const t=k=>I[state?.settings?.language||'en'][k] ?? I.en[k] ?? k;
function timeGreeting(){const hour=new Date().getHours(),period=hour<12?'morning':hour<18?'afternoon':'evening';const greetings={en:{morning:'Good morning.',afternoon:'Good afternoon.',evening:'Good evening.'},sv:{morning:'God morgon.',afternoon:'God eftermiddag.',evening:'God kväll.'},es:{morning:'Buenos días.',afternoon:'Buenas tardes.',evening:'Buenas noches.'},tr:{morning:'Günaydın.',afternoon:'Tünaydın.',evening:'İyi akşamlar.'}};return (greetings[state?.settings?.language||'en']||greetings.en)[period]}
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
const plus=(days)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return iso(d)};
const shelf={tomato:7,berries:3,leafy:5,broccoli:6,cucumber:7,pepper:8,apple:28,citrus:21,carrot:25,general:7};
const products={tomato:'tomatoes',berries:'strawberries',broccoli:'broccoli',apple:'apples',eggs:'eggs',ketchup:'ketchup',bottle:'milk'};
const localPhotos={tomato:'tomatoes.webp',tomatoes:'tomatoes.webp',berries:'strawberries.webp',strawberries:'strawberries.webp',broccoli:'broccoli.webp',apple:'apples.webp',apples:'apples.webp',eggs:'eggs.webp',ketchup:'ketchup.webp',bottle:'milk.webp',milk:'milk.webp'};
const defLang=l=>({en:1,sv:1,es:1,tr:1}[l]?l:'en');
const DD={en:{items:{tomatoes:'Heirloom tomatoes',eggs:'Organic eggs',ketchup:'Ketchup',milk:'Fresh milk',broccoli:'Broccoli',strawberries:'Strawberries',apples:'Red apples'},qty:{bottle:'1 bottle',box:'1 box'},house:'Our fridge'},sv:{items:{tomatoes:'Kvisttomater',eggs:'Ekologiska ägg',ketchup:'Ketchup',milk:'Mjölk',broccoli:'Broccoli',strawberries:'Jordgubbar',apples:'Röda äpplen'},qty:{bottle:'1 flaska',box:'1 ask'},house:'Vårt kylskåp'},es:{items:{tomatoes:'Tomates cherry',eggs:'Huevos ecológicos',ketchup:'Kétchup',milk:'Leche',broccoli:'Brócoli',strawberries:'Fresas',apples:'Manzanas rojas'},qty:{bottle:'1 botella',box:'1 caja'},house:'Nuestra nevera'},tr:{items:{tomatoes:'Domates',eggs:'Organik yumurta',ketchup:'Ketçap',milk:'Süt',broccoli:'Brokoli',strawberries:'Çilek',apples:'Kırmızı elma'},qty:{bottle:'1 şişe',box:'1 kutu'},house:'Buzdolabımız'}};
const DEFAULT_HOUSEHOLDS=Object.values(DD).map(d=>d.house);
const householdLabel=()=>{const n=state.household.name||'';return DEFAULT_HOUSEHOLDS.includes(n)?t('ourFridge'):n};
function demoState(pref){const l=defLang(pref||state?.settings?.language||(navigator.language||'en').slice(0,2));const d=DD[l]||DD.en;return {version:1,household:{name:d.house,code:'',cloud:false},settings:{temperature:4,warning:3,language:l,notify:false,theme:'light',onboarded:false},history:[],shopping:[],stats:{log:[]},activity:[],mealPlan:[],deviceId:crypto.randomUUID().slice(0,8),items:[
 {id:crypto.randomUUID(),name:d.items.tomatoes,categoryKey:0,quantity:'4',location:'crisper',added:plus(-5),dateMode:'estimated',produce:'tomato',baseDays:7,expiry:plus(1),art:'tomatoes'},
 {id:crypto.randomUUID(),name:d.items.eggs,categoryKey:2,quantity:'8',location:'middle',added:plus(-8),dateMode:'printed',expiry:plus(9),art:'eggs'},
 {id:crypto.randomUUID(),name:d.items.ketchup,categoryKey:4,quantity:d.qty.bottle,location:'door',added:plus(-20),dateMode:'printed',expiry:plus(42),art:'ketchup'},
 {id:crypto.randomUUID(),name:d.items.milk,categoryKey:2,quantity:d.qty.bottle,location:'door',added:plus(-3),dateMode:'printed',expiry:plus(3),art:'milk'},
 {id:crypto.randomUUID(),name:d.items.broccoli,categoryKey:0,quantity:'1',location:'crisper',added:plus(-6),dateMode:'estimated',produce:'broccoli',baseDays:6,expiry:plus(0),art:'broccoli'},
 {id:crypto.randomUUID(),name:d.items.strawberries,categoryKey:1,quantity:d.qty.box,location:'top',added:plus(-4),dateMode:'estimated',produce:'berries',baseDays:3,expiry:plus(-1),art:'strawberries'},
 {id:crypto.randomUUID(),name:d.items.apples,categoryKey:1,quantity:'4',location:'crisper',added:plus(-6),dateMode:'estimated',produce:'apple',baseDays:28,expiry:plus(22),art:'apples'}]};}
const DEFAULT_NAME_ART={};Object.keys(DD).forEach(L=>Object.entries(DD[L].items).forEach(([a,n])=>DEFAULT_NAME_ART[n]=a));
const FOOD_PHRASES=[
 {re:/cherry tomatoes?/i,art:'tomatoes',n:{sv:'Cherrytomater',es:'Tomates cherry',tr:'Kiraz domates'}},
 {re:/heirloom tomatoes?/i,art:'tomatoes',n:{sv:'Kvisttomater',es:'Tomates cherry',tr:'Domates'}},
 {re:/organic eggs?/i,art:'eggs',n:{sv:'Ekologiska ägg',es:'Huevos orgánicos',tr:'Organik yumurta'}},
 {re:/fresh milk/i,art:'milk',n:{sv:'Mjölk',es:'Leche',tr:'Süt'}},
 {re:/red apples?/i,art:'apples',n:{sv:'Röda äpplen',es:'Manzanas rojas',tr:'Kırmızı elma'}},
 {re:/strawberr(?:ies|y)|jordgubb|fresa|çilek|cilek/i,art:'strawberries'},
 {re:/tomatoes?|tomates?|domat/i,art:'tomatoes'},
 {re:/eggs?$|ägg|huevos?$|yumurta/i,art:'eggs'},
 {re:/milk$|mjölk|leche|süt/i,art:'milk'},
 {re:/broccoli|brokoli|rócoli|brócoli/i,art:'broccoli'},
 {re:/ketchup|ketçap|kétchup|catsup/i,art:'ketchup'},
 {re:/apples?|äpplen|äpple|manzanas?|elma/i,art:'apples'},
];
const PHRASE_NAME_ART={};FOOD_PHRASES.forEach((p,i)=>p.n&&Object.entries(p.n).forEach(([L,n])=>PHRASE_NAME_ART[n]={i}));
function localName(item){const L=defLang(state.settings.language),d=DD[L]||DD.en;const ok={};Object.values(d.items).forEach(n=>ok[n]=1);FOOD_PHRASES.forEach(p=>p.n&&p.n[L]&&(ok[p.n[L]]=1));if(ok[item.name])return item.name;if(PHRASE_NAME_ART[item.name]){const p=FOOD_PHRASES[PHRASE_NAME_ART[item.name].i];return (p.n&&p.n[L])||d.items[p.art]||item.name}const a=DEFAULT_NAME_ART[item.name];if(a)return d.items[a]||item.name;if(L!=='en'){for(const p of FOOD_PHRASES){if(p.re.test(item.name))return (p.n&&p.n[L])||d.items[p.art]||item.name}}return item.name}
function localizeDemoItems(){const L=defLang(state.settings.language),d=DD[L]||DD.en;const byQty={};Object.keys(DD).forEach(lg=>Object.entries(DD[lg].qty).forEach(([k,v])=>byQty[v]=k));const demoName=new Set(Object.values(DD).flatMap(l=>[...Object.values(l.items),...FOOD_PHRASES.map(p=>p.n&&p.n.en).filter(Boolean)]));let changed=false;state.items.forEach(i=>{if(!demoName.has(i.name))return;const nn=localName(i);if(nn!==i.name){i.name=nn;changed=true}const qk=byQty[i.quantity];if(qk&&d.qty[qk]&&i.quantity!==d.qty[qk]){i.quantity=d.qty[qk];changed=true}});if(state.household&&DEFAULT_HOUSEHOLDS.includes(state.household.name)){state.household.name=d.house;changed=true}return changed}
function openDB(){return new Promise((res,rej)=>{const q=indexedDB.open(DB_NAME,1);q.onupgradeneeded=()=>q.result.createObjectStore(STORE);q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
async function load(){const db=await openDB();state=await new Promise(res=>{const q=db.transaction(STORE).objectStore(STORE).get(STATE_KEY);q.onsuccess=()=>res(q.result);q.onerror=()=>res(null)});if(!state){state=demoState();await save()}if(!state.settings.language)state.settings.language='en';if(typeof state.settings.notify!=='boolean')state.settings.notify=false;if(!state.settings.theme)state.settings.theme='light';if(state.settings.onboarded===undefined)state.settings.onboarded=true;if(!state.deviceId)state.deviceId=crypto.randomUUID().slice(0,8);if(typeof state.settings.actor!=='string')state.settings.actor='';if(!Array.isArray(state.activity))state.activity=[];if(!Array.isArray(state.mealPlan))state.mealPlan=[];if(localizeDemoItems())await save();if(!state.household)state.household={};if(typeof state.household.cloud!=='boolean')state.household.cloud=false;if(!state.notified)state.notified={};if(!Array.isArray(state.history))state.history=[];if(!Array.isArray(state.shopping))state.shopping=[];if(!state.stats||!Array.isArray(state.stats.log))state.stats={log:[]};if(!Array.isArray(state.dirty))state.dirty=[];if(!state.pendingWrites)state.pendingWrites={};let migrated=false;state.items.forEach(item=>{if(!item.location){item.location=item.categoryKey===0||item.categoryKey===1?'crisper':item.categoryKey===4||item.categoryKey===3?'door':'middle';migrated=true}});if(migrated)await save()}
async function save(){const db=await openDB();await new Promise((res,rej)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(state,STATE_KEY);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)});if(!suppressCloudSave)window.SvalnaCloud?.queueState?.()}const canonicalFp=i=>JSON.stringify(Object.fromEntries(Object.entries(i).filter(([k])=>k!=='photo').sort((a,b)=>a[0]<b[0]?-1:1)));
function markDirty(ids){if(!Array.isArray(state.dirty))state.dirty=[];const p=state.pendingWrites||(state.pendingWrites={});ids.forEach(id=>{if(!id)return;if(!state.dirty.includes(id))state.dirty.push(id);const it=state.items.find(x=>x.id===id);p[id]=it?{fp:canonicalFp(it),v:state.docVersion||0}:{del:true,v:state.docVersion||0}})}
function daysLeft(item){if(!item.expiry)return Infinity;const end=new Date(item.expiry+'T12:00:00'), now=new Date();now.setHours(12,0,0,0);return Math.ceil((end-now)/DAY)}
function statusOf(item){if(!item.expiry)return 'unknown';const d=daysLeft(item);return d<=1?'urgent':d<=state.settings.warning?'soon':'fresh'}
function statusLabel(s){return s==='fresh'?t('fresh'):s==='soon'?t('soon'):s==='unknown'?t('noDate'):t('urgent')}
function dayText(item){if(!item.expiry)return t('noDate');const d=daysLeft(item);if(d<0)return `${Math.abs(d)} ${Math.abs(d)===1?t('day'):t('days')} ${t('expired')}`;if(d===0)return t('expiresToday');return `${d} ${d===1?t('day'):t('days')} ${t('left')}`}
function dateText(date){if(!date)return t('noDate');try{return new Intl.DateTimeFormat(locale[state.settings.language],{day:'numeric',month:'short',year:'numeric'}).format(new Date(date+'T12:00:00'))}catch{return String(date||'')}}
function categoryText(item){return t('categories')[item.categoryKey]||item.category||t('categories')[6]}
function locationText(item){const v=V[state.settings.language]||V.en;return v.locations[item.location]||v.locations.middle}
function artHTML(item){if(item.photo)return `<img class="thumb photo" src="${item.photo}" alt="">`;const key=item.art||products[item.produce]||'milk',file=localPhotos[key]||'milk.webp';return `<img class="thumb" src="assets/photos/${file}" alt="">`}
function cardHTML(item,priority=false){const s=statusOf(item),label=`${ux('viewItem')}: ${item.name}`;return priority?`<button class="priority-card" data-item="${item.id}" aria-label="${esc(label)}">${artHTML(item)}<div><span class="status-badge ${s}">${statusLabel(s)}</span><h3>${esc(item.name)}</h3><p>${esc(locationText(item))} · ${esc(categoryText(item))}</p></div><span class="priority-days">${dayText(item)}</span></button>`:`<button class="item-card" data-item="${item.id}" aria-label="${esc(label)}">${artHTML(item)}<div><span class="status-badge ${s}">${statusLabel(s)}</span><h3>${esc(item.name)}</h3><p class="category">${esc(locationText(item))} · ${esc(categoryText(item))}${item.quantity?' · '+esc(item.quantity):''}</p><p class="date-line"><b>${dayText(item)}</b><br>${item.dateMode==='estimated'?t('estimated'):t('bestBefore')}: ${dateText(item.expiry)}</p></div></button>`}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const RECIPES=[
 {kw:['tomat','tomate','domat','cherry'],p:['tomato'],n:{en:'Tomato soup',sv:'Tomatsoppa',es:'Sopa de tomate',tr:'Domates çorbası'}},
 {kw:['egg','ägg','huevo','yumurta'],p:[],n:{en:'Omelette',sv:'Omelett',es:'Tortilla',tr:'Omlet'}},
 {kw:['milk','mjölk','leche','süt'],p:[],n:{en:'Pancakes',sv:'Pannkakor',es:'Tortitas',tr:'Pankek'}},
 {kw:['broccoli','brokoli','brócoli'],p:['broccoli'],n:{en:'Roasted broccoli',sv:'Ugnsrostad broccoli',es:'Brócoli al horno',tr:'Fırında brokoli'}},
 {kw:['strawberr','jordgubb','fresa','çilek'],p:['berries'],n:{en:'Berry smoothie',sv:'Bärsmoothie',es:'Batido de frutos rojos',tr:'Çilekli smoothie'}},
 {kw:['apple','äpple','manzana','elma'],p:['apple'],n:{en:'Apple compote',sv:'Äppelkompott',es:'Compota de manzana',tr:'Elma kompostosu'}},
 {kw:['carrot','morot','zanahoria','havuç'],p:['carrot'],n:{en:'Carrot soup',sv:'Morotssoppa',es:'Crema de zanahoria',tr:'Havuç çorbası'}},
 {kw:['cucumber','gurka','pepino','salatalık'],p:['cucumber'],n:{en:'Cucumber salad',sv:'Gurksallad',es:'Ensalada de pepino',tr:'Salatalık salatası'}},
 {kw:['pepper','paprika','pimiento','biber'],p:['pepper'],n:{en:'Stuffed peppers',sv:'Fyllda paprikor',es:'Pimientos rellenos',tr:'Biber dolması'}},
 {kw:['salad','sallad','ensalada','leafy'],p:['leafy'],n:{en:'Big salad',sv:'Stor sallad',es:'Ensalada grande',tr:'Büyük salata'}},
 {kw:['citrus','orange','apelsin','naranja','portakal'],p:['citrus'],n:{en:'Citrus fruit salad',sv:'Citrussallad',es:'Ensalada de cítricos',tr:'Narenciye salatası'}},
 {kw:['ketchup','ketçap','kétchup'],p:[],n:{en:'Crispy buns with sauce',sv:'Krispiga bullar med sås',es:'Bollitos crujientes con salsa',tr:'Soslu gevrek ekmek'}}
];
function recipeFor(item){const name=String(item.name||'').toLowerCase();for(const r of RECIPES){if(r.kw.some(k=>name.includes(k))||r.p.includes(item.produce))return r}return null}
function updateBadge(){try{const n=state.items.filter(x=>x.expiry&&daysLeft(x)<=0).length;if(navigator.setAppBadge){if(n>0)navigator.setAppBadge(n);else if(navigator.clearAppBadge)navigator.clearAppBadge()}}catch{}}
function renderStats(){const log=state.stats?.log||[],cut=Date.now()-7*DAY;let used=0,wasted=0;log.forEach(x=>{if(Date.parse(x.d+'T12:00:00')>=cut)x.kind==='used'?used++:wasted++});txt('#statsUsed',used);txt('#statsWasted',wasted);txt('#statsUsedLabel',t('statsUsed'));txt('#statsWastedLabel',t('statsWasted'))}
function renderIdeas(){const lang=state.settings.language;const pick=[...state.items].filter(x=>x.expiry&&daysLeft(x)<=state.settings.warning).sort((a,b)=>daysLeft(a)-daysLeft(b)).slice(0,3);const seen=new Set(),box=$('#ideasTags');if(!box)return;const ideas=pick.map(x=>{const r=recipeFor(x);if(!r||seen.has(r))return null;seen.add(r);return `${x.name} → ${r.n[lang]||r.n.en}`}).filter(Boolean);box.innerHTML=ideas.length?ideas.map(i=>`<span class="idea-tag">${esc(i)}</span>`).join(''):`<p class="ideas-empty">${esc(t('ideasEmpty'))}</p>`}
function renderRecent(){const panel=$('#recentPanel');if(!panel)return;const hist=state.history||[];panel.hidden=!hist.length;if(!hist.length)return;$('#recentChips').innerHTML=hist.slice(0,8).map((h,i)=>`<button type="button" class="recent-chip" data-recent="${i}">${esc(h.name)}${h.count>1?` <b>×${h.count}</b>`:''}</button>`).join('')}
function shopAdd(name,quantity=''){if(!name)return;state.shopping.push({id:crypto.randomUUID(),name,quantity,checked:false});logActivity('shopped',name);save().then(()=>{renderShopping();renderActivity();toast(t('addedToList'))})}
function shopAddItem(iid){const item=state.items.find(x=>x.id===iid);if(item)shopAdd(item.name,item.quantity||'')}
async function shopToggle(id){const row=state.shopping.find(x=>x.id===id);if(!row)return;row.checked=!row.checked;await save();renderShopping()}
async function shopQty(id,value){const row=state.shopping.find(x=>x.id===id);if(!row)return;row.quantity=value.trim();await save()}
async function shopDel(id){state.shopping=state.shopping.filter(x=>x.id!==id);await save();renderShopping()}
function renderShopping(){const list=state.shopping||[];const inList=new Set(list.map(x=>x.name));const suggest=state.items.filter(x=>x.expiry&&daysLeft(x)<=state.settings.warning&&!inList.has(x.name)).sort((a,b)=>daysLeft(a)-daysLeft(b)).slice(0,8);$('#shopSuggest').innerHTML=suggest.length?suggest.map(x=>`<div class="shop-suggest"><div><b>${esc(x.name)}</b><small>${esc(dayText(x))}</small></div><button type="button" class="shop-add" data-shop-add="${x.id}" aria-label="${esc(x.name)}"><svg><use href="#i-plus"/></svg></button></div>`).join(''):`<p class="shop-empty">${esc(t('listEmpty'))}</p>`;$('#shopRows').innerHTML=list.length?list.map(x=>`<div class="shop-row${x.checked?' checked':''}" data-shop-row="${x.id}"><button type="button" class="shop-toggle" data-shop-toggle="${x.id}" aria-pressed="${x.checked?'true':'false'}"><svg><use href="#i-check"/></svg></button><b>${esc(x.name)}</b><input class="shop-qty" data-shop-qty="${x.id}" value="${esc(x.quantity||'')}" aria-label="${esc(x.name)} ${t('quantity')}"><button type="button" class="shop-del" data-shop-del="${x.id}" aria-label="${t('remove')}"><svg><use href="#i-trash"/></svg></button></div>`).join(''):`<p class="shop-empty">${esc(t('listEmpty'))}</p>`;$('#shopClear').hidden=!list.some(x=>x.checked);$('#shopTotal').textContent=list.length?`${list.length} ${t('items')}`:''}
function applyTheme(){const choice=state.settings.theme||'light',th=choice==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):choice;document.documentElement.dataset.theme=th;$('#themeSelect').value=choice;const meta=document.querySelector('meta[name=theme-color]');if(meta)meta.content=th==='dark'?'#0e1c24':'#04a9c4'}
function render(){localizeDemoItems();applyLanguage();applyTheme();const counts={fresh:0,soon:0,urgent:0};state.items.forEach(x=>counts[statusOf(x)]++);$('#ringCount').textContent=state.items.length;$('#freshCount').textContent=counts.fresh;$('#soonCount').textContent=counts.soon;$('#urgentCount').textContent=counts.urgent;const total=Math.max(state.items.length,1);$('#freshnessRing').style.setProperty('--urgent-angle',`${counts.urgent/total*360}deg`);$('#freshnessRing').style.setProperty('--soon-angle',`${(counts.urgent+counts.soon)/total*360}deg`);$('#ringHeadline').textContent=counts.urgent?t('attention'):t('calm');$('#ringText').textContent=counts.urgent?t('attentionText'):t('calmText');$('#itemTotal').textContent=`${state.items.length} ${state.items.length===1?t('item'):t('items')}`;$$('[data-temp]').forEach(x=>x.textContent=state.settings.temperature);$('#tempOutput').textContent=state.settings.temperature+'°C';$('#tempRange').value=state.settings.temperature;$('#warningOutput').textContent=`${state.settings.warning} ${state.settings.warning===1?t('day'):t('days')}`;$('#warningRange').value=state.settings.warning;$('#inviteCode').textContent=state.household.code;$('#householdName').textContent=householdLabel();$('.household-chip span:last-child').textContent=householdLabel();$('#languageSelect').value=state.settings.language;const urgent=[...state.items].sort((a,b)=>daysLeft(a)-daysLeft(b)).slice(0,2);$('#eatFirst').innerHTML=urgent.map(x=>cardHTML(x,true)).join('');renderInventory();updateBadge();renderStats();renderIdeas();renderRecent();renderShopping();updateNotificationText()}
function renderInventory(){const q=$('#searchInput').value.trim().toLocaleLowerCase(locale[state.settings.language]);const items=state.items.filter(x=>(filter==='all'||statusOf(x)===filter)&&(!q||`${x.name} ${categoryText(x)}`.toLocaleLowerCase(locale[state.settings.language]).includes(q)));$('#inventoryGrid').innerHTML=items.map(x=>cardHTML(x)).join('');const empty=items.length===0,hasSearchOrFilter=Boolean(q)||filter!=='all';$('#emptyState').hidden=!empty;txt('#emptyState h3',empty&&hasSearchOrFilter?ux('emptySearch'):t('airy'));txt('#emptyState p',empty&&hasSearchOrFilter?ux('emptySearchHelp'):t('empty'));$$('[data-item]').forEach(b=>b.onclick=()=>openDetail(b.dataset.item))}
function txt(sel,value){const e=$(sel);if(e)e.textContent=value}function btn(sel,value){const e=$(sel);if(!e)return;[...e.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.remove());e.append(document.createTextNode(value))}
function applyLanguage(){document.documentElement.lang=state.settings.language;document.title='Svalna';const nav=[t('overview'),t('fridge'),t('family'),t('settings')];$$('.nav-links .nav-item span').forEach((e,i)=>e.textContent=nav[i]);$$('.bottom-nav .nav-item span').forEach((e,i)=>e.textContent=nav[i]);txt('.local-note',t('local'));txt('#homeTitle',timeGreeting());txt('.welcome-line>div>p:last-child',t('subtitle'));txt('.ring-copy .eyebrow',t('situation'));txt('.status-metrics button:nth-child(1) span',t('fresh'));txt('.status-metrics button:nth-child(2) span',t('soon'));txt('.status-metrics button:nth-child(3) span',t('urgent'));txt('.first-panel .eyebrow',t('lessWaste'));txt('.first-panel h2',t('eatFirst'));btn('.first-panel .text-button',t('showAll'));txt('.inventory-section .eyebrow',t('yourFridge'));txt('.inventory-section h2',t('allFridge'));$('#searchInput').placeholder=t('search');$$('.filter').forEach((e,i)=>e.textContent=[t('all'),t('fresh'),t('soonShort'),t('today')][i]);txt('#emptyState h3',t('airy'));txt('#emptyState p',t('empty'));btn('#emptyState [data-add]',t('add'));btn('.desktop-add',t('add'));txt('#inventoryView .eyebrow',t('overviewLead'));txt('#inventoryTitle',t('yourFridge'));txt('#inventoryView .simple-header>p:last-child',t('inventoryLead'));txt('#familyView .eyebrow',t('together'));txt('#familyTitle',t('familyTitle'));txt('#familyView .simple-header>p:last-child',t('familyLead'));txt('.family-card>.eyebrow',t('householdCode'));txt('.family-card>p:not(.eyebrow)',t('codeHelp'));btn('#shareHousehold',t('shareFile'));txt('.explain-card h2',t('howShare'));$$('.explain-card li').forEach((e,i)=>e.textContent=t('steps')[i]);txt('.honesty-note b',t('noLive'));$('.honesty-note').childNodes[$('.honesty-note').childNodes.length-1].textContent=' '+t('noLiveText');btn('.explain-card .file-button',t('importHouse'));txt('#settingsView .eyebrow',t('yourWay'));txt('#settingsTitle',t('settings'));txt('#settingsView .simple-header>p:last-child',t('settingsLead'));const rows=$$('.setting-row');txt('.setting-row:nth-child(1) h2',t('temperature'));txt('.setting-row:nth-child(1) p',t('tempHelp'));txt('.setting-row:nth-child(2) h2',t('warn'));txt('.setting-row:nth-child(2) p',t('warnHelp'));txt('.setting-row:nth-child(3) h2',t('notifications'));txt('#languageHeading',t('language'));txt('#languageText',t('languageHelp'));txt('#themeHeading',t('theme'));txt('#themeText',t('themeHelp'));const ts=$('#themeSelect');ts.options[0].textContent=t('themeLight');ts.options[1].textContent=t('themeDark');if(ts.options[2])ts.options[2].textContent=t('themeSystem');updateNotificationText();txt('.settings-columns>section:first-child h2',t('yourData'));txt('.settings-columns>section:first-child>p',t('dataHelp'));btn('#exportData',t('export'));btn('.settings-columns .file-button',t('import'));btn('#resetData',t('reset'));txt('.privacy-panel .eyebrow',t('private'));txt('.data-card>div>p.eyebrow',t('private'));txt('.privacy-panel h2',t('privateTitle'));txt('.privacy-panel p:last-child',t('privateText'));txt('.join-divider span',t('or'));txt('.join-code-field span',t('householdCode'));txt('#formEyebrow',$('#editId').value?t('inFridge'):t('newItem'));txt('#formTitle',$('#editId').value?t('editTitle'):t('addTitle'));txt('#photoPreview span',t('photoHelp'));btn('.photo-picker .secondary-button',t('takePhoto'));btn('.photo-picker .text-button',t('choosePhoto'));txt('.date-photo-note b',t('photoDate'));$('.date-photo-note p').childNodes[$('.date-photo-note p').childNodes.length-1].textContent=' '+t('photoDateText');const labs=$$('.form-grid label>span');[t('name'),t('category'),t('quantity'),t('added')].forEach((v,i)=>labs[i].textContent=v);$('#itemName').placeholder=t('namePh');$('#itemQuantity').placeholder=t('quantityPh');txt('#itemForm legend',t('howCount'));$$('.segmented span').forEach((e,i)=>e.textContent=[t('printed'),t('estimate'),t('unknownDate')][i]);txt('#printedFields label>span',t('bestBefore'));txt('#estimatedFields label>span',t('produce'));txt('#unknownText',t('unknownHint'));btn('#itemForm footer .secondary-button',t('cancel'));btn('#itemForm footer .primary-button',t('save'));txt('#detailDialog .eyebrow',t('inFridge'));btn('#deleteItem',t('remove'));btn('#editItem',t('edit'));btn('#consumeItem',t('consumed'));txt('#confirmDialog h2',t('resetTitle'));txt('#confirmDialog p',t('resetText'));btn('#confirmDialog .secondary-button',t('keep'));btn('#confirmDialog .danger-button',t('yesReset'));const cats=$$('#itemCategory option');cats.forEach((e,i)=>e.textContent=t('categories')[i]);$$('#produceType option').forEach((e,i)=>e.textContent=t('produceTypes')[i]);}
const applyLanguageLegacy=applyLanguage;
const V={
 en:{home:'Home',scan:'Scan',fridgeClimate:'Fridge climate',optimal:'Optimal',colder:'Colder than ideal',cool:'Cool',tooWarm:'Too warm',pulse:'Freshness pulse',updated:'Updated locally',addTo:'Add to Svalna',scanTitle:'Scan an item',scanLead:'Take a clear photo of the product or its date, then confirm the details yourself.',ready:'Ready for your photo',align:'Align the product or expiry date',stays:'Photo stays on this device',howAdd:'How would you like to add it?',camera:'Camera',cameraHelp:'Take a new photo',gallery:'Gallery',galleryHelp:'Choose an existing image',manual:'Enter details manually',noRecognition:'No automatic recognition.',noRecognitionText:'Svalna works fully offline, so you always confirm the product name and date.',familyLead:'Share the same fridge without an account using an offline handoff file.',copy:'Copy',location:'Storage location',locations:{top:'Top shelf',middle:'Middle shelf',door:'Fridge door',crisper:'Crisper drawer'}},
 sv:{home:'Hem',scan:'Skanna',fridgeClimate:'Kylklimat',optimal:'Optimalt',colder:'Kallare än optimalt',cool:'Svalt',tooWarm:'För varmt',pulse:'Färskhetspuls',updated:'Uppdaterad lokalt',addTo:'Lägg till i Svalna',scanTitle:'Skanna en vara',scanLead:'Ta en tydlig bild av varan eller datumet och bekräfta sedan uppgifterna själv.',ready:'Redo för din bild',align:'Rikta in varan eller bäst före-datumet',stays:'Bilden stannar på enheten',howAdd:'Hur vill du lägga till varan?',camera:'Kamera',cameraHelp:'Ta en ny bild',gallery:'Galleri',galleryHelp:'Välj en befintlig bild',manual:'Fyll i uppgifter manuellt',noRecognition:'Ingen automatisk avläsning.',noRecognitionText:'Svalna fungerar helt offline, så du bekräftar alltid namn och datum.',familyLead:'Dela samma kyl utan konto med hjälp av en offline-fil.',copy:'Kopiera',location:'Förvaringsplats',locations:{top:'Översta hyllan',middle:'Mittenhyllan',door:'Kylskåpsdörren',crisper:'Grönsakslådan'}},
 es:{home:'Inicio',scan:'Escanear',fridgeClimate:'Clima de la nevera',optimal:'Óptimo',colder:'Más frío de lo ideal',cool:'Fresco',tooWarm:'Demasiado caliente',pulse:'Pulso de frescura',updated:'Actualizado localmente',addTo:'Añadir a Svalna',scanTitle:'Escanear un alimento',scanLead:'Haz una foto clara del producto o de su fecha y confirma tú mismo los datos.',ready:'Listo para tu foto',align:'Alinea el producto o la fecha',stays:'La foto permanece en este dispositivo',howAdd:'¿Cómo quieres añadirlo?',camera:'Cámara',cameraHelp:'Hacer una foto nueva',gallery:'Galería',galleryHelp:'Elegir una imagen',manual:'Introducir datos manualmente',noRecognition:'Sin reconocimiento automático.',noRecognitionText:'Svalna funciona totalmente offline, por eso siempre confirmas el nombre y la fecha.',familyLead:'Comparte la nevera sin cuenta mediante un archivo offline.',copy:'Copiar',location:'Lugar de almacenamiento',locations:{top:'Estante superior',middle:'Estante central',door:'Puerta de la nevera',crisper:'Cajón de verduras'}},
 tr:{home:'Ana sayfa',scan:'Tara',fridgeClimate:'Dolap iklimi',optimal:'İdeal',colder:'İdealden daha soğuk',cool:'Serin',tooWarm:'Çok sıcak',pulse:'Tazelik durumu',updated:'Yerel olarak güncellendi',addTo:'Svalna’ya ekle',scanTitle:'Ürün tara',scanLead:'Ürünün veya tarihinin net bir fotoğrafını çek, ardından bilgileri kendin onayla.',ready:'Fotoğraf için hazır',align:'Ürünü veya son tarihi hizala',stays:'Fotoğraf bu cihazda kalır',howAdd:'Nasıl eklemek istersin?',camera:'Kamera',cameraHelp:'Yeni fotoğraf çek',gallery:'Galeri',galleryHelp:'Mevcut görseli seç',manual:'Bilgileri elle gir',noRecognition:'Otomatik tanıma yok.',noRecognitionText:'Svalna tamamen çevrimdışı çalışır; ürün adını ve tarihi her zaman sen onaylarsın.',familyLead:'Aynı dolabı hesap olmadan çevrimdışı aktarım dosyasıyla paylaş.',copy:'Kopyala',location:'Saklama yeri',locations:{top:'Üst raf',middle:'Orta raf',door:'Buzdolabı kapağı',crisper:'Sebzelik çekmecesi'}}
};
const UX={
 en:{emptySearch:'No items match this view.',emptySearchHelp:'Try another search or clear the filter.',viewItem:'View item',imageError:'That image could not be added. Please try another photo.',invalidDate:'Add a valid best-before date before saving.'},
 sv:{emptySearch:'Inga varor matchar den här vyn.',emptySearchHelp:'Prova en annan sökning eller rensa filtret.',viewItem:'Visa vara',imageError:'Bilden kunde inte läggas till. Prova ett annat foto.',invalidDate:'Lägg till ett giltigt bäst före-datum innan du sparar.'},
 es:{emptySearch:'Ningún alimento coincide con esta vista.',emptySearchHelp:'Prueba otra búsqueda o borra el filtro.',viewItem:'Ver alimento',imageError:'No se pudo añadir esa imagen. Prueba otra foto.',invalidDate:'Añade una fecha de consumo preferente válida antes de guardar.'},
 tr:{emptySearch:'Bu görünüme uyan ürün yok.',emptySearchHelp:'Başka bir arama dene veya filtreyi temizle.',viewItem:'Ürünü görüntüle',imageError:'Bu görsel eklenemedi. Başka bir fotoğraf dene.',invalidDate:'Kaydetmeden önce geçerli bir son kullanım tarihi ekle.'}
};
const ux=k=>(UX[state?.settings?.language]||UX.en)[k]||UX.en[k]||k;
function applyLanguageV5(){
 applyLanguageLegacy();const v=V[state.settings.language]||V.en;
 txt('#todayLabel',new Intl.DateTimeFormat(locale[state.settings.language],{weekday:'long',day:'numeric',month:'long'}).format(new Date()));
 $$('.nav-links .nav-item span').forEach((e,i)=>e.textContent=[v.home,v.scan,t('listNav'),t('statsNav'),t('settings')][i]??e.textContent);
 $$('.bottom-nav .nav-item>span:last-child').forEach((e,i)=>e.textContent=[v.home,v.scan,t('listNav'),t('statsNav'),t('settings')][i]??e.textContent);
  txt('.back-link','← '+v.home);
 const temp=state.settings.temperature,tempState=temp===4?'optimal':temp<4?'colder':temp<6?'cool':'tooWarm',tempLabel=v[tempState];
 txt('.climate-top .eyebrow',v.fridgeClimate);txt('.optimal-label',tempLabel);$('.optimal-label').className='optimal-label '+tempState;txt('.climate-pulse b',v.pulse);txt('.climate-pulse small',v.updated);txt('.climate-pulse em',t('items'));
 btn('#emptyState [data-view="scan"]',t('add'));
 txt('#scanView .scan-header .eyebrow',v.addTo);txt('#scanTitle',v.scanTitle);txt('#scanView .scan-header>p:last-child',v.scanLead);txt('.scan-caption b',v.ready);txt('.scan-caption small',v.align);txt('.privacy-line span',v.stays);txt('.scan-actions-panel h2',v.howAdd);
 const caps=$$('.capture-button');if(caps[0]){txt('.capture-button:nth-child(1) b',v.camera);txt('.capture-button:nth-child(1) small',v.cameraHelp);txt('.capture-button:nth-child(2) b',v.gallery);txt('.capture-button:nth-child(2) small',v.galleryHelp)}
 btn('.manual-button',v.manual);txt('.honest-copy b',v.noRecognition);if($('.honest-copy'))$('.honest-copy').childNodes[$('.honest-copy').childNodes.length-1].textContent=' '+v.noRecognitionText;
 txt('.settings-main>.settings-card:first-child .card-title h2',t('temperature'));txt('.settings-main>.settings-card:first-child .card-title p',t('tempHelp'));txt('.temperature-setting span',tempLabel);$('.temperature-setting span').className=tempState;txt('.family-card .card-title .eyebrow',t('householdCode'));txt('.family-lead',v.familyLead);txt('.code-help',t('codeHelp'));txt('#copyCode span',v.copy);
 txt('#locationLabel',v.location);txt('.form-grid label:nth-child(5)>span',t('added'));$$('#itemLocation option').forEach(o=>o.textContent=v.locations[o.value]);
 txt('.compact-card:nth-child(1) h2',t('warn'));txt('.compact-card:nth-child(1) p',t('warnHelp'));txt('.compact-card:nth-child(2) h2',t('notifications'));
 txt('.data-card>div:first-child h2',t('yourData'));txt('.data-card>div:first-child>p:not(.eyebrow)',t('dataHelp'));
}
applyLanguage=applyLanguageV5;
let deferredPrompt=null;
const isStandalone=()=>!!(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent);
function applyInstallUI(){const v=I[state?.settings?.language||'en']||I.en;const b=$('#installBanner');if(b){txt('#installBanner h3',v.installTitle);txt('#installBanner p',isIOS()?v.iosInstall:v.installText);txt('#iosBannerHint',v.iosInstall);btn('#installBtn',v.installBtn);btn('#installLater',v.installLater);if($('#installBtn'))$('#installBtn').hidden=isIOS()}const c=$('#installCard');if(c){txt('#installCard h2',v.installTitle);txt('#installCard p',v.installText);btn('#installBtnCard',v.installBtn);txt('#iosInstallHint',isIOS()?v.iosInstall:v.installHint)}}
function showInstallBanner(){const b=$('#installBanner');if(!b||isStandalone()||state.installDismissed)return;applyInstallUI();b.hidden=false}
function dismissInstall(){state.installDismissed=true;suppressCloudSave=true;save().finally(()=>{suppressCloudSave=false});if($('#installBanner'))$('#installBanner').hidden=true;updateInstallUI()}
function showInstallHint(){const v=I[state?.settings?.language||'en']||I.en;txt('#installBanner p',isIOS()?v.iosInstall:v.installHint);const btn=$('#installBtn');if(btn)btn.hidden=true}
async function askInstall(){if(!deferredPrompt){showInstallHint();const hint=$('#iosInstallHint');if(hint)hint.hidden=false;return}try{await deferredPrompt.prompt();deferredPrompt=null;dismissInstall()}catch(error){console.warn('Install prompt:',error)}}
function updateInstallUI(){const c=$('#installCard');if(!c)return;c.hidden=isStandalone();const cardBtn=$('#installBtnCard'),hint=$('#iosInstallHint');if(!cardBtn||!hint)return;cardBtn.hidden=false;hint.hidden=true;if(isIOS())hint.hidden=false}
function initInstallUI(){window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event;updateInstallUI();showInstallBanner()});window.addEventListener('appinstalled',()=>{deferredPrompt=null;if(!state.installDismissed){state.installDismissed=true;suppressCloudSave=true;save().finally(()=>{suppressCloudSave=false})}if($('#installBanner'))$('#installBanner').hidden=true;updateInstallUI();toast(t('installDone'))});$('#installBtn')?.addEventListener('click',askInstall);$('#installLater')?.addEventListener('click',dismissInstall);$('#installBtnCard')?.addEventListener('click',()=>{const hint=$('#iosInstallHint');if(deferredPrompt){askInstall();return}if(hint){hint.hidden=false;txt('#iosInstallHint',isIOS()?t('iosInstall'):t('installHint'))}if(isIOS())toast(t('iosInstall'))});setTimeout(()=>{if(isMobile())showInstallBanner()},1500);if(isIOS())showInstallBanner();updateInstallUI()}
const isMobile=()=>/android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent)||((window.matchMedia&&window.matchMedia('(max-width:900px)').matches)&&('ontouchstart' in window));
applyInstallUI();
function switchView(name){if(name!=='scan')stopBarcodeScan();$$('.view').forEach(v=>v.classList.toggle('active',v.id===name+'View'));$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===name));const section=$('.inventory-section');if(name==='inventory')$('#inventoryMount').append(section);else if(name==='home')$('#homeView').append(section);window.scrollTo({top:0,behavior:'smooth'});$('#main').focus({preventScroll:true});renderInventory();if(name==='shopping')renderShopping()}
function estimateExpiry(){const added=$('#addedDate').value||iso(new Date()),key=$('#produceType').value,base=shelf[key];const adjustment=Math.round((4-state.settings.temperature)*.55);const days=Math.max(2,base+adjustment);const d=new Date(added+'T12:00:00');d.setDate(d.getDate()+days);$('#estimateText').innerHTML=`<b>${t('estimated')}: ${dateText(iso(d))}</b><br>${days} ${t('days')} at ${state.settings.temperature}°C. ${t('estimateDisclaimer')}`;return {expiry:iso(d),baseDays:base}}
function openAdd(item=null){stopBarcodeScan();$('#itemForm').reset();$('#editId').value=item?.id||'';pendingPhoto=item?.photo||'';$('#itemName').value=item?.name||'';$('#itemCategory').selectedIndex=item?.categoryKey??0;$('#itemQuantity').value=item?.quantity||'';$('#itemLocation').value=item?.location||'middle';$('#addedDate').value=item?.added||iso(new Date());$('#expiryDate').value=item?.expiry||plus(7);const mode=item?.dateMode||'printed';$(`input[name=dateMode][value=${mode}]`).checked=true;$('#produceType').value=item?.produce||'tomato';toggleMode();updatePhoto();applyLanguage();$('#itemDialog').showModal();setTimeout(()=>$('#itemName').focus(),100)}
function toggleMode(){const m=$('input[name=dateMode]:checked').value,est=m==='estimated',unk=m==='unknown';$('#estimatedFields').hidden=!est;$('#printedFields').hidden=est||unk;$('#unknownFields').hidden=!unk;$('#expiryDate').required=m==='printed';if(est)estimateExpiry()}
function updatePhoto(){const p=$('#photoPreview');p.classList.toggle('has-photo',!!pendingPhoto);p.style.backgroundImage=pendingPhoto?`url(${pendingPhoto})`:''}
function resizeImage(file){return new Promise((res,rej)=>{if(!file?.type?.startsWith('image/'))return rej(new Error('Not an image'));const rd=new FileReader();rd.onerror=rej;rd.onload=()=>{const im=new Image();im.onerror=rej;im.onload=()=>{const max=640,scale=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*scale);c.height=Math.round(im.height*scale);const ctx=c.getContext('2d');if(!ctx)return rej(new Error('Canvas unavailable'));ctx.drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.78))};im.src=rd.result};rd.readAsDataURL(file)})}
async function submitItem(e){e.preventDefault();const id=$('#editId').value||crypto.randomUUID(),mode=$('input[name=dateMode]:checked').value,est=mode==='estimated'?estimateExpiry():null,expiry=mode==='estimated'?est.expiry:mode==='unknown'?null:$('#expiryDate').value;if(mode!=='unknown'&&(!expiry||Number.isNaN(new Date(expiry+'T12:00:00').getTime())))return toast(ux('invalidDate'));const old=state.items.find(x=>x.id===id);const item={...old,id,name:$('#itemName').value.trim(),categoryKey:$('#itemCategory').selectedIndex,quantity:$('#itemQuantity').value.trim(),location:$('#itemLocation').value,added:$('#addedDate').value,dateMode:mode,expiry,produce:mode==='estimated'?$('#produceType').value:null,baseDays:mode==='estimated'?est.baseDays:null,photo:pendingPhoto||'',art:mode==='unknown'?'bottle':old?.art||products[$('#produceType').value]||'bottle'};if(old)state.items[state.items.indexOf(old)]=item;else state.items.push(item);const hist=state.history||(state.history=[]),rec=hist.find(h=>h.name===item.name);if(rec)rec.count=(rec.count||1)+1;else hist.unshift({name:item.name,categoryKey:item.categoryKey,quantity:item.quantity,location:item.location,count:1});if(hist.length>12)hist.length=12;markDirty([item.id]);logActivity(old?'edited':'added',item.name);await save();$('#itemDialog').close();toast(t('saved'));render()}
function openDetail(id){const item=state.items.find(x=>x.id===id);if(!item)return;currentDetail=id;const s=statusOf(item),v=V[state.settings.language]||V.en;$('#detailTitle').textContent=item.name;$('#detailContent').innerHTML=`<div class="detail-hero">${artHTML(item)}<div><span class="status-badge ${s}">${statusLabel(s)}</span><h3>${dayText(item)}</h3><p class="detail-quantity"><span>${t('quantity')}</span><b>${esc(item.quantity||'—')}</b></p><p class="detail-location">${esc(locationText(item))}</p></div></div><div class="detail-meta"><div><span>${t('bestBefore')}</span><b>${dateText(item.expiry)}</b></div><div><span>${t('addedLabel')}</span><b>${dateText(item.added)}</b></div><div><span>${t('category')}</span><b>${esc(categoryText(item))}</b></div><div><span>${v.location}</span><b>${esc(locationText(item))}</b></div><div><span>${t('status')}</span><b>${statusLabel(s)}</b></div></div>${item.dateMode==='estimated'?`<p class="estimate-disclaimer"><b>${t('estimated')}.</b> ${t('estimateDisclaimer')}</p>`:''}`;$('#detailDialog').showModal()}
async function removeCurrent(message,kind){const idx=state.items.findIndex(x=>x.id===currentDetail),item=state.items[idx];state.items=state.items.filter(x=>x.id!==currentDetail);(state.stats.log||(state.stats={log:[]}).log).push({d:iso(new Date()),kind:kind||'wasted',name:item?.name||''});if(state.stats.log.length>300)state.stats.log=state.stats.log.slice(-300);logActivity(kind||'wasted',item?.name||'');markDirty([currentDetail]);await save();$('#detailDialog').close();toast(message,item?{label:t('undo'),onClick:async()=>{state.items.splice(idx,0,item);markDirty([item.id]);await save();render()}}:null);render()}
function toast(msg,action){const e=$('#toast');e.textContent=msg;e.classList.toggle('has-action',!!action);let b=e.querySelector('button');if(action){if(!b){b=document.createElement('button');e.append(b)}b.textContent=action.label;b.onclick=()=>{e.classList.remove('show');action.onClick()}}else if(b)b.remove();e.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>e.classList.remove('show'),5000)}
function download(){const blob=new Blob([JSON.stringify({...state,app:'Svalna',exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`svalna-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast(t('exported'))}
async function importFile(file){try{const data=JSON.parse(await file.text());if(!Array.isArray(data.items)||!data.settings)throw 0;const fallback=demoState();state={...fallback,...data,household:{...fallback.household,...data.household},settings:{...fallback.settings,...data.settings,language:state.settings.language},items:data.items.filter(item=>item&&typeof item==='object'&&typeof item.name==='string'&&item.name&&((item.dateMode==='unknown'&&(item.expiry==null||item.expiry===''))||(/^\d{4}-\d{2}-\d{2}$/.test(item.expiry||'')&&!Number.isNaN(new Date(item.expiry+'T12:00:00').getTime()))))};markDirty(state.items.map(x=>x.id));await save();render();toast(t('imported'))}catch{toast(t('invalidFile'))}}
function recomputeEstimates(){state.items.forEach(x=>{if(x.dateMode==='estimated'){const d=new Date(x.added+'T12:00:00'),days=Math.max(2,(x.baseDays||shelf[x.produce]||7)+Math.round((4-state.settings.temperature)*.55));d.setDate(d.getDate()+days);x.expiry=iso(d)}})}
function updateNotificationText(){const b=$('#notificationButton');if(!('Notification'in window)){txt('#notificationText',t('notifyUnsupported'));b.disabled=true;return}const on=state.settings.notify===true;if(Notification.permission==='denied'){txt('#notificationText',t('notifyDenied'));b.textContent=t('activate');return}if(on){txt('#notificationText',t('notifyGranted'));b.textContent=t('deactivate')}else{txt('#notificationText',Notification.permission==='granted'?t('notifyOffHelp'):t('notifyHelp'));b.textContent=t('activate')}}
async function checkReminders(){if(!state||!('Notification'in window)||Notification.permission!=='granted'||!state.settings.notify)return;const w=state.settings.warning||3,min=state.notified||{};const seen={};let changed=false;state.items.forEach(i=>{seen[i.id]=1;const d=daysLeft(i);if(d<=w&&min[i.id]!==i.expiry){min[i.id]=i.expiry;changed=true;swNotify(`${i.name} — ${dayText(i)}`,'svalna-'+i.id)}if(d<0&&min[i.id]!==i.expiry+'!'){min[i.id]=i.expiry+'!';changed=true;swNotify(`${i.name} — ${t('expired')}`,'svalna-exp-'+i.id)}});state.notified=min;Object.keys(min).forEach(k=>{if(!seen[k]){delete min[k];changed=true}});if(changed){suppressCloudSave=true;await save();suppressCloudSave=false}}
async function requestNotifications(){if(!('Notification'in window))return;if(state.settings.notify){state.settings.notify=false;suppressCloudSave=true;await save();suppressCloudSave=false;updateNotificationText();toast(t('notifyOff'));return}const p=await Notification.requestPermission();if(p==='denied'){updateNotificationText();toast(t('notifyDenied'));return}state.settings.notify=true;suppressCloudSave=true;await save();suppressCloudSave=false;updateNotificationText();toast(t('notifyOn'));checkReminders()}
function bind(){$$('[data-view]').forEach(b=>b.onclick=()=>switchView(b.dataset.view));$$('[data-add]').forEach(b=>b.onclick=()=>openAdd());$$('.filter').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$$('.filter').forEach(x=>x.classList.toggle('active',x===b));renderInventory()});$$('[data-filter-jump]').forEach(b=>b.onclick=()=>{filter=b.dataset.filterJump;switchView('inventory');$$('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===filter));renderInventory()});$('#searchInput').oninput=renderInventory;$('#tempQuick').onclick=()=>switchView('settings');$$('input[name=dateMode]').forEach(x=>x.onchange=toggleMode);$('#produceType').onchange=estimateExpiry;$('#addedDate').onchange=()=>{if($('input[name=dateMode]:checked').value==='estimated')estimateExpiry()};[$('#cameraInput'),$('#fileInput')].forEach(inp=>inp.onchange=async()=>{if(inp.files[0]){const image=await resizeImage(inp.files[0]);if(!$('#itemDialog').open)openAdd();pendingPhoto=image;updatePhoto();inp.value=''}});$('#itemForm').onsubmit=submitItem;$('[data-close-detail]').onclick=()=>$('#detailDialog').close();$('#editItem').onclick=()=>{const item=state.items.find(x=>x.id===currentDetail);$('#detailDialog').close();openAdd(item)};$('#consumeItem').onclick=()=>removeCurrent(t('used'),'used');$('#deleteItem').onclick=()=>removeCurrent(t('removed'),'wasted');$('#copyCode').onclick=async()=>{try{await navigator.clipboard.writeText(state.household.code)}catch{}toast(t('copied'))};$('#shareHousehold').onclick=async()=>{const file=new File([JSON.stringify(state)],'svalna-household.json',{type:'application/json'});if(navigator.share&&navigator.canShare?.({files:[file]}))await navigator.share({files:[file],title:'Svalna'});else download()};$('#exportData').onclick=download;[$('#familyImport'),$('#settingsImport')].forEach(inp=>inp.onchange=()=>inp.files[0]&&importFile(inp.files[0]));$('#tempRange').oninput=e=>$('#tempOutput').textContent=e.target.value+'°C';$('#tempRange').onchange=async e=>{state.settings.temperature=+e.target.value;recomputeEstimates();await save();render();toast(t('tempToast'))};$('#warningRange').oninput=e=>$('#warningOutput').textContent=`${e.target.value} ${t('days')}`;$('#warningRange').onchange=async e=>{state.settings.warning=+e.target.value;await save();render();toast(t('warningToast'))};$('#languageSelect').onchange=async e=>{state.settings.language=e.target.value;localizeDemoItems();await save();render();toast(t('langToast'))};$('#themeSelect').onchange=async e=>{state.settings.theme=e.target.value;await save();render();toast(t('themeToast'))};$('#notificationButton').onclick=requestNotifications;$('#shopAddBtn').onclick=()=>{const v=$('#shopAddName').value.trim();if(!v)return;$('#shopAddName').value='';shopAdd(v)};$('#shopAddName').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('#shopAddBtn').click()}};$('#shopClear').onclick=async()=>{state.shopping=state.shopping.filter(x=>!x.checked);await save();renderShopping()};$('#shopFromDetail').onclick=()=>{const item=state.items.find(x=>x.id===currentDetail);if(item)shopAdd(item.name,item.quantity||'')};$('#shopSuggest').onclick=e=>{const b=e.target.closest('[data-shop-add]');if(b)shopAddItem(b.dataset.shopAdd)};$('#shopRows').onclick=e=>{const t=e.target.closest('[data-shop-toggle]'),d=e.target.closest('[data-shop-del]');if(t)shopToggle(t.dataset.shopToggle);else if(d)shopDel(d.dataset.shopDel)};$('#shopRows').oninput=e=>{const q=e.target.closest('[data-shop-qty]');if(q)shopQty(q.dataset.shopQty,q.value)};$('#recentChips').onclick=e=>{const b=e.target.closest('[data-recent]');if(!b)return;const r=(state.history||[])[+b.dataset.recent];if(r)openAdd({name:r.name,categoryKey:r.categoryKey,quantity:r.quantity,location:r.location})};matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state?.settings?.theme==='system')applyTheme()});$('#resetData').onclick=async()=>{const d=$('#confirmDialog');d.showModal();if(await new Promise(res=>d.addEventListener('close',()=>res(d.returnValue==='confirm'),{once:true}))){const lang=state.settings.language,theme=state.settings.theme;state=demoState();state.settings.language=lang;state.settings.theme=theme;markDirty(state.items.map(x=>x.id));await save();render();toast(t('resetDone'))}};$$('.sheet').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('dialog[open]').forEach(d=>d.close())})}
function refreshClock(){txt('#homeTitle',timeGreeting());txt('#todayLabel',new Intl.DateTimeFormat(locale[state.settings.language],{weekday:'long',day:'numeric',month:'long'}).format(new Date()))}
function bindPhotoInputs(){$$('#cameraInput,#fileInput').forEach(input=>input.onchange=async()=>{const file=input.files?.[0];if(!file)return;try{const image=await resizeImage(file);if(!$('#itemDialog').open)openAdd();pendingPhoto=image;updatePhoto()}catch{toast(ux('imageError'))}finally{input.value=''}})}
async function init(){await load();bind();bindPhotoInputs();bindFeatures();initInstallUI();render();initOnboarding();checkDailySummary();refreshClock();setInterval(refreshClock,60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden){refreshClock();checkReminders()}});if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});if('Notification'in window&&Notification.permission==='granted'){checkReminders();setInterval(checkReminders,300000)}}
const baseApplyLanguage=applyLanguage;
applyLanguage=function(){baseApplyLanguage();const lang=state.settings.language;const extra={en:{fridge:'items in the fridge',search:'Search items',filters:'Filter status',temp:'Change fridge temperature'},sv:{fridge:'varor i kylen',search:'Sök bland varor',filters:'Filtrera status',temp:'Ändra kylskåpstemperatur'},es:{fridge:'alimentos en la nevera',search:'Buscar alimentos',filters:'Filtrar estado',temp:'Cambiar temperatura'},tr:{fridge:'buzdolabındaki ürün',search:'Ürünlerde ara',filters:'Durumu filtrele',temp:'Sıcaklığı değiştir'}}[lang];txt('#todayLabel',new Intl.DateTimeFormat(locale[lang],{weekday:'long',day:'numeric',month:'long'}).format(new Date()));txt('.ring>div span',extra.fridge);$('.search-box .sr-only').textContent=extra.search;$('#searchInput').setAttribute('aria-label',extra.search);$('.filters').setAttribute('aria-label',extra.filters);$('#tempQuick').setAttribute('aria-label',extra.temp)};
const localizedApplyLanguage=applyLanguage;
applyLanguage=function(){localizedApplyLanguage();txt('#householdName',householdLabel());if(state.settings.language==='sv')txt('#familyTitle','Familjens Svalna');txt('.recent-head h3',t('buyAgain'));txt('.recent-head p',t('buyAgainHelp'));txt('.shopping-view .eyebrow',t('listEyebrow'));txt('#shopTitle',t('listTitle'));txt('.shopping-view .simple-header>p:last-child',t('listLead'));txt('.shop-suggest-head',t('listSuggest'));txt('.shop-list-head',t('listTitle'));$('#shopAddName').placeholder=t('listPlace');btn('#shopAddBtn',t('listAdd'));btn('#shopClear',t('listClear'));btn('#shopFromDetail',t('toList'));txt('.stats-card .eyebrow',t('statsTitle'));txt('.ideas-card .eyebrow',t('lessWaste'));txt('.ideas-card h3',t('ideasTitle'));renderStats();renderIdeas();renderRecent();renderShopping();window.SvalnaCloud?.applyLanguage?.()};
window.SvalnaBridge={
 snapshot:()=>JSON.parse(JSON.stringify(state)),
 language:()=>state?.settings?.language||'en',
 notify:message=>toast(message),
 setHousehold:(code,cloud)=>{state.household={...state.household,code,cloud};suppressCloudSave=true;save().finally(()=>{suppressCloudSave=false});render()},
 markPending:st=>{const p=state.pendingWrites||(state.pendingWrites={});const itemIds=new Set((st.items||[]).map(i=>i.id));(st.items||[]).forEach(i=>{p[i.id]={fp:canonicalFp(i),v:state.docVersion||0}});(st.dirty||[]).forEach(id=>{if(!itemIds.has(id)&&p[id]===undefined)p[id]={del:true,v:state.docVersion||0}});Object.keys(p).forEach(id=>{if(!(st.dirty||[]).includes(id)&&!itemIds.has(id))delete p[id]})},
  applyRemote:async remote=>{const language=state.settings.language;const dirty=new Set(state.dirty||[]);const pending=state.pendingWrites||(state.pendingWrites={});const docVer=remote.updatedAt?.toMillis?.()??Date.now();const localById=new Map((state.items||[]).map(item=>[item.id,item]));const localPhotos=new Map((state.items||[]).map(item=>[item.id,item.photo]));const remoteItems=(remote.items||[]).map(item=>({...item,photo:localPhotos.get(item.id)||item.photo||''}));const seen=new Set(),merged=[];remoteItems.forEach(r=>{seen.add(r.id);const d=dirty.has(r.id),p=pending[r.id];if(d&&p){if(p.del)return;if(p.fp===canonicalFp(r)){dirty.delete(r.id);delete pending[r.id];merged.push(r);return}if(localById.has(r.id)){merged.push(localById.get(r.id));return}return}if(d)return;merged.push(r)});(state.items||[]).forEach(l=>{if(seen.has(l.id)||!dirty.has(l.id))return;merged.push(l);seen.add(l.id)});[...dirty].forEach(id=>{const p=pending[id];if(p&&p.del&&docVer>=p.v&&!seen.has(id)){dirty.delete(id);delete pending[id]}});Object.keys(pending).forEach(id=>{if(!dirty.has(id)&&!localById.has(id))delete pending[id]});state.dirty=[...dirty];state={...state,household:{name:remote.name||state.household.name,code:remote.code||state.household.code,cloud:true},settings:{...state.settings,language,temperature:Number(remote.temperature??state.settings.temperature),warning:Number(remote.warning??state.settings.warning)},items:merged,shopping:mergeShoppingList(state.shopping,remote.shopping),activity:mergeActivity(state.activity,remote.activity),mealPlan:mergeMeals(state.mealPlan,remote.mealPlan),docVersion:docVer,lastRemoteAt:Date.now()};localizeDemoItems();suppressCloudSave=true;try{await save()}finally{suppressCloudSave=false}render()}
};
/* ==== Svalna features: onboarding, activity log, barcode scan, meal plan, notifications ==== */
let scanning=false,scanStream=null,scanTimer=null,shopTab='list',planDay=0;
const N={
 en:{onbWelcome:'Welcome to Svalna',onbLead:"Let's set up your fridge so dates and reminders feel right.",onbStep:'Step %d of %d',onbLangTitle:'Language',onbLangHelp:'Choose the language used in Svalna.',onbTempTitle:'Fridge temperature',onbTempHelp:'Affects estimated dates for fruit and vegetables.',onbWarnTitle:'Warn in advance',onbWarnHelp:'Items turn yellow — and Svalna reminds you — at this threshold.',onbNotifyTitle:'Notifications',onbNotifyHelp:'Reminders when items are about to expire, even days in advance.',onbNotifyLabel:'Enable reminders',onbBack:'Back',onbNext:'Next',onbStart:'Get started',onbDone:'Your fridge is ready!',ready:'Ready for your photo',align:'Align the product or expiry date',scanBarcode:'Scan barcode',scanStop:'Stop scanning',scanAlignBarcode:'Align the barcode',scanLooking:'Looking for a barcode…',scanFound:'Barcode found',scanNotFound:'No match in the open database',scanOffline:'You can enter the item manually.',scanError:'Scanning failed',scanStatus:'Barcode lookups use the open Open Food Facts database for name suggestions. Your photos never leave this device.',cameraDenied:'Camera permission was denied. You can still add items with a photo or manually.',activityEyebrow:'Household activity',activityTitle:'Recent activity',activityLead:'Who added, used or threw away what.',actAdded:'Added',actEdited:'Edited',actUsed:'Used',actWasted:'Wasted',actShopped:'To list',actPlanned:'Planned',actEmpty:'No activity yet — changes appear here.',yourName:'Your name',me:'Me',listTab:'List',planTab:'Meal plan',planWeek:'Plan your week',planDayPick:'Pick a day and add a recipe.',planRecipe:'Recipe',planServings:'portions',planAdd:'Plan',planAdded:'Added to the meal plan',planEmpty:'Nothing planned for this day yet.',planToBuy:'To buy for meals',planInFridge:'in fridge',planOnList:'already on list',planAddAll:'Add all to list',planAddedAll:'Added to the shopping list',planToBuyEmpty:'Nothing to buy — planned meals fit your fridge.',meal:'meal',meals:'meals',dailyBody:'About to expire:',dailyExpired:'Already expired:'},
 sv:{onbWelcome:'Välkommen till Svalna',onbLead:'Låt oss ställa in din kyl så att datum och påminnelser känns rätt.',onbStep:'Steg %d av %d',onbLangTitle:'Språk',onbLangHelp:'Välj språket som används i Svalna.',onbTempTitle:'Kylskåpstemperatur',onbTempHelp:'Påverkar uppskattade datum för frukt och grönt.',onbWarnTitle:'Varna i förväg',onbWarnHelp:'Varor blir gula – och Svalna påminner dig – när de når gränsen.',onbNotifyTitle:'Aviseringar',onbNotifyHelp:'Påminnelser när varor är på väg att gå ut, även flera dagar i förväg.',onbNotifyLabel:'Aktivera påminnelser',onbBack:'Tillbaka',onbNext:'Nästa',onbStart:'Kom igång',onbDone:'Din kyl är redo!',ready:'Redo för din bild',align:'Rikta in varan eller bäst före-datumet',scanBarcode:'Skanna streckkod',scanStop:'Stoppa skanning',scanAlignBarcode:'Rikta in streckkoden',scanLooking:'Letar efter en streckkod…',scanFound:'Streckkod hittad',scanNotFound:'Ingen träff i den öppna databasen',scanOffline:'Du kan lägga till varan manuellt.',scanError:'Skanningen misslyckades',scanStatus:'Streckkodsuppslag använder den öppna databasen Open Food Facts för namnförslag. Dina bilder lämnar aldrig enheten.',cameraDenied:'Kameran var blockerad. Du kan fortfarande lägga till varor med foto eller manuellt.',activityEyebrow:'Hushållets aktivitet',activityTitle:'Senaste aktivitet',activityLead:'Vem som la till, använde eller slängde vad.',actAdded:'Lades till',actEdited:'Ändrades',actUsed:'Användes',actWasted:'Slängdes',actShopped:'Till listan',actPlanned:'Planerades',actEmpty:'Ingen aktivitet än – ändringar visas här.',yourName:'Ditt namn',me:'Mig',listTab:'Lista',planTab:'Måltidsplan',planWeek:'Planera din vecka',planDayPick:'Välj en dag och lägg till ett recept.',planRecipe:'Recept',planServings:'portioner',planAdd:'Planera',planAdded:'Lades till i måltidsplanen',planEmpty:'Inget planerat den här dagen än.',planToBuy:'Att köpa för måltiderna',planInFridge:'i kylen',planOnList:'redan på listan',planAddAll:'Lägg allt i listan',planAddedAll:'Lades till i inköpslistan',planToBuyEmpty:'Inget att köpa – planerade måltider passar i din kyl.',meal:'måltid',meals:'måltider',dailyBody:'Håller på att gå ut:',dailyExpired:'Redan utdaterad:'},
 es:{onbWelcome:'Bienvenido a Svalna',onbLead:'Configura tu nevera para que las fechas y recordatorios encajen bien.',onbStep:'Paso %d de %d',onbLangTitle:'Idioma',onbLangHelp:'Elige el idioma que se usa en Svalna.',onbTempTitle:'Temperatura de la nevera',onbTempHelp:'Afecta a las fechas estimadas de frutas y verduras.',onbWarnTitle:'Avisar con antelación',onbWarnHelp:'Los alimentos se vuelven amarillos — y Svalna te recuerda — al llegar al límite.',onbNotifyTitle:'Notificaciones',onbNotifyHelp:'Recordatorios cuando los alimentos están por caducar, incluso con días de antelación.',onbNotifyLabel:'Activar recordatorios',onbBack:'Atrás',onbNext:'Siguiente',onbStart:'Empezar',onbDone:'¡Tu nevera está lista!',ready:'Listo para tu foto',align:'Alinea el producto o la fecha',scanBarcode:'Escanear código de barras',scanStop:'Detener escaneo',scanAlignBarcode:'Alinea el código de barras',scanLooking:'Buscando un código de barras…',scanFound:'Código encontrado',scanNotFound:'Sin coincidencia en la base de datos abierta',scanOffline:'Puedes introducir el alimento manualmente.',scanError:'El escaneo falló',scanStatus:'Las búsquedas de códigos usan la base de datos abierta Open Food Facts para sugerir nombres. Tus fotos nunca salen del dispositivo.',cameraDenied:'Se denegó el permiso de la cámara. Puedes añadir alimentos con foto o manualmente.',activityEyebrow:'Actividad del hogar',activityTitle:'Actividad reciente',activityLead:'Quién añadió, usó o tiró qué.',actAdded:'Añadido',actEdited:'Editado',actUsed:'Usado',actWasted:'Tirado',actShopped:'A la lista',actPlanned:'Planificado',actEmpty:'Aún no hay actividad: los cambios aparecerán aquí.',yourName:'Tu nombre',me:'Yo',listTab:'Lista',planTab:'Plan de comidas',planWeek:'Planifica tu semana',planDayPick:'Elige un día y añade una receta.',planRecipe:'Receta',planServings:'raciones',planAdd:'Planificar',planAdded:'Añadido al plan de comidas',planEmpty:'Nada planificado para este día todavía.',planToBuy:'Para comprar para las comidas',planInFridge:'en la nevera',planOnList:'ya en la lista',planAddAll:'Añadir todo a la lista',planAddedAll:'Añadido a la lista de la compra',planToBuyEmpty:'Nada que comprar: las comidas planeadas caben en tu nevera.',meal:'comida',meals:'comidas',dailyBody:'Por caducar:',dailyExpired:'Ya caducado:'},
 tr:{onbWelcome:'Svalna’ya hoş geldin',onbLead:'Tarihler ve hatırlatmalar doğru olsun diye dolabını ayarlayalım.',onbStep:'Adım %d / %d',onbLangTitle:'Dil',onbLangHelp:'Svalna’da kullanılacak dili seç.',onbTempTitle:'Buzdolabı sıcaklığı',onbTempHelp:'Meyve ve sebzelerin tahmini tarihlerini etkiler.',onbWarnTitle:'Önceden uyar',onbWarnHelp:'Ürünler sınıra gelince sarıya döner — Svalna sana hatırlatır.',onbNotifyTitle:'Bildirimler',onbNotifyHelp:'Ürünler son kullanım tarihine yaklaşınca, günler öncesinden bile hatırlatır.',onbNotifyLabel:'Hatırlatmaları etkinleştir',onbBack:'Geri',onbNext:'İleri',onbStart:'Başla',onbDone:'Dolabın hazır!',ready:'Fotoğraf için hazır',align:'Ürünü veya son tarihi hizala',scanBarcode:'Barkod tara',scanStop:'Taramayı durdur',scanAlignBarcode:'Barkodu hizala',scanLooking:'Barkod aranıyor…',scanFound:'Barkod bulundu',scanNotFound:'Açık veri tabanında eşleşme yok',scanOffline:'Ürünü elle girebilirsin.',scanError:'Tarama başarısız oldu',scanStatus:'Barkod aramaları, ad önerileri için açık Open Food Facts veri tabanını kullanır. Fotoğrafların cihazdan asla çıkmaz.',cameraDenied:'Kamera izni reddedildi. Yine de fotoğraf veya elle ürün ekleyebilirsin.',activityEyebrow:'Hane etkinliği',activityTitle:'Son etkinlik',activityLead:'Kim neyi ekledi, kullandı veya attı.',actAdded:'Eklendi',actEdited:'Düzenlendi',actUsed:'Kullanıldı',actWasted:'Atıldı',actShopped:'Listeye',actPlanned:'Planlandı',actEmpty:'Henüz etkinlik yok — değişiklikler burada görünür.',yourName:'Adın',me:'Ben',listTab:'Liste',planTab:'Yemek planı',planWeek:'Haftanı planla',planDayPick:'Bir gün seç ve bir tarif ekle.',planRecipe:'Tarif',planServings:'porsiyon',planAdd:'Planla',planAdded:'Yemek planına eklendi',planEmpty:'Bu gün için henüz bir şey planlanmadı.',planToBuy:'Yemekler için alınacaklar',planInFridge:'dolapta',planOnList:'zaten listede',planAddAll:'Tümünü listeye ekle',planAddedAll:'Alışveriş listesine eklendi',planToBuyEmpty:'Alınacak bir şey yok — planlanan yemekler dolabına sığıyor.',meal:'öğün',meals:'öğün',dailyBody:'Son kullanma tarihi yaklaşan:',dailyExpired:'Zaten süresi dolan:'}
};
const nt=k=>{const L=state?.settings?.language||'en';return (N[L]||N.en)[k]??N.en[k]??k};
const INGW={
 tomato:{en:'Tomatoes',sv:'Tomater',es:'Tomates',tr:'Domates',q:'6'},onion:{en:'Onion',sv:'Lök',es:'Cebolla',tr:'Soğan',q:'1'},garlic:{en:'Garlic',sv:'Vitlök',es:'Ajo',tr:'Sarımsak',q:'2'},cream:{en:'Cream',sv:'Grädde',es:'Nata',tr:'Krema',q:'2 dl'},egg:{en:'Eggs',sv:'Ägg',es:'Huevos',tr:'Yumurta',q:'2'},milk:{en:'Milk',sv:'Mjölk',es:'Leche',tr:'Süt',q:'4 dl'},flour:{en:'Flour',sv:'Mjöl',es:'Harina',tr:'Un',q:'3 dl'},butter:{en:'Butter',sv:'Smör',es:'Mantequilla',tr:'Tereyağı',q:'1 msk'},broccoli:{en:'Broccoli',sv:'Broccoli',es:'Brócoli',tr:'Brokoli',q:'1'},berries:{en:'Berries',sv:'Bär',es:'Frutos rojos',tr:'Çilek',q:'3 dl'},banana:{en:'Banana',sv:'Banan',es:'Plátano',tr:'Muz',q:'1'},apple:{en:'Apples',sv:'Äpplen',es:'Manzanas',tr:'Elma',q:'4'},sugar:{en:'Sugar',sv:'Socker',es:'Azúcar',tr:'Şeker',q:'1 dl'},cinnamon:{en:'Cinnamon',sv:'Kanel',es:'Canela',tr:'Tarçın',q:'1 tsk'},carrot:{en:'Carrots',sv:'Morötter',es:'Zanahorias',tr:'Havuç',q:'5'},cucumber:{en:'Cucumber',sv:'Gurka',es:'Pepino',tr:'Salatalık',q:'1'},dill:{en:'Dill',sv:'Dill',es:'Eneldo',tr:'Dereotu',q:'1 knippe'},oil:{en:'Oil',sv:'Olja',es:'Aceite',tr:'Yağ',q:'2 msk'},pepper:{en:'Peppers',sv:'Paprikor',es:'Pimientos',tr:'Biber',q:'4'},rice:{en:'Rice',sv:'Ris',es:'Arroz',tr:'Pirinç',q:'2 dl'},salad:{en:'Salad',sv:'Sallad',es:'Ensalada',tr:'Salata',q:'1'},citrus:{en:'Citrus',sv:'Citrus',es:'Cítricos',tr:'Narenciye',q:'3'},ketchup:{en:'Ketchup',sv:'Ketchup',es:'Kétchup',tr:'Ketçap',q:'3 dl'}
};
const RECIPE_ING=[
 [{w:'tomato',k:['tomato','tomat','domat','tomate'],p:'tomato',q:'6'},{w:'onion',k:['onion','lök','cebolla','soğan','sogan'],q:'1'},{w:'garlic',k:['garlic','vitlök','ajo','sarımsak','sarimsak'],q:'2'},{w:'cream',k:['cream','grädde','gräd','nata','krema'],q:'2 dl'}],
 [{w:'egg',k:['egg','ägg','huevo','yumurta'],p:'eggs',q:'6'},{w:'onion',k:['onion','lök','cebolla','soğan','sogan'],q:'1'},{w:'tomato',k:['tomato','tomat','domat','tomate'],p:'tomato',q:'2'},{w:'butter',k:['butter','smör','mantequilla','tereyağı'],q:'1 msk'}],
 [{w:'milk',k:['milk','mjölk','leche','süt','sut'],q:'4 dl'},{w:'egg',k:['egg','ägg','huevo','yumurta'],q:'2'},{w:'flour',k:['flour','mjöl','harina'],q:'3 dl'}],
 [{w:'broccoli',k:['broccoli','brokoli','brócoli','brocoli'],p:'broccoli',q:'1'},{w:'garlic',k:['garlic','vitlök','ajo','sarımsak','sarimsak'],q:'2'},{w:'oil',k:['oil','olja','aceite','yağ'],q:'2 msk'}],
 [{w:'berries',k:['strawberr','jordgubb','fresa','çilek','cilek','berry','bär'],p:'berries',q:'3 dl'},{w:'banana',k:['banana','banan','plátano','muz'],q:'1'},{w:'milk',k:['milk','mjölk','leche','süt','sut'],q:'3 dl'}],
 [{w:'apple',k:['apple','äpple','manzana','elma'],p:'apple',q:'4'},{w:'sugar',k:['sugar','socker','azúcar','şeker','seker'],q:'1 dl'},{w:'cinnamon',k:['cinnamon','kanel','canela','tarçın','tarcin'],q:'1 tsk'}],
 [{w:'carrot',k:['carrot','morot','zanahoria','havuç','havuc'],p:'carrot',q:'5'},{w:'onion',k:['onion','lök','cebolla','soğan','sogan'],q:'1'},{w:'cream',k:['cream','grädde','gräd','nata','krema'],q:'2 dl'}],
 [{w:'cucumber',k:['cucumber','gurka','pepino','salatalık','salatalik'],p:'cucumber',q:'1'},{w:'onion',k:['onion','lök','cebolla','soğan','sogan'],q:'1'},{w:'dill',k:['dill','dill','eneldo','dereotu'],q:'1 knippe'},{w:'oil',k:['oil','olja','aceite','yağ'],q:'2 msk'}],
 [{w:'pepper',k:['pepper','paprika','pimiento','biber'],p:'pepper',q:'4'},{w:'rice',k:['rice','ris','arroz','pirinç','pirinc'],q:'2 dl'},{w:'tomato',k:['tomato','tomat','domat','tomate'],p:'tomato',q:'2'},{w:'onion',k:['onion','lök','cebolla','soğan','sogan'],q:'1'}],
 [{w:'salad',k:['salad','sallad','ensalada','salata','lettuce'],p:'leafy',q:'1'},{w:'tomato',k:['tomato','tomat','domat','tomate'],p:'tomato',q:'2'},{w:'cucumber',k:['cucumber','gurka','pepino','salatalık','salatalik'],p:'cucumber',q:'1'},{w:'onion',k:['onion','lök','cebolla','soğan','sogan'],q:'1'}],
 [{w:'citrus',k:['orange','apelsin','naranja','portakal','citrus'],p:'citrus',q:'3'},{w:'banana',k:['banana','banan','plátano','muz'],q:'1'}],
 [{w:'ketchup',k:['ketchup','ketçap','kétchup','catsup'],q:'3 dl'},{w:'flour',k:['flour','mjöl','harina'],q:'4 dl'},{w:'milk',k:['milk','mjölk','leche','süt','sut'],q:'2 dl'},{w:'egg',k:['egg','ägg','huevo','yumurta'],q:'1'}]
];
const MEAL_DAYS=7;
const OFF_API='https://world.openfoodfacts.org/api/v2/product/';
function ingLabel(w){const L=state.settings.language,g=INGW[w];return g?(g[L]||g.en||w):w}
function fridgeHas(ing){return state.items.some(it=>{const n=String(it.name||'').toLowerCase();if((ing.k||[]).some(k=>k&&n.includes(String(k).toLowerCase())))return true;if(ing.p&&it.produce===ing.p)return true;return false})}
function mergeActivity(a,b){const map=new Map();[...(a||[]),...(b||[])].forEach(x=>{if(x&&x.id&&!map.has(x.id))map.set(x.id,x)});return [...map.values()].sort((x,y)=>(y.t||0)-(x.t||0)).slice(0,100)}
function mergeMeals(a,b){const map=new Map();[...(a||[]),...(b||[])].forEach(x=>{if(x&&x.id&&!map.has(x.id))map.set(x.id,x)});return [...map.values()].sort((x,y)=>String(x.date).localeCompare(String(y.date))).slice(0,80)}
function mergeShoppingList(local,remote){if(!remote||!Array.isArray(remote))return local||[];if(!local||!Array.isArray(local))return remote;// Prefer remote — it is the shared truth; preserve local checked state
const localById=new Map((local||[]).map(x=>[x.id,x]));const merged=remote.map(r=>{const l=localById.get(r.id);return l?{...r,checked:l.checked}:r});// Add local items not yet in remote (added offline)
const remoteIds=new Set(remote.map(x=>x.id));(local||[]).forEach(l=>{if(!remoteIds.has(l.id))merged.push(l)});return merged}
function logActivity(kind,name){const a=state.activity||(state.activity=[]);a.unshift({id:crypto.randomUUID(),t:Date.now(),actor:(state.settings.actor||'').trim()||nt('me'),kind,name:String(name||'').slice(0,60)});if(a.length>100)a.length=100}
function actIcon(k){return k==='added'?'i-plus':k==='edited'?'i-edit':k==='used'?'i-check':k==='shopped'?'i-box':k==='planned'?'i-box':'i-trash'}
function actLabel(k){const m={added:nt('actAdded'),edited:nt('actEdited'),used:nt('actUsed'),wasted:nt('actWasted'),shopped:nt('actShopped'),planned:nt('actPlanned')};return m[k]||''}
function renderActivity(){const list=$('#activityList');if(!list||!state)return;const a=(state.activity||[]).slice(0,30);const fmt=new Intl.RelativeTimeFormat(state.settings.language,{numeric:'auto'});const rel=t=>{const s=(t-Date.now())/1000,abs=Math.abs(s),u=abs<60?'second':abs<3600?'minute':abs<86400?'hour':'day',div=u==='second'?1:u==='minute'?60:u==='hour'?3600:86400;return fmt.format(Math.round(s/div),u)};list.innerHTML=a.length?a.map(x=>`<div class="activity-row"><span class="activity-icon"><svg><use href="#${actIcon(x.kind)}"/></svg></span><div><b>${esc(x.name)}</b><small>${esc(x.actor)} · ${rel(x.t)}</small></div><span class="activity-kind">${esc(actLabel(x.kind))}</span></div>`).join(''):`<p class="shop-empty">${esc(nt('actEmpty'))}</p>`;const inp=$('#actorInput');if(inp){inp.placeholder=nt('yourName');if(inp.value!==(state.settings.actor||''))inp.value=state.settings.actor||''}}
function setScanCaption(st,showCode,code){const b=$('.scan-caption b'),s=$('.scan-caption small');const map={ready:[nt('ready'),nt('align')],alignBarcode:[nt('scanAlignBarcode'),nt('scanLooking')],found:[nt('scanFound'),showCode?code||'':''],notFound:[nt('scanNotFound'),nt('scanOffline')],error:[nt('scanError'),nt('scanOffline')]};const v=map[st]||map.ready;if(b)b.textContent=v[0];if(s)s.textContent=v[1]}
async function startBarcodeScan(){
  const video=$('#scanVideo');
  if(!video||scanning)return;
  try{
    scanStream=await navigator.mediaDevices.getUserMedia({
      video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}}
    });
    video.srcObject=scanStream;
    video.hidden=false;
    const poster=$('#scanPoster');
    if(poster)poster.hidden=true;
    await video.play();
    scanning=true;
    setScanCaption('alignBarcode');
    // Update big barcode button to "Stop scanning" state
    setBarcodeButtonState('scanning');
    const note=$('#barcodeNote');
    if(note){note.hidden=false;note.textContent=nt('scanStatus')}
    scanLoop();
  }catch(err){
    toast(nt('cameraDenied'));
  }
}
function stopBarcodeScan(){
  scanning=false;
  clearTimeout(scanTimer);
  if(scanStream){try{scanStream.getTracks().forEach(t=>t.stop())}catch(e){}scanStream=null}
  const video=$('#scanVideo'),poster=$('#scanPoster');
  if(video){video.hidden=true;video.srcObject=null}
  if(poster)poster.hidden=false;
  const note=$('#barcodeNote');
  if(note)note.hidden=true;
  setBarcodeButtonState('idle');
  setScanCaption('ready');
}
function setBarcodeButtonState(mode){
  const label=$('#barcodeBtnLabel'), sub=$('#barcodeBtnSub'), btn=$('#barcodeButton');
  if(!btn)return;
  if(mode==='scanning'){
    btn.classList.add('barcode-scanning');
    if(label)label.textContent=nt('scanStop');
    if(sub)sub.textContent=nt('scanLooking');
  } else {
    btn.classList.remove('barcode-scanning');
    if(label)label.textContent=nt('scanBarcode');
    if(sub){
      const subMap={en:'Point camera at the barcode — auto-detects name & date',sv:'Rikta kameran mot streckkoden — känner igen namn och datum automatiskt',es:'Apunta la cámara al código de barras — detecta nombre y fecha automáticamente',tr:'Kamerayı barkoda tut — adı ve tarihi otomatik algılar'};
      sub.textContent=subMap[state?.settings?.language]||subMap.en;
    }
  }
}
function scanLoop(){
  if(!scanning)return;
  (async()=>{
    try{
      const code=await detectBarcode($('#scanVideo'));
      if(code){
        if(scanning){
          // Flash the scan frame green to signal detection
          const frame=$('.scan-frame');
          if(frame){frame.classList.add('scan-hit');setTimeout(()=>frame.classList.remove('scan-hit'),600);}
          onBarcode(code);
        }
        return;
      }
    }catch(e){}
    scanTimer=setTimeout(scanLoop,300);
  })();
}
async function detectBarcode(video){if(!video||video.readyState<2)return null;if(window.BarcodeDetector){try{const det=new window.BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e','code_128','code_39','itf','codabar','qr_code']});const res=await det.detect(video);if(res&&res.length&&res[0].rawValue)return String(res[0].rawValue)}catch(e){}}if(window.BrowserMultiFormatReader&&video.videoWidth>0){try{const c=document.createElement('canvas');c.width=video.videoWidth;c.height=video.videoHeight;const ctx=c.getContext('2d',{willReadFrequently:true});if(ctx){ctx.drawImage(video,0,0);const reader=new window.BrowserMultiFormatReader();const result=reader.decodeFromCanvas(c);if(result)return result.getText()}}catch(e){}}return null}
function mapOFFCategory(cat){const c=String(cat||'').toLowerCase();let categoryKey=6,produce=null;if(/vegetab|tomato|onion|garlic|potato|carrot|broccoli|cucumber|pepper|mushroom|salad|leafy|greens|avocado|squash|zucchini|celery|lettuce|herb|root/.test(c))categoryKey=0;else if(/fruit|berry|berries|apple|citrus|banana|orange|grape|strawberr|peach|melon|pineapple|mango|kiwi|lemon|lime/.test(c))categoryKey=1;else if(/dairy|milk|cheese|yogurt|yoghurt|cream|butter|egg/.test(c))categoryKey=2;else if(/drink|beverage|juice|water|soda|cola|beer|wine|coffee|tea/.test(c))categoryKey=3;else if(/sauce|condiment|ketchup|mustard|mayonnaise|dressing|jam|honey|oil|vinegar|cereal|pasta|rice|noodle|bread|baking|soup|snack|chocolate|candy|sweet/.test(c))categoryKey=4;if(categoryKey===0){produce=/tomato/.test(c)?'tomato':/broccoli/.test(c)?'broccoli':/cucumber/.test(c)?'cucumber':/pepper/.test(c)?'pepper':/carrot/.test(c)?'carrot':/salad|leafy|lettuce|greens/.test(c)?'leafy':'general'}else if(categoryKey===1){produce=/berry|strawberr/.test(c)?'berries':/citrus|orange|lemon|lime/.test(c)?'citrus':/apple/.test(c)?'apple':'general'}return{categoryKey,produce}}
async function onBarcode(code){
  stopBarcodeScan();
  setScanCaption('found',true,code);
  // Capture a frame from the video before it stops, for OCR fallback
  const video = $('#scanVideo');
  let videoFrame = null;
  if (video && !video.hidden && video.readyState >= 2 && video.videoWidth > 0) {
    try {
      const fc = document.createElement('canvas');
      fc.width = video.videoWidth; fc.height = video.videoHeight;
      const fctx = fc.getContext('2d');
      if (fctx) { fctx.drawImage(video, 0, 0); videoFrame = fc.toDataURL('image/jpeg', 0.85); }
    } catch(e) {}
  }
  try {
    const res = await fetch(OFF_API + encodeURIComponent(code) + '.json');
    if (!res.ok) throw 0;
    const data = await res.json();
    if (!data || !data.product) throw 0;
    const p = data.product, L = state.settings.language;
    const name = String(p.product_name || p['product_name_' + L] || p.product_name_en || ('Product ' + code)).slice(0, 40);
    const {categoryKey, produce} = mapOFFCategory(
      (p.categories_hierarchy && p.categories_hierarchy.length ? p.categories_hierarchy.join(' ') : '') + ' ' + (p.categories || '')
    );
    // Try to get expiry from Open Food Facts directly
    let offExpiry = null;
    if (p.expiry_date) {
      offExpiry = parseOFFDate(p.expiry_date);
    }
    let photo = '';
    const imgUrl = p.image_front_url || p.image_front_small_url;
    if (imgUrl) {
      try {
        const r = await fetch(imgUrl);
        if (r.ok) {
          const blob = await r.blob();
          photo = await resizeImage(new File([blob], 'product.jpg', {type: blob.type || 'image/jpeg'}));
        }
      } catch(e) {}
    }
    const mode = produce ? 'estimated' : 'printed';
    openAdd({
      name, categoryKey, quantity: '', location: 'middle',
      added: iso(new Date()), dateMode: mode,
      expiry: offExpiry || (mode === 'printed' ? null : null),
      produce: produce || 'general',
      baseDays: produce ? (shelf[produce] || 7) : 7,
      photo, art: produce ? (products[produce] || 'bottle') : 'bottle'
    });
    // After dialog opens: auto-run OCR if no expiry found yet
    if (!offExpiry) {
      const ocrSource = photo || videoFrame;
      if (ocrSource) {
        setTimeout(() => autoOCRInForm(ocrSource), 200);
      }
    } else {
      // Show what we got from OFF database
      setTimeout(() => setOcrStatus('success', `Date from database: ${offExpiry}`), 200);
    }
  } catch(err) {
    setScanCaption('notFound');
    openAdd({
      name: 'Product ' + code, categoryKey: 6, quantity: '', location: 'middle',
      added: iso(new Date()), dateMode: 'printed', expiry: null,
      produce: 'general', baseDays: 7, photo: videoFrame || '', art: 'bottle'
    });
    // Still try OCR on the captured frame
    if (videoFrame) setTimeout(() => autoOCRInForm(videoFrame), 200);
  }
}
function aggPlan(){const start=new Date();start.setHours(12,0,0,0);const end=new Date(start.getTime()+MEAL_DAYS*DAY);const meals=(state.mealPlan||[]).filter(m=>{const d=new Date(String(m.date||'')+'T12:00:00');return d>=start&&d<end});const rows={};meals.forEach(m=>{(RECIPE_ING[m.recipeId]||[]).forEach(g=>{if(!rows[g.w])rows[g.w]={w:g.w,q:g.q,meals:0,inFridge:fridgeHas(g)};rows[g.w].meals+=(m.servings||2)})});return{meals,rows:Object.values(rows)}}
function bindPlan(){$$('#planDays [data-plan-day]').forEach(b=>b.onclick=()=>{planDay=+b.dataset.planDay;renderPlan()});const addBtn=$('#planAddRecipe');if(addBtn)addBtn.onclick=()=>{const i=+($('#planRecipeSelect')?.value||0),serv=Math.min(12,Math.max(1,+($('#planServings')?.value||2)));const start=new Date();start.setHours(12,0,0,0);const d=new Date(start.getTime()+planDay*DAY);(state.mealPlan=state.mealPlan||[]).push({id:crypto.randomUUID(),date:iso(d),recipeId:i,servings:serv});const r=RECIPES[i];logActivity('planned',r?r.n[state.settings.language]||r.n.en:'');save().then(()=>{renderPlan();renderActivity();toast(nt('planAdded'))})};$$('[data-plan-remove]').forEach(b=>b.onclick=()=>{state.mealPlan=state.mealPlan.filter(m=>m.id!==b.dataset.planRemove);save().then(renderPlan)});$$('[data-plan-buy]').forEach(b=>b.onclick=()=>{const w=b.dataset.planBuy,lbl=ingLabel(w),q=b.dataset.planQ||'';if(!(state.shopping||[]).some(s=>s.name===lbl)){shopAdd(lbl,q)}renderPlan()});if($('#planAddAll'))$('#planAddAll').onclick=()=>{const {rows}=aggPlan();rows.forEach(x=>{const lbl=ingLabel(x.w);if(!x.inFridge&&!(state.shopping||[]).some(s=>s.name===lbl))shopAdd(lbl,x.q)});renderPlan();toast(nt('planAddedAll'))}}
function renderPlan(){const view=$('#shopPlanView');if(!view||!state)return;const L=state.settings.language;const start=new Date();start.setHours(12,0,0,0);const days=[];for(let i=0;i<MEAL_DAYS;i++){days.push(new Date(start.getTime()+i*DAY))}const date=iso(days[planDay]||start);const planned=(state.mealPlan||[]).filter(m=>m.date===date);const dayEl=$('#planDays');if(dayEl)dayEl.innerHTML=days.map((d,i)=>`<button type="button" class="plan-day${i===planDay?' active':''}" data-plan-day="${i}"><b>${i===0?esc(t('today')):esc(new Intl.DateTimeFormat(locale[L],{weekday:'short'}).format(d))}</b><small>${esc(new Intl.DateTimeFormat(locale[L],{day:'numeric',month:'short'}).format(d))}</small></button>`).join('');const recEl=$('#planRecipes');if(recEl){const sel=`<select id="planRecipeSelect" aria-label="${esc(nt('planRecipe'))}">${RECIPES.map((r,i)=>`<option value="${i}">${esc(r.n[L]||r.n.en)}</option>`).join('')}</select>`;recEl.innerHTML=`<div class="plan-add-row">${sel}<label class="plan-servings"><input id="planServings" type="number" min="1" max="12" value="2" aria-label="${esc(nt('planServings'))}"> ${esc(nt('planServings'))}</label><button type="button" class="primary-button" id="planAddRecipe">${esc(nt('planAdd'))}</button></div>`+(planned.length?planned.map(m=>{const r=RECIPES[m.recipeId];return `<div class="plan-meal"><div><b>${esc(r?r.n[L]||r.n.en:'?')}</b><small>${m.servings} ${esc(nt('planServings'))} · ${esc(dateText(m.date))}</small></div><button type="button" class="shop-del" data-plan-remove="${m.id}" aria-label="${esc(t('remove'))}"><svg><use href="#i-trash"/></svg></button></div>`}).join(''):`<p class="shop-empty">${esc(nt('planEmpty'))}</p>`)}const {meals,rows}=aggPlan();const inList=new Set((state.shopping||[]).map(x=>x.name));const shopEl=$('#planShopping');if(shopEl)shopEl.innerHTML=rows.length?rows.map(x=>{const lbl=ingLabel(x.w);return `<div class="shop-suggest"><div><b>${esc(lbl)}</b><small>${esc(x.q)}${x.inFridge?' · '+esc(nt('planInFridge')):''}${inList.has(lbl)?' · '+esc(nt('planOnList')):''}</small></div>${x.inFridge||inList.has(lbl)?'<span class="plan-check"><svg><use href="#i-check"/></svg></span>':`<button type="button" class="shop-add" data-plan-buy="${esc(x.w)}" data-plan-q="${esc(x.q)}" aria-label="${esc(lbl)}"><svg><use href="#i-plus"/></svg></button>`}</div>`}).join(''):`<p class="shop-empty">${esc(nt('planToBuyEmpty'))}</p>`;const totalEl=$('#planTotal');if(totalEl)totalEl.textContent=meals.length?`${meals.length} ${meals.length===1?esc(nt('meal')):esc(nt('meals'))}`:'';const allBtn=$('#planAddAll');if(allBtn)allBtn.hidden=!rows.some(x=>!x.inFridge&&!inList.has(ingLabel(x.w)));bindPlan()}
function swNotify(body,tag){try{const opts={body,icon:'assets/icon.svg',tag};if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(r=>r.showNotification('Svalna',opts)).catch(()=>{try{new Notification('Svalna',opts)}catch(e){}})}else{new Notification('Svalna',opts)}}catch(e){}}
async function checkDailySummary(){if(!state||!('Notification'in window)||Notification.permission!=='granted'||!state.settings.notify)return;const today=iso(new Date());if((state.notified||{}).daily===today)return;const w=state.settings.warning||3;const due=state.items.filter(x=>x.expiry&&daysLeft(x)<=w).sort((a,b)=>daysLeft(a)-daysLeft(b));if(!due.length)return;const near=due.filter(x=>daysLeft(x)>=0),exp=due.filter(x=>daysLeft(x)<0);let body='';if(near.length)body=nt('dailyBody')+' '+near.slice(0,4).map(x=>x.name).join(', ');else if(exp.length)body=nt('dailyExpired')+' '+exp.slice(0,4).map(x=>x.name).join(', ');if(!body)return;swNotify(body,'svalna-daily');(state.notified=state.notified||{}).daily=today;suppressCloudSave=true;try{await save()}finally{suppressCloudSave=false}}
function updateScanUI(){
  if(!state)return;
  const note=$('#barcodeNote');
  if(note&&!note.hidden)note.textContent=nt('scanStatus');
  setBarcodeButtonState(scanning?'scanning':'idle');
  // Update other static scan labels
  const orMap={en:'or add without barcode',sv:'eller lägg till utan streckkod',es:'o añadir sin código de barras',tr:'ya da barkod olmadan ekle'};
  txt('#scanOrLabel',orMap[state.settings.language]||orMap.en);
  const camMap={en:'Camera',sv:'Kamera',es:'Cámara',tr:'Kamera'};
  const galMap={en:'Gallery',sv:'Galleri',es:'Galería',tr:'Galeri'};
  const camSubMap={en:'Take a photo',sv:'Ta en bild',es:'Hacer una foto',tr:'Fotoğraf çek'};
  const galSubMap={en:'Choose an image',sv:'Välj en bild',es:'Elegir una imagen',tr:'Görsel seç'};
  txt('#captureCamLabel',camMap[state.settings.language]||camMap.en);
  txt('#captureGalLabel',galMap[state.settings.language]||galMap.en);
  txt('#captureCamSub',camSubMap[state.settings.language]||camSubMap.en);
  txt('#captureGalSub',galSubMap[state.settings.language]||galSubMap.en);
}
function updateOnboardText(){if(!state)return;const step=i=>nt('onbStep').replace('%d',String(i)).replace('%d','4');txt('#onbWelcome',nt('onbWelcome'));txt('#onbLead',nt('onbLead'));txt('#onbLangTitle',nt('onbLangTitle'));txt('#onbLangHelp',nt('onbLangHelp'));txt('#onbTempTitle',nt('onbTempTitle'));txt('#onbTempHelp',nt('onbTempHelp'));txt('#onbWarnTitle',nt('onbWarnTitle'));txt('#onbWarnHelp',nt('onbWarnHelp'));txt('#onbNotifyTitle',nt('onbNotifyTitle'));txt('#onbNotifyHelp',nt('onbNotifyHelp'));txt('#onbNotifyLabel',nt('onbNotifyLabel'));for(let i=1;i<=4;i++)txt('#onbStep'+i,step(i));btn('#onbBack',nt('onbBack'));btn('#onbNext',nt('onbNext'));btn('#onbStart',nt('onbStart'))}
let onbStep=0,onb={language:null,temp:4,warn:3,notify:false};
function showOnbStep(i){onbStep=Math.max(0,Math.min(4,i));$$('#onboardingDialog .onboard-step').forEach((s,j)=>s.classList.toggle('active',j===onbStep));$('#onbBack').hidden=onbStep===0;$('#onbNext').hidden=onbStep===4;$('#onbStart').hidden=onbStep!==4;$$('.onboard-langs button').forEach(b=>b.classList.toggle('active',(onb.language||state.settings.language)===b.dataset.lang));$('#onbTempRange').value=onb.temp;$('#onbTempOut').textContent=onb.temp+'°C';$('#onbWarnRange').value=onb.warn;$('#onbWarnOut').textContent=`${onb.warn} ${onb.warn===1?t('day'):t('days')}`;$('#onbNotify').checked=onb.notify}
function initOnboarding(){const dlg=$('#onboardingDialog');if(!dlg||!state||state.settings.onboarded)return;onb={language:state.settings.language,temp:state.settings.temperature,warn:state.settings.warning,notify:state.settings.notify};updateOnboardText();showOnbStep(0);dlg.showModal()}
async function finishOnboarding(){if(onb.language)state.settings.language=onb.language;state.settings.temperature=onb.temp;state.settings.warning=onb.warn;state.settings.onboarded=true;if('Notification'in window&&onb.notify){try{const p=await Notification.requestPermission();state.settings.notify=p==='granted'}catch(e){state.settings.notify=false}}else{state.settings.notify=false}suppressCloudSave=true;try{await save()}finally{suppressCloudSave=false}$('#onboardingDialog').close();render();toast(nt('onbDone'));checkReminders()}
function bindOnboarding(){$$('.onboard-langs button').forEach(b=>b.onclick=()=>{onb.language=b.dataset.lang;state.settings.language=b.dataset.lang;updateOnboardText();applyLanguage();showOnbStep(onbStep)});const tr=$('#onbTempRange');if(tr)tr.oninput=e=>{onb.temp=+e.target.value;$('#onbTempOut').textContent=e.target.value+'°C'};const wr=$('#onbWarnRange');if(wr)wr.oninput=e=>{onb.warn=+e.target.value;$('#onbWarnOut').textContent=`${e.target.value} ${+e.target.value===1?t('day'):t('days')}`};$('#onbNotify')?.addEventListener('change',e=>{onb.notify=e.target.checked});$('#onbNext')?.addEventListener('click',()=>showOnbStep(onbStep+1));$('#onbBack')?.addEventListener('click',()=>showOnbStep(onbStep-1));$('#onbStart')?.addEventListener('click',finishOnboarding)}
function bindFeatures(){
  $$('.shop-tab').forEach(b=>b.onclick=()=>{
    shopTab=b.dataset.shopTab;
    $$('.shop-tab').forEach(x=>x.classList.toggle('active',x===b));
    const lv=$('#shopListView'),pv=$('#shopPlanView');
    if(lv)lv.hidden=shopTab!=='list';
    if(pv)pv.hidden=shopTab!=='plan';
    if(shopTab==='plan')renderPlan();
  });
  $('#barcodeButton')?.addEventListener('click',()=>{if(scanning)stopBarcodeScan();else startBarcodeScan()});
  $('#actorInput')?.addEventListener('change',e=>{state.settings.actor=e.target.value.trim().slice(0,20);save().then(()=>{renderActivity();toast(t('saved'))})});
  bindOnboarding();

  // Auto-start camera when scan view becomes active — REMOVED
  // User must tap the barcode button explicitly for a cleaner UX
}
const baseApplyLanguageFeatures=applyLanguage;
applyLanguage=function(){baseApplyLanguageFeatures();if(!state)return;txt('.activity-card .card-title .eyebrow',nt('activityEyebrow'));txt('.activity-card .card-title h2',nt('activityTitle'));txt('.activity-card .card-title>div>p:last-child',nt('activityLead'));$$('.shop-tab').forEach((e,i)=>e.textContent=[nt('listTab'),nt('planTab')][i]);txt('.plan-week-head',nt('planWeek'));txt('.plan-list-head',nt('planToBuy'));txt('#planHelp',nt('planDayPick'));btn('#planAddAll',nt('planAddAll'));renderActivity();renderPlan();updateScanUI()};

/* =====================================================================
   FEATURE 3: OCR — read best-before date from photo using Tesseract.js
   ===================================================================== */
let tesseractReady = false;
const TESSERACT_CDN = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';

// Parse expiry_date field from Open Food Facts (formats: MM/YYYY, YYYY-MM-DD, DD/MM/YYYY etc.)
function parseOFFDate(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  // Try ISO: YYYY-MM-DD
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) {
    const d = new Date(`${m[1]}-${m[2]}-${m[3]}T12:00:00`);
    if (!isNaN(d) && d > new Date()) return iso(d);
  }
  // MM/YYYY or MM-YYYY → last day of that month
  m = s.match(/^(\d{2})[\/\-](\d{4})$/);
  if (m) {
    const d = new Date(parseInt(m[2]), parseInt(m[1]), 0); // day 0 = last day of prev month
    if (!isNaN(d) && d > new Date()) return iso(d);
  }
  // DD/MM/YYYY
  m = s.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/);
  if (m) {
    const d = new Date(`${m[3]}-${m[2]}-${m[1]}T12:00:00`);
    if (!isNaN(d) && d > new Date()) return iso(d);
  }
  return null;
}

// Run OCR automatically inside the open item form — shows spinner, fills expiry on success
async function autoOCRInForm(imageSource) {
  if (!$('#itemDialog')?.open) return;
  // Only run for 'printed' date mode
  const modeEl = $('input[name=dateMode]:checked');
  if (modeEl && modeEl.value !== 'printed') return;

  const ocrBtn = $('#ocrDateBtn');
  if (ocrBtn) ocrBtn.disabled = true;
  setOcrStatus('loading', t('ocrReading') || 'Reading date from photo…');

  const loaded = await loadTesseract();
  if (!loaded) {
    setOcrStatus('error', t('ocrFailed') || 'Could not load OCR — enter date manually.');
    if (ocrBtn) ocrBtn.disabled = false;
    return;
  }
  try {
    const worker = await window.Tesseract.createWorker('eng', 1, {
      logger: () => {},
      workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
      corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-simd-lstm.wasm.js',
    });
    await worker.setParameters({ tessedit_char_whitelist: '0123456789/-. JANFEBMRPYULGOSTCOVD' });
    const { data: { text } } = await worker.recognize(imageSource);
    await worker.terminate();
    const found = parseDateFromOCR(text);
    if (found && $('#itemDialog')?.open) {
      $('#expiryDate').value = found;
      setOcrStatus('success', `${t('ocrFound') || 'Date found:'} ${found}`);
    } else if ($('#itemDialog')?.open) {
      setOcrStatus('error', t('ocrNotFound') || 'No date found — enter manually.');
    }
  } catch(err) {
    if ($('#itemDialog')?.open) setOcrStatus('error', t('ocrFailed') || 'OCR failed — enter manually.');
  }
  if ($('#ocrDateBtn')) $('#ocrDateBtn').disabled = false;
}

async function loadTesseract() {
  if (window.Tesseract) return true;
  return new Promise(res => {
    const s = document.createElement('script');
    s.src = TESSERACT_CDN;
    s.onload = () => { tesseractReady = true; res(true); };
    s.onerror = () => res(false);
    document.head.appendChild(s);
  });
}

// Extract date strings from OCR text — supports common formats: DD/MM/YYYY, MM/YYYY, YYYY-MM-DD, etc.
function parseDateFromOCR(text) {
  const cleaned = text.replace(/\s+/g, ' ').toUpperCase();
  const patterns = [
    // YYYY-MM-DD
    { re: /(\d{4})[-.](\d{2})[-.](\d{2})/, fn: m => `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}` },
    // DD/MM/YYYY or DD-MM-YYYY
    { re: /(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/, fn: m => `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}` },
    // DD/MM/YY or DD-MM-YY
    { re: /(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2})(?!\d)/, fn: m => { const y = parseInt(m[3]); const full = y < 50 ? 2000+y : 1900+y; return `${full}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`; } },
    // MM/YYYY — use last day of month
    { re: /(\d{1,2})[\/\-](\d{4})/, fn: m => { const d = new Date(parseInt(m[2]), parseInt(m[1]), 0); return iso(d); } },
  ];
  const candidates = [];
  for (const { re, fn } of patterns) {
    const m = cleaned.match(re);
    if (m) {
      try {
        const dateStr = fn(m);
        const d = new Date(dateStr + 'T12:00:00');
        if (!isNaN(d) && d.getFullYear() >= 2020 && d.getFullYear() <= 2035) {
          candidates.push({ dateStr, ts: d.getTime() });
        }
      } catch {}
    }
  }
  if (!candidates.length) return null;
  // Pick the date furthest in the future (most likely best-before)
  candidates.sort((a, b) => b.ts - a.ts);
  return candidates[0].dateStr;
}

async function runOCR() {
  if (!pendingPhoto) {
    setOcrStatus('error', t('ocrNoPhoto') || 'Add a photo first.');
    return;
  }
  await autoOCRInForm(pendingPhoto);
}

function setOcrStatus(type, message) {
  const el = $('#ocrStatus');
  if (!el) return;
  el.hidden = false;
  el.className = `ocr-status ${type}`;
  el.innerHTML = type === 'loading'
    ? `<span class="ocr-spinner"></span><span>${esc(message)}</span>`
    : `<span>${esc(message)}</span>`;
}

/* =====================================================================
   FEATURE 4: Web Push via VAPID + Firebase Messaging (optional)
   We use the existing Notification API but add proper VAPID subscribe
   so the SW can receive push events even when app is closed.
   ===================================================================== */
// VAPID public key — can be replaced with a real key from Firebase console
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjZJXfpTX1B9UuJKzPhQvWdC1-Bro';

async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return null;
  try {
    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if (existing) return existing;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    return sub;
  } catch (e) {
    console.warn('Push subscribe:', e);
    return null;
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

// Override requestNotifications to also set up push subscription
const _origRequestNotifications = requestNotifications;
async function requestNotificationsWithPush() {
  await _origRequestNotifications();
  if (state?.settings?.notify && Notification.permission === 'granted') {
    await subscribeToPush();
  }
}

/* =====================================================================
   FEATURE 5: Drag-to-move — long-press on item card opens location picker
   ===================================================================== */
let dragItemId = null;
let longPressTimer = null;

function initDragToMove() {
  // Delegated: listen on inventoryGrid and eatFirst
  ['#inventoryGrid', '#eatFirst', '#inventoryMount'].forEach(sel => {
    const el = $(sel);
    if (!el) return;
    el.addEventListener('pointerdown', onItemPointerDown);
    el.addEventListener('pointerup', onItemPointerUp);
    el.addEventListener('pointermove', onItemPointerMove);
    el.addEventListener('pointercancel', cancelLongPress);
  });

  // Drag overlay zone clicks
  $$('.drag-zone').forEach(zone => {
    zone.addEventListener('click', () => {
      const loc = zone.dataset.loc;
      if (dragItemId) applyDragMove(loc);
    });
  });
  $('#dragCancel')?.addEventListener('click', closeDragOverlay);
}

function onItemPointerDown(e) {
  const card = e.target.closest('[data-item]');
  if (!card) return;
  dragItemId = card.dataset.item;
  longPressTimer = setTimeout(() => {
    card.classList.add('dragging');
    openDragOverlay();
  }, 500);
}

function onItemPointerUp() {
  cancelLongPress();
}

function onItemPointerMove(e) {
  // Cancel long press if finger moves more than ~10px
  cancelLongPress();
}

function cancelLongPress() {
  clearTimeout(longPressTimer);
  longPressTimer = null;
  $$('.item-card.dragging, .priority-card.dragging').forEach(c => c.classList.remove('dragging'));
}

function openDragOverlay() {
  const overlay = $('#dragOverlay');
  if (!overlay) return;
  // Update labels from current language
  const v = V[state.settings.language] || V.en;
  txt('#dragOverlayLabel', t('dragOverlayLabel') || 'Move to shelf');
  txt('#dzTopLabel', v.locations.top);
  txt('#dzMiddleLabel', v.locations.middle);
  txt('#dzDoorLabel', v.locations.door);
  txt('#dzCrisperLabel', v.locations.crisper);
  // Highlight current location
  const item = state.items.find(x => x.id === dragItemId);
  $$('.drag-zone').forEach(z => z.classList.toggle('drag-over', item && z.dataset.loc === item.location));
  overlay.hidden = false;
}

function closeDragOverlay() {
  $('#dragOverlay').hidden = true;
  dragItemId = null;
  cancelLongPress();
}

async function applyDragMove(newLocation) {
  const item = state.items.find(x => x.id === dragItemId);
  if (item && item.location !== newLocation) {
    item.location = newLocation;
    markDirty([item.id]);
    logActivity('edited', item.name);
    await save();
    render();
    const v = V[state.settings.language] || V.en;
    toast(`${item.name} → ${v.locations[newLocation]}`);
  }
  closeDragOverlay();
}

/* =====================================================================
   FEATURE 6: Statistics view — SVG bar chart + category breakdown
   ===================================================================== */
let statsPeriod = 'weeks'; // 'weeks' | 'months'

function renderStatsView() {
  if (!state) return;
  const L = state.settings.language;
  const log = state.stats?.log || [];

  // --- Totals ---
  const totalUsed = log.filter(x => x.kind === 'used').length;
  const totalWasted = log.filter(x => x.kind === 'wasted').length;
  const saveRate = (totalUsed + totalWasted) > 0
    ? Math.round(totalUsed / (totalUsed + totalWasted) * 100) + '%'
    : '—';
  txt('#statsTotalUsed', totalUsed);
  txt('#statsTotalWasted', totalWasted);
  txt('#statsSaveRate', saveRate);

  // --- Period labels ---
  const periodLabels = {
    en: { weeks: 'Last 8 weeks', months: 'Last 6 months', used: 'Used', wasted: 'Wasted', itemsUsed: 'items used', itemsWasted: 'items wasted', saveRate: 'save rate', mostWasted: 'Most wasted', byCategory: 'By category', stats: 'Statistics', statsLead: 'Track what you use and what gets wasted.', statsEyebrow: 'Food overview' },
    sv: { weeks: 'Senaste 8 veckorna', months: 'Senaste 6 månaderna', used: 'Använda', wasted: 'Slängda', itemsUsed: 'använda varor', itemsWasted: 'slängda varor', saveRate: 'räddningsgrad', mostWasted: 'Mest slängt', byCategory: 'Per kategori', stats: 'Statistik', statsLead: 'Håll koll på vad du använder och kastar.', statsEyebrow: 'Matöversikt' },
    es: { weeks: 'Últimas 8 semanas', months: 'Últimos 6 meses', used: 'Usados', wasted: 'Tirados', itemsUsed: 'usados', itemsWasted: 'tirados', saveRate: 'tasa de aprovechamiento', mostWasted: 'Más desechado', byCategory: 'Por categoría', stats: 'Estadísticas', statsLead: 'Controla lo que usas y lo que tiras.', statsEyebrow: 'Resumen de alimentos' },
    tr: { weeks: 'Son 8 hafta', months: 'Son 6 ay', used: 'Kullanılan', wasted: 'Atılan', itemsUsed: 'kullanılan', itemsWasted: 'atılan', saveRate: 'kurtarma oranı', mostWasted: 'En çok atılan', byCategory: 'Kategoriye göre', stats: 'İstatistikler', statsLead: 'Ne kullandığını ve ne attığını takip et.', statsEyebrow: 'Gıda özeti' }
  };
  const PL = periodLabels[L] || periodLabels.en;
  txt('#statsEyebrow', PL.statsEyebrow);
  txt('#statsTitle', PL.stats);
  txt('#statsLead', PL.statsLead);
  txt('#statsTotalUsedLabel', PL.itemsUsed);
  txt('#statsTotalWastedLabel', PL.itemsWasted);
  txt('#statsSaveRateLabel', PL.saveRate);
  txt('#statsLegendUsed', PL.used);
  txt('#statsLegendWasted', PL.wasted);
  txt('#statsCatTitle', PL.mostWasted);
  txt('#statsCatEyebrow', PL.byCategory);
  txt('#statsPeriodWeeks', PL.weeks.split(' ').slice(0,2).join(' '));
  txt('#statsPeriodMonths', PL.months.split(' ').slice(0,2).join(' '));
  txt('#statsRangeLabel', statsPeriod === 'weeks' ? PL.weeks : PL.months);

  // --- Build chart data ---
  const buckets = buildStatsBuckets(log, statsPeriod);
  drawStatsChart(buckets, PL);

  // --- Category breakdown ---
  const catWasted = {};
  log.filter(x => x.kind === 'wasted').forEach(x => {
    // Try to match item category by name lookup
    const cat = guessCategoryFromName(x.name);
    catWasted[cat] = (catWasted[cat] || 0) + 1;
  });
  const catEntries = Object.entries(catWasted).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxCat = catEntries.length ? catEntries[0][1] : 1;
  const cats = t('categories');
  $('#statsCategoryList').innerHTML = catEntries.length
    ? catEntries.map(([cat, count]) => `
      <div class="stats-cat-row">
        <div>
          <div class="stats-cat-name">${esc(cats[parseInt(cat)] || cat)}</div>
          <div class="stats-cat-bar-wrap"><div class="stats-cat-bar" style="width:${Math.round(count/maxCat*100)}%"></div></div>
        </div>
        <div class="stats-cat-count">${count}</div>
      </div>`).join('')
    : `<p class="shop-empty" style="margin:14px 0">${esc(t('ideasEmpty'))}</p>`;
}

function guessCategoryFromName(name) {
  const n = String(name || '').toLowerCase();
  if (/vegetab|tomato|tomat|broccoli|salad|gurka|morot|paprika|lök|onion|carrot|cucumber|pepper/i.test(n)) return '0';
  if (/fruit|berry|apple|äpple|jordgubb|strawberr|citrus|banana|manzana|elma/i.test(n)) return '1';
  if (/milk|mjölk|egg|ägg|yogurt|cheese|ost|cream|grädde|dairy/i.test(n)) return '2';
  if (/drink|juice|vatten|water|öl|beer|wine|vin/i.test(n)) return '3';
  if (/sauce|ketchup|mustard|mayonnaise|dressing|sås/i.test(n)) return '4';
  if (/leftover|rest|soppa|soup|pasta/i.test(n)) return '5';
  return '6';
}

function buildStatsBuckets(log, period) {
  const now = new Date();
  const buckets = [];
  const count = period === 'weeks' ? 8 : 6;
  for (let i = count - 1; i >= 0; i--) {
    let start, end, label;
    if (period === 'weeks') {
      end = new Date(now);
      end.setDate(now.getDate() - i * 7);
      start = new Date(end);
      start.setDate(end.getDate() - 7);
      const fmt = new Intl.DateTimeFormat(locale[state.settings.language] || 'en-GB', { month: 'short', day: 'numeric' });
      label = fmt.format(start);
    } else {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      start = d;
      end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      label = new Intl.DateTimeFormat(locale[state.settings.language] || 'en-GB', { month: 'short' }).format(d);
    }
    const used = log.filter(x => x.kind === 'used' && inRange(x.d, start, end)).length;
    const wasted = log.filter(x => x.kind === 'wasted' && inRange(x.d, start, end)).length;
    buckets.push({ label, used, wasted });
  }
  return buckets;
}

function inRange(dateStr, start, end) {
  const d = new Date(dateStr + 'T12:00:00');
  return d >= start && d < end;
}

function drawStatsChart(buckets, PL) {
  const svg = $('#statsChart');
  if (!svg) return;
  const W = svg.parentElement?.offsetWidth || 400;
  const H = 180;
  const padL = 28, padR = 8, padT = 10, padB = 34;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = buckets.length;
  const barW = Math.max(4, (chartW / n) * 0.36);
  const gap = chartW / n;
  const maxVal = Math.max(1, ...buckets.map(b => b.used + b.wasted));

  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);

  let html = '';
  // Y grid lines
  for (let v of [0, Math.ceil(maxVal / 2), maxVal]) {
    const y = padT + chartH - (v / maxVal) * chartH;
    html += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`;
    html += `<text class="chart-label" x="${padL - 4}" y="${y + 3}" text-anchor="end">${v}</text>`;
  }
  // Bars
  buckets.forEach((b, i) => {
    const x = padL + i * gap + gap / 2;
    const usedH = (b.used / maxVal) * chartH;
    const wastedH = (b.wasted / maxVal) * chartH;
    const usedY = padT + chartH - usedH;
    const wastedY = padT + chartH - wastedH;
    // tooltip via title
    html += `<rect class="chart-bar-used" x="${x - barW - 1}" y="${usedY}" width="${barW}" height="${Math.max(2, usedH)}" rx="3"><title>${PL.used}: ${b.used}</title></rect>`;
    html += `<rect class="chart-bar-wasted" x="${x + 1}" y="${wastedY}" width="${barW}" height="${Math.max(2, wastedH)}" rx="3"><title>${PL.wasted}: ${b.wasted}</title></rect>`;
    // Label every other bucket to avoid crowding
    if (i % 2 === 0 || n <= 4) {
      html += `<text class="chart-label" x="${x}" y="${H - padB + 14}" text-anchor="middle">${esc(b.label)}</text>`;
    }
  });
  svg.innerHTML = html;
}

/* =====================================================================
   FEATURE 8: Shared shopping list via Firestore (handled in cloud-sync.js)
   App-side: emit shopping changes to cloud bridge
   ===================================================================== */
// Override shopAdd/shopToggle/shopDel to also notify cloud after save
const _origShopAdd = shopAdd;
function shopAddWithCloud(name, quantity = '') {
  _origShopAdd(name, quantity);
  // cloud-sync picks up via queueState which already runs on save()
}

// Hook: after save(), cloud-sync will push entire state including shopping
// The cloud-sync.js update will handle syncing shopping in remotePayload

/* =====================================================================
   Wire up new features into init flow
   ===================================================================== */
function initNewFeatures() {
  // Feature 3: OCR button
  $('#ocrDateBtn')?.addEventListener('click', () => {
    if (!pendingPhoto) { toast(t('ocrNoPhoto') || 'Take a photo first.'); return; }
    runOCR();
  });

  // Feature 4: override notification button to also subscribe push
  const origClick = $('#notificationButton')?.onclick;
  if ($('#notificationButton')) {
    $('#notificationButton').onclick = requestNotificationsWithPush;
  }

  // Feature 5: drag-to-move
  initDragToMove();
  // Re-init drag listeners when inventory re-renders (delegated on static parents so this is fine)

  // Feature 6: stats period toggle
  $('#statsPeriodWeeks')?.addEventListener('click', () => {
    statsPeriod = 'weeks';
    $$('.stats-period-toggle .filter').forEach(b => b.classList.toggle('active', b.dataset.period === 'weeks'));
    renderStatsView();
  });
  $('#statsPeriodMonths')?.addEventListener('click', () => {
    statsPeriod = 'months';
    $$('.stats-period-toggle .filter').forEach(b => b.classList.toggle('active', b.dataset.period === 'months'));
    renderStatsView();
  });

  // Render stats when navigating to stats view (delegate on all [data-view="stats"] buttons)
  document.querySelectorAll('[data-view="stats"]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(renderStatsView, 50));
  });

  // OCR i18n labels
  const ocrLabelMap = { en: 'Read date from photo', sv: 'Läs datum från bild', es: 'Leer fecha de la foto', tr: 'Fotoğraftan tarihi oku' };
  if ($('#ocrDateLabel')) {
    const updateOcrLabel = () => txt('#ocrDateLabel', ocrLabelMap[state?.settings?.language] || ocrLabelMap.en);
    updateOcrLabel();
    document.addEventListener('svalna:langchange', updateOcrLabel);
  }
}

// Patch switchView to render stats when navigating there
const _origSwitchView = switchView;
// Use event delegation instead — stats rendering triggered on nav click

init().then(() => {
  window.SvalnaCloud?.init?.(window.SvalnaBridge);
  initNewFeatures();
}).catch(console.error);
})();

