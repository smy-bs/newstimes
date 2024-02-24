const API_KEY = `63f5f229f63e4668897bf96f197f7b39`;
let newsList = [];
const menus = document.querySelectorAll
(".menus button");

let url = new URL(//`https://newstimes-noonaproject.netlify.app/top-headlines?`
`https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`);

let totalResults = 0; 
let page = 1;
const pageSize = 10;
const groupSize = 5;

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
    url.searchParams.set("page",page); // => &page=page
    url.searchParams.set("pageSize",pageSize);

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
const getLatesNews = async () => {
  url = new URL(//`https://newstimes-noonaproject.netlify.app/top-headlines?pageSize=${PAGE_SIZE}`
  `https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`);
  getNews();
};

//by keyword
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    //`https://newstimes-noonaproject.netlify.app/top-headlines?q=${keyword}`
   `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apikey=${API_KEY}`);
  getNews();
};

//by category
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    //`https://newstimes-noonaproject.netlify.app/top-headlines?category=${category}`
   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apikey=${API_KEY}`);
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

//pagination 내가 정할 수 있는 값
//totalResult 내가 정할 수 있는 값
//page 내가 정할 수 있는 값
//pageSize 내가 정할 수 있는 값
//groupSize 내가 정할 수 있는 값
//pageGroup
//lastpage
//firstPage

const moveToPage =(pageNum) => {
  page = pageNum;
    getNews();
  };

const paginationRender = () => {

const totalPages = Math.ceil(totalResults / pageSize);

const pageGroup = Math.ceil(page / groupSize);
let lastPage = pageGroup * groupSize;
if(lastPage > totalPages){
  lastPage = totalPages;
}
let firstPage = lastPage - (groupSize-1) <= 0 ? 1 : lastPage - (groupSize-1); 

let paginationHTML = ``;
for(let i = firstPage; i<= lastPage; i ++){
  paginationHTML += `
  <li class="page-item ${i === page ? "active" :""} 
  onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
}

document.querySelector(".pagination").innerHTML = paginationHTML;


};
getLatesNews();
