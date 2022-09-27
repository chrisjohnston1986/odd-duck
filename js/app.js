'use-strict';

console.log('hello there!');


// ******* GLOBAL VARIABLES *******

let voteCount = 25;
let productArray = [];


// ******* DOM REFERENCES *********

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('view-results');
let resultsContainer = document.getElementById('results-container');


// ******* CONSTRUCTOR FUNCTION ********
// TODO: Create a constructor function that creates an object associated with each product

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}


// ****** HELPER FUNCTION / UTILITIES ******

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

let indexArray = [];


function renderImgs() {

  while (indexArray.length < 6) {
    let randomNum = randomIndex();
    if (!indexArray.includes(randomNum)) {
      indexArray.push(randomNum);
    }
  }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;
}

function renderChart() {
  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < productArray.length; i++) {
    prodNames.push(productArray[i].name);
    prodVotes.push(productArray[i].clicks);
    prodViews.push(productArray[i].views);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        data: prodVotes,
        label: '# of Votes',
        backgroundColor: [
          'green',
          'brown',
          'white',
          'burlywood',
          'black',
        ],
        borderColor: [
          'black',
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// ***** EVENT HANDLERS **********

// TODO: after voting rounds have ended... end the clicks!
function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;
  console.log('img clicked >>', imgClicked);
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === imgClicked) {
      productArray[i].clicks++;
    }
  }
  voteCount--;
  renderImgs();
  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
  }
}

// TODO: Display results - once there are no more votes left
function handleShowResults() {
  if (voteCount === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} received ${productArray[i].clicks} votes, and was seen ${productArray[i].views} times.`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}


// ****** EXECUTABLE CODE ********

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');
console.log(productArray);

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
