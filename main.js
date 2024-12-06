let watchId = null;
let locationLog = [];

// ログを表示
function updateLogDisplay() {
  const logContainer = document.getElementById('log');
  const now = new Date()
  logContainer.innerHTML = locationLog
    .map((loc, idx) => `#${idx + 1}: 時刻 ${now.toISOString()}, 緯度 ${loc.latitude.toPrecision(5)}, 経度 ${loc.longitude.toPrecision(5)}`)
    .join('<br>');
}

// サービスワーカー登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Workerが登録されました'))
    .catch((err) => console.error('Service Worker登録エラー:', err));
}

// 追跡開始
document.getElementById('start-tracking').addEventListener('click', () => {
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        };
        locationLog.push(data);
        updateLogDisplay();

        // サービスワーカーへ送信
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(data);
        }
      },
      (error) => console.error('位置情報取得エラー:', error),
      { enableHighAccuracy: true }
    );
  } else {
    console.error('Geolocation APIはサポートされていません');
  }
});

// 追跡停止
document.getElementById('stop-tracking').addEventListener('click', () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    console.log('追跡を停止しました');
  }
});
