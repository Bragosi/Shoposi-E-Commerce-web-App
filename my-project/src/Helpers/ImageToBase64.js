const imageToBase64 = (image) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);   // data‑URL string
    reader.onerror = reject;
    reader.readAsDataURL(image);
  });

export default imageToBase64;
