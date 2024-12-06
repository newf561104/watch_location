// Service Worker登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Workerが登録されました'))
    .catch(error => console.error('Service Workerの登録に失敗:', error));
}

// 位置情報追跡の開始
let watchId = null;
document.getElementById('start-tracking').addEventListener('click', () => {
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        };

        // Service Workerに位置情報を送信
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(data);
        }
      },
      (error) => console.error('位置情報の取得に失敗:', error),
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    console.error('Geolocationはサポートされていません');
  }
});

// 位置情報追跡の停止
document.getElementById('stop-tracking').addEventListener('click', () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    console.log('追跡を停止しました');
  }
});
