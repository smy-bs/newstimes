const API_KEY = `63f5f229f63e4668897bf96f197f7b39`;
let newsList = [];
const menus = document.querySelectorAll("#menu-list button");

let url = new URL(`https://newstimes-noonaproject.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
//`https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`);

let totalResults = 0;
let page = 1;
const pageSize = 9//13 -한 페이지에 표시될 뉴스의 수
const groupSize = 3;//5 -페이지 그룹의 크기

menus.forEach((menu) => {
  menu.addEventListener("click", (event) => getNewsByCategory(event));
});

//getNews repectoring
const getNews = async () => {
  try {
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

// call news
const getLatestNews = async () => {
  url = new URL(
    `https://newstimes-noonaproject.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  //`https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`);
  getNews();
};

//by keyword
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://newstimes-noonaproject.netlify.app/top-headlines?q=${keyword}`
  );
  //`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apikey=${API_KEY}`);
  getNews();
};

//by category
const getNewsByCategory = async (event) => {
  menus.forEach((item) => {
    item.className = "";
  });
  event.target.className = "selected";

  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newstimes-noonaproject.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  //`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apikey=${API_KEY}`);
  getNews();
};

/*const render = () => {
  let noImageUrl = "images/no-image.png";

  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
    <div class="col-lg-4">

     <a href="${news.url}" target="_blank">
      <img class="news-img-size" 
      src="${news.urlToImage || noImageUrl}" alt="">
    </a>

    </div>
        <div class="col-lg-8">
        <h2> ${news.title}</h2>
        <p>${news.description}
              
        </p>
        <div>
         ${news.source.name} * ${news.publishedAt}
        </div>
    </div> 
</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};*/

const render = () => {
  let noImageUrl = "images/no-image.png";

  let newsRowsHTML = '';
  for (let i = 0; i < newsList.length; i += 3) {
    newsRowsHTML += `<div class="row newsbox">`;

    for (let j = 0; j < 3; j++) {
      let newsIndex = i + j;
      if (newsIndex < newsList.length) {
        let news = newsList[newsIndex];
        let imageUrl = news.urlToImage || noImageUrl; // 이미지 URL이 없으면 대체 이미지 URL 사용
        let description = news.description.length > 50 ? news.description.slice(0, 50) + '...' : news.description; // 50자까지만 보여주기
        newsRowsHTML += `
          <div class="col-lg-4 newsCol">
            <a href="${news.url}" target="_blank" class="aLink">
              <img class="news-img-size" 
              src="${imageUrl}" alt="News Image">
            <h2 class="title">${news.title}</h2>
            <p>${description}</p>
            </a>
            <div>
              ${news.source.name} * ${news.publishedAt}
            </div>
          </div>
        `;
      }
    }

    newsRowsHTML += `</div>`;
  }

  document.getElementById("news-board").innerHTML = newsRowsHTML;
};
//error
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

//pagination 내가 정할 수 있는 값
//totalResult 내가 정할 수 있는 값
//page 내가 정할 수 있는 값
//pageSize 내가 정할 수 있는 값
//groupSize 내가 정할 수 있는 값
//pageGroup
//lastpage
//firstPage
// Function to move to a specific page
const moveToPage = (pageNum) => {
  page = pageNum;
  window.scrollTo({ top: 0, behavior: "smooth" });
  getNews();
};

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  let firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

//   let paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
//   <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
// </li>
//   <li class="page-item" onclick="moveToPage(${page - 1})">
// <a class="page-link" href="#">Previous</a></li>`;
// for (let i = firstPage; i <= lastPage; i++) {
//     paginationHTML += `
//   <li class="page-item ${i === page ? "active" : ""}"
//   onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
//   }
//   paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})">
//   <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a></li>
// <li class="page-item" onclick="moveToPage(${totalPages})">
// <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
// </li>`;

let paginationHTML = "";

if (page > 1) {
  paginationHTML += `
    <li class="page-item" onclick="moveToPage(1)">
      <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
    </li>
    <li class="page-item" onclick="moveToPage(${page - 1})">
      <a class="page-link" href="#">Previous</a>
    </li>`;
}

for (let i = firstPage; i <= lastPage; i++) {
  paginationHTML += `
    <li class="page-item ${i === page ? "active" : ""}" onclick="moveToPage(${i})">
      <a class="page-link">${i}</a>
    </li>`;
}

if (page < totalPages) {
  paginationHTML += `
    <li class="page-item" onclick="moveToPage(${page + 1})">
      <a class="page-link" href='#js-program-detail-bottom'>Next</a>
    </li>`;
}

if (page < totalPages - groupSize + 1) {
  paginationHTML += `
    <li class="page-item" onclick="moveToPage(${totalPages})">
      <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
    </li>`;
}

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

// side menu
const openNav = () => {
  document.getElementById("mySidenav").style.width = "70vw";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
getNews();

// search
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
getLatestNews();
