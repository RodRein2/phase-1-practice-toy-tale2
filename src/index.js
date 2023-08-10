let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const renderToys = () =>{
fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((toys) => {
    toys.forEach((toy) => {
      console.log(toy);
      const toyContainer = document.querySelector("#toy-collection");
      const card = document.createElement("div");
      card.className = "card";
      const h2 = document.createElement("h2");
      const img = document.createElement("img")
      const likes = document.createElement("p")
      const likeBtn = document.createElement("button");
      img.src = toy.image
      img.alt = toy.name
      img.className = "toy-avatar"
      h2.innerHTML = toy.name
      likes.innerHTML = toy.likes
      likeBtn.className = "like-btn"
      likeBtn.id = `${toy.id}`  
      likeBtn.innerHTML = "Like ❤️"

      card.append(h2);
      card.append(img);
      card.append(likes);
      card.append(likeBtn);
      toyContainer.append(card);
      

      
      likeBtn.addEventListener("click",() =>{
        handleLikeToy(toy.id, toy.likes);
      });
    });
  });
};
renderToys();
const handleLikeToy = (toyId, currentLikes) => {
  const newLikes = currentLikes + 1;
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
    },
    body:JSON.stringify({likes: newLikes}),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    const toyContainer = document.querySelector("#toy-collection");
    toyContainer.innerHTML = " "
    renderToys();
  });
};


const toyForm = document.querySelector(".add-toy-form");
toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const image =formData.get("image");
  const likes = 0;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": `${name}`,
      "image": `${image}`,
      "likes": 0
    })
    })
  .then((res) => res.json)
  .then(() => {
    renderToys();
    toyForm.reset();
    toyFormContainer.style.display ="none";
    addToy = false;
  });
});

