/**
 * createGallery — renders a horizontal 10-image strip into a container.
 *
 * @param {object} options
 * @param {string} options.containerId  — id of the element to append into
 * @param {string} options.folderPath   — path to the image folder, e.g. "carousels/carousel0/juliette"
 * @param {string} options.title        — heading displayed above the strip
 * @param {number} [options.count=10]   — number of images (named 1.jpeg … n.jpeg)
 * @param {string[]} [options.fileNames] — override filenames if not sequential jpegs
 */
function createGallery({ containerId, folderPath, title, count = 10, fileNames }) {
    const names = fileNames || Array.from({ length: count }, (_, i) => `${i + 1}.jpeg`);

    const section = document.createElement('div');
    section.className = 'gallery-section';

    const heading = document.createElement('h2');
    heading.className = 'gallery-title';
    heading.textContent = title;
    section.appendChild(heading);

    const strip = document.createElement('div');
    strip.className = 'gallery-strip';

    names.forEach((name) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = `${folderPath}/${name}`;
        img.alt = '';
        img.loading = 'lazy';

        item.appendChild(img);
        strip.appendChild(item);
    });

    section.appendChild(strip);
    document.getElementById(containerId).appendChild(section);
}
