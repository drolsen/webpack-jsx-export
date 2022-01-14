// Simple plugin to fix quotes

const Quotes = (options = {}) => {
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
      document = clean(
        document.toString(),
        {
          '&quot;': '"',
          '&#34;': '"',
          '&#x27;': '\'',
          '&#39;': '\''
        }      
      );
    }
  };
};

module.exports = Quotes;