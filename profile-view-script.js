console.log("Test 1");

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
    let blogs = await fetchBlogByCreator(lawyerstring);
    let blogParse1 = JSON.parse(blogs);
    let blogBody = blogParse1.data.body;
    let blogsJson = JSON.parse(JSON.parse(blogBody));
    console.log("🦙🦙🦙😂", blogsJson);

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
            document.getElementById("thefirmurl").innerText =
              firmUrl.length > 22 ? firmUrl.substring(0, 22) + "..." : firmUrl;
            document.getElementById("thefirmurl").href = firmUrl;
          } else {
            document.getElementById("thefirmurl").style.display = "none";
          }

          let minrate = parsedBody["min hourly rate"];
          let maxrate = parsedBody["max hourly rate"];

          if (!minrate && !maxrate) {
            // Neither rate available - show "N/A"
            document.getElementById("hourly-rate").style.display = "none";
          } else {
            if (minrate && maxrate) {
              // Both rates available - show range
              ratecombined = "$" + `${minrate} - ` + "$" + `${maxrate}/Hour`;
            } else if (minrate) {
              // Only min rate available
              ratecombined = "$" + `${minrate}/Hour`;
            } else if (maxrate) {
              // Only max rate available
              ratecombined = "$" + `${maxrate}/Hour`;
            }

            document.getElementById("ratetext").innerText = ratecombined;
          }

          let bannerimage = parsedBody["profile banner"];
          console.log("🥪🥪🔷", bannerimage);

          if (
            bannerimage != null &&
            bannerimage != "" &&
            bannerimage != undefined
          ) {
            let thebannercontainer = document.getElementById("bannercontainer");
            thebannercontainer.style.backgroundImage = `url(${bannerimage})`;
            thebannercontainer.style.backgroundSize = "cover";
            thebannercontainer.style.backgroundPosition = "center";
            thebannercontainer.style.backgroundRepeat = "no-repeat";
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
            freeconsult = "no";
          }
          let probono = parsedBody["free consultation"];
          if (probono == null || probono == undefined || probono == "") {
            probono = "no";
          }
          let contingency = parsedBody["free consultation"];
          if (
            contingency == null ||
            contingency == undefined ||
            contingency == ""
          ) {
            contingency = "no";
          }
          document.getElementById("freeconsultation").innerText = freeconsult;
          document.getElementById("probono").innerText = probono;
          document.getElementById("offercontingency").innerText = contingency;
          let expertholder = document.getElementById("expertisewrap");
          expertholder.innerHTML = "";

          let theexpertise = parsedBody["area of expertise"];
          if (theexpertise.length > 0) {
            for (let eachexpertise in theexpertise) {
              expertcontainer = document.createElement("div");
              expertcontainer.classList.add("expertisecontainer");
              let expertText = theexpertise[eachexpertise];
              expertcontainer.innerText = capitalizeWords(expertText);
              expertholder.append(expertcontainer);
            }
          } else {
            document.getElementById("area-expertise-container").style.display =
              "none";
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
            document.getElementById("interest-hobby-container").style.display =
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

              let educationwrapper = document.getElementById("educationwrap");
              educationwrapper.innerHTML = "";
              if (
                education1 != null &&
                education1 != undefined &&
                education1 != "null" &&
                education1 != ""
              ) {
                for (let eachEducation in educactionList) {
                  console.log("Education", eachEducation);
                  let educationText = educactionList[eachEducation].education;
                  if (
                    educationText != null &&
                    (educationText != undefined) & (educationText != "null") &&
                    educationText != ""
                  ) {
                    educationdisplay = document.createElement("p");
                    educationdisplay.classList.add("educationtexts");
                    educationdisplay.innerText = educationText;
                    educationwrapper.append(educationdisplay);
                  }
                }
              }
            } else {
              console.log("No education found");
              document.getElementById("education-container").style.display =
                "none";
            }
          } else {
            console.log("No education found");
            document.getElementById("education-container").style.display =
              "none";
          }

          let dynamicBio = parsedBody["dynamic bio"];
          if (
            dynamicBio == null ||
            dynamicBio == "null" ||
            dynamicBio == undefined ||
            dynamicBio == ""
          ) {
            document.getElementById("biography-container").style.display =
              "none";
          } else {
            document.getElementById("biotext").innerText = dynamicBio;
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
              certicateContainer.classList.add(
                "swiper",
                "certificate-swiper",
                "media-swiper"
              );
              certicateContainer.style.cssText = `width: 100%; overflow: hidden;`;

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
                certicateContainer.append(swiperWrapper);

                // Initialize Swiper after DOM is fully loaded
                loadSwiperJS().then(() => {
                  new Swiper(".media-swiper", {
                    slidesPerView: "auto",
                    spaceBetween: 5,
                    freeMode: true,
                    pagination: false,
                  });
                });
              } else {
                document.getElementById("certificate-swiper").style.display ==
                  "none";
              }
            } else {
              document.getElementById("biography-container").style.display =
                "none";
            }
          } else {
            console.log(document.querySelectorAll("#certificatethehold"));
            document.getElementById("certificate-swiper").style.display =
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
            document.getElementById("language-section").style.display = "none";
          }

          let profileVideo = parsedBody["profile video"];
          console.log("🖼️🖼️🖼️🖼️🖼️", profileVideo);
          if (
            profileVideo != null &&
            profileVideo != undefined &&
            profileVideo != "null" &&
            profileVideo != ""
          ) {
            console.log("🖼️🖼️🖼️🖼️🖼️", profileVideo);
            document.getElementById("theprofilevideo").src = profileVideo;
          } else {
            document.getElementById("sectionprofilevide0").style.display =
              "none";
          }

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
            notablecasewinscontainer.classList.add("swiper");
            let swiperWrapper = document.createElement("div");
            swiperWrapper.classList.add("swiper-wrapper");
            notablecasewinscontainer.style.cssText = `width: 100%; overflow: hidden;`;

            for (let eachcase in notableCaseWins) {
              let caseWinDiv = document.createElement("div");
              caseWinDiv.classList.add("crd");
              let caseHeading = document.createElement("h4");
              caseHeading.classList.add("notable-case-heading");
              caseHeading.innerText = notableCaseWins[eachcase].title;
              caseWinDiv.append(caseHeading);
              let caseText = document.createElement("p");
              caseText.classList.add("notablecasewintext");
              caseText.innerText = notableCaseWins[eachcase].description;
              caseWinDiv.append(caseText);
              swiperWrapper.append(caseWinDiv);
            }
            notablecasewinscontainer.append(swiperWrapper);

            loadSwiperJS().then(() => {
              new Swiper(".media-swiper", {
                slidesPerView: "auto",
                spaceBetween: 5,
                freeMode: true,
                pagination: false,
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
            let max = clientTestimonials.length;
            if (clientTestimonials.length > 3) {
              max = 3;
            }
            for (i = 0; i <= max - 1; i++) {
              slide = document.createElement("div");
              slide.classList.add("vid-wrap", "testimonialvidwrap");
              testimonialVideo = document.createElement("video");
              testimonialVideo.classList.add(
                "videoclass",
                "testimonialcontainer"
              );
              testimonialVideo.src = clientTestimonials[i].url;
              testimonialVideo.controls = true;
              slide.append(testimonialVideo);
              clientTestimonialContainer.append(slide);
            }
          } else {
            document.getElementById("sectiontestimonials").style.display =
              "none";
          }

          // Call the setup function
          setupMediaAndPress(parsedBody);

          let thecasestudies = parsedBody["case study walkthroughs"];
          let videocaseslider = document.getElementById("casestudyslider");
          videocaseslider.innerHTML = "";

          if (
            thecasestudies != null &&
            thecasestudies != "" &&
            thecasestudies != undefined &&
            thecasestudies.length > 0
          ) {
            for (let eachcase in thecasestudies) {
              caseSlide = document.createElement("div");
              caseSlide.classList.add("slide-img", "2ni", "w-slide");
              caseSlide.style.minWidth = "48%";
              caseSlide.style.maxWidth = "300px";
              videocase = document.createElement("div");
              videocase.classList.add("img-wrap", "casestudies");
              caseVideo = document.createElement("video");
              caseVideo.classList.add("casevideosnew");
              caseVideo.controls = true;
              caseVideo.width = "100%";
              caseVideo.src = thecasestudies[eachcase].url;
              videocase.append(caseVideo);
              caseSlide.append(videocase);
              videocaseslider.append(caseSlide);
            }
          } else {
            document.getElementById("sectioncasestudy").style.display = "none";
          }

          let blogs = blogsJson;
          let themainblogcontainer =
            document.getElementById("mainblogscontainer");
          themainblogcontainer.innerHTML = "";

          if (
            blogs != null &&
            blogs != "" &&
            blogs != undefined &&
            blogs.length > 0
          ) {
            for (let blog in blogsJson) {
              blogslide = document.createElement("div");
              blogslide.classList.add("slide-img", "2ni", "w-slide");
              blogslide.style.maxWidth = "300px";
              blogcontainer = document.createElement("div");
              blogcontainer.classList.add("img-wrap", "blogsnew");
              theembed = document.createElement("div");
              theembed.classList.add("code-embed-45", "w-embed");

              const previewArticle =
                document.createElement("previewbox-article");

              previewArticle.setAttribute(
                "style",
                "--pb-background-color: #ffffff; --pb-background-color-hover: #4a4a4a; --pb-text-color: white; --pb-text-color-light: #1f1f1f;"
              );

              previewArticle.setAttribute(
                "href",
                "https://web-highlights.com/about"
              );

              // Append it to the body or any container
              theembed.append(previewArticle);
              blogcontainer.appendChild(theembed);
              blogslide.append(blogcontainer);
              themainblogcontainer.append(blogslide);
            }
          } else {
            document.getElementById("sectionblogs").style.display = "none";
          }
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
              theqacontainer = document.createElement("div");
              theqacontainer.classList.add("accordion-item-c");
              theqacontainer.setAttribute("trackno", eachQa);
              theqaheader = document.createElement("div");
              theqaheader.classList.add("accordion-btn-c");
              theqaheader.setAttribute("trackno", eachQa);

              theqaheader.addEventListener("click", function () {
                let thisButton = event.target;
                let trackNumber = thisButton.getAttribute("trackno");

                let thecontainers =
                  document.querySelectorAll(".accordion-item-c");
                thecontainers.forEach((el) => {
                  let theselected = el.getAttribute("trackno");
                  if (theselected == trackNumber) {
                    el.classList.add("active");
                  } else {
                    el.classList.remove("active");
                  }
                });

                let thebodycontainers =
                  document.querySelectorAll(".accordion-body-c");
                thebodycontainers.forEach((el) => {
                  let theselected2 = el.getAttribute("trackno");
                  if (theselected2 == trackNumber) {
                    el.style.display = "flex";
                  } else {
                    el.style.display = "none";
                  }
                });
              });

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

    function getMetadataByDomain(url, domain) {
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        return {
          title: "YouTube Video",
          description: "Click to watch this video on YouTube",
          imageUrl: "https://placehold.co/300x200/FF0000/FFFFFF?text=YouTube",
          favicon: "https://www.youtube.com/favicon.ico",
          host: "youtube.com",
        };
      } else if (url.includes("linkedin.com")) {
        return {
          title: "LinkedIn Article",
          description: "Professional content shared on LinkedIn",
          imageUrl: "https://placehold.co/300x200/0077B5/FFFFFF?text=LinkedIn",
          favicon: "https://www.linkedin.com/favicon.ico",
          host: "linkedin.com",
        };
      } else if (url.includes("medium.com")) {
        return {
          title: "Medium Article",
          description: "Read this story on Medium",
          imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=Medium",
          favicon: "https://medium.com/favicon.ico",
          host: "medium.com",
        };
      } else if (url.includes("twitter.com") || url.includes("x.com")) {
        return {
          title: "Tweet",
          description: "View this post on Twitter/X",
          imageUrl: "https://placehold.co/300x200/1DA1F2/FFFFFF?text=Twitter",
          favicon: "https://twitter.com/favicon.ico",
          host: "twitter.com",
        };
      } else if (url.includes("instagram.com")) {
        return {
          title: "Instagram Post",
          description: "View this post on Instagram",
          imageUrl: "https://placehold.co/300x200/E1306C/FFFFFF?text=Instagram",
          favicon: "https://www.instagram.com/favicon.ico",
          host: "instagram.com",
        };
      } else if (url.includes("facebook.com")) {
        return {
          title: "Facebook Post",
          description: "View this content on Facebook",
          imageUrl: "https://placehold.co/300x200/4267B2/FFFFFF?text=Facebook",
          favicon: "https://www.facebook.com/favicon.ico",
          host: "facebook.com",
        };
      } else {
        return {
          title: `Article on ${domain}`,
          description: `View this content on ${domain}`,
          imageUrl: `https://placehold.co/300x200/333333/cccccc?text=${domain}`,
          favicon: null,
          host: domain,
        };
      }
    }

    // Create Swiper container
    const swiperContainer = document.createElement("div");
    swiperContainer.classList.add("swiper", "media-swiper");
    swiperContainer.style.cssText = `width: 100%; padding: 20px 0; overflow: hidden;`;

    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    // Add cards
    themediaandPress.forEach((mediaItem) => {
      const url = mediaItem.url || "#";
      const domain = extractDomain(url);
      const meta = getMetadataByDomain(url, domain);

      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      swiperSlide.style.cssText = `width: auto; flex-shrink: 0; padding: 0 10px;`;

      const card = document.createElement("a");
      card.href = url;
      card.target = "_blank";
      card.style.cssText = `
        display: block;
        width: 300px;
        height: 220px;
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
      img.src = meta.imageUrl;
      img.alt = meta.title;
      img.style.cssText = `height: 120px; object-fit: cover; width: 100%;`;

      // Content
      const content = document.createElement("div");
      content.style.cssText = `padding: 12px; display: flex; flex-direction: column;`;

      const title = document.createElement("h3");
      title.textContent = meta.title;
      title.style.cssText = `margin: 0 0 6px 0; font-size: 16px; line-height: 1.3; font-weight: 600;`;

      const desc = document.createElement("p");
      desc.textContent = meta.description;
      desc.style.cssText = `margin: 0 0 6px 0; font-size: 13px; color: #686868; flex-grow: 1;`;

      const host = document.createElement("span");
      host.textContent = meta.host;
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
    loadSwiperJS().then(() => {
      new Swiper(".media-swiper", {
        slidesPerView: "auto",
        spaceBetween: 5,
        freeMode: true,
        pagination: false,
      });
    });
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
