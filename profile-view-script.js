console.log("Test 2");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loading-screen").style.display = "flex";
  document.getElementById("pv-page-wrapper").style.display = "none";
});

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM fully loaded and parsed");
  console.log("testyyyssasasa");
  let thepageparams = new URLSearchParams(window.location.search);
  let lawyerId = thepageparams.get("id");

  if (lawyerId != null && lawyerId != "") {
    let lawyerstring = lawyerId.toString();
    let thisUser = await getUserById(lawyerstring);

    if (thisUser != "error") {
      if (thisUser != "error") {
        // Create a promise to handle all profile configurations
        const setupProfile = new Promise(async (resolve, reject) => {
          let parseonce = JSON.parse(thisUser);
          console.log("parsed data:", parseonce);
          let body = parseonce.data.body;

          let parsedBody = JSON.parse(JSON.parse(body));
          console.log(parsedBody, "🧑🏿‍❤️‍💋‍🧑🏾🧑🏿‍❤️‍💋‍🧑🏾🧑🏿‍❤️‍💋‍🧑🏾🥪🥪", parsedBody["profile image"]);
          let imageurl = parsedBody["profile image"];
          if (imageurl != null && imageurl != "" && !imageurl != undefined) {
            let imagecontainer = document.getElementById(
              "theprofileimagecontainer"
            );
            imagecontainer.style.backgroundImage = `url(${imageurl})`;
            imagecontainer.style.backgroundSize = "cover";
            imagecontainer.style.backgroundPosition = "center";
            imagecontainer.style.backgroundRepeat = "no-repeat";
          }

          document.getElementById("NameText").innerText = parsedBody["name"];

          const firmUrl = parsedBody["firm url"];

          if (firmUrl != null && firmUrl != undefined && firmUrl != "") {
            // Capitalize first letter of the displayed URL
            let displayUrl =
              firmUrl.length > 22 ? firmUrl.substring(0, 22) + "..." : firmUrl;
            displayUrl =
              displayUrl.charAt(0).toUpperCase() + displayUrl.slice(1);

            document.getElementById("thefirmurl").innerText = displayUrl;

            let firmFullUrl = firmUrl.startsWith("http")
              ? firmUrl
              : "https://" + firmUrl;
            document.getElementById("thefirmurl").href = firmFullUrl;
          } else {
            document.getElementById("thefirmurl").style.display = "none";
          }

          let minrate = parsedBody["min hourly rate"];
          let maxrate = parsedBody["max hourly rate"];
          let ratecombined;

          if (!minrate && !maxrate) {
            // Neither rate available - show "N/A"
            document.getElementById("hourly-rate-section").style.display =
              "none";
          } else {
            if (minrate && maxrate) {
              // Both rates available - show range
              ratecombined = `${minrate} - ` + `${maxrate}/Hour`;
            } else if (minrate) {
              // Only min rate available
              ratecombined = `${minrate}/Hour`;
            } else if (maxrate) {
              // Only max rate available
              ratecombined = `${maxrate}/Hour`;
            }

            document.getElementById("hourly-rate-text").innerText =
              ratecombined;
            document.getElementById("hourly-rate-section").style.display =
              "flex";
          }

          let bannerimage = parsedBody["profile banner"];
          console.log("🥪🥪🔷", bannerimage);
          let thebannercontainer = document.getElementById("bannercontainer");
          if (
            bannerimage != null &&
            bannerimage != "" &&
            bannerimage != undefined
          ) {
            thebannercontainer.style.backgroundImage = `url(${bannerimage})`;
            thebannercontainer.style.backgroundSize = "cover";
            thebannercontainer.style.backgroundPosition = "center";
            thebannercontainer.style.backgroundRepeat = "no-repeat";
          } else {
            if (window.innerWidth >= 768) {
              // Apply only if screen width is tablet or larger
              thebannercontainer.style.height = "12rem";
              document.getElementById(
                "profile-img-main-container"
              ).style.bottom = "-40%";
            }
          }

          let theLawyeraddress = parsedBody["address"];
          console.log(theLawyeraddress);

          if (
            theLawyeraddress != null &&
            theLawyeraddress != undefined &&
            theLawyeraddress != ""
          ) {
            let theaddressLong = theLawyeraddress.long;
            let theaddressLat = theLawyeraddress.lat;

            if (theaddressLat && theaddressLong) {
              map = await mapBoxMap(theaddressLat, theaddressLong);
            } else {
              document.getElementById("sectionmap").style.display = "none";
            }
          } else {
            document.getElementById("sectionmap").style.display = "none";
          }

          let socialMedias = parsedBody["social media"];
          let twitterLink = socialMedias[0].url;
          let linkedinLink = socialMedias[1].url;
          let facebookLink = socialMedias[2].url;
          let instagramLink = socialMedias[3].url;

          if (
            twitterLink == "" &&
            linkedinLink == "" &&
            facebookLink == "" &&
            instagramLink == ""
          ) {
            document.getElementById("socialmediahold").style.display = "none";
            document.getElementById("social-media-section").style.display =
              "none";
          }

          if (
            twitterLink != null &&
            twitterLink != "" &&
            twitterLink != undefined
          ) {
            document.getElementById("socialmediahold").style.display = "flex";
            let twittergo = document.getElementById("xlink");
            twittergo.href = twitterLink;
            twittergo.style.display = "block";
          } else {
            document.getElementById("xlink").style.display = "none";
          }

          if (
            linkedinLink != null &&
            linkedinLink != "" &&
            linkedinLink != undefined
          ) {
            document.getElementById("socialmediahold").style.display = "flex";
            let linkedingo = document.getElementById("linkedinlink");
            linkedingo.href = linkedinLink;
            linkedingo.style.display = "block";
          } else {
            document.getElementById("linkedinlink").style.display = "none";
          }

          if (
            facebookLink != null &&
            facebookLink != "" &&
            facebookLink != undefined
          ) {
            document.getElementById("socialmediahold").style.display = "flex";
            let facebookgo = document.getElementById("facebooklink");
            facebookgo.href = facebookLink;
            facebookgo.style.display = "block";
          } else {
            document.getElementById("facebooklink").style.display = "none";
          }

          if (
            instagramLink != null &&
            instagramLink != "" &&
            instagramLink != undefined
          ) {
            document.getElementById("socialmediahold").style.display = "flex";
            let instagramgo = document.getElementById("instagramlink");
            instagramgo.href = twitterLink;
            instagramgo.style.display = "block";
          } else {
            document.getElementById("instagramlink").style.display = "none";
          }

          let freeconsult = parsedBody["free consultation"];
          if (
            freeconsult == null ||
            freeconsult == undefined ||
            freeconsult == ""
          ) {
            freeconsult = "yes";
          }

          let probono = parsedBody["community pro bono work"];
          if (probono == null || probono == undefined || probono == "") {
            probono = "yes";
          }

          let contingency = parsedBody["offer contingency"];
          if (
            contingency == null ||
            contingency == undefined ||
            contingency == ""
          ) {
            contingency = "yes";
          }

          if (freeconsult == "yes") {
            document.getElementById("free-consult-yes").style.display = "flex";
            document.getElementById("free-consult-no").style.display = "none";
          } else {
            document.getElementById("free-consult-yes").style.display = "none";
            document.getElementById("free-consult-no").style.display = "flex";
          }

          if (probono == "yes") {
            document.getElementById("cpbw-yes").style.display = "flex";
            document.getElementById("cpbw-no").style.display = "none";
          } else {
            document.getElementById("cpbw-yes").style.display = "none";
            document.getElementById("cpbw-no").style.display = "flex";
          }

          if (contingency == "yes") {
            document.getElementById("offer-cg-yes").style.display = "flex";
            document.getElementById("offer-cg-no").style.display = "none";
          } else {
            document.getElementById("offer-cg-yes").style.display = "none";
            document.getElementById("offer-cg-no").style.display = "flex";
          }

          // To do
          // document.getElementById("freeconsultation-large-s").innerText =
          //   freeconsult;
          // document.getElementById("freeconsultation-mobile").innerText =
          //   freeconsult;
          // document.getElementById("probono-large-s").innerText = probono;
          // document.getElementById("probono-mobile").innerText = probono;
          // document.getElementById("offercontingency-large-s").innerText =
          //   contingency;
          // document.getElementById("offercontingency-mobile").innerText =
          //   contingency;

          const expertholderLargeS = document.getElementById(
            "expertisewrap-large-s"
          );
          expertholderLargeS.innerHTML = "";
          const expertholderMobile = document.getElementById(
            "expertisewrap-mobile"
          );
          expertholderMobile.innerHTML = "";

          let theexpertise = parsedBody["area of expertise"];
          if (theexpertise.length > 0) {
            for (let eachexpertise in theexpertise) {
              const expertcontainer = document.createElement("div");
              expertcontainer.classList.add("expertisecontainer");
              let expertText = theexpertise[eachexpertise];
              expertcontainer.innerText = capitalizeWords(expertText);

              const expertContainerClone = expertcontainer.cloneNode(true);
              expertholderLargeS.append(expertcontainer);
              expertholderMobile.append(expertContainerClone);
            }
          } else {
            document.getElementById(
              "area-expertise-section-mobile"
            ).style.display = "none";
            document.getElementById(
              "area-expertise-section-large-s"
            ).style.display = "none";
          }

          let thehobbies = parsedBody["interests and hobbies"];
          let hobbiesContainer = document.getElementById("interestshobbies");
          hobbiesContainer.innerHTML = "";

          if (
            thehobbies != null &&
            thehobbies != undefined &&
            thehobbies != "" &&
            thehobbies.length > 0
          ) {
            for (let eachhobby in thehobbies) {
              hobbyholder = document.createElement("div");
              hobbyholder.classList.add("expertisecontainer");
              let hobbyText = thehobbies[eachhobby].title;
              hobbyholder.innerText = capitalizeWords(hobbyText);
              hobbiesContainer.append(hobbyholder);
            }
          } else {
            document.getElementById("interest-hobby-section").style.display =
              "none";
          }

          let educactionList = parsedBody["AllEducation"];
          console.log("educactionList", educactionList);
          let education1;
          if (
            educactionList != null &&
            educactionList != undefined &&
            educactionList != ""
          ) {
            console.log(educactionList);
            if (educactionList.length > 0) {
              education1 = educactionList[0].education;

              let allEducationWrapperMobile = document.getElementById(
                "all-education-mobile"
              );
              let allEducationWrapperLargeS = document.getElementById(
                "all-education-large-s"
              );
              allEducationWrapperMobile.innerHTML = "";
              allEducationWrapperLargeS.innerHTML = "";
              if (
                education1 != null &&
                education1 != undefined &&
                education1 != "null" &&
                education1 != ""
              ) {
                for (let eachEducation in educactionList) {
                  const educationWrap = document.createElement("div");
                  educationWrap.classList.add("educationwrap");
                  let educationText = educactionList[eachEducation].education;
                  if (
                    educationText != null &&
                    (educationText != undefined) & (educationText != "null") &&
                    educationText != ""
                  ) {
                    educationdisplay = document.createElement("p");
                    educationdisplay.classList.add("educationtexts");
                    educationdisplay.innerText = educationText;
                    educationWrap.append(educationdisplay);
                  }

                  let educationDegree = educactionList[eachEducation].degree;

                  let educationInfo;
                  if (
                    educationDegree != null &&
                    educationDegree != undefined &&
                    educationDegree != "null" &&
                    educationDegree != ""
                  ) {
                    educationInfo = document.createElement("div");
                    educationInfo.classList.add("edu-info");

                    degreedisplay = document.createElement("p");
                    degreedisplay.classList.add("edu-degree");
                    degreedisplay.innerText = educationDegree;
                    educationInfo.append(degreedisplay);
                  }

                  let educationStartDate =
                    educactionList[eachEducation]["start date"];
                  let educationEndDate =
                    educactionList[eachEducation]["end date"];

                  if (educationStartDate != "" && educationEndDate != "") {
                    if (!educationInfo) {
                      educationInfo = document.createElement("div");
                      educationInfo.classList.add("edu-info");
                    }

                    let timePeriod = document.createElement("p");
                    timePeriod.classList.add("edu-time");
                    // Parse dates and format them as "MMM YYYY"
                    const formatDate = (dateString) => {
                      if (!dateString) return "";
                      const date = new Date(dateString);
                      if (isNaN(date.getTime())) return dateString; // Return original if invalid

                      const month = date.toLocaleString("en-US", {
                        month: "short",
                      });
                      const year = date.getFullYear();
                      return `${month} ${year}`;
                    };

                    const startDate =
                      educactionList[eachEducation]["start date"];
                    const endDate = educactionList[eachEducation]["end date"];

                    if (startDate && endDate) {
                      timePeriod.innerText =
                        formatDate(startDate) + " - " + formatDate(endDate);
                      educationInfo.append(timePeriod);
                    }
                    educationInfo.append(timePeriod);
                  }

                  educationInfo ? educationWrap.append(educationInfo) : null;

                  const educationWrapClone = educationWrap.cloneNode(true);

                  // Append to both containers
                  allEducationWrapperMobile.appendChild(educationWrap);
                  allEducationWrapperLargeS.appendChild(educationWrapClone);
                }
              }
            } else {
              console.log("No education found");
              document.getElementById(
                "education-section-mobile"
              ).style.display = "none";

              document.getElementById(
                "education-section-large-s"
              ).style.display = "none";
            }
          } else {
            console.log("No education found");
            document.getElementById("education-section-mobile").style.display =
              "none";
            document.getElementById("education-section-large-s").style.display =
              "none";
          }

          let dynamicBio = parsedBody["dynamic bio"];
          if (
            dynamicBio == null ||
            dynamicBio == "null" ||
            dynamicBio == undefined ||
            dynamicBio == "" ||
            dynamicBio == "\n"
          ) {
            // Hide both desktop and mobile biography containers
            document.getElementById("biography-container").style.display =
              "none";
            document.getElementById("biography-container-mob").style.display =
              "none";
          } else {
            // Set content for both desktop and mobile bio text elements
            document.getElementById("biotext").innerHTML = dynamicBio;
            document.getElementById("biotext-mob").innerHTML = dynamicBio;
          }

          let certificates = parsedBody["certificates"];
          if (
            certificates != null &&
            certificates != "" &&
            certificates != "null" &&
            certificates != undefined
          ) {
            console.log(certificates);
            if (certificates.length > 0) {
              let certicateContainer =
                document.getElementById("certificate-swiper");
              certicateContainer.innerHTML = "";
              certicateContainer.classList.add("swiper", "certificate-swiper");
              certicateContainer.style.cssText = `width: 100%; overflow: hidden;`;

              // Create navigation buttons
              const prevBtn = document.createElement("div");
              prevBtn.className = "swiper-button-prev cert-nav-btn";
              prevBtn.style.display = "none"; // Hide by default

              const nextBtn = document.createElement("div");
              nextBtn.className = "swiper-button-next cert-nav-btn";
              nextBtn.style.display = "none"; // Hide by default

              // Create pagination
              const pagination = document.createElement("div");
              pagination.className = "swiper-pagination";

              let firstCert = certificates[0];
              if (
                firstCert != null &&
                firstCert != undefined &&
                firstCert != "null" &&
                firstCert != ""
              ) {
                const swiperWrapper = document.createElement("div");
                swiperWrapper.classList.add("swiper-wrapper");

                // Add each certificate as a slide
                for (let eachcert in certificates) {
                  const swiperSlide = document.createElement("div");
                  swiperSlide.classList.add("swiper-slide");
                  swiperSlide.style.cssText = `width: auto; flex-shrink: 0; padding: 0 10px;`;

                  let imageContainer = document.createElement("div");
                  imageContainer.classList.add("img-wrap-2");

                  let certimage = document.createElement("img");
                  certimage.classList.add("cert-image");
                  certimage.src = certificates[eachcert].url;
                  certimage.style.width = "auto";

                  imageContainer.append(certimage);
                  swiperSlide.append(imageContainer);
                  swiperWrapper.append(swiperSlide);
                }
                certicateContainer.append(
                  prevBtn,
                  nextBtn,
                  swiperWrapper,
                  pagination
                );

                function updateNavVisibility() {
                  if (window.innerWidth >= 1024) {
                    prevBtn.style.display = "block";
                    nextBtn.style.display = "block";
                  } else {
                    prevBtn.style.display = "none";
                    nextBtn.style.display = "none";
                  }
                }

                window.addEventListener("resize", updateNavVisibility);
                updateNavVisibility();

                // Initialize Swiper after DOM is fully loaded
                loadSwiperJS().then(() => {
                  new Swiper(certicateContainer, {
                    spaceBetween: 16,
                    slidesOffsetAfter: 30,
                    centeredSlides: false,
                    pagination: {
                      el: pagination,
                      clickable: true,
                    },
                    navigation: {
                      nextEl: nextBtn,
                      prevEl: prevBtn,
                    },
                    // Disable swiping on desktop, enable on mobile
                    allowTouchMove: window.innerWidth < 1024,
                    breakpoints: {
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                        allowTouchMove: true,
                        centeredSlides: false,
                        slidesOffsetAfter: 0,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        allowTouchMove: true,
                      },
                      1024: {
                        slidesPerView: 1,
                        allowTouchMove: false,
                        centeredSlides: true, // Center the single slide
                        slidesOffsetAfter: 0, // Remove offset for true centering
                      },
                    },
                    on: {
                      touchStart: function () {
                        this.el.style.transition = "none";
                      },
                      touchEnd: function () {
                        this.el.style.transition = "";
                      },
                    },
                  });
                });
              } else {
                document.getElementById("certificatethehold").style.display ==
                  "none";
              }
            } else {
              document.getElementById("certificatethehold").style.display =
                "none";
            }
          } else {
            document.getElementById("certificatethehold").style.display =
              "none";
          }

          let theuserLanguages = parsedBody["languages"];
          let languagecontainer = document.getElementById(
            "thelanguagecontainer"
          );
          languagecontainer.innerHTML = "";

          if (
            theuserLanguages != null &&
            theuserLanguages != undefined &&
            theuserLanguages != "" &&
            theuserLanguages.length > 0
          ) {
            for (let userlang in theuserLanguages) {
              langholder = document.createElement("div");
              langholder.classList.add("eng");
              flagImage = document.createElement("img");
              flagImage.classList.add("flagsimage");
              flagImage.src = theuserLanguages[userlang].image;
              languagetext = document.createElement("p");
              languagetext.classList.add("countrytext");
              languagetext.innerText =
                theuserLanguages[userlang].value.charAt(0).toUpperCase() +
                theuserLanguages[userlang].value.slice(1);
              langholder.append(flagImage, languagetext);
              languagecontainer.append(langholder);
            }
          } else {
            document.getElementById("language-main-section").style.display =
              "none";
            document.getElementById("sectionmap").style.width = "100%";
          }

          let videoIntroduction = parsedBody["profile video"];
          console.log("🖼️🖼️🖼️🖼️🖼️", videoIntroduction);
          if (
            videoIntroduction != null &&
            videoIntroduction != undefined &&
            videoIntroduction != "null" &&
            videoIntroduction != ""
          ) {
            console.log("🖼️🖼️🖼️🖼️🖼️", videoIntroduction);
            const videoIntroductionElement =
              document.getElementById("theprofilevideo");
            videoIntroductionElement.src = videoIntroduction.url;
            videoIntroductionElement.poster = videoIntroduction.thumbnail;
            setupVideoControls(videoIntroductionElement);
            // Show controls only after user interacts (click/tap/focus)

            videoIntroductionElement.preload = "auto"; // Ensure video is preloaded
            videoIntroductionElement.muted = true;

            // Auto-play/pause profile video based on visibility
            const videoObserver = new IntersectionObserver(
              (entries, observer) => {
                entries.forEach((entry) => {
                  const video = entry.target;
                  if (entry.isIntersecting) {
                    video.play().catch(() => {
                      // Auto-play might be blocked by browser
                      console.warn(
                        "Issue with auto-playing video, trying to play on user interaction."
                      );
                    });
                  } else {
                    video.pause();
                  }
                });
              },
              {
                threshold: 0.5, // Play when at least 30% visible
              }
            );

            videoObserver.observe(videoIntroductionElement);
          } else {
            document.getElementById("profile-video-section").style.display =
              "none";
          }

          // Helper function to generate poster from first frame
          let notableCaseWins = parsedBody["notable case wins"];
          let notablecasewinscontainer = document.getElementById(
            "notablecasewinscontainer"
          );
          notablecasewinscontainer.innerHTML = "";

          if (
            notableCaseWins != null &&
            notableCaseWins != undefined &&
            notableCaseWins != "" &&
            notableCaseWins.length > 0
          ) {
            notablecasewinscontainer.classList.add(
              "swiper",
              "case-card-wrap",
              "case-card-custom",
              "case-card-wrap-custom"
            );

            // Create navigation buttons
            const prevBtn = document.createElement("div");
            prevBtn.className = "swiper-button-prev cases-nav-btn";
            prevBtn.style.display = "none"; // Hide by default

            const nextBtn = document.createElement("div");
            nextBtn.className = "swiper-button-next cases-nav-btn";
            nextBtn.style.display = "none"; // Hide by default

            // Create pagination
            const pagination = document.createElement("div");
            pagination.className = "swiper-pagination";

            let swiperWrapper = document.createElement("div");
            swiperWrapper.classList.add("swiper-wrapper", "case-win-swip");
            notablecasewinscontainer.style.cssText = `width: 100%;`;

            for (let eachcase in notableCaseWins) {
              let caseWinDiv = document.createElement("div");
              caseWinDiv.classList.add(
                "swiper-slide",
                "crd",
                "crd-cutom-width"
              );

              const caseContent = document.createElement("div");
              caseContent.classList.add("pv-case-content");
              let caseHeading = document.createElement("h4");
              caseHeading.classList.add("notable-case-heading");
              caseHeading.innerText = notableCaseWins[eachcase].title;
              caseContent.append(caseHeading);
              let caseText = document.createElement("p");
              let readmoreBtn = document.createElement("button");
              readmoreBtn.className = "toggle-readmore";
              readmoreBtn.textContent = "Read more";
              caseText.classList.add("notablecasewintext");
              caseText.innerText = notableCaseWins[eachcase].description;
              caseContent.append(caseText);
              caseContent.append(readmoreBtn);
              caseWinDiv.append(caseContent);
              swiperWrapper.append(caseWinDiv);
            }
            notablecasewinscontainer.append(
              prevBtn,
              nextBtn,
              swiperWrapper,
              pagination
            );

            document
              .querySelectorAll(".toggle-readmore")
              .forEach((toggleBtn) => {
                const textBlock = toggleBtn.previousElementSibling;

                toggleBtn.addEventListener("click", (e) => {
                  e.stopPropagation();
                  textBlock.classList.toggle("expanded");
                  toggleBtn.textContent = textBlock.classList.contains(
                    "expanded"
                  )
                    ? "Read less"
                    : "Read more";
                });
              });

            // Show/hide nav buttons based on screen size
            function updateNavVisibility() {
              if (window.innerWidth >= 1024) {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
              } else {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
              }
            }
            window.addEventListener("resize", updateNavVisibility);
            updateNavVisibility();

            loadSwiperJS().then(() => {
              new Swiper(notablecasewinscontainer, {
                spaceBetween: 16,
                centeredSlides: false,
                pagination: {
                  el: pagination,
                  clickable: true,
                },
                navigation: {
                  nextEl: nextBtn,
                  prevEl: prevBtn,
                },
                allowTouchMove: window.innerWidth < 1024,
                breakpoints: {
                  320: {
                    slidesPerView: 1,
                    allowTouchMove: true,
                    centeredSlides: false,
                    slidesOffsetAfter: 0,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    allowTouchMove: true,
                  },
                  1024: {
                    slidesPerView: 1,
                    allowTouchMove: false,
                    centeredSlides: true, // Center the single slide
                    slidesOffsetAfter: 0, // Remove offset for true centering
                  },
                },
                on: {
                  touchStart: function () {
                    this.el.style.transition = "none";
                  },
                  touchEnd: function () {
                    this.el.style.transition = "";
                  },
                },
              });
            });
          } else {
            document.getElementById("sectioncasewins").style.display = "none";
          }

          let clientTestimonials = parsedBody["client video testimonials"];
          let clientTestimonialContainer =
            document.getElementById("testimonialholder");
          clientTestimonialContainer.innerHTML = "";

          if (
            clientTestimonials != null &&
            clientTestimonials != undefined &&
            clientTestimonials != "" &&
            clientTestimonials.length > 0
          ) {
            clientTestimonialContainer.classList.add(
              "swiper",
              "testmonial-container"
            );
            clientTestimonialContainer.style.cssText = `width: 100%;`;

            let swiperWrapper = document.createElement("div");
            swiperWrapper.classList.add("swiper-wrapper");

            let max = clientTestimonials.length;
            if (clientTestimonials.length > 3) {
              max = 3;
            }
            for (i = 0; i <= max - 1; i++) {
              let slide = document.createElement("div");
              slide.classList.add(
                "swiper-slide",
                "testimonial-video-wrap",
                "sdas"
              );
              let testimonialVideo = document.createElement("video");
              testimonialVideo.classList.add("testimonial-video");
              testimonialVideo.setAttribute(
                "data-src",
                clientTestimonials[i].url
              );
              testimonialVideo.src = clientTestimonials[i].url;
              setupVideoControls(testimonialVideo);
              testimonialVideo.preload = "auto";
              testimonialVideo.playsInline = true;
              testimonialVideo.poster = clientTestimonials[i].thumbnail;
              slide.append(testimonialVideo);
              swiperWrapper.append(slide);
            }

            clientTestimonialContainer.append(swiperWrapper);
            if (window.innerWidth > 1024) {
              loadSwiperJS().then(() => {
                new Swiper(clientTestimonialContainer, {
                  spaceBetween: 25,
                  breakpoints: {
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                  },
                });
              });
            } else if (window.innerWidth < 1024) {
              loadSwiperJS().then(() => {
                new Swiper(clientTestimonialContainer, {
                  slidesPerView: 1,
                  spaceBetween: 15,
                  slidesOffsetAfter: 20,
                  centeredSlides: true,
                  shortSwipes: true,

                  freeMode: false,
                  touchStartPreventDefault: false,
                  preventClicks: false,
                  preventClicksPropagation: false,
                  allowTouchMove: true,
                  simulateTouch: true,

                  resistance: true,
                  resistanceRatio: 0.5,
                  breakpoints: {
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                      allowTouchMove: true,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                  },

                  on: {
                    touchStart: function () {
                      this.el.style.transition = "none";
                    },
                    touchEnd: function () {
                      this.el.style.transition = "";
                    },
                    // slideChange: function () {
                    //   // Stop all videos when sliding
                    //   const videos = this.el.querySelectorAll("video");
                    //   videos.forEach((video) => {
                    //     video.pause();
                    //   });
                    // },
                  },
                });
              });

              const firstVideo =
                clientTestimonialContainer.querySelector("video");
              if (firstVideo) {
                firstVideo.muted = true; // Ensure muted for autoplay

                const swiperObserver = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        firstVideo.play().catch(() => {
                          // Auto-play might be blocked by browser
                          console.warn(
                            "Issue with auto-playing video, trying to play on user interaction."
                          );
                        });
                      } else {
                        firstVideo.pause();
                      }
                    });
                  },
                  { threshold: 0.5 }
                );
                swiperObserver.observe(clientTestimonialContainer);
              }
            }
          } else {
            document.getElementById("sectiontestimonials").style.display =
              "none";
          }

          // Call the setup function
          setupMediaAndPress(parsedBody);

          let thecasestudies = parsedBody["case study walkthroughs"];
          let videocaseslider = document.getElementById("caseStudyHolder");
          videocaseslider.innerHTML = "";

          if (
            thecasestudies != null &&
            thecasestudies != "" &&
            thecasestudies != undefined &&
            thecasestudies.length > 0
          ) {
            videocaseslider.classList.add(
              "swiper",
              "case-study-container",
              "media-swiper"
            );
            videocaseslider.style.cssText = `width: 100%;`;

            let swiperWrapper = document.createElement("div");
            swiperWrapper.classList.add("swiper-wrapper");

            for (let eachcase in thecasestudies) {
              let caseSlide = document.createElement("div");
              caseSlide.classList.add("swiper-slide", "case-study-video-wrap");
              let caseVideo = document.createElement("video");
              caseVideo.classList.add("case-study-video");
              caseVideo.src = thecasestudies[eachcase].url;
              caseVideo.poster = thecasestudies[eachcase].thumbnail;
              setupVideoControls(caseVideo);
              caseVideo.preload = "metadata";
              caseVideo.playsInline = true;
              caseSlide.append(caseVideo);
              swiperWrapper.append(caseSlide);
            }
            videocaseslider.append(swiperWrapper);
            if (window.innerWidth > 1024) {
              loadSwiperJS().then(() => {
                new Swiper(videocaseslider, {
                  spaceBetween: 25,
                  breakpoints: {
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                      allowTouchMove: true,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                  },
                });
              });
            } else if (window.innerWidth < 1024) {
              loadSwiperJS().then(() => {
                new Swiper(videocaseslider, {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  slidesOffsetAfter: 20,
                  centeredSlides: true,
                  shortSwipes: true,

                  freeMode: false,
                  touchStartPreventDefault: false,
                  preventClicks: false,
                  preventClicksPropagation: false,
                  allowTouchMove: true,
                  simulateTouch: true,

                  resistance: true,
                  resistanceRatio: 0.5,

                  breakpoints: {
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                      allowTouchMove: true,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                  },
                  on: {
                    touchStart: function () {
                      this.el.style.transition = "none";
                    },
                    touchEnd: function () {
                      this.el.style.transition = "";
                    },
                    // slideChange: function () {
                    //   // Stop all videos when sliding
                    //   const videos = this.el.querySelectorAll("video");
                    //   videos.forEach((video) => {
                    //     video.pause();
                    //   });
                    // },
                  },
                });
              });

              const firstVideo = videocaseslider.querySelector("video");
              if (firstVideo) {
                firstVideo.muted = true; // Ensure muted for autoplay

                const swiperObserver = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        firstVideo.play().catch(() => {
                          // Auto-play might be blocked by browser
                          console.warn(
                            "Issue with auto-playing video, trying to play on user interaction."
                          );
                        });
                      } else {
                        firstVideo.pause();
                      }
                    });
                  },
                  { threshold: 0.5 }
                );
                swiperObserver.observe(videocaseslider);
              }
            }
          } else {
            document.getElementById("sectioncasestudy").style.display = "none";
          }

          // let blogs = blogsJson;
          // let themainblogcontainer =
          //   document.getElementById("mainblogscontainer");
          // themainblogcontainer.innerHTML = "";

          // if (
          //   blogs != null &&
          //   blogs != "" &&
          //   blogs != undefined &&
          //   blogs.length > 0
          // ) {
          //   for (let blog in blogsJson) {
          //     blogslide = document.createElement("div");
          //     blogslide.classList.add("slide-img", "2ni", "w-slide");
          //     blogslide.style.maxWidth = "300px";
          //     blogcontainer = document.createElement("div");
          //     blogcontainer.classList.add("img-wrap", "blogsnew");
          //     theembed = document.createElement("div");
          //     theembed.classList.add("code-embed-45", "w-embed");

          //     const previewArticle =
          //       document.createElement("previewbox-article");

          //     previewArticle.setAttribute(
          //       "style",
          //       "--pb-background-color: #ffffff; --pb-background-color-hover: #4a4a4a; --pb-text-color: white; --pb-text-color-light: #1f1f1f;"
          //     );

          //     previewArticle.setAttribute(
          //       "href",
          //       "https://web-highlights.com/about"
          //     );

          //     // Append it to the body or any container
          //     theembed.append(previewArticle);
          //     blogcontainer.appendChild(theembed);
          //     blogslide.append(blogcontainer);
          //     themainblogcontainer.append(blogslide);
          //   }
          // } else {
          //   document.getElementById("sectionblogs").style.display = "none";
          // }
          let theQAs = parsedBody["personal qa"];
          let thequizcontainer = document.getElementById("qanaswercontainer");
          thequizcontainer.innerHTML = "";

          if (
            theQAs != null &&
            theQAs != "" &&
            theQAs != undefined &&
            theQAs.length > 0
          ) {
            for (let eachQa in theQAs) {
              const theqacontainer = document.createElement("div");
              theqacontainer.classList.add("accordion-item-c");
              theqacontainer.setAttribute("trackno", eachQa);
              theqaheader = document.createElement("div");
              theqaheader.classList.add("accordion-btn-c");
              theqaheader.setAttribute("trackno", eachQa);
              theqaheadertext = document.createElement("p");
              theqaheadertext.classList.add("text-block-60-c");
              console.log(theQAs[eachQa].title);
              theqaheadertext.innerText = theQAs[eachQa].title;
              theqaheadertext.setAttribute("trackno", eachQa);
              thearrow = document.createElement("img");
              thearrow.classList.add("accordionclose");
              thearrow.setAttribute("trackno", eachQa);
              thearrow.src =
                "https://cdn.prod.website-files.com/67e360f08a15ef65d8814b41/6803540aab416829b3f3556e_arrow-down.svg";
              qaBody = document.createElement("div");
              qaBody.classList.add("accordion-body-c");
              qaBody.setAttribute("trackno", eachQa);
              qaanswer = document.createElement("p");
              qaanswer.classList.add("para-2c");
              qaanswer.innerText = theQAs[eachQa].description;

              theqaheader.append(theqaheadertext, thearrow);
              qaBody.append(qaanswer);
              theqacontainer.append(theqaheader, qaBody);
              theqacontainer.addEventListener("click", accordionClicked);
              thequizcontainer.append(theqacontainer);
            }
          } else {
            document.getElementById("sectionsfaq").style.display = "none";
          }

          document.getElementById("thepageloader").style.display = "none";
          if (window.Webflow && Webflow.require) {
            Webflow.require("slider").ready();
          }

          resolve("Profile setup complete");
        });

        // Handle the promise resolution
        setupProfile
          .then(() => {
            // Hide the loader only after profile setup is complete
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("pv-page-wrapper").style.display = "block";
          })
          .catch((error) => {
            console.error("Failed to setup profile:", error);
            alert("Error loading lawyer profile");
            // Still hide loader even if there's an error
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("pv-page-wrapper").style.display = "block";
          });
      } else {
        alert("No such lawyer profile");
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("pv-page-wrapper").style.display = "block";
      }
    } else {
      alert("No such lawyer profile");
    }
  } else {
    alert("No such lawyer profile");
  }
});

async function getUserById(userId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: userId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://7zsvpwqz67pnyridifgchw7gda0sxhqy.lambda-url.eu-north-1.on.aws/getuserbyid",
      requestOptions
    );
    const result = await response.text(); // or response.json() if it's JSON
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    return "error";
  }
}

async function fetchBlogByCreator(creatorId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    creator: creatorId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      "https://7zsvpwqz67pnyridifgchw7gda0sxhqy.lambda-url.eu-north-1.on.aws/getblogbycreator",
      requestOptions
    );
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    return "error";
  }
}

async function mapBoxMap(latitude, longitude) {
  try {
    // Your Mapbox access token
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGF3Z2dsZSIsImEiOiJja2RraDU0ZnYwb2lqMnhwbWw2eXVrMjNrIn0.ShD8eyKTv7exWDKR44bSoA";

    // Coordinates: [latitude, longitude]
    const lat = latitude; // Example coordinates (update if needed)
    const long = longitude;
    console.log(lat, "💧💧💧💧", long);

    if (isNaN(lat) || isNaN(long)) {
      throw new Error("Invalid latitude or longitude values");
    }

    const coordinates = [long, lat];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Initialize the map
    const map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: 9,
    });

    const el = document.createElement("div");
    el.className = "pin-marker";

    // Add a marker
    new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        const parts = data.features
          .filter((f) =>
            ["place", "region", "country"].some((type) =>
              f.place_type.includes(type)
            )
          )
          .map((f) => f.text);

        const address = parts.join(", ");

        // Update the address card
        document.querySelector(".address-card div:last-child").textContent =
          address;
      })
      .catch((err) => console.error("Geocoding error:", err));

    let resizeAttempts = 0;
    const resizeInterval = setInterval(() => {
      if (map && resizeAttempts < 3) {
        // Try 10 times (5 seconds total)
        map.resize();
        resizeAttempts++;
      } else {
        clearInterval(resizeInterval);
      }
    }, 500); // Check every 500ms

    return map;
  } catch (error) {
    console.error("Error creating map:", error);
    document.getElementById("sectionmap").style.display = "none";
    return null;
  }
}

function loading() {
  console.log("Starting loading function...");

  const canvas = document.getElementById("rumplelookscanvasSearch");
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  console.log("Canvas found. Initializing Rive...");

  const layoutSearch = new rive.Layout({
    fit: rive.Fit.FitWidth,
  });

  const rumplelooksSearch = new rive.Rive({
    src: "https://cdn.jsdelivr.net/gh/boske999/lawggle/search.riv",
    canvas: canvas,
    artboard: "Search",
    autoplay: true,
    stateMachines: ["StateMachine1"],
    layout: layoutSearch,
    onLoad: () => {
      console.log("Rive animation loaded.");

      try {
        rumplelooksSearch.resizeDrawingSurfaceToCanvas();
        console.log("Resized drawing surface to canvas.");

        const inputsSearch =
          rumplelooksSearch.stateMachineInputs("StateMachine1");
        console.log("Retrieved state machine inputs:", inputsSearch);

        const boolean1InputSearch = inputsSearch.find(
          (input) => input.name === "Boolean1"
        );

        if (boolean1InputSearch) {
          console.log("Found Boolean1 input. Setting it to true...");
          boolean1InputSearch.value = true;
        } else {
          console.warn("Boolean1 input not found.");
        }
      } catch (e) {
        console.error("Error during onLoad:", e);
      }
    },
  });
}

$(document).ready(function () {
  console.log("Document ready. Calling loading()...");
  loading();
});

// Capitalize first letter of each word
// Function to capitalize the first letter of each word in a string
function capitalizeWords(text) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Function to handle media and press mentions section
function setupMediaAndPress(parsedBody) {
  let themediaandPress = parsedBody["media press mentions"];
  let themediacontainer = document.getElementById("mediawrapper");
  themediacontainer.innerHTML = "";

  if (themediaandPress && themediaandPress.length > 0) {
    function extractDomain(url) {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", "");
      } catch (e) {
        return url;
      }
    }

    // Create Swiper container
    const swiperContainer = document.createElement("div");
    swiperContainer.classList.add("swiper", "media-swiper");
    swiperContainer.style.cssText = `width: 100%; overflow: hidden; padding-top: 1.5rem;`;

    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    // Add cards
    themediaandPress.forEach((mediaItem) => {
      const url = mediaItem.url || "#";
      const domain = extractDomain(url);

      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      swiperSlide.style.cssText = `width: auto; flex-shrink: 0; padding: 0 10px;`;

      const card = document.createElement("a");
      card.href = url;
      card.target = "_blank";
      card.style.cssText = `
        display: block;
        width: 100%;
        height: auto;
        border-radius: 8px;
        overflow: hidden;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
      `;

      // Image
      const img = document.createElement("img");
      img.src = mediaItem.image;
      img.alt = mediaItem.title;
      img.style.cssText = `height: 120px; object-fit: cover; width: 100%;`;

      // Content
      const content = document.createElement("div");
      content.style.cssText = `padding: 12px; display: flex; flex-direction: column;`;

      const title = document.createElement("h3");
      title.textContent = mediaItem.title;
      title.style.cssText = `margin: 0 0 6px 0; font-size: 16px; line-height: 1.3; font-weight: 600;`;

      const desc = document.createElement("p");
      if (mediaItem.description && mediaItem.description.length > 90) {
        desc.textContent = mediaItem.description.slice(0, 90) + "...";
      } else {
        desc.textContent = mediaItem.description || "";
      }
      desc.style.cssText = `margin: 0 0 6px 0; font-size: 13px; color: #686868; flex-grow: 1;`;

      const host = document.createElement("span");
      host.textContent = domain;
      host.style.cssText = `font-size: 12px; color: #aaa;`;

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(host);

      card.appendChild(img);
      card.appendChild(content);
      swiperSlide.appendChild(card);
      swiperWrapper.appendChild(swiperSlide);
    });

    swiperContainer.appendChild(swiperWrapper);
    themediacontainer.appendChild(swiperContainer);

    // Load and initialize Swiper
    if (window.innerWidth > 1024) {
      loadSwiperJS().then(() => {
        new Swiper(swiperContainer, {
          spaceBetween: 25,
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
              allowTouchMove: true,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          },
        });
      });
    } else if (window.innerWidth < 1024) {
      loadSwiperJS().then(() => {
        new Swiper(swiperContainer, {
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: false,
          allowTouchMove: true,
          navigation: false,
          pagination: false,
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
              allowTouchMove: true,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
              allowTouchMove: true,
            },
          },
          on: {
            touchStart: function () {
              this.el.style.transition = "none";
            },
            touchEnd: function () {
              this.el.style.transition = "";
            },
          },
        });
      });
    }
  } else {
    document.getElementById("sectionmedia").style.display = "none";
  }
}

// Load Swiper JS
function loadSwiperJS() {
  return new Promise((resolve) => {
    if (window.Swiper) {
      resolve();
      return;
    }

    // Load Swiper CSS if not already loaded
    if (!document.getElementById("swiper-css")) {
      const swiperCSS = document.createElement("link");
      swiperCSS.id = "swiper-css";
      swiperCSS.rel = "stylesheet";
      swiperCSS.href =
        "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
      document.head.appendChild(swiperCSS);
    }

    const swiperScript = document.createElement("script");
    swiperScript.src =
      "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js";
    swiperScript.onload = resolve;
    document.body.appendChild(swiperScript);
  });
}

function accordionClicked(e) {
  // Stop event bubbling to prevent multiple triggers
  e.stopPropagation();

  // Check if the accordion body is already showing
  const item = e.currentTarget;

  const isActive = item.classList.contains("active");

  console.log("Clicked item active status:", isActive); // Debug line

  const accordionItems = document.querySelectorAll(".accordion-item-c");

  // Remove active class from all items
  accordionItems.forEach((otherItem) => {
    otherItem.classList.remove("active");
    const body = otherItem.querySelector(".accordion-body-c");
    body.style.display = "";
  });

  // If the clicked item wasn't active before, make it active now
  if (!isActive) {
    this.classList.add("active");
    console.log("Adding active class"); // Debug line
  } else {
    console.log("Item was active, now closed"); // Debug line
  }
}

function setupVideoControls(videoElement) {
  videoElement.controls = false;

  const showControls = () => {
    videoElement.controls = true;
    // Remove listeners after first interaction
    videoElement.removeEventListener("click", showControls);
    videoElement.removeEventListener("focus", showControls);
    videoElement.removeEventListener("touchstart", showControls);
  };
  videoElement.addEventListener("click", showControls);
  videoElement.addEventListener("focus", showControls);
  videoElement.addEventListener("touchstart", showControls);
}
