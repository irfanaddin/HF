// Modern JavaScript for Hamid Financials Website

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initMobileMenu()
    initScrollProgress()
    initAnimations()
    initCounters()
    initSmoothScrolling()
  })
  
// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const mobileMenu = document.getElementById("mobileMenu")
    const mobileMenuClose = document.getElementById("mobileMenuClose")
    const body = document.body
  
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        // Check if we need to add the content wrapper
        const mobileMenuContent = document.querySelector(".mobile-menu-content")
        if (!mobileMenuContent) {
          // Get the mobile nav menu
          const mobileNavMenu = mobileMenu.querySelector(".mobile-nav-menu")
    
          // If it exists, wrap it in a content div
          if (mobileNavMenu) {
            const contentWrapper = document.createElement("div")
            contentWrapper.className = "mobile-menu-content"
    
            // Insert the wrapper before the nav menu
            mobileNavMenu.parentNode.insertBefore(contentWrapper, mobileNavMenu)
    
            // Move the nav menu into the wrapper
            contentWrapper.appendChild(mobileNavMenu)
          }
        }
        // Open menu
        mobileMenuToggle.addEventListener("click", () => {
          mobileMenu.classList.add("active")
          body.classList.add("menu-open")
        })
    
        // Close menu
        mobileMenuClose.addEventListener("click", () => {
          mobileMenu.classList.remove("active")
          body.classList.remove("menu-open")
        })
    
        // Close menu when clicking on overlay (outside menu content)
        document.addEventListener("click", (e) => {
          if (
            mobileMenu.classList.contains("active") &&
            !mobileMenu.contains(e.target) &&
            e.target !== mobileMenuToggle &&
            !mobileMenuToggle.contains(e.target)
          ) {
            mobileMenu.classList.remove("active")
            body.classList.remove("menu-open")
          }
        })
    
        // Close menu when clicking on any nav link
        const mobileNavLinks = mobileMenu.querySelectorAll(".mobile-nav-link")
        mobileNavLinks.forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenu.classList.remove("active")
            body.classList.remove("menu-open")
          })
        })
    
        // Close menu on escape key
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active")
            body.classList.remove("menu-open")
          }
        })
      }
    }
  
  // Scroll Progress Indicator
  function initScrollProgress() {
    const scrollProgress = document.getElementById("scrollProgress")
  
    if (scrollProgress) {
      window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset
        const docHeight = document.body.scrollHeight - window.innerHeight
        const scrollPercent = (scrollTop / docHeight) * 100
  
        scrollProgress.style.width = scrollPercent + "%"
      })
    }
  }
  
  // Intersection Observer for Animations
  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    // Observe all elements with loading class
    document.querySelectorAll(".loading").forEach((el) => {
      observer.observe(el)
    })
  }
  
  // Animated Counters
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]")
  
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            counterObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )
  
    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }
  
  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 60fps
    let current = 0
  
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
  
      // Format number with commas if needed
      const displayValue = Math.floor(current)
      element.textContent = displayValue.toLocaleString()
  
      // Add + or % suffix based on content
      if (element.parentElement.querySelector(".stat-label").textContent.includes("Satisfaction")) {
        element.textContent = displayValue + "%"
      } else if (displayValue >= 100) {
        element.textContent = displayValue.toLocaleString() + "+"
      }
    }, 16)
  }
  
  // Smooth Scrolling for Anchor Links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
  
        if (target) {
          const headerOffset = 80
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
  
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }
  
  // Navbar Scroll Effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "var(--white)"
      navbar.style.backdropFilter = "none"
    }
  })
  
  // Form Validation (for contact forms)
  function validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]")
    let isValid = true
  
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        showFieldError(input, "This field is required")
        isValid = false
      } else {
        clearFieldError(input)
      }
  
      // Email validation
      if (input.type === "email" && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(input.value)) {
          showFieldError(input, "Please enter a valid email address")
          isValid = false
        }
      }
  
      // Phone validation
      if (input.type === "tel" && input.value) {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
        if (!phoneRegex.test(input.value.replace(/\D/g, ""))) {
          showFieldError(input, "Please enter a valid phone number")
          isValid = false
        }
      }
    })
  
    return isValid
  }
  
  function showFieldError(field, message) {
    clearFieldError(field)
  
    field.style.borderColor = "#ef4444"
    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error"
    errorDiv.style.color = "#ef4444"
    errorDiv.style.fontSize = "0.875rem"
    errorDiv.style.marginTop = "0.25rem"
    errorDiv.textContent = message
  
    field.parentNode.appendChild(errorDiv)
  }
  
  function clearFieldError(field) {
    field.style.borderColor = ""
    const existingError = field.parentNode.querySelector(".field-error")
    if (existingError) {
      existingError.remove()
    }
  }
  
  // Utility Functions
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
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
  
  // Performance optimized scroll handler
  const optimizedScrollHandler = throttle(() => {
    // Add any scroll-based functionality here
  }, 16) // ~60fps
  
  window.addEventListener("scroll", optimizedScrollHandler)
  
  // Lazy loading for images
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]")
  
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })
  
    images.forEach((img) => imageObserver.observe(img))
  }
  
  // Initialize lazy loading if there are lazy images
  if (document.querySelectorAll("img[data-src]").length > 0) {
    initLazyLoading()
  }
  
  // Accessibility improvements
  document.addEventListener("keydown", (e) => {
    // Skip to main content on Tab key
    if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
      const mainContent = document.querySelector("main") || document.querySelector(".hero")
      if (mainContent) {
        mainContent.focus()
        e.preventDefault()
      }
    }
  })
  
  // Add focus visible polyfill for better keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })
  
  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })
  
