import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { get, getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
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
  const auth = getAuth(app);

  document.getElementById('login-btn').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
  
    // Inicia o processo de login com o Google
    signInWithPopup(auth, provider)
      .then((result) => {
        // Usuário autenticado com sucesso
        const user = result.user;
        const userEmail = user.email;
  
        // Consulta o banco de dados para obter o link correspondente ao e-mail do usuário
        const usersRef = ref(database,);
        get(usersRef).then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              const userData = childSnapshot.val();
              if (userData.email === userEmail) {
                const userLink = userData.link;
                // Redireciona o usuário para o link correspondente
                window.location.href = userLink;
              }
            });
          } else {
            console.log("Nenhum link encontrado para este usuário.");
          }
        }).catch((error) => {
          console.error("Erro ao consultar o banco de dados:", error);
        });
      })
      .catch((error) => {
        // Tratamento de erro, se necessário
        console.error('Erro durante o login:', error);
      });
  });
        

  