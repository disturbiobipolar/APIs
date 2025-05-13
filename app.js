document.addEventListener('DOMContentLoaded', () => {

    const map = L.map('map').setView([50.0, 15.0], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);


    const markersLayer = L.layerGroup().addTo(map);

    const sitesList = document.getElementById('sites-list');
    
    archaeologicalSites.forEach(site => {

       const marker = L.marker([site.latitude, site.longitude])
            .bindPopup(`
                <h3>${site.name}</h3>
                <p>${site.description}</p>
                ${site.image ? `<img src="${site.image}" alt="${site.name}">` : ''}
            `);
        
        markersLayer.addLayer(marker);

        const siteItem = document.createElement('div');
        siteItem.className = 'site-item';
        siteItem.innerHTML = site.name;
        siteItem.addEventListener('click', () => {
            map.flyTo([site.latitude, site.longitude], 14);
            marker.openPopup();
        });
        sitesList.appendChild(siteItem);
    });
});