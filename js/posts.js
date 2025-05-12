const selector = document.getElementById("theme-selector");

selector.addEventListener("change", () => {
  document.body.className = "";
  const theme = selector.value + "-theme";
  document.body.classList.add(theme);
});

fetch(
  "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl"
)
  .then((response) => response.json())
  .then((posts) => {
    const postsCon = document.getElementById("postsCon");
    const formatData = (data) => {
      const date = new Date(data);
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "long" });
      return `${day} ${month}`;
    };
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    posts.results.forEach((post) => {
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
              <h1 class="title m-0 inter-bold redirectButton">${post.title}</h1>
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
  });

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelectorAll(".redirectButton");
  if (button) {
    button.addEventListener("click", () => {
      window.location.href = "posts.html?post=1";
    });
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post");
    if (postId) {
      console.log("Post ID:", postId);
    }
  }
});
