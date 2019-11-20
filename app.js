var firebaseConfig = {
    apiKey: "AIzaSyCUHWjeCIrcCeSy3ZjBPWI44UrSuQ6EE7c",
    authDomain: "repertorioreact.firebaseapp.com",
    databaseURL: "https://repertorioreact.firebaseio.com",
    projectId: "repertorioreact",
    storageBucket: "repertorioreact.appspot.com",
    messagingSenderId: "1003378859504",
    appId: "1:1003378859504:web:f48edd5922b431d642d135"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

var database = firebase.database()

new Vue({
    el: "#app",
    data: {
        musicas: []
    },
    created: function () {
       
        this.carregaDadosIniciais()
    },
    methods: {
        carregaDadosIniciais() {
            vm = this;
            this.musicas =[]
            var result = firebase.database().ref().child("MARCELO");
            result.on('value', function (snapshot) {
                Object.entries(snapshot.val().repertório).forEach(data => {
                    data.forEach(data => {
                        let r = typeof data
                        if (r !== 'string') {
                            vm.musicas.push(data)
                        }

                    })
                })
            });
        },
        filtrar(e) {
            if (!e.target.value) {
                this.carregaDadosIniciais()
            } else {
                const query = firebase.database().
                    ref("MARCELO").
                    child('repertório').
                    orderByChild('Musica').
                    equalTo(e.target.value.toUpperCase());
                query.on('value', (dados) => {
                    dados.forEach((data) => {
                        if (data.val().Autor) {
                            this.musicas = []
                            this.musicas.push(data.val())
                        }
                    })
                })
            }
        }
    }

})