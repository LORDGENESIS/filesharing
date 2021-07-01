const drop = document.querySelector(".drop-zone")
const browseBtn = document.querySelector(".browseBtn");
const file = document.querySelector("#file");


const host = "https://inshare.herokuapp.com/";
const uploadURL = `$hostapi/files`;



drop.addEventListener("dragover", (e)=>{
    e.preventDefault();
    if (!drop.classList.contains("dragged")){
        drop.classList.add("dragged");
    }
    
});

drop.addEventListener("dragleave",()=>{
    drop.classList.remove("dragged");
});

drop.addEventListener("drop",(e)=>{
    e.preventDefault(); 
    drop.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length){
        file.files = files;
        uploadFile();
    }
});


file.addEventListener("change",()=>{
    uploadFile();
})


browseBtn.addEventListener("click", ()=>{
    file.click();
});

const uploadFile = ()=>{
    const files = file.files[0]
    const formData = new FormData()
    formData.append("file",file)


    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
        }
    };

    xhr.upload.onprogress = updateProgress;


    xhr.open("post", uploadURl);
    xhr.send(formData);
};

const updateProgress = (e)=>{
    const percent = Math.round((e.loaded / e.total));
    console.log(e);

}


