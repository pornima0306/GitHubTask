let cl = console.log;

const baseUrl = 'https://api.github.com/users';
const search = document.getElementById('search');
const main =document.getElementById('main')
const serchsection=document.getElementById('serchsection')
cl(main)
cl(Array.from(main.children))
let postArray=[]
let repoResult =""
//let newRepoUrl ='https://api.github.com/users/mojombo/repos?sort=created';



const makeApiCall =(url,methodName, Objbody)=>{
    return fetch(url,{
        method :methodName,
        body :Objbody,
        headers :{
            'Content-type': 'application/json; charset=UTF-8'   
        }
    }).then(res=>res.json())

}
/* let getUrl =`${baseUrl}`
makeApiCall(getUrl,"GET")
    .then(res=>{
        postArray = res
    })
    .catch(cl) */


const makeNetworkCall =(url,methodName,objBody)=>{
    return fetch(url,{
        method: methodName,
        body: objBody,
        headers :{
            'Content-type': 'application/json; charset=UTF-8'   
        }
    }).then(res=>res.json())
}

/* makeNetworkCall(newRepoUrl,"GET")
    .then(cl)
    .catch(cl) */

    function templating(arr){
        let result =" ";
        arr.forEach(ele =>{
            result +=`
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <figure>
                                                    <img src="${ele.avatar_url}" alt="" class="image">

                                                    <figcaption class="figcaption" id="figCap">
                                                    <h1>${ele.name}</h1>
                                                    <div class="followers">
                                                    <span><a href="${ele.followers_url}">Followers(${ele.followers})</a></span>&nbsp &nbsp &nbsp &nbsp
                                                    <span><a href="${ele.following_url}">Following(${ele.following})</a></span>&nbsp &nbsp &nbsp &nbsp
                                                    <span><a href="${ele.repos_url}">Repos(${ele.public_repos})</a></span>
                                                    </div>
                                                    <div id="repos" class="repos">
                                                        
                                                        ${RepoTemp(ele.repoLinks)}
                                                       
                                                    </div>
                                                    
                                                </figcaption>
                                        </figure>
                                    </div>
                                </div>`
        })
        main.innerHTML=result;
        let repos = document.getElementById("repos")
        repos.innerHTML = repoResult
    }
                       
    
   
    

    
     const onKeyup=(e)=>{
       // cl('event trigger')
        repoResult=""
        let name = e.target.value
        
        postArray = postArray.filter(e=>e.login.toLowerCase().includes(name))
        
       
        if(name){
            var newUrl = `${baseUrl}/${name}`
        }
            makeNetworkCall(newUrl,"GET")
            .then(res=>{
                
                cl(res)
                postArray.push(res)
                //templating(postArray)
                if(!name){
                    postArray=[]
                    //templating(postArray)
                }
                let repoUrl = res.repos_url
                makeNetworkCall(repoUrl,"GET")
                    .then(data=>{
                        let repoArr =[]
                        data.forEach(ele=>{
                            let obj={
                                name : ele.name,
                                pageUrl : ele.html_url
                            }
                           /*  cl(obj) */
                            repoArr.push(obj)
                            cl(repoArr)
                        })
                        
                        postArray[0].repoLinks = repoArr;   //repoLinks object is created
                        cl(postArray)
                        templating(postArray)
                         
                })
                .catch(cl)    
        })
        .catch(cl) 
        
       

       } 

        
    function RepoTemp (array){
        array.forEach((ele,i)=>{
            if(i<=4){
                repoResult +=`
                  <span><a target="_blank" href="${ele.pageUrl}">${ele.name}</a></span>&nbsp 
                
                `
            }
        })
    }

    /* const onKeyup=(e)=>{
        // cl('event trigger')
         repoResult=""
         let name = e.target.value
         
         postArray = postArray.filter(e=>e.login.toLowerCase().includes(name))
         
         let newUrl = `${baseUrl}/${name}`
         
         makeNetworkCall(newUrl,"GET")
             .then(res=>{
                 
                 cl(res)
                 postArray.push(res)
                 templating(postArray)
                 if(!name){
                     postArray=[]
                     templating(postArray)
                 }
                    
         })
         .catch(cl)
         getRepoUrl()
 
        } */


    function getRepoUrl(repo){
        let repoURL = `${baseUrl}/${repo}/repos?sort=created`
        fetch(repoURL,"GET")
            .then(res =>{
                cl(res)
                tempRepo(res)
            })
            .catch(cl)
    }

/*     function tempRepo (repo){
        let repos = document.getElementById("repos");
        if(repo){
            repo.length = 5;
            repo.forEach(ele=>{
                let repoTag = document.createElement("a")
                repoTag.classList.add("repCSS")
                repoTag.href = ele.html_url;
                repoTag.target ="_blank";
                repoTag.innerText = ele.name;

                repos.appendChild(repoTag)
            })
        }
    }
     */
    search.addEventListener('keyup',onKeyup)

   


 