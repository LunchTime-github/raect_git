import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./Reset.css";
import "./App.css";
import "./css/Test.css"

class App extends React.Component {
  state = {
    isLoading: true,
    moveis: [],
    error: false
  };

  getMovies = async () => {
    try {
      const {
        data: {
          data: { movies }
        }
      } = await axios.get(
        "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
      );

      this.setState({
        isLoading: false,
        movies
      });
    } catch (err) {
      this.setState({ error: true });
    }
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies, error } = this.state;
    return (
      <section className="container">
        {error ? (
          "Error"
        ) : isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <main>
            <h1 className="title">VIEW MOVIES</h1>
            <div className="movies">
              {movies.map(movie => {
                return (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    title={movie.title}
                    summary={movie.summary}
                    poster={movie.medium_cover_image}
                    genres={movie.genres}
                  />
                );
              })}
            </div>
          </main>
        )}
      </section>
    );
  }
}

export default App;
