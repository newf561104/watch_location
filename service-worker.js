self.addEventListener('install', (event) => {
    console.log('Service Workerがインストールされました');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Workerがアクティブになりました');
  });
  
  self.addEventListener('message', (event) => {
    const locationData = event.data;
    console.log('位置情報データを受信:', locationData);
  
    // データをサーバーに送信する例
    fetch('/save-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    })
      .then((response) => console.log('サーバーに送信完了:', response))
      .catch((error) => console.error('サーバーへの送信に失敗:', error));
  });
  