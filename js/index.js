document.addEventListener('DOMContentLoaded',()=> {
  let page = 1;
  fetchMonster(page);
  function fetchMonster (page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(res => res.json())
      .then(data => data.forEach(monster => renderMonster(monster)))      
    }
    
  function renderMonster(monster) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const h4 = document.createElement('h4');
    const p = document.createElement('p')
    h2.textContent = monster.name;
    h4.textContent = monster.age;
    p.textContent = monster.description;
    div.append(h2, h4, p);
    container.append(div);
  }
  const container = document.querySelector('#monster-container');
  const div = document.querySelector('#create-monster');
  const form = document.createElement('form');

  //addInput("name", "name...")
  const nameInput = document.createElement('input');
  const ageInput = document.createElement('input');
  const desInput = document.createElement('input');
  const bttn = document.createElement('button');

  nameInput.setAttribute("id", "name");
  nameInput.setAttribute("placeholder", "name...");
  ageInput.setAttribute("id", "age")
  ageInput.setAttribute("placeholder", "age...")
  desInput.setAttribute("id", "description")
  desInput.setAttribute("placeholder", "description...")
  bttn.textContent = "Create"
  form.append(nameInput, ageInput, desInput, bttn);
  div.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let monster = {
      name : e.target.name.value,
      age : e.target.name.age,
      description : e.target.name.description
    }
    postMonster(monster);
    //console.log(monster)
  })
  
  function postMonster(monster) {
    fetch("http://localhost:3000/monsters/", {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify(monster)
    })
    .then (res=>res.json())
    .then (data => console.log(data))
  }
  
  const backBttn = document.querySelector('#back');
  const forwardBttn = document.querySelector('#forward');

  forwardBttn.addEventListener('click', ()=> {
    container.innerHTML ='';
    page += 1;
    fetchMonster(page);
  
  })
  
  backBttn.addEventListener('click', ()=> {
    container.innerHTML ='';
    page -= 1;
    fetchMonster(page);
  })

})