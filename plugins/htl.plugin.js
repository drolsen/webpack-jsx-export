// Adobe Sightly HTL JSX export plugins

const HTL = (options = {}) => {
  options = Object.assign({}, {});

  const clean = (markup, rules) => {
    Object.keys(rules).map((i) => {
      markup = markup.replace(new RegExp(i, 'g'), rules[i]);
      return false;
    });

    return markup;
  };

  return {
    PostParse (document) {
      document = clean(document.toString(), { 'data-sly-unwrap=""': 'data-sly-unwrap' });
    }
  };
};

module.exports = HTL;