import React from "react";
import axios from "axios";
import Movie from "./Movie";

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
      <div>
        {error
          ? "Error"
          : isLoading
          ? "Loading"
          : movies.map(movie => {
              console.log(movie);
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                />
              );
            })}
      </div>
    );
  }
}

export default App;
