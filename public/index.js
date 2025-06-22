import { dates } from './utils/dates.js'

const tickersArr = []

const generateReportBtn = document.querySelector('.generate-report-btn')
generateReportBtn.addEventListener('click', fetchStockData)

document.getElementById('ticker-input-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const tickerInput = document.getElementById('ticker-input')
    if (tickerInput.value.length > 2) {
        generateReportBtn.disabled = false
        const newTickerStr = tickerInput.value
        tickersArr.push(newTickerStr.toUpperCase())
        tickerInput.value = ''
        renderTickers()
    } else {
        const label = document.getElementsByTagName('label')[0]
        label.style.color = 'red'
        label.textContent = 'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
    }
})

function renderTickers() {
    const tickersDiv = document.querySelector('.ticker-choice-display')
    tickersDiv.innerHTML = ''
    tickersArr.forEach((ticker) => {
        const newTickerSpan = document.createElement('span')
        newTickerSpan.textContent = ticker
        newTickerSpan.classList.add('ticker')
        tickersDiv.appendChild(newTickerSpan)
    })
}

function summarizeStock(ticker, data) {
    const prices = data.results.map(day => `$${day.c.toFixed(2)}`).join(', ')
    const totalChange = ((data.results.at(-1).c - data.results[0].o) / data.results[0].o * 100).toFixed(2)
    return `Ticker: ${ticker}\nPrices over last 3 days: ${prices}\nTotal % change: ${totalChange}%\nVolume trend: ${data.results.map(d => d.v).join(', ')}`
}

const loadingArea = document.querySelector('.loading-panel')
const apiMessage = document.getElementById('api-message')

async function fetchStockData() {
    document.querySelector('.action-panel').style.display = 'none'
    loadingArea.style.display = 'flex'

    try {
        const stockData = await Promise.all(tickersArr.map(async (ticker) => {
            const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=4qgRt8y7Ioz4JnFDvmR1UqtXMYKO5doC`
            const response = await fetch(url)
            const status = response.status

            if (status === 200) {
                const data = await response.json()
                console.log(`📈 Data for ${ticker}:`, data)
                return { ticker, data }
            } else {
                console.warn(`⚠️ Failed to fetch ${ticker} (status ${status})`)
                return { ticker, data: null }
            }
        }))

        const summaries = stockData.map(({ ticker, data }) => {
            if (data && data.results) {
                return summarizeStock(ticker, data)
            } else {
                return `No data available for ${ticker}`
            }
        })

        const finalPrompt = summaries.join('\n\n')
        console.log('📝 Final AI Input:\n', finalPrompt)

        await fetchReport(finalPrompt)
    } catch (err) {
        loadingArea.innerText = 'There was an error fetching stock data.'
        console.error('❌ Error during stock data fetch:', err)
    }
}

async function fetchReport(data) {
    try {
        const response = await fetch('/api/generate-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stockData: data })
        })

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`)
        }

        const result = await response.json()
        renderReport(result.report)
    } catch (err) {
        console.error('❌ Error in fetchReport:', err)
        loadingArea.innerText = 'Unable to access AI. Please refresh and try again.'
    }
}

function renderReport(output) {
    loadingArea.style.display = 'none'
    const outputArea = document.querySelector('.output-panel')
    const report = document.createElement('p')
    report.textContent = output
    outputArea.appendChild(report)
    outputArea.style.display = 'flex'
}

document.querySelector('.add-ticker-btn').addEventListener('click', () => {
    // Simulate form submission
    document.getElementById('ticker-input-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
});
