export const waitAndLog = (file, index) => {
  return new Promise((resolve) => {
    console.log(`Starting file ${index} - ${file.name}`);
    setTimeout(() => {
      console.log(`Finished file ${index} - ${file.name}`);
      resolve(file.name);
    }, 5000);
  });
}