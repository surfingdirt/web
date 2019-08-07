let count = 0;
const uuid = () => {
  const val = `menu-id-${count}`;
  count += 1;
  return val;
};

export default uuid;
