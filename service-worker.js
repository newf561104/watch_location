self.addEventListener('install', () => {
  console.log('Service Workerがインストールされました');
});

self.addEventListener('activate', () => {
  console.log('Service Workerがアクティブです');
});

self.addEventListener('message', (event) => {
  const location = event.data;
  console.log('Service Workerが位置情報を受信:', location);

  // ローカルストレージに保存（バックグラウンド同期の代替処理）
  self.registration.sync.register('sync-locations');
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-locations') {
    console.log('バックグラウンド同期イベント発生');
    // 保存されたデータをサーバーに送信したり処理を行う
  }
});
