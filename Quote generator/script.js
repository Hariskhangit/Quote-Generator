const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn  =document.getElementById('twitter');
const loader = document.getElementById("loader")

// get qutes from API

let apiQuotes = [];

//show loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

// hide loading

function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

//show new quote & 
// pick random quotesfrom apiquote

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];

    // check if author field is balnk, replace it with unkown

    if (!quote.author) {
        authorText.textContent='Unknown'
    }else{
        authorText.textContent=quote.author;
    }
    
    // check quote length to detemmine styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    complete();
}


//Get quotes from API
async function getQuotes(){
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        //catch error here
    }
}

//Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// when loads

getQuotes();

