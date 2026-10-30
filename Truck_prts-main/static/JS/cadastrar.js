// ======================================================
// TRUCK PARTS - CADASTRO
// VALIDAÇÃO DO FORMULÁRIO
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formCadastro");

    const nome = document.getElementById("nome");
    const dataNascimento = document.getElementById("data_nascimento");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const email = document.getElementById("email");
    const cep = document.getElementById("cep");
    const numero = document.getElementById("numero");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmar_senha");

    const erroNome = document.getElementById("erroNome");
    const erroData = document.getElementById("erroData");
    const erroCpf = document.getElementById("erroCpf");
    const erroTelefone = document.getElementById("erroTelefone");
    const erroEmail = document.getElementById("erroEmail");
    const erroCep = document.getElementById("erroCep");
    const erroNumero = document.getElementById("erroNumero");
    const erroSenha = document.getElementById("erroSenha");
    const erroConfirmarSenha =
        document.getElementById("erroConfirmarSenha");
    const erroTipo = document.getElementById("erroTipo");


    // ==================================================
    // FUNÇÕES DE ERRO
    // ==================================================

    function mostrarErro(campo, mensagemElemento, mensagem) {

        campo.classList.add("input-erro");

        if (mensagemElemento) {
            mensagemElemento.textContent = mensagem;
        }
    }


    function limparErro(campo, mensagemElemento) {

        campo.classList.remove("input-erro");

        if (mensagemElemento) {
            mensagemElemento.textContent = "";
        }
    }


    // ==================================================
    // CPF
    // ==================================================

    cpf.addEventListener("input", function () {

        let valor = cpf.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        if (valor.length > 9) {

            cpf.value = valor.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                "$1.$2.$3-$4"
            );

        } else if (valor.length > 6) {

            cpf.value = valor.replace(
                /(\d{3})(\d{3})(\d{1,3})/,
                "$1.$2.$3"
            );

        } else if (valor.length > 3) {

            cpf.value = valor.replace(
                /(\d{3})(\d{1,3})/,
                "$1.$2"
            );

        } else {

            cpf.value = valor;
        }

        limparErro(cpf, erroCpf);
    });


    function validarCPF(valor) {

        const numeros = valor.replace(/\D/g, "");

        if (numeros.length !== 11) {
            return false;
        }

        if (/^(\d)\1{10}$/.test(numeros)) {
            return false;
        }

        let soma = 0;

        for (let i = 0; i < 9; i++) {
            soma += Number(numeros[i]) * (10 - i);
        }

        let resto = soma % 11;

        let digito1 = resto < 2 ? 0 : 11 - resto;

        if (digito1 !== Number(numeros[9])) {
            return false;
        }

        soma = 0;

        for (let i = 0; i < 10; i++) {
            soma += Number(numeros[i]) * (11 - i);
        }

        resto = soma % 11;

        let digito2 = resto < 2 ? 0 : 11 - resto;

        if (digito2 !== Number(numeros[10])) {
            return false;
        }

        return true;
    }


    // ==================================================
    // CEP
    // ==================================================

    cep.addEventListener("input", function () {

        let valor = cep.value.replace(/\D/g, "");

        valor = valor.substring(0, 8);

        if (valor.length > 5) {

            cep.value = valor.replace(
                /(\d{5})(\d{1,3})/,
                "$1-$2"
            );

        } else {

            cep.value = valor;
        }

        limparErro(cep, erroCep);
    });


    function validarCEP(valor) {

        const numeros = valor.replace(/\D/g, "");

        if (numeros.length !== 8) {
            return false;
        }

        if (/^0{8}$/.test(numeros)) {
            return false;
        }

        return true;
    }


    // ==================================================
    // TELEFONE
    // ==================================================

    telefone.addEventListener("input", function () {

        telefone.value =
            telefone.value
                .replace(/\D/g, "")
                .substring(0, 11);

        limparErro(telefone, erroTelefone);
    });


    // ==================================================
    // NOME
    // ==================================================

    nome.addEventListener("input", function () {

        limparErro(nome, erroNome);
    });


    // ==================================================
    // DATA
    // ==================================================

    dataNascimento.addEventListener("change", function () {

        limparErro(dataNascimento, erroData);
    });


    // ==================================================
    // EMAIL
    // ==================================================

    email.addEventListener("input", function () {

        limparErro(email, erroEmail);
    });


    function validarEmail(valor) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(valor.trim());
    }


    // ==================================================
    // NÚMERO
    // ==================================================

    numero.addEventListener("input", function () {

        limparErro(numero, erroNumero);
    });


    // ==================================================
    // SENHA
    // ==================================================

    senha.addEventListener("input", function () {

        limparErro(senha, erroSenha);

        if (
            confirmarSenha.value !== "" &&
            confirmarSenha.value !== senha.value
        ) {

            mostrarErro(
                confirmarSenha,
                erroConfirmarSenha,
                "As senhas não coincidem."
            );

        } else {

            limparErro(
                confirmarSenha,
                erroConfirmarSenha
            );
        }
    });


    // ==================================================
    // CONFIRMAR SENHA
    // ==================================================

    confirmarSenha.addEventListener("input", function () {

        if (confirmarSenha.value !== senha.value) {

            mostrarErro(
                confirmarSenha,
                erroConfirmarSenha,
                "As senhas não coincidem."
            );

        } else {

            limparErro(
                confirmarSenha,
                erroConfirmarSenha
            );
        }
    });


    // ==================================================
    // ENVIO DO FORMULÁRIO
    // ==================================================

    form.addEventListener("submit", function (event) {

        let valido = true;


        // ----------------------------------------------
        // NOME
        // ----------------------------------------------

        if (nome.value.trim().length < 3) {

            mostrarErro(
                nome,
                erroNome,
                "Digite seu nome completo."
            );

            valido = false;

        } else {

            limparErro(nome, erroNome);
        }


        // ----------------------------------------------
        // DATA
        // ----------------------------------------------

        if (!dataNascimento.value) {

            mostrarErro(
                dataNascimento,
                erroData,
                "Informe sua data de nascimento."
            );

            valido = false;

        } else {

            const data =
                new Date(
                    dataNascimento.value + "T00:00:00"
                );

            const hoje = new Date();

            if (data > hoje) {

                mostrarErro(
                    dataNascimento,
                    erroData,
                    "Informe uma data válida."
                );

                valido = false;

            } else {

                limparErro(
                    dataNascimento,
                    erroData
                );
            }
        }


        // ----------------------------------------------
        // CPF
        // ----------------------------------------------

        if (!validarCPF(cpf.value)) {

            mostrarErro(
                cpf,
                erroCpf,
                "CPF inválido."
            );

            valido = false;

        } else {

            limparErro(cpf, erroCpf);
        }


        // ----------------------------------------------
        // TELEFONE
        // ----------------------------------------------

        const telefoneNumeros =
            telefone.value.replace(/\D/g, "");

        if (
            telefoneNumeros.length !== 10 &&
            telefoneNumeros.length !== 11
        ) {

            mostrarErro(
                telefone,
                erroTelefone,
                "Digite um telefone válido."
            );

            valido = false;

        } else {

            limparErro(
                telefone,
                erroTelefone
            );
        }


        // ----------------------------------------------
        // EMAIL
        // ----------------------------------------------

        if (!validarEmail(email.value)) {

            mostrarErro(
                email,
                erroEmail,
                "Digite um e-mail válido."
            );

            valido = false;

        } else {

            limparErro(
                email,
                erroEmail
            );
        }


        // ----------------------------------------------
        // CEP
        // ----------------------------------------------

        if (!validarCEP(cep.value)) {

            mostrarErro(
                cep,
                erroCep,
                "CEP inválido."
            );

            valido = false;

        } else {

            limparErro(cep, erroCep);
        }


        // ----------------------------------------------
        // NÚMERO
        // ----------------------------------------------

        if (numero.value.trim() === "") {

            mostrarErro(
                numero,
                erroNumero,
                "Informe o número."
            );

            valido = false;

        } else {

            limparErro(numero, erroNumero);
        }


        // ----------------------------------------------
        // TIPO DE CADASTRO
        // ----------------------------------------------

        const tipo =
            document.querySelector(
                'input[name="tipo_cadastro"]:checked'
            );

        if (!tipo) {

            erroTipo.textContent =
                "Selecione o tipo de cadastro.";

            valido = false;

        } else {

            erroTipo.textContent = "";
        }


        // ----------------------------------------------
        // SENHA
        // ----------------------------------------------

        if (senha.value.length < 6) {

            mostrarErro(
                senha,
                erroSenha,
                "A senha deve ter pelo menos 6 caracteres."
            );

            valido = false;

        } else {

            limparErro(senha, erroSenha);
        }


        // ----------------------------------------------
        // CONFIRMAR SENHA
        // ----------------------------------------------

        if (confirmarSenha.value !== senha.value) {

            mostrarErro(
                confirmarSenha,
                erroConfirmarSenha,
                "As senhas não coincidem."
            );

            valido = false;

        } else {

            limparErro(
                confirmarSenha,
                erroConfirmarSenha
            );
        }


        // ----------------------------------------------
        // IMPEDIR ENVIO SE EXISTIR ERRO
        // ----------------------------------------------

        if (!valido) {

            event.preventDefault();

            const primeiroErro =
                document.querySelector(
                    ".input-erro"
                );

            if (primeiroErro) {

                primeiroErro.focus();

                primeiroErro.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }

    });


    // ==================================================
    // ERRO VINDO DO FLASK
    // ==================================================

    const campoErro =
        document.body.dataset.campoErro;

    if (campoErro) {

        const campo =
            document.getElementById(campoErro);

        if (campo) {

            campo.classList.add("input-erro");

            campo.focus();

            campo.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }

});