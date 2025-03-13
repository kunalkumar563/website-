document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and gallery items
    const navLinks = document.querySelectorAll('nav a');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the category from the link text
            const category = this.textContent.toLowerCase();
            
            // Filter gallery items
            filterGallery(category);
        });
    });
    
    // Filter gallery items based on category
    function filterGallery(category) {
        galleryItems.forEach(item => {
            // Show all items if 'All' is selected
            if (category === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                // Check if item has the selected category
                const itemCategory = item.getAttribute('data-category');
                
                if (itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add lazy loading for images
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px 100px 0px"
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imgObserver.unobserve(img);
                }
            });
        }, imgOptions);
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
    
    // Add image lightbox functionality
    galleryItems.forEach(item => {
        item.querySelector('img').addEventListener('click', function() {
            const imgSrc = this.src;
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="lightbox-caption">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
            
            // Add lightbox to the page
            document.body.appendChild(lightbox);
            
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
            
            // Add close functionality
            lightbox.querySelector('.close').addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            });
            
            // Close on click outside of content
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
            });
        });
    });
    
    // Social Actions Functionality
    
    // Like buttons
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Update like count
            const countElem = this.querySelector('.like-count');
            let count = parseInt(countElem.textContent);
            
            if (this.classList.contains('active')) {
                countElem.textContent = count + 1;
            } else {
                countElem.textContent = Math.max(0, count - 1);
            }
        });
    });
    
    // Comment buttons
    const commentBtns = document.querySelectorAll('.comment-btn');
    const commentModal = document.querySelector('.comment-modal');
    const closeCommentModal = commentModal.querySelector('.close-modal');
    let currentGalleryItem = null;
    
    commentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Store reference to the current gallery item
            currentGalleryItem = this.closest('.gallery-item');
            
            // Display the modal
            commentModal.style.display = 'flex';
            
            // Load comments (in a real application, you would fetch from a database)
            // For now, we'll just show the "no comments" message
        });
    });
    
    // Close comment modal
    closeCommentModal.addEventListener('click', function() {
        commentModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the content
    commentModal.addEventListener('click', function(e) {
        if (e.target === commentModal) {
            commentModal.style.display = 'none';
        }
    });
    
    // Submit comment
    const submitCommentBtn = document.querySelector('.submit-comment');
    submitCommentBtn.addEventListener('click', function() {
        const commentText = document.querySelector('.comment-form textarea').value.trim();
        
        if (commentText) {
            // Get comments container
            const commentsContainer = document.querySelector('.comments-container');
            
            // Remove the "no comments" message if it exists
            const noCommentsMsg = commentsContainer.querySelector('.no-comments');
            if (noCommentsMsg) {
                noCommentsMsg.remove();
            }
            
            // Create comment element
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="comment-author">Guest</div>
                <div class="comment-text">${commentText}</div>
                <div class="comment-time">Just now</div>
            `;
            
            // Append the comment
            commentsContainer.appendChild(commentElement);
            
            // Clear the textarea
            document.querySelector('.comment-form textarea').value = '';
            
            // In a real application, you would save this to a database
        }
    });
    
    // Share buttons
    const shareBtns = document.querySelectorAll('.share-btn');
    const shareModal = document.querySelector('.share-modal');
    const closeShareModal = shareModal.querySelector('.close-modal');
    const copyLinkBtn = shareModal.querySelector('.copy-link');
    const linkInput = shareModal.querySelector('.share-link input');
    
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Store reference to the current gallery item
            currentGalleryItem = this.closest('.gallery-item');
            
            // Get image info
            const imageTitle = currentGalleryItem.querySelector('h3').textContent;
            
            // Set share link (in a real app, this would be a unique URL to the image)
            // For now, we'll just use the current page URL
            linkInput.value = window.location.href;
            
            // Update modal content based on the image
            shareModal.querySelector('h3').textContent = `Share "${imageTitle}"`;
            
            // Display the modal
            shareModal.style.display = 'flex';
        });
    });
    
    // Close share modal
    closeShareModal.addEventListener('click', function() {
        shareModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the content
    shareModal.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });
    
    // Copy link functionality
    copyLinkBtn.addEventListener('click', function() {
        linkInput.select();
        document.execCommand('copy');
        
        // Change button text temporarily to indicate success
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
    
    // Share options
    const shareOptions = document.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(currentGalleryItem.querySelector('h3').textContent);
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'pinterest':
                    const imageUrl = encodeURIComponent(currentGalleryItem.querySelector('img').src);
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${imageUrl}&description=${title}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=Check%20out%20this%20image:%20${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        });
    });
});

// Add CSS for lightbox
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        object-fit: contain;
    }
    
    .lightbox .close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 30px;
        color: white;
        cursor: pointer;
    }
    
    .lightbox-caption {
        color: white;
        padding: 10px 0;
        text-align: center;
    }
    
    .comment {
        padding: 15px 0;
        border-bottom: 1px solid #ecf0f1;
    }
    
    .comment-author {
        font-weight: bold;
        color: #2c3e50;
    }
    
    .comment-text {
        margin: 5px 0;
    }
    
    .comment-time {
        font-size: 0.8rem;
        color: #7f8c8d;
    }
`;
document.head.appendChild(style); 