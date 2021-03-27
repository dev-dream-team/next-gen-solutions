// Instead of doing this formatting with Moment,
// we use the methods built into the Date object.
// This way, we can avoid bringing in unnecessary dependencies.
// If we needed more utility around time and date manipulation,
// then we could justify adding Moment.
module.exports = {
  format_url: (full_url) => {
    return full_url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split("?")[0];
  },
};
