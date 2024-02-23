const API_KEY = `63f5f229f63e4668897bf96f197f7b39`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");

let url = new URL(`https://newstimes-noonaproject.netlify.app/top-headlines?`);
// `https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

// side menu
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

// search
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

//getNews repectoring
const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

// call news
const getLatesNews = async () => {
  url = new URL(`https://newstimes-noonaproject.netlify.app/top-headlines?`);
  // `https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`
  getNews();
};

//by keyword
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://newstimes-noonaproject.netlify.app/top-headlines?q=${keyword}`
  ); // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apikey=${API_KEY}`
  getNews();
};

//by category
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newstimes-noonaproject.netlify.app/top-headlines?category=${category}`
  ); // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apikey=${API_KEY}`
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
    <div class="col-lg-4">
    <img class="news-img-size" 
    src="${news.urlToImage}" alt="">
    </div>
        <div class="col-lg-8">
        <h2> ${news.title}</h2>
        <p>${news.description}</p>
        <div>
         ${news.source.name} * ${news.publishedAt}
        </div>
    </div> 
</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

//error 
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};
getLatesNews();
