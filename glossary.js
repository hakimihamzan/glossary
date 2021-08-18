//  --------------------------------------------------------------------------------default homepage

let divCenterInfo = document.querySelector("div.middle-info");
count = 1;

function insertHTMLDefault(item) {
  let divOne = document.createElement("div");
  divOne.classList.add("p-5");
  if (count % 2 === 0) {
    divOne.style.background = "black";
    divOne.style.color = "white";
  } else {
    divOne.style.background = "white";
  }

  // p tag for head
  let para = document.createElement("p");
  para.style.fontSize = "30px";
  para.classList.add("lead");
  para.classList.add("fs-1");
  para.innerHTML = item.term;

  divOne.appendChild(para);

  // p tag for subhead
  let sub = document.createElement("p");
  sub.style.fontSize = "20px";
  sub.classList.add("border-top");
  sub.innerHTML = item.definition;

  divOne.appendChild(sub);

  divCenterInfo.appendChild(divOne);

  count++;
}

glossary.forEach(insertHTMLDefault);

//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------search function

let searchBtn = document.querySelector("button.search-etc");
let searchInput = document.querySelector("input.search-etc");

// callback function when search
function searchTerm() {
  let searchWord = searchInput.value;
  let searchWordLow = searchWord.toLowerCase();

  // creating a filtered glossary containing the keyword
  let glossaryFiltered = glossary.filter(function (item) {
    let eachTerm = item.term;
    let eachTermLow = eachTerm.toLowerCase();

    let eachDefinition = item.definition;
    let eachDefinitionLow = eachDefinition.toLowerCase();

    return eachTermLow.includes(searchWordLow) || eachDefinitionLow.includes(searchWordLow);
  });

  console.log(glossaryFiltered);

  count = 1;

  divCenterInfo.innerHTML = "";

  glossaryFiltered.forEach(insertHTMLDefault);

  //   searchInput.value = "";
}

// press enter during search works too!
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchTerm();
  }
});

searchBtn.addEventListener("click", searchTerm);

//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------class dropDown function

let classDropdown = document.querySelector("ul.class-drop");

let classArr = [];

function reducingItem(item, index) {
  //console.log(item.class); // log class in glossary , 00, 01, 02

  // removing duplicate class number
  if (!classArr.includes(item.class)) {
    classArr.push(item.class);
  }
}

glossary.forEach(reducingItem);

// console.log(classArr);

//appending each class item to dropdown
classArr.forEach(function (item, index) {
  let li = document.createElement("li");
  li.innerHTML = item;
  li.classList.add("class-onclick");
  li.classList.add("dropdown-item");
  classDropdown.appendChild(li);
});

//getting LIST item to add event listener for search
let totalLI = document.querySelectorAll("li.class-onclick");

function onClassItemClicked() {
  console.log(this.innerHTML);
  // this will refer to 0,1,2,3,4
  let num = this.innerHTML;

  let glossaryFilteredForClass = glossary.filter(function (item) {
    let classItem = item.class;
    //     console.log(`${classItem} this is class item`);
    return classItem == num;
  });

  console.log(glossaryFilteredForClass);

  count = 1;

  divCenterInfo.innerHTML = "";

  glossaryFilteredForClass.forEach(insertHTMLDefault);
}

for (let i = 0; i < totalLI.length; i++) {
  totalLI[i].addEventListener("click", onClassItemClicked);
}

//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------tag dropDown function

// div to append check-box containing terms
let biggestDiv = document.querySelector("div.checkbox-tag");

// creating array containing tags
let tagsArray = [];

glossary.forEach(function (item) {
  // dont try this at home
  let currentFirst = item.tags;
  currentFirst.forEach(function (item2) {
    if (!tagsArray.includes(item2)) {
      tagsArray.push(item2);
    }
  });
});

tagsArray.forEach(function (item) {
  //   console.log(item); // git github

  // creating outerdiv element
  let outerDiv = document.createElement("div");
  outerDiv.classList.add("form-check");
  outerDiv.classList.add("form-check-inline");

  // appending two child to outerDiv : input && label
  //creating input
  let input = document.createElement("input");
  input.classList.add("form-check-input");
  input.type = "checkbox";
  input.id = item;
  input.name = "tags";
  input.value = item;

  // adding eventListener
  input.addEventListener("change", function () {
    // if checked we will search for term related
    if (this.checked) {
      let tag = this.id;

      let glossaryFilteredForTags = glossary.filter(function (item) {
        let itemChosen = item.tags;
        return itemChosen.includes(tag);
      });

      console.log(glossaryFilteredForTags);

      count = 1;

      divCenterInfo.innerHTML = "";

      glossaryFilteredForTags.forEach(insertHTMLDefault);
    } else {
      console.log(`${this.value} is not checked`);
    }
  });

  //creating label
  let label = document.createElement("label");
  label.classList.add("form-check-label");
  label.htmlFor = item;
  label.innerHTML = item;

  outerDiv.appendChild(input);
  outerDiv.appendChild(label);

  biggestDiv.appendChild(outerDiv);
});

//--------------------------------------------
