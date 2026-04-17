let phase2StylesInjected = false;

function injectPhase2Styles() {
    if (phase2StylesInjected) return;
    phase2StylesInjected = true;

    const style = document.createElement('style');
    style.textContent = `
        .phase2-overlay {
            position: fixed;
            inset: 0;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .phase2-overlay.active {
            opacity: 1;
            pointer-events: all;
        }

        /* ── video layout ── */
        .phase2-video-wrap {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 3rem 2rem 0;
            min-height: 0;
        }
        .phase2-video-wrap video {
            max-width: 100%;
            max-height: calc(100vh - 6rem);
            width: auto;
            height: auto;
            display: block;
            border: none;
            outline: none;
            background: transparent;
        }

        /* ── grid-hover layout ── */
        .phase2-grid-wrap {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0.5rem 0;
            min-height: 0;
            box-sizing: border-box;
            position: relative;
            z-index: 0;
        }
        .phase2-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            width: 100%;
            max-width: min(95vw, calc((100vh - 5.5rem) * 4 / 3));
        }
        .phase2-grid-item {
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        .phase2-grid-item img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* in-cell reveal image */
        .phase2-grid-item .reveal-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 0.15s ease;
            pointer-events: none;
        }
        .phase2-grid-item:hover .reveal-img,
        .phase2-grid-item.active .reveal-img {
            opacity: 1;
        }

        /* ── shared title & close ── */
        .phase2-title {
            width: 100%;
            text-align: center;
            padding: 1.25rem 1rem 1.5rem;
            font-family: "parabolica", sans-serif;
            font-size: clamp(1rem, 3vw, 1.5rem);
            font-weight: 400;
            letter-spacing: 0.04em;
            flex-shrink: 0;
            position: relative;
            z-index: 3;
        }
        .phase2-close {
            position: absolute;
            top: 1rem;
            right: 1.25rem;
            background: none;
            border: none;
            font-family: "parabolica", sans-serif;
            font-size: 2rem;
            line-height: 1;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            color: inherit;
            opacity: 0.6;
            transition: opacity 0.15s;
            z-index: 3;
        }
        .phase2-close:hover {
            opacity: 1;
        }

        /* ── lightbox ── */
        .phase2-lightbox {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 10000;
            background: lightpink;
            align-items: center;
            justify-content: center;
        }
        .phase2-lightbox.active {
            display: flex;
        }
        .phase2-lightbox img {
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
            display: block;
        }
        .phase2-lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1.25rem;
            background: none;
            border: none;
            font-family: "parabolica", sans-serif;
            font-size: 2rem;
            line-height: 1;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            color: inherit;
            opacity: 0.6;
            transition: opacity 0.15s;
            z-index: 10001;
        }
        .phase2-lightbox-close:hover {
            opacity: 1;
        }

        /* ── split-lightbox layout ── */
        .phase2-split-wrap {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 4rem 2rem 1rem;
            min-height: 0;
            box-sizing: border-box;
        }
        .phase2-split-inner {
            display: flex;
            gap: 4rem;
            width: 100%;
            max-width: 1200px;
            align-items: center;
        }
        .phase2-split-half {
            flex: 1;
            display: flex;
            gap: 0.4rem;
            min-width: 0;
        }
        .phase2-split-half img {
            flex: 1;
            min-width: 0;
            width: 0;
            height: auto;
            cursor: pointer;
            display: block;
            object-fit: cover;
            transition: transform 0.12s border-color 0.12s;
            border: 1px solid #fff;
        }
        .phase2-split-half img:hover {
            border: 1px solid #000;
        }

        /* nav-lightbox: white bg, arrow keys */
        .phase2-nav-lightbox {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 20000;
            background: #fff;
            align-items: center;
            justify-content: center;
        }
        .phase2-nav-lightbox.active {
            display: flex;
        }
        .phase2-nav-lightbox img {
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
            display: block;
        }
        .phase2-nav-lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1.25rem;
            background: none;
            border: none;
            font-family: "parabolica", sans-serif;
            font-size: 2rem;
            line-height: 1;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            color: #000;
            opacity: 0.5;
            transition: opacity 0.15s;
            z-index: 20001;
        }
        .phase2-nav-lightbox-close:hover { opacity: 1; }
        .phase2-nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-family: "parabolica", sans-serif;
            font-size: 2rem;
            line-height: 1;
            cursor: pointer;
            padding: 0.5rem 1rem;
            color: #000;
            opacity: 0.4;
            transition: opacity 0.15s;
            z-index: 20001;
        }
        .phase2-nav-arrow:hover { opacity: 0.9; }
        .phase2-nav-arrow.prev { left: 0.5rem; }
        .phase2-nav-arrow.next { right: 0.5rem; }

        @media (max-width: 700px) {
            .phase2-split-wrap {
                padding: 4rem 1rem 0.5rem;
                align-items: flex-start;
                overflow-y: auto;
                padding-top: 10rem;
            }
            .phase2-split-inner {
                flex-direction: column;
                gap: 0.4rem;
            }
            .phase2-split-half {
                width: 100%;
            }
        }

        @media (max-width: 700px) {
            .phase2-video-wrap {
                padding: 3.5rem 1rem 0;
            }
            .phase2-video-wrap video {
                max-height: calc(100vh - 5rem);
            }
            .phase2-grid-wrap {
                padding: 3.5rem 1rem 0;
            }
            .phase2-grid {
                max-width: 100vw;
                gap: 3px;
            }
            .phase2-title {
                padding: 1rem 1rem 1.25rem;
            }
        }

        /* ── mixed-grid layout (Dominic) ── */
        .phase2-mixed-grid-wrap {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 4rem 1.5rem 1rem;
            min-height: 0;
            box-sizing: border-box;
            overflow-y: auto;
        }
        .phase2-mixed-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 0.35rem;
            width: 100%;
            max-width: min(95vw, calc((100vh - 7rem) * 5 / 2));
        }
        .phase2-mixed-grid-item {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            aspect-ratio: 1;
            background: #111;
        }
        .phase2-mixed-grid-item img,
        .phase2-mixed-grid-item video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .phase2-mixed-grid-item:hover::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.08);
            pointer-events: none;
        }

        /* ── mixed-nav-lightbox ── */
        .phase2-mixed-lightbox {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 20000;
            background: #000;
            align-items: center;
            justify-content: center;
        }
        .phase2-mixed-lightbox.active {
            display: flex;
        }
        .phase2-mixed-lightbox img,
        .phase2-mixed-lightbox video {
            max-width: 90vw;
            max-height: 85vh;
            object-fit: contain;
            display: block;
        }
        .phase2-mixed-lightbox video {
            background: #000;
        }
        .phase2-mixed-lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1.25rem;
            background: none;
            border: none;
            font-family: "parabolica", sans-serif;
            font-size: 2rem;
            line-height: 1;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            color: #fff;
            opacity: 0.5;
            transition: opacity 0.15s;
            z-index: 20001;
        }
        .phase2-mixed-lightbox-close:hover { opacity: 1; }
        .phase2-mixed-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-family: "parabolica", sans-serif;
            font-size: 2.5rem;
            line-height: 1;
            cursor: pointer;
            padding: 0.5rem 1rem;
            color: #fff;
            opacity: 0.35;
            transition: opacity 0.15s;
            z-index: 20001;
        }
        .phase2-mixed-arrow:hover { opacity: 0.9; }
        .phase2-mixed-arrow.prev { left: 0.5rem; }
        .phase2-mixed-arrow.next { right: 0.5rem; }
        .phase2-mixed-playpause {
            position: absolute;
            bottom: 1.5rem;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #fff;
            font-size: 1.2rem;
            opacity: 0;
            transition: opacity 0.15s, background 0.15s;
            z-index: 20001;
            pointer-events: none;
        }
        .phase2-mixed-playpause.visible {
            opacity: 0.7;
            pointer-events: all;
        }
        .phase2-mixed-playpause:hover { opacity: 1; background: rgba(255,255,255,0.25); }

        @media (max-width: 700px) {
            .phase2-mixed-grid-wrap {
                padding: 4.5rem 0.75rem 0.5rem;
                align-items: flex-start;
            }
            .phase2-mixed-grid {
                grid-template-columns: repeat(2, 1fr);
                max-width: 100%;
                gap: 0.25rem;
            }
        }
    `;
    document.head.appendChild(style);
}

function buildPhase2Overlay(cfg) {
    injectPhase2Styles();

    const overlay = document.createElement('div');
    overlay.className = 'phase2-overlay';
    overlay.style.background = cfg.bgColor || '#fff';
    if (cfg.closeColor) overlay.style.color = cfg.closeColor;

    let videoEl = null;

    if (cfg.type === 'video') {
        const wrap = document.createElement('div');
        wrap.className = 'phase2-video-wrap';

        videoEl = document.createElement('video');
        videoEl.src = cfg.src;
        videoEl.loop = true;
        videoEl.playsInline = true;
        videoEl.controls = false;
        videoEl.preload = 'metadata';

        wrap.appendChild(videoEl);
        overlay.appendChild(wrap);

    } else if (cfg.type === 'grid-hover') {
        const wrap = document.createElement('div');
        wrap.className = 'phase2-grid-wrap';

        const grid = document.createElement('div');
        grid.className = 'phase2-grid';

        // lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'phase2-lightbox';
        const lightboxImg = document.createElement('img');
        lightboxImg.alt = '';
        const lightboxClose = document.createElement('button');
        lightboxClose.className = 'phase2-lightbox-close';
        lightboxClose.setAttribute('aria-label', 'Close');
        lightboxClose.textContent = '×';
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(lightboxClose);

        function openLightbox(imgSrc) {
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        }
        function closeLightbox() {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
        }

        lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

        document.body.appendChild(lightbox);

        cfg.items.forEach(({ src, reveal, rotate }) => {
            const item = document.createElement('div');
            item.className = 'phase2-grid-item';

            const imgBase = document.createElement('img');
            imgBase.src = src;
            imgBase.alt = '';
            imgBase.loading = 'lazy';

            const imgReveal = document.createElement('img');
            imgReveal.src = reveal;
            imgReveal.alt = '';
            imgReveal.loading = 'lazy';
            imgReveal.className = 'reveal-img';
            if (rotate) imgReveal.style.transform = `rotate(${rotate}deg)`;

            item.appendChild(imgBase);
            item.appendChild(imgReveal);

            item.addEventListener('click', () => openLightbox(src));

            item.addEventListener('touchstart', (e) => {
                e.preventDefault();
                item.classList.add('active');
            }, { passive: false });
            item.addEventListener('touchend', () => {
                item.classList.remove('active');
                openLightbox(src);
            });
            item.addEventListener('touchcancel', () => item.classList.remove('active'));

            grid.appendChild(item);
        });

        wrap.appendChild(grid);
        overlay.appendChild(wrap);

    } else if (cfg.type === 'split-lightbox') {
        const wrap = document.createElement('div');
        wrap.className = 'phase2-split-wrap';

        const inner = document.createElement('div');
        inner.className = 'phase2-split-inner';

        const allSrcs = cfg.items.map(i => i.src);
        let currentIndex = 0;

        // nav lightbox
        const navLightbox = document.createElement('div');
        navLightbox.className = 'phase2-nav-lightbox';

        const navImg = document.createElement('img');
        navImg.alt = '';

        const navClose = document.createElement('button');
        navClose.className = 'phase2-nav-lightbox-close';
        navClose.setAttribute('aria-label', 'Close');
        navClose.textContent = '×';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'phase2-nav-arrow prev';
        prevBtn.setAttribute('aria-label', 'Previous');
        prevBtn.textContent = '‹';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'phase2-nav-arrow next';
        nextBtn.setAttribute('aria-label', 'Next');
        nextBtn.textContent = '›';

        navLightbox.appendChild(navImg);
        navLightbox.appendChild(navClose);
        navLightbox.appendChild(prevBtn);
        navLightbox.appendChild(nextBtn);
        document.body.appendChild(navLightbox);

        function showNavLightbox(idx) {
            currentIndex = (idx + allSrcs.length) % allSrcs.length;
            navImg.src = allSrcs[currentIndex];
            navLightbox.classList.add('active');
        }
        function closeNavLightbox() {
            navLightbox.classList.remove('active');
            navImg.src = '';
        }

        navClose.addEventListener('click', (e) => { e.stopPropagation(); closeNavLightbox(); });
        navLightbox.addEventListener('click', (e) => { if (e.target === navLightbox) closeNavLightbox(); });
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showNavLightbox(currentIndex - 1); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNavLightbox(currentIndex + 1); });

        document.addEventListener('keydown', (e) => {
            if (!navLightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeNavLightbox();
            else if (e.key === 'ArrowLeft') showNavLightbox(currentIndex - 1);
            else if (e.key === 'ArrowRight') showNavLightbox(currentIndex + 1);
        });

        const leftHalf = document.createElement('div');
        leftHalf.className = 'phase2-split-half';
        const rightHalf = document.createElement('div');
        rightHalf.className = 'phase2-split-half';

        cfg.items.forEach(({ src, side }, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = '';
            img.loading = 'lazy';
            img.addEventListener('click', () => showNavLightbox(idx));
            (side === 'right' ? rightHalf : leftHalf).appendChild(img);
        });

        inner.appendChild(leftHalf);
        inner.appendChild(rightHalf);
        wrap.appendChild(inner);
        overlay.appendChild(wrap);
    }

    if (cfg.type === 'mixed-grid') {
        const wrap = document.createElement('div');
        wrap.className = 'phase2-mixed-grid-wrap';

        const grid = document.createElement('div');
        grid.className = 'phase2-mixed-grid';

        const allItems = cfg.items;
        let currentIndex = 0;
        let gridVideos = [];

        // Build lightbox
        const lb = document.createElement('div');
        lb.className = 'phase2-mixed-lightbox';

        const lbImg = document.createElement('img');
        lbImg.alt = '';
        const lbVideo = document.createElement('video');
        lbVideo.playsInline = true;
        lbVideo.controls = false;
        lbVideo.preload = 'metadata';

        const lbClose = document.createElement('button');
        lbClose.className = 'phase2-mixed-lightbox-close';
        lbClose.setAttribute('aria-label', 'Close');
        lbClose.textContent = '×';

        const lbPrev = document.createElement('button');
        lbPrev.className = 'phase2-mixed-arrow prev';
        lbPrev.setAttribute('aria-label', 'Previous');
        lbPrev.textContent = '‹';

        const lbNext = document.createElement('button');
        lbNext.className = 'phase2-mixed-arrow next';
        lbNext.setAttribute('aria-label', 'Next');
        lbNext.textContent = '›';

        const lbPlayPause = document.createElement('button');
        lbPlayPause.className = 'phase2-mixed-playpause';
        lbPlayPause.setAttribute('aria-label', 'Play/Pause');
        lbPlayPause.innerHTML = '▶';

        lb.appendChild(lbImg);
        lb.appendChild(lbVideo);
        lb.appendChild(lbClose);
        lb.appendChild(lbPrev);
        lb.appendChild(lbNext);
        lb.appendChild(lbPlayPause);
        document.body.appendChild(lb);

        lbVideo.addEventListener('play', () => { lbPlayPause.innerHTML = '⏸'; });
        lbVideo.addEventListener('pause', () => { lbPlayPause.innerHTML = '▶'; });

        function showLightbox(idx) {
            currentIndex = (idx + allItems.length) % allItems.length;
            const item = allItems[currentIndex];

            lbVideo.pause();
            lbVideo.src = '';
            lbImg.src = '';

            if (item.mediaType === 'video') {
                lbImg.style.display = 'none';
                lbVideo.style.display = 'block';
                lbPlayPause.classList.add('visible');
                lbVideo.src = item.src;
                lbVideo.load();
                lbVideo.play().catch(() => { });
            } else {
                lbVideo.style.display = 'none';
                lbImg.style.display = 'block';
                lbPlayPause.classList.remove('visible');
                lbImg.src = item.src;
            }

            lb.classList.add('active');
        }

        function closeLightbox() {
            lb.classList.remove('active');
            lbVideo.pause();
            lbVideo.src = '';
            lbImg.src = '';
        }

        lbPlayPause.addEventListener('click', (e) => {
            e.stopPropagation();
            if (lbVideo.paused) lbVideo.play().catch(() => { });
            else lbVideo.pause();
        });
        lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
        lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
        lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentIndex - 1); });
        lbNext.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentIndex + 1); });

        document.addEventListener('keydown', (e) => {
            if (!lb.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
            else if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
            else if (e.key === ' ') {
                e.preventDefault();
                if (allItems[currentIndex].mediaType === 'video') {
                    if (lbVideo.paused) lbVideo.play().catch(() => { });
                    else lbVideo.pause();
                }
            }
        });

        // Build grid items
        allItems.forEach((item, idx) => {
            const cell = document.createElement('div');
            cell.className = 'phase2-mixed-grid-item';

            if (item.mediaType === 'video') {
                const vid = document.createElement('video');
                vid.src = item.src;
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.playsInline = true;
                vid.controls = false;
                vid.preload = 'metadata';
                cell.appendChild(vid);
                gridVideos.push(vid);
            } else {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = '';
                img.loading = 'lazy';
                cell.appendChild(img);
            }

            cell.addEventListener('click', () => showLightbox(idx));
            grid.appendChild(cell);
        });

        wrap.appendChild(grid);
        overlay.appendChild(wrap);

        // Store grid videos for play/pause on overlay open/close
        overlay._gridVideos = gridVideos;
        overlay._closeLightbox = closeLightbox;
    }

    if (cfg.title) {
        const titleEl = document.createElement('div');
        titleEl.className = 'phase2-title';
        titleEl.textContent = cfg.title;
        overlay.appendChild(titleEl);
    }

    const closeBtn = document.createElement('button');
    closeBtn.className = 'phase2-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';
    if (cfg.closeColor) closeBtn.style.color = cfg.closeColor;
    overlay.appendChild(closeBtn);

    function open() {
        overlay.classList.add('active');
        if (videoEl) {
            videoEl.currentTime = 0;
            videoEl.play().catch(() => { });
        }
        if (overlay._gridVideos) {
            overlay._gridVideos.forEach(v => v.play().catch(() => { }));
        }
    }

    function close() {
        overlay.classList.remove('active');
        if (videoEl) {
            videoEl.pause();
            videoEl.currentTime = 0;
        }
        if (overlay._gridVideos) {
            overlay._gridVideos.forEach(v => v.pause());
        }
        if (overlay._closeLightbox) {
            overlay._closeLightbox();
        }
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    document.body.appendChild(overlay);
    return { open };
}

/**
 * createGallery — renders a horizontal 10-image strip into a container.
 *
 * @param {object} options
 * @param {string} options.containerId
 * @param {string} options.folderPath
 * @param {string} options.title
 * @param {number} [options.count=10]
 * @param {string[]} [options.fileNames]
 * @param {string} options.artist
 * @param {object} [options.phase2]  { type, src, bgColor, title, items }
 */
function createGallery({
    containerId,
    folderPath,
    title,
    artist,
    count = 10,
    fileNames,
    mobileFileNames,
    phase2
}) {
    const names = fileNames || Array.from({ length: count }, (_, i) => `${i + 1}.webp`);
    const isMobile = window.matchMedia('(max-width: 700px)').matches;

    const section = document.createElement('div');
    section.className = 'gallery-section';

    const heading = document.createElement('h2');
    heading.className = 'gallery-title';
    heading.textContent = title;
    section.appendChild(heading);

    const strip = document.createElement('div');
    strip.className = 'gallery-strip';

    const items = [];
    names.forEach((name, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        const desktopSrc = `${folderPath}/${name}`;
        const mobileSrc = mobileFileNames?.[index]
            ? `${folderPath}/${mobileFileNames[index]}`
            : desktopSrc;

        img.src = isMobile ? mobileSrc : desktopSrc;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.fetchPriority = 'low';

        item.appendChild(img);
        strip.appendChild(item);
        items.push(item);
    });

    section.appendChild(strip);

    if (artist) {
        const artistEl = document.createElement('p');
        artistEl.className = 'gallery-artist';
        artistEl.textContent = artist;
        section.appendChild(artistEl);
    }

    document.getElementById(containerId).appendChild(section);

    if (phase2) {
        let phase2Controller = null;

        items.forEach((item) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                if (!phase2Controller) {
                    phase2Controller = buildPhase2Overlay(phase2);
                }
                phase2Controller.open();
            });
        });
    }
}