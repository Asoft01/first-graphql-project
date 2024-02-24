const { UserList, MovieList } = require("../FakeData"); 
const _ = require("lodash"); 
const resolvers = {
    Query: {
        // users() {
        //     return UserList;
        // }

        // USERS RESOLVERS
        users:() => {
            return UserList;
        }, 
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        }, 

        // MOVIE RESOLVERS
        movies: () => {
            return MovieList
        }, 
        movie: (parent, args) => {
            const name = args.name; 
            const movie = _.find(MovieList, { name });
            return movie;
        }     
    }, 
    User : {
        favouriteMovies : () => {
            return _.filter(
                MovieList, 
                (movie) => 
                movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
            );
        }
    }, 

    Mutation :  {
        createUser: (parent, args) => {
            const user = args.input
            // console.log(user); 
            const lastId = UserList[UserList.length-1].id
            user.id = lastId + 1;
            UserList.push(user); 
            return user;
        }, 
        createUser: (parent, args) => {
            // const id = args.input.id; 
            // const newUsername = args.input.newUsername

            const { id, newUsername } = args.input; 
            UserList.forEach((user) => {
                if (user.id === id) {
                    user.username = newUsername;
                }
            })

        }
    }
}

module.exports = { resolvers };