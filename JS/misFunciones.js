function validateLogin(){
    const expresiones = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
        pass: /^.{2,8}$/,
        nameuser: /^.{2,80}$/
    }

    let email_login = ($("#email").val()); //// Recogemos el email
    let pass_login = ($("#password").val()); //// Recogemos el password
    
    if (email_login != "" && pass_login != ""){
        if(expresiones.email.test(email_login)){
            $.ajax({
                url:"http://152.67.43.234:8080/api/user/"+email_login+"/"+pass_login,
                // url:"http://localhost:8080/api/user/"+email_login+"/"+pass_login,
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
    
                    if (respuesta.name === "NO DEFINIDO"){
                        const emailHelp = document.getElementById('emailHelp');
                        emailHelp.innerHTML = '<div class="alert alert-danger"> No existe el usuario </div>';
                    }else{
                        console.log("bienvenido");
                        const emailHelp = document.getElementById('emailHelp');
                        emailHelp.innerHTML = '<div class="alert alert-success">'+  'Bienvenido '+ respuesta.name + '</div>';
                        // alert("Bienvenido "+" "+respuesta.name)
                    }
                
                }
            });
        }else{
            const emailHelp = document.getElementById('emailHelp');
            emailHelp.innerHTML = '<div class="alert alert-danger"> El email no es válido! </div>';
            // alert("El emaill no es válido!");
        }
        
    }else{
        const emailHelp = document.getElementById('emailHelp');
        emailHelp.innerHTML = '<div class="alert alert-danger"> Debes ingresar datos </div>';
        // alert("Debes ingresar datos!");
    }
}


function validateRegister(){
    const expresiones = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
        pass: /^.{2,50}$/,
        nameuser: /^.{2,80}$/
    }
    console.log("prueba función");    
    let name_register = ($("#name").val()); //// Recogemos el nombre
    let email_register = ($("#email").val()); //// Recogemos el email
    let pass_register = ($("#password").val()); //// Recogemos password
    let confirm_pass = ($("#confirmpass").val()); //// Recogemos la confimarción

    if (name_register != "" && email_register != "" && pass_register != "" && confirm_pass != ""){
        if(pass_register == confirm_pass){
            if(expresiones.email.test(email_register)){
                if(expresiones.pass.test(pass_register)){
                    if(expresiones.nameuser.test(name_register)){
                        $.ajax({
                            url:"http://152.67.43.234:8080/api/user/"+email_register,
                            // url:"http://localhost:8080/api/user/"+email_register,
                            type:"GET",
                            datatype:"JSON",
                            success:function(respuesta){
                                if (respuesta){
                                    const emailHelp = document.getElementById('emailHelp');
                                    emailHelp.innerHTML = '<div class="alert alert-danger"> El email ya se encuentra registrado! </div>';
                                    // alert("El email ya se encuentra registrado!")
                                }else{
                                    $.ajax({
                                        url:'http://152.67.43.234:8080/api/user/new',
                                        // url:'http://localhost:8080/api/user/new',
                                        data:JSON.stringify({
                                            "name":name_register,
                                            "email":email_register,
                                            "password":password,
                                            "password":confirm_pass,
                                        }),
                                        type:'POST',
                                        contentType:'application/json',
                                        dataType:'json',
                                        error:function(result){
                                            const emailHelp = document.getElementById('emailHelp');
                                            emailHelp.innerHTML = '<div class="alert alert-danger"> No fue posible crear la cuenta </div>';
                                            // alert("No fue posible crear la cuenta");
                                        },
                                        success: function(respuesta){
                                            console.log(respuesta);
                                            if(respuesta.id == null){
                                                const emailHelp = document.getElementById('emailHelp');
                                                emailHelp.innerHTML = '<div class="alert alert-danger"> No fue posible crear la cuenta </div>';
                                                // alert("No fue posible crear la cuenta");
                                            }
                                            else{
                                                const emailHelp = document.getElementById('emailHelp');
                                                emailHelp.innerHTML = '<div class="alert alert-success"> Cuenta creada de forma correcta </div>';
                                                // alert("Cuenta creada de forma correcta!");
                                            }
                        
                                        }
                                    });
                                    
                                }
        
                            }
                        });
                    }else{
                        const emailHelp = document.getElementById('emailHelp');
                        emailHelp.innerHTML = '<div class="alert alert-danger"> El nombre de usuario debe tener más de 2 dígitos y menos de 80. </div>';
                        // alert("El nombre de usuario debe tener más de 2 dígitos y menos de 80.")
                    }
                    
                }else{
                    const emailHelp = document.getElementById('emailHelp');
                    emailHelp.innerHTML = '<div class="alert alert-danger"> La contraseña debe tener más de 2 dígitos y menos de 50. </div>';
                    // alert("La contraseña debe tener más de 2 dígitos y menos de 50.");
                }

            }else{
                const emailHelp = document.getElementById('emailHelp');
                emailHelp.innerHTML = '<div class="alert alert-danger"> El emaill no es válido! </div>';
                // alert("El emaill no es válido!");
            }
        } else{
            const emailHelp = document.getElementById('emailHelp');
            emailHelp.innerHTML = '<div class="alert alert-danger"> La contraseña no coincide! </div>';
            // alert("La contraseña no coincide!");
        }
        
    }else{
        const emailHelp = document.getElementById('emailHelp');
        emailHelp.innerHTML = '<div class="alert alert-danger"> Debes ingresar datos! </div>';
        // alert("Debes ingresar datos!");
    }

}