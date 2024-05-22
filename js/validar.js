//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var password = document.querySelector("#inputPassword");
var passwordHelp = document.querySelector("#inputPasswordHelp");
var passStrengthMeter = document.querySelector("#passStrengthMeter");


/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   
    const semEspacos = nome.value.replace(/\s/g, '');
    console.log(semEspacos);

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido."; 
        nomeHelp.style.color = "red";
    }
    else if(semEspacos.length < 6){
        nomeHelp.textContent = "Formato de nome inválido. Ao total o nome deve ter mais de 6 caracteres."; 
        nomeHelp.style.color = "red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido.";
        anoHelp.style.color="red";
    }
    else{
        const anoMinimo = 1900;
        const anoMaximo = 2022; 
        
        if( parseInt(anoTrimado) > anoMaximo ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que 2022.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < anoMinimo ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que 1900.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}
);

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
email.addEventListener('focusout', validarEmail);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarEmail(e){ 
    //declaração da expressão regular para definir o formato de um email válido
    const regexEmail = /^(\d*[a-z]+\d*)+@(\d*[a-z]+\d*)+\.br|com|net|org$/i
    
    console.log(e.target.value); //impressão em console do valor do objeto 'email' que originou o evento   

    if(e.target.value.trim().match(regexEmail)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputEmailHelp
        emailHelp.textContent = "Formato de email inválido."; 
        emailHelp.style.color = "red";
    }
    else{
        emailHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

password.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de uma senha válida    
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])[a-zA-Z0-9!@#$%*()_+^&}{:;?.]{6,20}$/;

    //tirar (trim) espaços em branco antes e depois da string
    const passwordTrimado = password.value.trim();
    console.log(password.value);

    if(passwordTrimado.match(regexPassword)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputPasswordHelp
        passwordHelp.textContent = "Formato de senha inválido.";
        passwordHelp.style.color = "red";

    }
    else{
        const anoNascimento = ano.value.trim();
        const regexAnoNascimento = new RegExp(anoNascimento);

        const PrimeiroNome = nome.value.split(' ');

        const regexPrimeiroNome = new RegExp(PrimeiroNome.join('|'), "i");

        const senha = passwordTrimado;

        if(senha.match(regexAnoNascimento)){
            // console.log("A senha contém o ano de nascimento.");
            passwordHelp.textContent = "Senha inválido. A senha contém o ano de nascimento.";
            return "Senha inválida.";
        }
        if(senha.match(regexPrimeiroNome)){
            // console.log("A senha contém o seu nome.");
            passwordHelp.textContent = "Senha inválido. A senha contém o seu nome.";
            return "Senha inválida.";
        }
        passwordHelp.textContent = "";

        // Critérios de segurança
        const comprimentoMinimo = 8;
        const comprimentoModerado = 12;

        // Verificar comprimento mínimo
        if (password.value.length < comprimentoMinimo && contarNumeros(password.value) >= 1 && contarEspeciais(password.value) >= 1) {
            // pontuacao += 1;
            passwordHelp.textContent = "Senha fraca.";
            passwordHelp.style.color = "orange";
        }

        // Verificar critérios para uma senha moderada
        if (password.value.length > comprimentoMinimo && contarNumeros(password.value) >= 1 && contarEspeciais(password.value) >= 1 && contarMaiusculas(password.value) >= 1) {
            passwordHelp.textContent = "Senha moderada.";
            passwordHelp.style.color = "yellow";
        }

        // Verificar critérios para uma senha forte
        if (password.value.length > comprimentoModerado && contarNumeros(password.value) > 1 && contarEspeciais(password.value) > 1 && contarMaiusculas(password.value) > 1) {
            passwordHelp.textContent = "Senha forte.";
            passwordHelp.style.color = "green";
        }
    }
});

// função para contar a quantidade de ocorrencias de numeros na senha
function contarNumeros(senha){
     const numeros = senha.match(/\d/g); // Expressão regular para corresponder a números

    // Verificar se a correspondência é nula (nenhum número encontrado)
    if (numeros === null) {
        return 0;
    } else {
        return numeros.length;
    }
}

// função para contar a quantidade de ocorrencias de letras maiusculas na senha
function contarMaiusculas(senha){
     const maiusculas = senha.match(/[A-Z]/g); // Expressão regular para corresponder a números

    // Verificar se a correspondência é nula (nenhum número encontrado)
    if (maiusculas === null) {
        return 0;
    } else {
        return maiusculas.length;
    }
}

// função para contar a quantidade de ocorrencias de caracteres especiais na senha
function contarEspeciais(senha){
     const especiais = senha.match(/[!@#$%*()_+^&}{:;?.]/g); // Expressão regular para corresponder a números

    // Verificar se a correspondência é nula (nenhum número encontrado)
    if (especiais === null) {
        return 0;
    } else {
        return especiais.length;
    }
}