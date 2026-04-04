<script>
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
        // ART DATA
    const artPieces = [
      { src: "art1.jpg", tag: "digital" },
      { src: "art2.jpg", tag: "sketch" },
      { src: "art3.jpg", tag: "3d" },
      { src: "art4.jpg", tag: "digital" },
      { src: "art5.jpg", tag: "sketch" }
    ];

    const artGrid = document.getElementById('artGrid');

    function renderArt(list){
      artGrid.innerHTML = '';
      list.forEach(a => {
        const el = document.createElement('div');
        el.className = 'art-card fade-in';
        el.innerHTML = `<img class="art-thumb" src="${a.src}" alt="Artwork">`;
        el.addEventListener('click', () => openLightbox(a.src));
        artGrid.appendChild(el);
      });
    }
    renderArt(artPieces);

    // ART FILTERS
    const artChips = Array.from(document.querySelectorAll('#artFilters .chip'));
    artChips.forEach(chip => {
      chip.addEventListener('click', () => {
        artChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.dataset.filter;
        if(f === 'all') return renderArt(artPieces);
        renderArt(artPieces.filter(a => a.tag === f));
      });
    });

    // LIGHTBOX
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    function openLightbox(src){
      lightboxImg.src = src;
      lightbox.classList.remove('hidden');
    }

    lightbox.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });

</script>
