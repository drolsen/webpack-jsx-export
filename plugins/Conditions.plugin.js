// Allows for <export> and <no-export> tags in JSX source.

const Conditions = (options = {}) => {
  options = Object.assign({}, {});

  return {
    Parse (document) {
      // Remove any elements flagged to NOT be rendered in production views
      if (document.querySelector('no-export')) {
        const nonExportingFragments = document.querySelectorAll('no-export');
        let nodeLength = nonExportingFragments.length;
        while (nodeLength--) {
          nonExportingFragments[nodeLength].remove();
        }
      }

      if (document.querySelector('export')) {
        const exportingFragments = document.querySelectorAll('export');
        let nodeLength = exportingFragments.length;
        while (nodeLength--) {
          exportingFragments[nodeLength].replaceWith(
            exportingFragments[nodeLength].innerHTML
          );
        }
      }
    }
  };
};

module.exports = Conditions;