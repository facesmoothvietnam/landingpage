    
// main.js
import DATA from './data.js';
/* GHI CHÚ: Phải có dòng này thì biến DATA bên dưới mới có giá trị */
/*1. phần header */
const renderHeader = () => {
    // Vì bà không bọc trong "header:", nên DATA chính là cái kho tổng luôn.

    // --- 1. ĐỔ ẢNH VÀO LOGO ---
    // Soi đúng ID "main-logo" trong HTML của bà
    const logoImg = document.getElementById('main-logo');
    if (logoImg) {
        // Bà để trong images.logo đúng không? Tui gọi đúng y chang vậy nè:
        logoImg.src = DATA.images.logo; 
    }

    // --- 2. ĐỔ CHỮ VÀO MENU ---
    // Soi đúng ID "main-menu" trong HTML của bà
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) {
        // Bà để menu ngay ngoài cùng, nên tui dùng DATA.menu.map luôn
        mainMenu.innerHTML = DATA.menu.map(item => `
            <a href="${item.link}"target="_blank" rel="noopener noreferrer" class="menu-item">${item.name}</a>
        `).join(''); // Nối các thẻ <a> lại với nhau
    }

    // --- 3. ĐỔ ICON VÀO KHỐI ICONS ---
    // Soi đúng ID "header-icons" trong HTML của bà
    const headerIcons = document.getElementById('header-icons');
    if (headerIcons) {
        // Bà để icons ngay ngoài cùng, tui dùng DATA.icons.map nha
        headerIcons.innerHTML = DATA.icons.map(item => `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="icon-link">
                <i class="${item.iconClass}"></i>
            </a>
        `).join(''); // Dán chúng lại thành một chuỗi văn bản cho trình duyệt hiểu
    }
};

// Đợi HTML tải xong rồi mới "đổ thịt" vào khung
document.addEventListener('DOMContentLoaded', renderHeader);

//2. Phần hero section banner chính
//2.1 Lấy dữ liệu từ data.js

      const heroData = DATA.hero;

    //2.3 Lấy danh sách slide từ dữ liệu
const slides = DATA.heroSlides;
let currentIndex = 0; // Vị trí slide đang đứng (bắt đầu từ 0)

//2.4 Lấy các thẻ HTML cần tác động
const heroSection = document.getElementById("hero-section");
const heroImg = document.getElementById("hero-img-src");
const heroSubtitle = document.getElementById("hero-subtitle");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");
const heroBtnText = document.getElementById("hero-btn-text");

/*2.5 HÀM CẬP NHẬT NỘI DUNG SLIDE, khi gọi hàm này thì có 2 nhiệm vụ cần thực hiện là thay thông tin và làm sáng cái chấm nó lên */ 
function updateSlider(index) {
    const data = slides[index];
    if (!data) return;

    // 1. Thêm hiệu ứng mờ dần trước khi đổi (cho sang)
    heroSection.style.opacity = "0.5";

    setTimeout(() => {
        // 2. Thay đổi nội dung từ dữ liệu: nhiệm vụ thứ nhất thay thông tin
        heroImg.src = data.backgroundImage;
        heroSubtitle.textContent = data.subtitle;
        heroTitle.textContent = data.title;
        heroDesc.textContent = data.description;
        heroBtnText.textContent = data.buttonText;
        // Code này bổ sung thêm để xử lý khi bấm nút SHOP NOW có link đúng
        // Tìm cái nút có class là btn-shop
        const shopBtn = document.querySelector('.btn-shop');
        if (shopBtn) {
            // Mỗi lần slide đổi, mình gán luôn cái link mới từ dữ liệu vào cho nó
            shopBtn.onclick = () => {
                window.open(data.link, '_blank'); // 'link' này bà thêm vào trong mỗi slide ở data.js nhé
            };
        }

        //gọi hàm chấm nó nó thực hiện nhiệm vụ: nhiệm vụ thứ 2 là làm sáng cái chấm đó lên
        updateDots(index);

        // 3. Hiện rõ lại sau khi đã đổi xong
        heroSection.style.opacity = "1";
    }, 200); // Đợi 0.2 giây để tạo cảm giác chuyển cảnh
}

/* XỬ LÝ SỰ KIỆN NÚT NEXT (TỚI) */
document.getElementById("next-btn").addEventListener("click", () => {
    currentIndex++; 
    if (currentIndex >= slides.length) {
        currentIndex = 0; // Nếu quá hình cuối thì quay về hình đầu
    }
    updateSlider(currentIndex);
});

/* XỬ LÝ SỰ KIỆN NÚT PREV (LÙI) */
document.getElementById("prev-btn").addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1; // Nếu lùi quá hình đầu thì nhảy tới hình cuối
    }
    updateSlider(currentIndex);
});
/* cách tạo dot khi xuất hiện */
const dotsContainer = document.getElementById("dots-container");

// 1. Hàm vẽ các chấm bi dựa trên số lượng slide trong mảng
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = "dot";
        
        // Khi người dùng click vào chấm, nhảy ngay tới slide đó
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
        
        dotsContainer.appendChild(dot);
    });
}

// 2. Hàm làm sáng cái chấm đang được chọn
function updateDots(index) {
    const allDots = document.querySelectorAll(".dot");
    allDots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active"); // Thêm class 'active' để nó sáng lên
        } else {
            dot.classList.remove("active"); // Tắt đèn những chấm còn lại
        }
    });
}
// vẽ chấm lần đầu tiên
createDots();
// Chạy lần đầu tiên để hiện slide số 0
updateSlider(currentIndex);
/* 3.lấy thông tin của câu slogan  */
document.getElementById("slogan-text").textContent = DATA.brandSlogan;
/* 4. Lấy thông tin featureproduct */
const feat = DATA.featuredProduct;

document.getElementById("feat-title").textContent = feat.title;
document.getElementById("feat-img").src = feat.image;
document.getElementById("feat-desc").textContent = feat.description;
document.getElementById("feat-subtitle").textContent = feat.subTitle;
document.getElementById("feat-highlight").textContent = feat.highlight;
/* 5. Lấy thông tin brand philosophy */
const philo = DATA.brandPhilosophy;

// Gán ảnh nền cho toàn bộ section
const philoSection = document.getElementById("philosophy-section");
philoSection.style.backgroundImage = `url('${philo.backgroundImage}')`;

// Gán nội dung chữ
document.getElementById("philo-title").textContent = philo.title;
document.getElementById("philo-desc").textContent = philo.description;
document.getElementById("philo-btn-text").textContent = philo.buttonText;
// Gán link dẫn đến trang khác (ví dụ: about.html)
document.getElementById("philo-link").href = philo.link;

/* 6. Lấy thông tin manifesto video */

const renderManifesto = () => {
    const root = document.getElementById('manifesto-root');
    if (!root) return;
    // khai báo biến data ---
    const data = DATA.manifestoData;

    // Kiểm tra xem có video không
    if (data.videoUrl) {
        root.innerHTML = `
            <video autoplay muted loop playsinline 
                   poster="${data.posterUrl}" 
                   class="manifesto-video-element">
                <source src="${data.videoUrl}" type="video/mp4">
            </video>
        `;
    } else {
        // Nếu chưa có video, hiện ảnh poster hoặc khung màu triết lý
        root.innerHTML = `
            <div class="manifesto-placeholder" 
                 style="background-image: url('${data.posterUrl}'); background-color: ${data.backgroundColor}">
                 </div>
        `;
    }
};
document.addEventListener('DOMContentLoaded', renderManifesto);
// 7. Lấy thông tin product focus
const renderNewSection = () => {
    const titleEl = document.getElementById('focus-title');
    const gridEl = document.getElementById('focus-grid-root');
    
    const sectionData = DATA.productFocus;
    if (!sectionData) return;

    if (titleEl) titleEl.innerText = sectionData.title;
    
    if (gridEl) {
        gridEl.innerHTML = sectionData.items.map(item => `
            <div class="focus-card">
                <div class="focus-card__square">
                    <img src="${item.image}" class="focus-card__img" alt="${item.label}">
                    <div class="focus-card__badge" style="background-color: ${item.labelColor}">
                        ${item.label}
                    </div>
                </div>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', renderNewSection);
// 8. Lấy thông tin footer
const init = () => {
    const fData = DATA.footer;
    if (!fData) return;

    // 1. Đổ Logo và Tagline
    if (document.getElementById('f-logo')) document.getElementById('f-logo').innerText = fData.brand;
    if (document.getElementById('f-tagline')) document.getElementById('f-tagline').innerText = fData.tagline;

    // 2. Đổ Icon mạng xã hội (Sửa lỗi gạch chéo)
    const socialContainer = document.getElementById('f-socials');
    if (socialContainer) {
        socialContainer.innerHTML = fData.socials.map(item => `
            <a href="${item.link}" target="_blank" class="social-icon">
                <i class="${item.iconClass}"></i>
            </a>
        `).join('');
    }

    // 3. ĐỔ DỮ LIỆU CỘT GIỮA (Lý do bà bị mất cột là ở đây)
    const linksContainer = document.getElementById('f-links-container');
    if (linksContainer && fData.columns) {
        linksContainer.innerHTML = fData.columns.map(col => `
            <div class="footer-col">
                <h4 class="footer-label">${col.title}</h4>
                <ul>
                    ${col.links.map(link => `<li><a href="#">${link}</a></li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // 4. Liên hệ và Bản quyền
    if (document.getElementById('f-address')) document.getElementById('f-address').innerText = fData.contact.address;
    if (document.getElementById('f-email')) document.getElementById('f-email').innerText = fData.contact.email;
    if (document.getElementById('f-copy')) document.getElementById('f-copy').innerText = fData.copyright;
};

// Gọi duy nhất hàm này
document.addEventListener('DOMContentLoaded', init);