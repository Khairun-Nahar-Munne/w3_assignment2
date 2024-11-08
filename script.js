// Get region related element elements
const globeIcon = document.querySelector(".globe-icon");
const modal = document.getElementById("regionModal");
const closeBtn = modal.querySelector(".close-btn");
const saveBtn = modal.querySelector(".nav-save-btn");
const regionSelect = document.getElementById("region");
const currencySelect = document.getElementById("currency");

//get travel section element
const travelersSection = document.querySelector(".travelers-sec");
const popup = document.querySelector(".travelers-popup");
const travelersCount = document.querySelector(".travelers-count");
const doneBtn = document.querySelector(".done-btn");

//get gallery elemnets

const galleryPopup = document.getElementById("gallery-popup");
const closeButton = document.querySelector(".close-button");
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const galleryImage = document.getElementById("gallery-image");
const photoCount = document.querySelector(".photo-count");
const galleryTitle = document.querySelector(".gallery-title h3");

// Get the heart icon element
const heartIcon = document.querySelector(".banner-save i");

// Region to currency mapping
const regionCurrencyMap = {
  PT: "EUR",
  US: "USD",
  UK: "GBP",
  ES: "EUR",
  FR: "EUR",
  DE: "EUR",
};

// Region names mapping
const regionNames = {
  PT: "Portugal",
  US: "United States",
  UK: "United Kingdom",
  ES: "Spain",
  FR: "France",
  DE: "Germany",
};

// Update currency based on region selection
regionSelect.addEventListener("change", (e) => {
  const selectedRegion = e.target.value;
  const currency = regionCurrencyMap[selectedRegion];
  currencySelect.value = currency;
});

// Show modal when globe icon is clicked
globeIcon.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

// Close modal when close button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle save button click
saveBtn.addEventListener("click", () => {
  const selectedRegion = regionSelect.value;
  const selectedCurrency = currencySelect.value;

  // Update the globe icon text
  globeIcon.innerHTML = `${regionNames[selectedRegion]}`;

  // Log the selected values
  console.log("Selected Region:", selectedRegion);
  console.log("Selected Currency:", selectedCurrency);

  // Close the modal
  modal.style.display = "none";
});

// Set initial currency based on default region
window.addEventListener("DOMContentLoaded", () => {
  const initialRegion = regionSelect.value;
  currencySelect.value = regionCurrencyMap[initialRegion];
});

// for interactive traveller section

document.addEventListener("DOMContentLoaded", function () {
  let counts = {
    adults: 2,
    children: 0,
  };

  // Toggle popup
  travelersSection.addEventListener("click", function (e) {
    if (!popup.contains(e.target) || e.target === doneBtn) {
      popup.classList.toggle("active");
    }
  });

  // Close popup when clicking outside
  document.addEventListener("click", function (e) {
    if (!travelersSection.contains(e.target)) {
      popup.classList.remove("active");
    }
  });

  // Handle counter buttons
  popup.addEventListener("click", function (e) {
    if (e.target.matches("button.increase, button.decrease")) {
      const type = e.target.dataset.type;
      const isIncrease = e.target.classList.contains("increase");
      const counterDiv = e.target.closest(".counter");
      const countSpan = counterDiv.querySelector("span");
      const decreaseBtn = counterDiv.querySelector(".decrease");

      if (isIncrease) {
        counts[type]++;
      } else {
        counts[type]--;
      }

      // Update counter display
      countSpan.textContent = counts[type];

      // Disable decrease button if count is 0
      decreaseBtn.disabled = counts[type] === 0;

      // Update total travelers count
      const total = counts.adults + counts.children;
      travelersCount.textContent = `${total} traveler${total !== 1 ? "s" : ""}`;
    }
  });
});

//for interactive gallery

const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img8.jpg",
];

// Array of titles corresponding to each image
const titles = [
  "Juneau Vacation Rental | 2BR | 1BA | 1,115 Sq Ft | Stairs Required",
  "Cozy Bedroom with Lake View",
  "Beautiful Baranda with Stunning Exterior View",
  "Modern Living Room",
  "Stunning Exterior View",
  "Beautiful Living Room with Modern Amenities",
 
];

let currentIndex = 0;

function openGalleryPopup() {
  galleryPopup.style.display = "block";
  updateGallery();
}

function closeGalleryPopup() {
  galleryPopup.style.display = "none";
}

function updateGallery() {
  // Update image
  galleryImage.src = images[currentIndex];

  // Update photo count
  photoCount.textContent = `${currentIndex + 1}/${images.length}`;

  // Update title
  galleryTitle.textContent = titles[currentIndex];

  // Update navigation buttons
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === images.length - 1;
}

// Attach event listeners
document.querySelectorAll(".gallery-item").forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    openGalleryPopup();
  });
});

closeButton.addEventListener("click", closeGalleryPopup);

previousButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGallery();
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateGallery();
  }
});

// Close popup when clicking outside the content
galleryPopup.addEventListener("click", (e) => {
  if (e.target === galleryPopup) {
    closeGalleryPopup();
  }
});

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (galleryPopup.style.display === "block") {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      updateGallery();
    } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
      currentIndex++;
      updateGallery();
    } else if (e.key === "Escape") {
      closeGalleryPopup();
    }
  }
});

//hearticon change

// Function to set the heart icon state
function setHeartIconState() {
  // Check if the heart icon was previously set to red
  const heartIconColor = localStorage.getItem("heartIconColor");
  if (heartIconColor === "red") {
    heartIcon.classList.add("fa-solid");
    heartIcon.classList.remove("fa-regular");
    heartIcon.style.color = "red";
  } else {
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.remove("fa-solid");
    heartIcon.style.color = "";
  }
}

// Add click event listener to the heart icon
heartIcon.addEventListener("click", function () {
  // Toggle the heart icon between regular and solid states
  if (heartIcon.classList.contains("fa-regular")) {
    heartIcon.classList.add("fa-solid");
    heartIcon.classList.remove("fa-regular");
    heartIcon.style.color = "red";
    localStorage.setItem("heartIconColor", "red");
  } else {
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.remove("fa-solid");
    heartIcon.style.color = "";
    localStorage.removeItem("heartIconColor");
  }
});

// Set the initial heart icon state
setHeartIconState();

//for interative share icon

const shareButton = document.querySelector(".banner-share");
const sharePopup = document.querySelector(".share-popup");
const sharePopupClose = document.querySelector(".share-popup-close");
const shareOptions = document.querySelectorAll(".share-option");
const copyLinkButton = document.querySelector(".copy-link");

shareButton.addEventListener("click", () => {
  sharePopup.classList.remove("hidden");
});

sharePopupClose.addEventListener("click", () => {
  sharePopup.classList.add("hidden");
});

shareOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const shareType = option.dataset.share;
    shareContent(shareType);
    sharePopup.classList.add("hidden");
  });
});

copyLinkButton.addEventListener("click", () => {
  copyToClipboard(
    "https://www.vrbo.com/2983918?dateless=true&x_pwa=1&rfrr=HSR&pwa_ts=1730820725756&referrerUrl=aHR0cHM6Ly93d3cudnJiby5jb20vSG90ZWwtU2VhcmNo&useRewards=false&adults=2&regionId=956&destination=Cox%27s+Bazar%2C+Chittagong+Division%2C+Bangladesh&destType=MARKET&latLong=21.360771%2C92.020443&privacyTrackingState=CAN_TRACK&searchId=d68f7778-3b3e-4d74-9726-4f9a2d1c5497&sort=RECOMMENDED&userIntent=&expediaPropertyId=84083026&propertyName=Opelia+Beach+Resort+%3Cbr%3EBehind+KFC%2C+120m+inside%2C+1+minute+walking+distance+from+KFC://example.com"
  );
  sharePopup.classList.add("hidden");
});

function shareContent(shareType) {
  switch (shareType) {
    case "messages":
      // Implement Messenger sharing logic
      break;
    case "whatsapp":
      // Implement WhatsApp sharing logic
      break;
    case "facebook":
      // Implement Facebook sharing logic
      break;
    default:
      break;
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}
