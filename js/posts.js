const selector = document.getElementById("theme-selector");

selector.addEventListener("change", () => {
  document.body.className = "";
  const theme = selector.value + "-theme";
  document.body.classList.add(theme);
});

let posts = [];
const formatData = (data) => {
  const date = new Date(data);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  return `${day} ${month}`;
};
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

fetch(
  "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl"
)
  .then((response) => response.json())
  .then((data) => {
    posts = data.results;
    const postsCon = document.getElementById("postsCon");
    posts.forEach((post) => {
      postsCon.innerHTML += `
      <div class="news d-flex pb-36px border-bottom-1 justify-content-between">
        <div class="left d-flex flex-column gap-70px">
          <div class="top d-flex flex-column gap-5 w-693px">
            <div class="info-top d-flex justify-content-start gap-1 align-items-center">
              <img src="./img/avatarka.png" alt="avatarka" class="avatarka" />
              <p class="authors-name m-0 inter-medium text-nowrap">${
                post.byline
              }</p>
              <p class="delimeter m-0 inter-medium text-gray">in</p>
              <p class="topics-name m-0 inter-medium">${post.section}</p>
              <p
                class="delimeter m-0 inter-medium w-12px d-flex justify-content-center"
              >
                ·
              </p>
              <p class="date m-0 inter-medium text-gray">${formatData(
                post.updated_date
              )}</p>
            </div>
            <div class="top__text d-flex flex-column gap-4">
              <h1 class="title m-0 inter-bold">${post.title}</h1>
              <p class="description m-0 inter-regular">
                ${post.abstract}
              </p>
            </div>
          </div>
          <div class="info-bottom d-flex justify-content-between w-755px">
            <div class="info-bottom__info d-flex align-items-center gap-2">
              <button
                class="btn inter-medium px-3 border-0 bg-deep-blue-12 border-r-100px"
              >
                <span class="label-text text-deep-navy">${
                  post.subsection
                }</span>
              </button>
              <p class="12-min-read m-0 text-gray inter-medium w-77px">
                ${getRandomInt(1, 10)} min read
              </p>
              <p
                class="delimeter m-0 w-12px inter-medium d-flex justify-content-center"
              >
                ·
              </p>
              <p class="selected-for-you m-0 text-gray inter-medium w-110px">
                Selected for you
              </p>
            </div>
            <div class="info-bottom__actions d-flex align-items-end gap-14px">
              <div class="icon w-h-24px bg-paper"></div>
              <div class="icon w-h-24px bg-paper"></div>
              <div class="icon w-h-24px bg-paper"></div>
            </div>
          </div>
        </div>
        <img
          src="${post.multimedia[0].url}"
          alt="${post.multimedia[0].caption}"
          class="img h-265px w-265px rounded-1"
        />
      </div>`;
    });
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post");
    if (postId !== null) {
      const index = parseInt(postId, 10) - 1; 
      if (posts[index]) {
        renderPost(index);
      }
    }

    document.querySelectorAll(".title").forEach((title, index) => {
      title.addEventListener("click", () => {
        history.pushState(
          { postId: index },
          "",
          `posts.html?post=${index + 1}`
        ); 
        renderPost(index);
      });
    });
  });

function renderPost(index) {
  const post = posts[index]; 
  if (!post) return; 

  document.body.innerHTML = `
    <header class="header--first position-relative px-160px py-4">
      <div class="logo">
        <p class="logo__title m-0 kanit-ms">Medium Alike</p>
      </div>
      <div class="container-theme position-absolute">
        <select
          class="position-absolute"
          id="theme-selector"
          aria-label="Theme selction"
        >
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="neon">Neon</option>
          <option value="anime">Anime</option>
        </select>
      </div>
    </header>
    <section class="header--second px-160px py-64px">
      <div class="logo d-flex">
        <a href="http://127.0.0.1:5500/posts.html"
          ><img src="/img/Left.png" alt="left arrow"
        /></a>
      </div>
    </section>
    <main
      class="new-list px-160px pt-96px pb-36px d-flex flex-column gap-45px"
      id="postsCon"
    >
      <div class="left d-flex flex-column gap-70px">
        <div class="fram-23 d-flex justify-content-between">
          <div class="info-top d-flex align-items-center gap-3">
            <img src="./img/avatarka2.png" alt="avatarka" />
            <div class="info d-flex flex-column gap-12px">
              <h2 class="authors-name m-0 inter-mb">${post.byline}</h2>
              <div class="additionally d-flex gap-1">
                <p class="7-july m-0 inter-medium text-gray">${formatData(
                  post.updated_date
                )}</p>
                <p
                  class="delimeter m-0 inter-medium w-12px d-flex justify-content-center text-gray"
                >
                  ·
                </p>
                <p class="12-min-read m-0 inter-medium text-gray">
                  ${getRandomInt(1, 10)} min read
                </p>
                <p
                  class="delimeter m-0 inter-medium w-12px d-flex justify-content-center text-gray"
                >
                  ·
                </p>
                <p class="member-only m-0 inter-medium text-gray">
                  Member-only
                </p>
              </div>
            </div>
          </div>
          <div class="logo d-flex">
            <div class="actions d-flex gap-14px">
              <div
                class="icon w-h-24px d-flex justify-content-center align-items-center"
              >
                <img class="linkedin" src="img/LinkedIn.png" alt="linkedin" />
              </div>
              <div
                class="icon w-h-24px d-flex justify-content-center align-items-center"
              >
                <img
                  class="facebook"
                  src="img/Facebook Circled.png"
                  alt="facebook"
                />
              </div>
              <div
                class="icon w-h-24px d-flex justify-content-center align-items-center"
              >
                <img class="twitter" src="img/twitter.png" alt="twitter" />
              </div>
            </div>
          </div>
        </div>
        <div class="top-text d-flex flex-column gap-4">
          <h1 class="title m-0 inter-bb">${post.title}</h1>
          <p class="description m-0 sfpd">
            ${post.abstract}
          </p>
        </div>
        <img class="image h-480px" src="${post.multimedia[0].url}" alt="${
    post.multimedia[0].caption
  }" />
        <div class="bottom-text d-flex flex-column gap-4">
          <h2 class="subtitle m-0 inter-bs">Subheader</h2>
          <p class="subdescription m-0 sfpd">
            How long are you awake in the morning before you go online? Perhaps
            it’s while you’re still lying in bed, using a news feed or social
            media as the needed stimulant to push you out from under the covers.
            Or maybe you wait to open your device until after a warm shower and
            cup of coffee. If you use sleep tracking apps, you might say you
            never signed off in the first place.
          </p>
          <p class="subdescription m-0 sfpd">
            And, like millions of others during the pandemic, the internet is
            probably what enabled you to stay in touch with family, or complete
            entire years of work and/or school remotely. If this sounds
            familiar, then you live in a part of the world where an internet
            connection now counts as an essential utility — one that’s as easy
            to take for granted as the natural gas heating your shower water or
            the electricity powering your coffee maker.
          </p>
          <p class="subdescription m-0 sfpd">
            But if you think we’re hyperconnected today, just wait. Globally,
            just over 55% of today’s households have an internet connection.
            This gap between the internet haves and have-nots is referred to as
            the digital divide, and access is skewed toward richer nations. The
            gap is projected to close in the next decade as billions of homes
            connect to the internet for the first time and by 2030 it’s
            estimated that the technology industry could account for 20% of the
            global electricity demand. This presents a troublesome dichotomy. On
            one hand, it supports livelihoods, educations, and bolsters the
            global economy; on the other hand, the increased usage of the apps,
            websites, and services that we build will place an even greater
            strain on our already-overloaded power grids.
          </p>
        </div>
        <div class="info-bottom d-flex justify-content-between">
          <div class="subactions-first d-flex gap-14px">
            <div class="frame-1 d-flex gap-1 align-items-center">
              <div
                class="icon d-flex justify-content-center align-items-center w-h-24px"
              >
                <img class="heart w-h-18px" src="/img/Heart.png" alt="heart" />
              </div>
              <p class="label-text m-0 inter-medium">180</p>
            </div>
            <div class="frame-1 d-flex gap-1 align-items-center">
              <div
                class="icon d-flex justify-content-center align-items-center w-h-24px"
              >
                <img
                  class="comment w-h-18px"
                  src="/img/Speech Bubble.png"
                  alt="comment"
                />
              </div>
              <p class="label-text m-0 inter-medium">12</p>
            </div>
          </div>
          <div class="subactions-second">
            <div
              class="icon justify-content-center align-items-center w-h-24px"
            >
              <img
                class="bookmark w-h-18px"
                src="/img/Bookmark.png"
                alt="bookmark"
                class="bookmark"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer
      class="footer d-flex flex-column align-items-end px-160px pt-306px pb-32px gap-32px"
    >
      <div class="frame-22">
        <div class="frame-22__menu">
          <button class="btn border-0 d-flex px-12px py-10px">
            <span class="label-text inter-medium text-blue-gray"
              >Credits: photos from<a
                class="linking-text text-blue-gray"
                href="https://unsplash.com/@surface"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash.com</a
              >, icons from
              <a
                class="linking-text text-blue-gray"
                href="https://unsplash.com/@surface"
                target="_blank"
                rel="noopener noreferrer"
                >Icons8, </a
              >graphics from
              <a
                class="linking-text text-blue-gray"
                href="https://craftwork.design/checkout/purchase-confirmation/?payment_key=a3ba0d28aa30dfd691cd535acb1f4228"
                target="_blank"
                rel="noopener noreferrer"
                >craftwork.design</a
              >.</span
            >
          </button>
        </div>
      </div>
      <div class="menu">
        <button class="btn border-0 d-flex px-12px py-10px">
          <span class="label-text inter-medium"
            >Made with
            <img
              class="glitter h-16px"
              src="./img/glitter.png"
              alt="glitter"
            />🖤 at nFactorial in 2022.</span
          >
        </button>
      </div>
    </footer>
`;
  window.scrollTo(0, 0);
}
