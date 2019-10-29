var app = new Vue({
  el: "#vue-app",
  data: {
    stressBooks: [],
    search: ""
  },
  //creates the instance
  created() {
    this.getInfo();
  },
  methods: {
    getInfo: function() {
      fetch("https://api.myjson.com/bins/1h3vb3", {
        method: "GET"
      })
        .then(function(response) {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(function(json) {
          console.log(json);
          app.stressBooks = json.books;
        })
        .catch(function(error) {
          console.log("Request failed:" + error.message);
        });
    }
  },
  //input functions in computed to avoid multiple steps with the dom
  computed: {
    filteredBooks: function() {
      return this.stressBooks.filter(stressBook => {
        return (
          stressBook.titulo.toLowerCase().match(this.search.toLowerCase()) ||
          stressBook.descripcion.toLowerCase().match(this.search.toLowerCase())
        );
      });
    }
  }
});
