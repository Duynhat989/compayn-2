// Enhanced Mobile Navigation and Interactions
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger menu
      const bars = navToggle.querySelectorAll(".bar")
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) bar.style.opacity = "0"
          if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        }
      })
    })

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        const bars = navToggle.querySelectorAll(".bar")
        bars.forEach((bar) => {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        })
      })
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Animated counters for statistics
  function animateCounters() {
    const counters = [
      { element: document.getElementById("downloads"), target: 5000000, suffix: "M+", duration: 2000 },
      { element: document.getElementById("transformations"), target: 50000000, suffix: "M+", duration: 2500 },
      { element: document.getElementById("rating"), target: 4.9, suffix: "★", duration: 1500, decimal: true },
    ]

    counters.forEach((counter) => {
      if (counter.element) {
        animateCounter(counter.element, counter.target, counter.suffix, counter.duration, counter.decimal)
      }
    })
  }

  function animateCounter(element, target, suffix = "", duration = 2000, decimal = false) {
    let current = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      if (decimal) {
        element.textContent = current.toFixed(1) + suffix
      } else if (target >= 1000000) {
        element.textContent = (current / 1000000).toFixed(1) + suffix
      } else {
        element.textContent = Math.floor(current).toLocaleString() + suffix
      }
    }, 16)
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Trigger counter animation when hero section is visible
        if (entry.target.classList.contains("hero")) {
          setTimeout(animateCounters, 500)
        }

        // Trigger staggered animations for cards
        if (
          entry.target.classList.contains("apps-grid") ||
          entry.target.classList.contains("tech-grid") ||
          entry.target.classList.contains("testimonials-grid")
        ) {
          const cards = entry.target.children
          Array.from(cards).forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("visible")
            }, index * 100)
          })
        }
      }
    })
  }, observerOptions)

  // Observe elements for animations
  const fadeElements = document.querySelectorAll(
    ".app-card, .tech-card, .testimonial-card, .feature-item, .demo-feature",
  )
  fadeElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Observe sections
  const sections = document.querySelectorAll(".hero, .apps-showcase, .features, .technology, .demo, .testimonials")
  sections.forEach((section) => observer.observe(section))

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formObject = {}
      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Validate required fields
      const requiredFields = ["name", "email", "message"]
      let isValid = true

      requiredFields.forEach((field) => {
        const input = this.querySelector(`[name="${field}"]`)
        if (!formObject[field] || formObject[field].trim() === "") {
          input.style.borderColor = "#ff6b6b"
          input.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"
          isValid = false
        } else {
          input.style.borderColor = "#e2e8f0"
          input.style.boxShadow = "none"
        }
      })

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const emailInput = this.querySelector('[name="email"]')
      if (formObject.email && !emailRegex.test(formObject.email)) {
        emailInput.style.borderColor = "#ff6b6b"
        emailInput.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"
        isValid = false
      }

      if (isValid) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = "<span>Sending...</span>"
        submitBtn.disabled = true
        submitBtn.classList.add("loading")

        // Simulate API call
        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.classList.remove("loading")

          showFormMessage("Thank you for your message! We will get back to you within 24 hours.", "success")
          this.reset()
        }, 2000)

        console.log("Form submitted:", formObject)
      } else {
        showFormMessage("Please fill in all required fields correctly.", "error")
      }
    })
  }

  // Newsletter form handling
  const newsletterForm = document.getElementById("newsletterForm")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = this.querySelector('input[type="email"]').value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (emailRegex.test(email)) {
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = "<span>Subscribing...</span>"
        submitBtn.disabled = true

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          showFormMessage("Successfully subscribed to our newsletter!", "success")
          this.reset()
        }, 1500)
      } else {
        showFormMessage("Please enter a valid email address.", "error")
      }
    })
  }

  function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll(".form-success, .form-error")
    existingMessages.forEach((msg) => msg.remove())

    // Create new message
    const messageDiv = document.createElement("div")
    messageDiv.className = type === "success" ? "form-success" : "form-error"
    messageDiv.textContent = message

    // Insert message before form
    const form = document.getElementById("contactForm") || document.getElementById("newsletterForm")
    if (form) {
      form.parentNode.insertBefore(messageDiv, form)

      // Auto-remove message after 5 seconds
      setTimeout(() => {
        messageDiv.style.opacity = "0"
        setTimeout(() => messageDiv.remove(), 300)
      }, 5000)
    }
  }

  // Header scroll effect with color change
  let lastScrollTop = 0
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Change header background based on scroll
    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      header.style.backdropFilter = "blur(20px)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Parallax effect for hero elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-element, .hero-visual")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // App card hover effects
  const appCards = document.querySelectorAll(".app-card")
  appCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Tech card rotation effect
  const techCards = document.querySelectorAll(".tech-card")
  techCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
    })
  })

  // Demo phone animation
  const demoPhone = document.querySelector(".demo-phone")
  if (demoPhone) {
    setInterval(() => {
      demoPhone.style.transform = "scale(1.05)"
      setTimeout(() => {
        demoPhone.style.transform = "scale(1)"
      }, 200)
    }, 3000)
  }

  // Testimonial carousel auto-scroll
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  let currentTestimonial = 0

  function highlightTestimonial() {
    testimonialCards.forEach((card, index) => {
      if (index === currentTestimonial) {
        card.style.transform = "scale(1.05)"
        card.style.boxShadow = "0 20px 40px rgba(102, 126, 234, 0.2)"
      } else {
        card.style.transform = "scale(1)"
        card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07)"
      }
    })

    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
  }

  if (testimonialCards.length > 0) {
    setInterval(highlightTestimonial, 4000)
  }

  // Add loading animation on page load
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger hero animations
    const heroElements = document.querySelectorAll(".hero-badge, .hero-title, .hero-description, .hero-buttons")
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close mobile menu if open
      const navMenu = document.querySelector(".nav-menu")
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        const bars = document.querySelectorAll(".bar")
        bars.forEach((bar) => {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        })
      }
    }
  })

  // Performance optimization: Throttle scroll events
  function throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Add scroll-based animations with throttling
  const throttledScrollHandler = throttle(() => {
    const scrolled = window.pageYOffset

    // Parallax for floating elements
    const floatingElements = document.querySelectorAll(".floating-element")
    floatingElements.forEach((element, index) => {
      const speed = 0.3 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })

    // Update progress bars
    const progressBars = document.querySelectorAll(".progress-bar")
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bar.style.width = "100%"
      }
    })
  }, 16)

  window.addEventListener("scroll", throttledScrollHandler)

  // Initialize current year in footer
  const currentYear = new Date().getFullYear()
  const yearElements = document.querySelectorAll(".current-year")
  yearElements.forEach((element) => {
    element.textContent = currentYear
  })

  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for ripple effect
  const style = document.createElement("style")
  style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  console.log("🚀 Copiah Supply photo editing website loaded successfully!")
  console.log("📱 Ready to transform photos with AI magic!")
})

// Utility functions for photo editing apps
const photoUtils = {
  // Simulate photo transformation
  transformPhoto: (imageData, style) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transformedImage: `transformed_${style}_${Date.now()}.jpg`,
          processingTime: Math.random() * 3 + 1,
        })
      }, 2000)
    }),

  // Validate image format
  isValidImageFormat: (file) => {
    const validFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    return validFormats.includes(file.type)
  },

  // Get image dimensions
  getImageDimensions: (file) =>
    new Promise((resolve) => {
      const img = new Image()
      img.onload = function () {
        resolve({
          width: this.width,
          height: this.height,
          aspectRatio: this.width / this.height,
        })
      }
      img.src = URL.createObjectURL(file)
    }),

  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  },

  // Local storage helpers for app preferences
  storage: {
    set: (key, value) => {
      try {
        localStorage.setItem(`copiah_${key}`, JSON.stringify(value))
      } catch (e) {
        console.warn("Could not save to localStorage:", e)
      }
    },
    get: (key) => {
      try {
        const item = localStorage.getItem(`copiah_${key}`)
        return item ? JSON.parse(item) : null
      } catch (e) {
        console.warn("Could not read from localStorage:", e)
        return null
      }
    },
    remove: (key) => {
      try {
        localStorage.removeItem(`copiah_${key}`)
      } catch (e) {
        console.warn("Could not remove from localStorage:", e)
      }
    },
  },

  // Analytics tracking for app usage
  trackEvent: (eventName, properties = {}) => {
    console.log("📊 Event tracked:", eventName, properties)
    // In a real app, this would send data to analytics service
  },
}

// Export utils for use in other scripts if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { photoUtils }
}
