//  -------------------------------------------------display all in glossary at the start--------------default homepage

let divCenterInfo = document.querySelector("div.middle-info");
alternateBackgroundCount = 1;

function insertHTMLDefault(item) {
  let divOne = document.createElement("div");
  divOne.classList.add("p-5");
  if (alternateBackgroundCount % 2 === 0) {
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

  alternateBackgroundCount++;
}

glossary.forEach(insertHTMLDefault);

//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------search function

let searchBtn = document.querySelector("button.search-etc");
let searchInput = document.querySelector("input.search-etc");
let dropDownSelect = document.querySelector("select.class-drop-select");

// callback function when search
function searchTerm() {
  let searchWord = searchInput.value;
  let searchWordLow = searchWord.toLowerCase();

  let keywordContainerArray = [];

  keywordContainerArray.push(dropDownSelect.value);

  let allCheckbox = document.querySelectorAll("input.form-check-input");
  for (let i = 0; i < allCheckbox.length; i++) {
    if (allCheckbox[i].checked) {
      keywordContainerArray.push(allCheckbox[i].value.toLowerCase());
    }
  }

  keywordContainerArray.push(searchWordLow);
  console.log(keywordContainerArray);

  let glossaryFilteredForAll = [];

  // looping thru each keyword in the keywordContainerArray
  for (let i = 0; i < keywordContainerArray.length; i++) {
    let keywordToMatch = keywordContainerArray[i];

    // looping thru glossary and finding match
    for (let j = 0; j < glossary.length; j++) {
      // current looped glossary object
      let currentGlossaryObject = glossary[j];

      // getting the term key in current glossary object
      let eachTerm = currentGlossaryObject.term;
      let eachTermLow = eachTerm.toLowerCase();

      // if found matches
      if (eachTermLow.includes(keywordToMatch) && keywordToMatch != "") {
        console.log(`Found a match in keywrdtomatch and term ${keywordToMatch} --- ${eachTermLow}`);
        // push if not already exists
        if (!glossaryFilteredForAll.includes(currentGlossaryObject)) {
          glossaryFilteredForAll.push(currentGlossaryObject);
        }
      }

      // getting the definition key in current glossary object
      let eachDefinition = currentGlossaryObject.definition;
      let eachDefinitionLow = eachDefinition.toLowerCase();

      if (eachDefinitionLow.includes(keywordToMatch) && keywordToMatch != "") {
        console.log(`Found a match in keywrdtomatch and definition ${keywordToMatch} --- ${eachDefinitionLow}`);
        if (!glossaryFilteredForAll.includes(currentGlossaryObject)) {
          glossaryFilteredForAll.push(currentGlossaryObject);
        }
      }

      let classNumber = currentGlossaryObject.class;

      // keywordToMatch cames from an array and we make sure that it is not empty string
      if (classNumber == keywordToMatch && keywordToMatch != "") {
        console.log(`Found a match in classNumberand glossClass ${keywordToMatch} --- ${classNumber}`);
        if (!glossaryFilteredForAll.includes(currentGlossaryObject)) {
          glossaryFilteredForAll.push(currentGlossaryObject);
        }
      }

      //looping thru tagsArray
      let tagsArray = currentGlossaryObject.tags;

      for (let k = 0; k < tagsArray.length; k++) {
        let currentTag = tagsArray[k];
        if (currentTag.includes(keywordToMatch) && keywordToMatch != "") {
          if (!glossaryFilteredForAll.includes(currentGlossaryObject)) {
            glossaryFilteredForAll.push(currentGlossaryObject);
          }
        }
      }
    }
  }

  console.log(glossaryFilteredForAll);

  alternateBackgroundCount = 1;

  divCenterInfo.innerHTML = "";

  glossaryFilteredForAll.forEach(insertHTMLDefault);
}

searchBtn.addEventListener("click", searchTerm);

//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------class first dropDown function

//  ---removed

//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------class-drop-select function
// populating the class dropdown with glossary's item
let dropSelect = document.querySelector(".class-drop-select");

// contains the number of class in glossary
let classArr = [];

// we remove duplicates class number here
function reducingItem(item, index) {
  //console.log(item.class); // log class in glossary , 00, 01, 02
  // removing duplicate class number and pushing to classArr
  if (!classArr.includes(item.class)) {
    classArr.push(item.class);
  }
}

glossary.forEach(reducingItem); // all we do here is to populate the classArr

//appending each class item to dropdown - select
classArr.forEach(function (item, index) {
  let opt = document.createElement("option");
  opt.value = item;
  opt.innerHTML = item;

  dropSelect.appendChild(opt);
});
//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------tag dropDown function
// populating the tags checkbox with glossary's item

// div to append check-box containing terms
let biggestDiv = document.querySelector("div.checkbox-tag");

// creating array containing tags
let tagsArray = [];

glossary.forEach(function (item) {
  // dont try this at home
  let currentFirst = item.tags;
  // curentFirst is also an array so we loop thru it again
  currentFirst.forEach(function (item2) {
    if (!tagsArray.includes(item2)) {
      tagsArray.push(item2);
    }
  });
});

// we loop the tags array and append to div
tagsArray.forEach(function (item) {
  //   console.log(item); // git github, programming

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
//--------------------------------------------
//-------------------------------------------- animation

let arrow = document.querySelector(".arrow");
let divAnimate = document.querySelector(".animate-top");
divAnimate.style.position = "absolute";

let topPos = -50;
divAnimate.style.top = `${topPos}px`;

document.body.onload = function () {
  animatingTop();
};

function animatingTop() {
  topPos += 2;
  divAnimate.style.top = `${topPos}px`;

  if (topPos == 0) {
    divAnimate.style.position = "static";
    arrow.style.visibility = "visible";
  }
  if (topPos < 0) {
    setTimeout(animatingTop, 1000 / 60);
  }
}
