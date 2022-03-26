let checkboxes = document.querySelectorAll(".checkbox");

for(let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", ($event) => {
        console.log($event.target.value);
        console.log($event.target.checked);
        filter($event.target.value, $event.target.checked);
    });
}

// option 2
//checkboxes.forEach(checkbox => {
 //   checkbox.addEventListener("change", () => {

 //   })
//});

function filter(value, checked) {
    console.log("filter called");
    // parent de l'arbre qui contient l'image de l'arbre et la description
    let arbres = document.querySelectorAll(".arbre");
   //boucle sur les arbres pour tous les parcourir
arbres.forEach(
     (arbre) => {arbre.className="arbre";
        if(value === "Tous" && checked) {
            arbre.className = "arbre";
        }
        // else à ajouter
        else if (value === "Tous" && checked === false) {
            arbre.className = "arbre hidden";
        }
        //filtre pour tous
        else {
            let espece = arbre.querySelector("li.espece").textContent;
            for(let u = 0; u < checkboxes.length; u++) {
                console.log(espece + " vs " + checkboxes[u].value);
                if(checkboxes[u].value === espece && checkboxes[u].checked === false) {
                    arbre.className = "arbre hidden";
                }
            }
        }

    }
    );
};

document.querySelector("#fileInput").addEventListener("submit", ($event) => {
    $event.preventDefault();

    let valeur = document.querySelector("#fileInput").files[0];
    console.log(valeur);

    // fileReader actions
    let fileReader = new FileReader();
    fileReader.onload = function(event) {
        console.log(fileReader.result)
        let tableauArbres = fileReader.result.split("/r/n");

        let container = document.querySelector(".carte");
        tableauArbres.forEach(
            (arbre) => {
                let arbreData = arbre.split(";");
                container.innerHTML += 
                "<div class='arbre' style='top:" 
                + arbreData[0] 
                + ";left: "
                + arbreData[1] 
                + "'><img src='Green.png' />"  
                 + "<div class='info'>"
                 + "<ul>"
                    +  "<li class='espece'>" + arbreData[2] + "</li>"
                    +  "<li class='adresse'>" + arbreData[3] + "</li>"
                 + "</ul>"
                 + "</div>"
                +"</div>";
                    
                console.log(container.innerHTML)
            }
        )
      console.log(tableauArbres);
    }
    fileReader.readAsText(valeur);
});



function showStuff(pop) {
    document.getElementById(pop).style.display = 'none';
}