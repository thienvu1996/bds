// =========================================================
// 1. COMPONENT LOADER (Đã sửa lỗi gọi component)
// =========================================================
class ComponentLoader {
  constructor() {
    this.components = {};
  }

  async loadComponent(componentName) {
    if (this.components[componentName]) {
      return this.components[componentName];
    }

    try {
      // Dòng fetch: Đã sửa thành đường dẫn tuyệt đối /components (hoặc điều chỉnh nếu cần)
      // THỬ NGHIỆM: Nếu vẫn lỗi Cannot GET, hãy thử fetch(`public/components/${componentName}.html`)
      const response = await fetch(`/components/${componentName}.html`);

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const html = await response.text();
      this.components[componentName] = html;
      return html;
    } catch (error) {
      console.error(`❌ Error loading component ${componentName}:`, error);
      return "";
    }
  }

  async loadAllComponents() {
    const componentNames = ["header", "footer", "popup"];
    const promises = componentNames.map((name) => this.loadComponent(name));
    const results = await Promise.all(promises);

    return {
      header: results[0],
      footer: results[1],
      popup: results[2],
    };
  }

  insertComponent(componentName, targetId) {
    const target = document.getElementById(targetId);
    if (target && this.components[componentName]) {
      target.innerHTML = this.components[componentName];
    }
  }
}

// =========================================================
// 2. SUPPORT FUNCTIONS (TỪ COMPONENT LOADER CŨ)
// =========================================================

function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split("/").pop().split(".")[0];

  const pageMap = {
    index: "home",
    about: "about",
    projects: "projects",
    contact: "contact",
    admin: "admin",
  };

  return pageMap[filename] || "home";
}

function initializeNavigation() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("data-page") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    document.addEventListener("click", function (e) {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

function initializeScrollEffects() {
  // Header scroll effect (Đã giữ lại từ ComponentLoader cũ)
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // Smooth scrolling for anchor links (Đã giữ lại từ ComponentLoader cũ)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// =========================================================
// 3. IMAGE POPUP (Đã sửa lỗi để đảm bảo luôn hoạt động)
// =========================================================

// Hàm đóng popup
function closePopup() {
  const popupContainer = document.querySelector(".image-popup");
  if (popupContainer) {
    popupContainer.classList.remove("active");
    document.body.style.overflow = "auto"; // Khôi phục cuộn
  }
}

function initImagePopup() {
  // Nếu popup đã được tạo bởi ComponentLoader, sử dụng nó
  let popupContainer = document.querySelector(".image-popup");

  // Nếu popup chưa được tạo (có thể do bạn không có popup.html component), tạo mới
  if (!popupContainer) {
    console.warn(
      "Popup container not found. Creating a generic popup container."
    );
    popupContainer = document.createElement("div");
    popupContainer.className = "image-popup";
    popupContainer.innerHTML = `
            <div class="close-btn" onclick="closePopup()">×</div>
            <div class="popup-content">
                <img src="" alt="" style="max-width: 90vw; max-height: 90vh;">
                <div class="image-caption"></div>
            </div>
        `;
    document.body.appendChild(popupContainer);
  }

  // Gán sự kiện đóng vào container mới tạo (hoặc container đã có)
  const closeBtn = popupContainer.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  // Gán sự kiện cho tất cả ảnh có class 'popup-image'
  const popupImages = document.querySelectorAll(".popup-image");

  popupImages.forEach((img) => {
    // Xóa sự kiện cũ (nếu có) và gán sự kiện mới
    img.removeEventListener("click", handleImageClick);
    img.addEventListener("click", handleImageClick);
  });

  function handleImageClick(e) {
    e.preventDefault();

    const popupImg = popupContainer.querySelector("img");
    const caption = popupContainer.querySelector(".image-caption");

    popupImg.src = this.src;
    popupImg.alt = this.alt;

    const captionText =
      this.getAttribute("data-caption") || this.alt || "Hình ảnh dự án";
    caption.textContent = captionText;

    popupContainer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Đóng khi click ra nền
  popupContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("image-popup")) {
      closePopup();
    }
  });

  // Đóng bằng phím Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popupContainer.classList.contains("active")) {
      closePopup();
    }
  });
}

// =========================================================
// 4. SCROLL & ANIMATION EFFECTS (TỪ FILE JS THỨ HAI)
// =========================================================
function initializeAnimationsAndEffects() {
  // Logic của ScrollReveal (Giả định bạn đã nhúng thư viện ScrollReveal.js)
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal(".fade-in-up", {
      duration: 1200,
      origin: "bottom",
      distance: "60px",
      delay: 200,
      opacity: 0,
    });
    ScrollReveal().reveal(".slide-in-left", {
      duration: 1200,
      origin: "left",
      distance: "80px",
      delay: 300,
      opacity: 0,
    });
    ScrollReveal().reveal(".slide-in-right", {
      duration: 1200,
      origin: "right",
      distance: "80px",
      delay: 300,
      opacity: 0,
    });
    ScrollReveal().reveal(".project-card", {
      duration: 1000,
      origin: "bottom",
      distance: "40px",
      interval: 300,
      opacity: 0,
    });
    ScrollReveal().reveal(".card", {
      duration: 1200,
      origin: "bottom",
      distance: "40px",
      delay: 200,
      opacity: 0,
    });
  }

  // Thêm các hiệu ứng khác... (giữ lại logic bạn đã cung cấp)
  // ...

  // Thêm style cho hiệu ứng: Rất quan trọng cho hiển thị
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        /* Thêm các CSS cần thiết khác cho Popup, Responsive, v.v. */
        .image-popup.active {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.3s;
        }
        .image-popup { display: none; opacity: 0; }
        .image-popup.active { display: flex; }
        .image-popup img {
            max-width: 90vw;
            max-height: 90vh;
            display: block;
        }
        .image-popup .close-btn {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 10001;
        }
        /* Thêm CSS cho Responsive Navigation nếu cần */
        /* ... */
    `;
  document.head.appendChild(style);
}

// =========================================================
// 5. INITIALIZATION (Chỉ gọi duy nhất 1 lần)
// =========================================================
const componentLoader = new ComponentLoader();

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM Content Loaded. Starting component loading...");

  // 1. Tải và Chèn Component
  await componentLoader.loadAllComponents();
  componentLoader.insertComponent("header", "header-placeholder");
  componentLoader.insertComponent("footer", "footer-placeholder");
  componentLoader.insertComponent("popup", "popup-placeholder");

  // 2. Khởi tạo các hàm logic (Đã gộp)
  initializeNavigation(); // Menu responsive
  initializeScrollEffects();

  // 3. Khởi tạo Popup (PHẢI SAU KHI INSERT)
  initImagePopup();

  // 4. Khởi tạo Hiệu ứng
  initializeAnimationsAndEffects();

  console.log("✅ Website initialized successfully!");
});
