const products = [
  {
    id: "pink-trouser-detail",
    number: "Look 01",
    name: "Pink Ruffle Trouser Detail",
    korean: "핑크 러플 트라우저 디테일",
    price: "KRW 180,000",
    image: "assets/dan-product-01.jpeg",
    description: "입체적인 러플과 자카드 텍스처가 돋보이는 핑크 트라우저 디테일 컷입니다.",
    fabric: "Embossed cotton blend, layered ruffle trim"
  },
  {
    id: "pink-trouser-set",
    number: "Look 02",
    name: "Pink Ruffle Trouser Set",
    korean: "핑크 러플 트라우저 세트",
    price: "KRW 280,000",
    image: "assets/dan-product-02.jpeg",
    description: "러플 팬츠와 리본 탑이 함께 어우러지는 세리머니 무드의 셋업입니다.",
    fabric: "Embossed cotton blend, pearl trim, soft inner lining"
  },
  {
    id: "elastic-midi-dress",
    number: "Look 03",
    name: "Elastic Waist Midi Dress",
    korean: "엘라스틱 웨이스트 미디 드레스",
    price: "KRW 220,000",
    image: "assets/dan-product-03.jpeg",
    description: "로즈 컬러 러플과 탄성 허리선으로 움직임이 편안한 미디 드레스입니다.",
    fabric: "Embossed cotton, elastic waist band, light mesh lining"
  },
  {
    id: "ribbon-denim-overall",
    number: "Look 04",
    name: "Ribbon Denim Overall",
    korean: "리본 데님 오버롤",
    price: "KRW 240,000",
    image: "assets/dan-product-04.jpeg",
    description: "프릴 장식과 크림 패치가 더해진 데님 오버롤로, 캐주얼한 단아함을 담았습니다.",
    fabric: "Washed denim, cotton frill tape, contrast cream patch"
  },
  {
    id: "pink-layered-mini-set",
    number: "Look 05",
    name: "Pink Layered Mini Set",
    korean: "핑크 레이어드 미니 세트",
    price: "KRW 230,000",
    image: "assets/dan-product-05.jpeg",
    description: "연분홍 가디건과 미니 스커트가 겹쳐지는 레이어드 세트입니다.",
    fabric: "Soft knit cardigan, textured cotton, tulle ruffle hem"
  },
  {
    id: "butter-frill-dress",
    number: "Look 06",
    name: "Butter Frill Dress",
    korean: "버터 프릴 드레스",
    price: "KRW 210,000",
    image: "assets/dan-product-06.jpeg",
    description: "버터 컬러 드레스와 블루 보닛이 어울리는 밝고 가벼운 드레스 룩입니다.",
    fabric: "Structured cotton blend, layered frill sleeve, cotton bonnet"
  },
  {
    id: "frill-mini-dress",
    number: "Look 07",
    name: "Otgoreum Frill Mini Dress",
    korean: "오트고름 프릴 미니 드레스",
    price: "KRW 200,000",
    image: "assets/dan-product-07.jpeg",
    gallery: [
      "assets/dan-product-07.jpeg",
      "assets/dan-product-07-gallery-01.jpeg",
      "assets/dan-product-07-gallery-02.jpeg",
      "assets/dan-product-07-gallery-03.jpeg",
      "assets/dan-product-07-gallery-04.jpeg",
      "assets/dan-product-07-gallery-05.jpeg",
      "assets/dan-product-07-gallery-06.jpeg"
    ],
    description: "오간자 소매와 프릴 스커트가 한복 고름의 부드러운 선을 닮은 미니 드레스입니다.",
    fabric: "Silk organza, textured cotton blend, soft tulle frill"
  },
  {
    id: "blue-hood-set",
    number: "Look 08",
    name: "Blue Hood Frill Set",
    korean: "블루 후드 프릴 세트",
    price: "KRW 260,000",
    image: "assets/dan-product-08.jpeg",
    description: "하늘빛 후드와 버터 컬러 팬츠를 함께 구성한 부드러운 데일리 세트입니다.",
    fabric: "Jacquard cotton, sheer frill trim, brushed cotton pants"
  }
];

const body = document.body;
const header = document.querySelector("[data-header]");
const menuPanel = document.querySelector("[data-menu-panel]");
const menuToggles = document.querySelectorAll("[data-menu-toggle]");
const menuLinks = document.querySelectorAll("[data-menu-link]");
const addButtons = document.querySelectorAll("[data-add-item]");
const bagCount = document.querySelector("[data-bag-count]");
const toast = document.querySelector("[data-toast]");

let bagTotal = 0;
let toastTimer;

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setMenu(open) {
  if (!menuPanel || !header) return;
  body.classList.toggle("menu-open", open);
  header.classList.toggle("is-open", open);
  menuPanel.classList.toggle("is-open", open);
  menuPanel.setAttribute("aria-hidden", String(!open));
  menuToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function showToast(message) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function getProductById(id) {
  return products.find((product) => product.id === id) || products[0];
}

function populateProductDetail() {
  const detailRoot = document.querySelector("[data-product-detail]");
  if (!detailRoot) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  let galleryIndex = 0;

  const productImage = document.querySelector("[data-product-image]");
  const productThumb = document.querySelector("[data-product-thumb]");
  const productName = document.querySelector("[data-product-name]");
  const productKorean = document.querySelector("[data-product-korean]");
  const productNumber = document.querySelector("[data-product-number]");
  const productPrice = document.querySelector("[data-product-price]");
  const productDescription = document.querySelector("[data-product-description]");
  const productFabric = document.querySelector("[data-product-fabric]");
  const detailArrows = document.querySelector(".detail-arrows");
  const galleryPrev = document.querySelector("[data-gallery-prev]");
  const galleryNext = document.querySelector("[data-gallery-next]");

  function setGalleryImage(nextIndex) {
    galleryIndex = (nextIndex + gallery.length) % gallery.length;

    if (productImage) {
      productImage.src = gallery[galleryIndex];
      productImage.alt = `${product.korean} 사진 ${galleryIndex + 1}`;
    }
  }

  setGalleryImage(0);

  if (productThumb) {
    productThumb.src = product.image;
    productThumb.alt = `${product.korean} 썸네일`;
  }

  if (productName) productName.textContent = product.name;
  if (productKorean) productKorean.textContent = product.korean;
  if (productNumber) productNumber.textContent = product.number;
  if (productPrice) productPrice.textContent = product.price;
  if (productDescription) productDescription.textContent = product.description;
  if (productFabric) productFabric.textContent = product.fabric;
  if (detailArrows) detailArrows.hidden = gallery.length < 2;
  if (galleryPrev) galleryPrev.addEventListener("click", () => setGalleryImage(galleryIndex - 1));
  if (galleryNext) galleryNext.addEventListener("click", () => setGalleryImage(galleryIndex + 1));

  document.title = `DAN | ${product.name}`;
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
populateProductDetail();

menuToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    setMenu(!menuPanel?.classList.contains("is-open"));
  });
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuPanel?.classList.contains("is-open")) {
    setMenu(false);
  }
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    bagTotal += 1;
    if (bagCount) bagCount.textContent = String(bagTotal);
    showToast(`${button.dataset.addItem} has been added to your cart.`);
  });
});
