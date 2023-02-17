function getNumberLabel(score: number) {
  if (score < 1000) {
    return score
  }

  return (score / 1000).toFixed(1) + "k"
}

export default getNumberLabel
