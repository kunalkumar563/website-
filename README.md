# Nature's Beauty - Nature Photography Gallery

A beautiful, responsive website showcasing stunning nature photographs. This simple yet elegant gallery website features categorized nature images with a modern, user-friendly interface.

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Image Filtering**: Filter images by category (mountains, forests, oceans, wildlife)
- **Image Lightbox**: Click on any image to view it in a larger lightbox with caption
- **Smooth Animations**: Subtle transitions and hover effects for a polished user experience
- **Modern UI**: Clean and minimalist interface to showcase the beauty of nature

## Technologies Used

- HTML5
- CSS3 (Grid layout, Flexbox, Animations)
- JavaScript (ES6+)
- Responsive Design
- Font Awesome icons

## How to Use

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Browse the beautiful nature images
4. Use the navigation menu to filter images by category
5. Click on any image to view it in the lightbox

## Customization

### Adding New Images

To add more images to the gallery, edit the `index.html` file and add new gallery items following this format:

```html
<div class="gallery-item" data-category="category-name">
    <img src="image-url" alt="Image description">
    <div class="overlay">
        <h3>Image Title</h3>
        <p>Image description or caption</p>
    </div>
</div>
```

Replace:
- `category-name` with the category (mountains, forests, oceans, wildlife)
- `image-url` with the URL of your image
- `Image description` with alt text for accessibility
- `Image Title` with the title of your image
- `Image description or caption` with a brief description

### Adding New Categories

To add new categories:

1. Add new navigation links in the `<nav>` section of `index.html`
2. Use the new category name in the `data-category` attribute of gallery items
3. Update the JavaScript filtering function if necessary

## License

This project is open-source and available for personal and commercial use.

## Credits

- Images sourced from [Unsplash](https://unsplash.com/)
- Icons from [Font Awesome](https://fontawesome.com/) 