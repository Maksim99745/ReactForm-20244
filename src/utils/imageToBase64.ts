function imageToBase64(file: File | FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    if (file instanceof File) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsDataURL(file[0]);
    }
  });
}

export default imageToBase64;
