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


function renderImgs() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();


  // this will run and make sure they are unique
  // ? multiple conditions to check for with 3 images
  // ? OR use a container to store your 3 indexes and do your validation on that

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }

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


// ***** EVENT HANDLERS **********

function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  // TODO: Add clicks to the image that was clicked
  console.log('img clicked >>', imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === imgClicked) {
      // increase vote counts
      productArray[i].clicks++;
    }
  }

  // TODO: decrement the vote count
  voteCount--;

  // TODO: call the render img to reload new images
  renderImgs();

  // TODO: after voting rounds have ended... end the clicks!
  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults() {
  // TODO: Display results - once there are no more votes left
  if (voteCount === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} was clicked ${productArray[i].clicks} times, and was seen ${productArray[i].views} times.`;
      resultsContainer.appendChild(liElem);

      resultsBtn.removeEventListener('click', handleShowResults);
    }
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

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
