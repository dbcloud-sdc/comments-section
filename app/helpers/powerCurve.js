const base = Math.log(1e7);

function randomSongPath(userContext, events, done) {
  const power = Math.random() * base;
  userContext.vars.songPath = `/${1e7 - Math.floor(Math.exp(power))}/comments`;
  return done();
}

function powerDistribution(n = 1e7) {
  const baseNumber = Math.log(n);
  return function randomNumber() {
    const power = Math.random() * baseNumber;
    return n - Math.floor(Math.exp(power));
  };
}

module.exports = {
  randomSongPath,
  powerDistribution,
};
