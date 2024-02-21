const API_KEY = `63f5f229f63e4668897bf96f197f7b39`;
let news = [];
const getLatesNews = async() => {
    const url = new URL (
        `https://newsapi.org/v2/top-headlines?country=us&apikey=${API_KEY}`
    );
const response = await fetch(url);
const data = await response.json();
news = data.articles;
console.log("ddddd",news);
};

getLatesNews () ; 
