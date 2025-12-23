const icons = ["🍇", "🍒", "🍋", "🍉", "🍎", "🥝"];

export const generateShuffledCards = () => {
  const cards = [...icons, ...icons].map((icon, index) => ({
    id: index + Math.random(),
    icon,
    flipped: false,
    matched: false
  }));

  return cards.sort(() => Math.random() - 0.5);
};
