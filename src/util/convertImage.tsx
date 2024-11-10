// export const convertFilesToBase64 = (files: File[]): Promise<string[]> => {
//   return Promise.all(
//     files.map((file) => {
//       return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = (error) => reject(error);
//       });
//     })
//   );
// };

export const convertFileToBase64 = (file: File | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(""); // or resolve(null) depending on what you want for empty inputs
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertFilesToBase64 = async (
  files: (File | string)[]
): Promise<string[]> => {
  return Promise.all(
    files.map(async (file) =>
      file instanceof File ? await convertFileToBase64(file) : file
    )
  );
};

export function base64ToFile(
  inputString: string,
  fileName: string,
  mimeType: string
): File | string {
  // Check if the input is in Base64 format (basic check for data URL or pure Base64)
  const isBase64 =
    /^data:.*;base64,/.test(inputString) ||
    /^[A-Za-z0-9+/=]+$/.test(inputString);

  // If not Base64, assume it's a direct URL and return it
  if (!isBase64) {
    return inputString;
  }

  // Remove the prefix if it exists (e.g., "data:image/png;base64,")
  const cleanedBase64String = inputString.includes(",")
    ? inputString.split(",")[1]
    : inputString;

  try {
    // Decode Base64 string
    const byteString = atob(cleanedBase64String);

    // Create a Uint8Array from the decoded Base64 string
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([byteArray], { type: mimeType });

    // Convert the Blob into a File object
    return new File([blob], fileName, { type: mimeType });
  } catch (error) {
    console.error("Error converting Base64 to file:", error);
    return inputString; // Return original input if conversion fails
  }
}
