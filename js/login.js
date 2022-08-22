document.addEventListener("DOMContentLoaded", function() {
    
    //Declaro una variable del boton "Ingresar"
    let button = document.getElementById("button"); 

    //Declaro las constantes de los campos de email y contraseña y los respectivos mensajes de alerta
    const email_input = document.getElementById("email_input");
    const pass_input = document.getElementById("pass_input");
    const email_alert = document.getElementById("email_alert");
    const pass_alert = document.getElementById("pass_alert");

    //Añado un escuchador al boton "Ingresar"
    button.addEventListener("click",function() { 

        //Declaro las variables de los campos de e-mail y contraseña con su respectivo valor
        //Además declaro dos variables vacias para inyectar el mensaje de alerta correspondiente para cada campo

        let email_value = email_input.value;
        let pass_value = pass_input.value;
        let mess_alertE = "";
        let mess_alertP = "";

        //Declaro las condicionales para cada campo teniendo en cuenta los posibles casos que pueden llegar a suceder 
        if(email_value===""){
            mess_alertE = "Ingresa tu e-mail";
            email_alert.innerText = mess_alertE;
            email_input.classList.add("is-invalid");
        }else{
            email_input.classList.remove("is-invalid");
            email_input.classList.add("is-valid");
        }

        if(pass_value.length === 0){
            mess_alertP = "Ingresa tu contraseña";
            pass_alert.innerText = mess_alertP;
            pass_input.classList.add("is-invalid");
        }else{
            pass_alert.innerText = mess_alertP;
            pass_input.classList.remove("is-invalid");
            pass_input.classList.add("is-valid");
        }

        if(email_value.length > 0 && pass_value.length > 0){
            email_input.classList.remove("is-invalid");
            pass_input.classList.remove("is-invalid");
            email_input.classList.add("is-valid");
            pass_input.classList.add("is-valid");
            window.location.replace("index.html");
        }
    }); 
});
