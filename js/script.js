/*
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*

Milestone 2 
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 10,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 20,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 30,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 40,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 50,
        "created": "2021-03-05"
    }
];
// Array
//console.log(posts);


// Like function
function likeForLikes( hCnt ){

    let counter = hCnt.innerHTML;
    //console.log('counter = ' + counter);
    counter++;
    hCnt.innerHTML = counter;
}


// Struttura interna post
function postStructure(postOnSocial){

    const postOnOutput = document.getElementById('postOnOutput');
    const post = document.createElement('div');
    post.className = 'post';

    // 1) Creo struttura da visualizzare 
    for(let i = 0; i < postOnSocial.length; i++){

        // Creo elemento div 
        const stucturePost = `
    
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${postOnSocial[i].author.image}" alt="">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${postOnSocial[i].author.name}</div>
                    <div class="post-meta__time">Posted on ${postOnSocial[i].created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text"> ${postOnSocial[i].content}</div>

        
        <div class="post__image">
            <img src="${postOnSocial[i].media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" data-postid="1">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Like</span>
                    </a>
                </div>
                <div class="likes__counter">
                    <b id="like-counter-1" class="js-likes-counter">${postOnSocial[i].likes}</b> people likes your post
                </div>
            </div> 
        </div>         
        `;  
        // 
        post.innerHTML += stucturePost;
        postOnOutput.append(post);  

    }  // end for()

    // 2) Recupero tutti gli elementi dell'array pulsante 
    let counterLikesBut = document.querySelectorAll('.like-button');

    // 3) Recupero tutti gli elementi dell'array like counter 
    let counterLikesCnt = document.querySelectorAll('.js-likes-counter');

    // 4) Scansione sugli elementi e assegno valore iniziale a like counter 
    for(let i=0; i < counterLikesBut.length; i++){
        // 4.1 Impostiamo i like al valore della structura
        let counter = postOnSocial[i].likes;
        counterLikesCnt[i].innerHTML = counter;

        // 4.2) Add event listener per il puls passandogli il puntatore a obj like counter 
        counterLikesBut[i].addEventListener('click', function () { likeForLikes(counterLikesCnt[i]); }, false );
    }
      

}

//
postStructure(posts);
