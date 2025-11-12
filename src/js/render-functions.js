export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        />
      </a>
      <div class="info">
        <div class="info-item">
          <p class="info-label">Likes</p>
          <p class="info-value">${likes}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Views</p>
          <p class="info-value">${views}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Comments</p>
          <p class="info-value">${comments}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Downloads</p>
          <p class="info-value">${downloads}</p>
        </div>
      </div>
    </li>
  `
    )
    .join('');
}

export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}
