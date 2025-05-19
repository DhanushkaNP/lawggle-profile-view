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
          let firmUrl = parsedBody["firm url"];
          document.getElementById("thefirmurl").innerText =
            firmUrl.length > 22 ? firmUrl.substring(0, 22) + "..." : firmUrl;
          document.getElementById("thefirmurl").href = firmUrl;

          let minrate = parsedBody["min hourly rate"];
          let maxrate = parsedBody["max hourly rate"];
          let ratecombined = "NA";

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
            let theaddressLong = theLawyeraddress.lat;
            let theaddressLat = theLawyeraddress.long;

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
            twitterLink != null &&
            twitterLink != "" &&
            twitterLink != undefined
          ) {
            document.getElementById("socialmediahold").style.display = "flex";
            let twittergo = document.getElementById("xlink");
            twittergo.href = twitterLink;
            twittergo.style.display = "block";
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
            expertholder.innerText = "N/A";
          }

          let thehobbies = parsedBody["interests and hobbies"];
          let hobbiesContainer = document.getElementById("interestshobbies");
          hobbiesContainer.innerHTML = "";

          if (thehobbies.length > 0) {
            for (let eachhobby in thehobbies) {
              hobbyholder = document.createElement("div");
              hobbyholder.classList.add("expertisecontainer");
              let hobbyText = thehobbies[eachhobby].title;
              hobbyholder.innerText = capitalizeWords(hobbyText);
              hobbiesContainer.append(hobbyholder);
            }
          } else {
            hobbiesContainer.innerText = "NA";
          }

          let educactionList = parsedBody["AllEducation"];
          let education1;
          if (educactionList != null && educactionList != undefined) {
            console.log(educactionList);
            if (educactionList.length > 0) {
              education1 = educactionList[0].education;

              let educationwrapper = document.getElementById("educationwrap");
              educationwrapper.innerHTML = "";
              if (
                (education1 != null &&
                  education1 != undefined &&
                  education1 != "null") ||
                education1 != ""
              ) {
                for (let eachEducation in educactionList) {
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
              let educationwrapper = document.getElementById("educationwrap");
              educationwrapper.innerText = "N/A";
            }
          } else {
            educationwrapper.innerText = "N/A";
          }

          let dynamicBio = parsedBody["dynamic bio"];
          if (
            dynamicBio == null ||
            dynamicBio == "null" ||
            dynamicBio == undefined ||
            dynamicBio == ""
          ) {
            dynamicBio = "N/A";
          }
          document.getElementById("biotext").innerText = dynamicBio;

          let certificates = parsedBody["certificates"];
          let certicateslider = document.getElementById("certificatediv");
          certicateslider.innerHTML = "";
          console.log(certificates);
          if (certificates.length > 0) {
            let firstCert = certificates[0];
            if (
              firstCert != null &&
              firstCert != undefined &&
              firstCert != "null" &&
              firstCert != ""
            ) {
              for (let eachcert in certificates) {
                let imageslide = document.createElement("div");
                imageslide.classList.add("slide-img", "2ne", "w-slide");
                imageslide.style.maxWidth = "300px";
                let imageContainer = document.createElement("div");
                imageContainer.classList.add("img-wrap");
                let certimage = document.createElement("img");
                certimage.classList.add("imagyclass");
                certimage.src = certificates[eachcert].url;
                imageContainer.append(certimage);
                imageslide.append(imageContainer);
                certicateslider.append(imageslide);
              }
            } else {
              document.getElementById("certificatethehold").style.display ==
                "none";
            }
          } else {
            console.log(document.querySelectorAll("#certificatethehold"));
            document.getElementById("certificatethehold").style.display =
              "none";
          }

          let theuserLanguages = parsedBody["languages"];
          let languagecontainer = document.getElementById(
            "thelanguagecontainer"
          );
          languagecontainer.innerHTML = "";
          if (theuserLanguages.length > 0) {
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
            languagecontainer.innerText = "N/A";
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

          if (notableCaseWins.length > 0) {
            for (let eachcase in notableCaseWins) {
              caseWinDiv = document.createElement("div");
              caseWinDiv.classList.add("crd");
              caseText = document.createElement("p");
              caseText.classList.add("notablecasewintext");
              caseText.innerText = notableCaseWins[eachcase].description;
              caseWinDiv.append(caseText);
              notablecasewinscontainer.append(caseWinDiv);
            }
          } else {
            document.getElementById("sectioncasewins").style.display = "none";
          }

          let clientTestimonials = parsedBody["client video testimonials"];
          let clientTestimonialContainer =
            document.getElementById("testimonialholder");
          clientTestimonialContainer.innerHTML = "";
          if (clientTestimonials.length > 0) {
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

          let themediaandPress = parsedBody["media press mentions"];
          themediacontainer = document.getElementById("mediawrapper");
          mediawrapper.innerHTML = "";

          if (themediaandPress.length > 0) {
            let themax = themediaandPress.length;
            if (themax > 3) {
              themax = 3;
            }

            for (let i = 0; i < themax; i++) {
              mediacard = document.createElement("div");
              mediacard.classList.add("crds");
              previewLink = document.createElement("previewbox-link");

              previewLink.setAttribute(
                "style",
                "--pb-background-color: transparent; --pb-text-color: #000000; --pb-text-color-light:#686868; height: 100%;"
              );
              previewLink.setAttribute(
                "href",
                "https://lawggle-b065c1-7854620dcb65bd8d14aa462e.webflow.io/"
              );

              // Append it to the body or any container
              mediacard.append(previewLink);
              themediacontainer.append(mediacard);
            }
          } else {
            document.getElementById("sectionmedia").style.display = "none";
          }

          let thecasestudies = parsedBody["case study walkthroughs"];
          let videocaseslider = document.getElementById("casestudyslider");
          videocaseslider.innerHTML = "";

          if (thecasestudies.length > 0) {
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
          if (blogsJson.length > 0) {
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

          if (theQAs.length > 0) {
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
    lat = Number(latitude);
    long = Number(longitude);
    console.log(lat, "💧💧💧💧", long);

    if (isNaN(lat) || isNaN(long)) {
      throw new Error("Invalid latitude or longitude values");
    }

    const coordinates = [long, lat];

    // Initialize the map
    const map = new mapboxgl.Map({
      container: "#mapbox",
      style: "mapbox://styles/lawggle/ckdkhap9e159e1imq6foj0ln5",
      center: coordinates,
      zoom: 12,
    });

    // Add a marker
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup().setText("Lawyer's Address"))
      .addTo(map);

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
