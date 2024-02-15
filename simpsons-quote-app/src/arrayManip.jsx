import Joi from "joi";

export const onDeleteItem = (id) => {
  const quotes = [...this.state.quotes];
  const index = quotes.findIndex((item) => item.id === id);
  quotes.splice(index, 1);
  this.setState({ quotes: quotes });
};

export const onLikedItem = (id) => {
  const quotes = [...this.state.quotes];
  const index = quotes.findIndex((item) => item.id === id);
  quotes[index].liked = !quotes[index].liked;
  this.setState({ quotes: quotes });
};

export const onSearchInput = async (e) => {
  let searchInput = { ...this.state.searchInput };
  searchInput = e.target.value;

  this.setState({ searchInput });

  const _joiInstance = Joi.object(this.schema);

  try {
    await _joiInstance.validateAsync({ name: searchInput });
    this.setState({ errors: null });
  } catch (e) {
    const errorsMod = {};
    e.details.forEach((error) => {
      errorsMod[error.context.key] = error.message;
    });
    this.setState({ errors: errorsMod });
  }
};

export const onSortItemValue = (e) => {
  // this.setState({ listOrder: e.target.value });
  const sortingValue = e.target.value;
  const quotes = [...this.state.quotes];
  let sortedQuotes = [...quotes];
  if (sortingValue === "Random") {
    sortedQuotes = quotes.sort(() => Math.random() - 0.5);
  } else {
    sortedQuotes = quotes.sort((a, b) => {
      return a.character.localeCompare(b.character);
    });
    if (sortingValue === "Desc") {
      sortedQuotes.reverse();
    }
  }
  this.setState({ quotes: sortedQuotes });
};
