/**
 * Tuli Ma Property Brokers - Core Javascript Library
 * Vanilla JS (No frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Header Scroll Class
  const header = document.querySelector('.glass-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }

  // 2. Navigation Active State Link Detection
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href)) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    } else if (href === 'index.html' && (currentPath === '/' || currentPath === '' || currentPath.endsWith('index.html'))) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // 3. Persistent Favorite Property System
  const favoriteButtons = document.querySelectorAll('.property-favorite');
  
  // Create toast notification dynamically if it doesn't exist
  let toast = document.querySelector('.fav-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'fav-toast';
    toast.innerHTML = `<i class="fa-solid fa-heart text-green-brand"></i> <span class="toast-text">Property added to favorites!</span>`;
    document.body.appendChild(toast);
  }

  function showToast(message, isSuccess = true) {
    if (toast) {
      toast.querySelector('.toast-text').innerText = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // Load favorites from local storage
  let savedFavorites = JSON.parse(localStorage.getItem('tulima_favorites') || '[]');
  
  // Initialize favorite heart active states
  favoriteButtons.forEach(btn => {
    const propId = btn.getAttribute('data-id');
    if (propId && savedFavorites.includes(propId)) {
      btn.classList.add('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      }
    }

    // Toggle favorite state
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (!id) return;

      const icon = btn.querySelector('i');
      if (savedFavorites.includes(id)) {
        savedFavorites = savedFavorites.filter(item => item !== id);
        btn.classList.remove('active');
        if (icon) {
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
        }
        showToast('Removed from favorites.');
      } else {
        savedFavorites.push(id);
        btn.classList.add('active');
        if (icon) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid');
        }
        showToast('Added to your favorites!');
      }
      localStorage.setItem('tulima_favorites', JSON.stringify(savedFavorites));
    });
  });

  // 4. Listing filtering system (listings.html)
  const filterBadges = document.querySelectorAll('.filter-badge');
  const propertyCards = document.querySelectorAll('.property-listing-item');

  if (filterBadges.length > 0 && propertyCards.length > 0) {
    filterBadges.forEach(badge => {
      badge.addEventListener('click', () => {
        filterBadges.forEach(b => b.classList.remove('active'));
        badge.classList.add('active');

        const category = badge.getAttribute('data-filter');
        
        propertyCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'block';
            card.classList.add('animate-fade-in');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const countUp = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 2000; // 2 seconds
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          el.innerText = target.toLocaleString() + suffix;
        } else {
          el.innerText = Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));
  }

  // 6. Sharing System Handler
  const shareButtons = document.querySelectorAll('.property-share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = window.location.origin + '/property-details.html?id=' + (btn.getAttribute('data-id') || '1');
      
      if (navigator.share) {
        navigator.share({
          title: 'Tuli Ma Property Broker Listing',
          text: 'Check out this amazing property listing in Lusaka!',
          url: url
        }).catch(err => console.log(err));
      } else {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Listing link copied to clipboard!');
        });
      }
    });
  });

  // 7. Standard Form Submission Handler (Contact & Request Listing Pages)
  const brokerForms = document.querySelectorAll('.tulima-form');
  brokerForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic feedback popup
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...`;
      }

      setTimeout(() => {
        showToast('Your request has been sent successfully! Our broker will contact you shortly.', true);
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1500);
    });
  });

  // 8. Custom Video Player Core Controls (video.html)
  const videoContainer = document.querySelector('.custom-video-container');
  const video = document.querySelector('.custom-video-element');
  
  if (videoContainer && video) {
    const playBtn = document.getElementById('video-play');
    const playIcon = playBtn.querySelector('i');
    const muteBtn = document.getElementById('video-mute');
    const muteIcon = muteBtn.querySelector('i');
    const fullscreenBtn = document.getElementById('video-fullscreen');
    const progressFilled = document.querySelector('.video-progress-filled');
    const progressBar = document.querySelector('.video-progress-bar');
    const volumeSlider = document.querySelector('.video-volume-slider');
    const timeCurrent = document.getElementById('video-time-current');
    const timeTotal = document.getElementById('video-time-total');
    const playOverlay = document.querySelector('.video-play-overlay');

    // Toggle Play / Pause
    function togglePlay() {
      if (video.paused) {
        video.play();
        playIcon.className = 'fa-solid fa-pause';
        playOverlay.classList.add('hidden');
      } else {
        video.pause();
        playIcon.className = 'fa-solid fa-play';
        playOverlay.classList.remove('hidden');
      }
    }

    playBtn.addEventListener('click', togglePlay);
    playOverlay.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    // Update Progress Bar & Time
    function formatTime(seconds) {
      if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    video.addEventListener('timeupdate', () => {
      if (isFinite(video.duration) && video.duration > 0) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = `${percentage}%`;
      } else {
        progressFilled.style.width = '0%';
      }
      timeCurrent.innerText = formatTime(video.currentTime);
    });

    video.addEventListener('loadedmetadata', () => {
      timeTotal.innerText = formatTime(video.duration);
    });

    // Check if metadata is already loaded
    if (video.readyState >= 1) {
      timeTotal.innerText = formatTime(video.duration);
    }

    // Seek Video
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (isFinite(video.duration) && video.duration > 0) {
        video.currentTime = pos * video.duration;
      }
    });

    // Mute / Unmute
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        muteIcon.className = 'fa-solid fa-volume-xmark';
        volumeSlider.value = 0;
      } else {
        muteIcon.className = 'fa-solid fa-volume-high';
        volumeSlider.value = video.volume;
      }
    });

    // Volume Slider Adjust
    volumeSlider.addEventListener('input', (e) => {
      video.volume = e.target.value;
      video.muted = (e.target.value == 0);
      if (video.muted) {
        muteIcon.className = 'fa-solid fa-volume-xmark';
      } else if (video.volume < 0.5) {
        muteIcon.className = 'fa-solid fa-volume-low';
      } else {
        muteIcon.className = 'fa-solid fa-volume-high';
      }
    });

    // Fullscreen Support
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }
});
