import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBaPn7TrH7osNrwbd9Yf8Cag6v9muDnuoY",
    authDomain: "redirecionamentpapp.firebaseapp.com",
    projectId: "redirecionamentpapp",
    storageBucket: "redirecionamentpapp.appspot.com",
    messagingSenderId: "611807490047",
    appId: "1:611807490047:web:a3e4e684e59d53122d81ca"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

// Função para fazer upload de um arquivo Excel válido
document.getElementById('send-btn').addEventListener('click', ()=>{
    var files = document.getElementById('file_upload').files;
    if (files.length == 0) {
        alert("Por favor, escolha um arquivo...");
        return;
    }

    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();

    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    } else {
        alert("Por favor, selecione um arquivo Excel válido.");
    }
})

// Função para ler o arquivo Excel e convertê-lo em JSON
function excelFileToJSON(file) {
    try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            var result = {};
            var usuario = result
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });

            // Exiba o resultado em formato JSON
            const bd = JSON.stringify(result, null, 2)
            console.log(result)
            const redirectRef = ref(database)
            set(redirectRef, {
                usuario
            }).then(()=>{
                document.getElementById('confirm').style.display = 'block'
                setTimeout(()=>{
                    document.getElementById('confirm').style.display = 'none'
                }, 1000*3)
            })
        };
    } catch (error) {
        console.error("Erro ao converter o arquivo Excel para JSON:", error);
    }
}
