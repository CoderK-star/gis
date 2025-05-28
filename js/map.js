function init() {
	// マップの初期化
	map = new maplibregl.Map({
		container: 'map', // mapコンテナのID
		style: {
			version: 8,
			sources: {
				// Google Satelliteのソース定義
				'google-satellite': {
					'type': 'raster',
					'tiles': [
						'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
					],
					'tileSize': 256
				}
			},
			// 表示するレイヤーの定義
			layers: [{
				'id': 'google-satellite',
				'type': 'raster',
				'source': 'google-satellite'
			}]
		},
		// 初期表示の中心座標
		center: [139.95326754978768,35.83203473511656],
		// 初期のズームレベル
		zoom: 16
	});

	// 全てのマーカーを格納する配列
	const allMarkers = [];
	// マーカー全体を囲む境界を計算するためのオブジェクト
	const bounds = new maplibregl.LngLatBounds();

	// mapdata配列の各要素に対して処理を実行
	mapdata.forEach(function(d) {
		// マーカーを作成し、地図に追加
		var marker = new maplibregl.Marker()
			// マーカーの緯度経度を設定
			.setLngLat([d.lon, d.lat])
			// マップにマーカーを追加
			.addTo(map);
		// 作成したマーカーを配列に追加
		allMarkers.push(marker);
		// マーカーの位置を境界に追加
		bounds.extend([d.lon, d.lat]);

		// ポップアップを作成
		// ポップアップのオフセットを設定
		var popup = new maplibregl.Popup({ offset: 25 })
			// ポップアップのHTMLコンテンツを設定
			.setHTML('<h3>' + d.title + '</h3>' +
				'<h4>Organizer: ' + d.organizer + '</h4>' +
				'<p>' + d.explanation + '</p>');

		// マーカーにポップアップを設定
		marker.setPopup(popup);
	});

	// マーカーが1つ以上存在する場合、地図の表示範囲を調整
	if (allMarkers.length > 0) {
		// 全てのマーカーが表示されるように地図の範囲を調整（パディング付き）
		map.fitBounds(bounds, { padding: 50 });
	}
}

