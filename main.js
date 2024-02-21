const API_KEY = `63f5f229f63e4668897bf96f197f7b39`;
let news = [];
const getLatesNews = async() => {
    const url = new URL (
        `https://newstimes-noonaproject.netlify.app/top-headlines?category=business`
    );
const response = await fetch(url);
const data = await response.json();
news = data.articles;
console.log("ddddd",news);
};

getLatesNews () ; 
