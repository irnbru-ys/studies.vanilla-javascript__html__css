"use strict";

const preview = document.querySelector(".preview");
const myInput = document.querySelector("#myimages");

myInput.addEventListener("change", upload);
preview.addEventListener("click", popupImage);

const popWindow = document.createElement("div");
const popImage = document.createElement("img");
popWindow.addEventListener('click', popupImage);



function upload(event) {
    const files = event.target.files;
    [...files].forEach((file) => {
        const img = document.createElement("img");
        img.classList.add("thumb");
        img.file = file;
        preview.append(img);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            img.src = reader.result;
        });

        reader.readAsDataURL(file);
    });
}

function popupImage(event) {
    if (event.target.classList.contains('thumb')) {
		popWindow.classList.add('thumb-popup');
		popImage.classList.add('thumb-popup-image');
        popImage.setAttribute("src", event.target.src);
        popWindow.append(popImage);
        document.body.insertAdjacentElement("beforeend", popWindow);
    } else if (event.target.classList.contains('thumb-popup-image')) {
		event.target.closest('.thumb-popup').remove();
	} else if (event.target.classList.contains('thumb-popup')) {
		event.target.remove();
	} 
}
