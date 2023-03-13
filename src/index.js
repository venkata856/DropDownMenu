import _ from 'lodash';
import './style.css';

let imageContainerElm;
let clearTime;

let currentImg = 1;
function loadPage(){


    const navDiv = document.createElement('nav');

    const list = document.createElement("ul");
    list.appendChild(createListElement("Macha",1));
    list.appendChild(createListElement("Machine",2));
    list.appendChild(createListElement("Food",3));
    list.appendChild(createListElement("Water",4));

    navDiv.appendChild(list)

    
    document.body.appendChild(navDiv);
    document.body.appendChild(loadImages());

    const sliderContainer=document.querySelector(".slider-main-container")
    sliderContainer.appendChild(imageCircles());

    
    imageContainerElm = document.querySelector('.image-container');
}

loadPage();
updateImages();


function createListElement(listItem,i){

    const mainList = document.createElement("li");
    mainList.textContent = listItem

    const list = document.createElement("ul");
    list.className="dropdown-menu";
    list.classList.add("menu"+i);

    const insideList = document.createElement("li");
    insideList.className = "one";
    insideList.textContent = "one"
    list.appendChild(insideList);

    const insideList1 = document.createElement("li");
    insideList1.className = "one";
    insideList1.textContent = "one"
    list.appendChild(insideList1);

    const insideList2 = document.createElement("li");
    insideList2.className = "one";
    insideList2.textContent = "one"
    list.appendChild(insideList2);

    const insideList3 = document.createElement("li");
    insideList3.className = "one";
    insideList3.textContent = "one"
    list.appendChild(insideList3);


    const insideList4 = document.createElement("li");
    insideList4.className = "one";
    insideList4.textContent = "one"
    list.appendChild(insideList4);
    mainList.appendChild(list);

    return mainList;


}

function loadImages(){

    const sliderMainContainer=document.createElement("div");

    sliderMainContainer.className='slider-main-container';

    const sliderContainer=document.createElement("div");

    sliderContainer.className='slider-container';

    const imageContainer=document.createElement("div");

    imageContainer.className='image-container';

    imageContainer.appendChild(addImage("https://picsum.photos/id/645/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/345/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/445/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/545/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/855/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/845/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/945/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/955/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/655/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/365/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/475/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/585/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/995/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/805/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/915/600/400"));
    imageContainer.appendChild(addImage("https://picsum.photos/id/925/600/400"));

    sliderContainer.appendChild(imageContainer);
    sliderContainer.appendChild(addButtons("forward"));
    sliderContainer.appendChild(addButtons("backward"));


    
    sliderMainContainer.appendChild(sliderContainer);

    


    return sliderMainContainer;


    
}

function addImage(image){


    const imageContainer = document.createElement("img");
    imageContainer.src = image;
    imageContainer.alt = "randomImage";
    return imageContainer;

}

function addButtons(buttonName){

    const buttonElement = document.createElement("div");
    buttonElement.className="btn btn-primary";
    buttonElement.classList.add(buttonName);

    buttonElement.addEventListener("click",(e)=>{

        if(e.target.classList.contains("forward")){
            currentImg++;
            clearTimeout(clearTime);
            updateImages();
            highlightImage();


        }else{

            currentImg--;
            clearTimeout(clearTime);
            updateImages();
            highlightImage();
        }


        
    })

    return buttonElement;
}

function updateImages(){


    const imagesContainerElm = document.querySelector('.image-container');
    const totalImagesElm = document.querySelectorAll('img');

    if(currentImg > totalImagesElm.length){

        currentImg = 1;

    }else if(currentImg < 1){
        currentImg = totalImagesElm.length;
    }

    imageContainerElm.style.transform=`translateX(-${(currentImg - 1) * 600}px)`;

    clearTime=setTimeout(()=>{
        currentImg++;
        updateImages();
        highlightImage();
    },2500);

}


function imageCircles(){

    const imageCirclesContainer = document.createElement('div');
    imageCirclesContainer.className = 'circle-container';
    const imagesContainerElm = document.querySelectorAll('img');

    for(let i =0;i <imagesContainerElm.length; i++){

        const imageCircle = document.createElement('div');
        imageCircle.classList="image-circle";
        imageCircle.dataset.value = i;
        imageCirclesContainer.appendChild(imageCircle);

        imageCircle.addEventListener('click', (e)=>{

            console.log(e.target.dataset.value)
            currentImg=+e.target.dataset.value + 1;
            clearTimeout(clearTime);
            updateImages();
            highlightImage();

            e.target.classList.add("active");
        })

    }

    

    return imageCirclesContainer;
}


//method highlights
function highlightImage(){

    document.querySelectorAll(".image-circle").forEach((element)=>{

        if(! (+element.dataset.value + 1 === currentImg)){

            element.classList.remove("active");

        }else{
            element.classList.add("active");
        }
    })
}