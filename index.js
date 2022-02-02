
let quotes = [];

const quote_container = document.querySelector('.quote-container')
const quote_text = document.querySelector('.quote');
const quote_author = document.querySelector('.author');
const btn_new_quote = document.querySelector('.btn-new-quote');
const btn_tweet = document.querySelector('.btn-tweet');

const loader = document.querySelector('.loader');

function loading(){
    loader.hidden = false;
    quote_container.hidden = true;
}

function stopLoading(){
    loader.hidden = true;
    quote_container.hidden = false;
}

// loading()

function newQuote(){
    
        loading()
    // Pick a random quote from quotes array
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Check if author field is blank and replace is with Unknown
    if(!quote.author) {
        quote_author.textContent = "Unknown"
    } else {
        quote_author.textContent = quote.author;
    }

    ///check quote text length to determine styling
    if(quote.text.length > 80) {
        quote_text.classList.add('long-quote')
    } else {
        quote_text.classList.remove('long-quote');
    }

    quote_text.textContent = quote.text;
    stopLoading()
}



// Get quotes from API 
async function getQuotes(){
    loading()
    const api_url = 'https://type.fit/api/quotes';  
    try {
        const response = await fetch(api_url);
        quotes = await response.json();
        newQuote()
    } catch (err) {
        console.log(err)
    }
}

// Tweet quote function

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intend/tweet/?text=${quote_text.textContent} - ${quote_author.textContent}`;

    window.open(twitterUrl , '_blank');
}





// load quote
getQuotes()

// event listeners
btn_new_quote.addEventListener('click' , newQuote);
btn_tweet.addEventListener('click', tweetQuote);

