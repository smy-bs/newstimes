const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click",(event)=>getNewsByCategory(event)));

const API_KEY = `63f5f229f63e4668897bf96f197f7b39`;
let newsList = [];
const getLatesNews = async() => {
    const url = new URL (
        // `https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`
         `https://newstimes-noonaproject.netlify.app/top-headlines?`
    );
const response = await fetch(url);
const data = await response.json();
newsList = data.articles;
render();
console.log("ddddd",newsList);
};
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword");
  const url = new URL (
    // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apikey=${API_KEY}`
      `https://newstimes-noonaproject.netlify.app/top-headlines?q=${keyword}`
  );

  const response = await fetch(url)
  const data = await response.json();
  console.log("keyword data", data);
  newsList = data.articles;
  render();
}

const getNewsByCategory= async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(category);
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apikey=${API_KEY}`
        `https://newstimes-noonaproject.netlify.app/top-headlines?category=${category}`
    );
    const response = await fetch(url)
    const data = await response.json();
    console.log("ddd",data);
    newsList = data.articles;
    render();
};

const render =() => {
    const newsHTML = newsList.map(
        (news) =>`<div class="row news">
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
).join("");
    
    document.getElementById('news-board').innerHTML = newsHTML;
};

getLatesNews () ; 


const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};