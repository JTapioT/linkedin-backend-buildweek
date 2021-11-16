import PdfPrinter from "pdfmake";
import striptags from "striptags";
import axios from "axios";

const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

const printer = new PdfPrinter(fonts);

export const generateProfilePDF = async (profile) => {
  let imagePart = {};
  if (profile.image) {
    const response = await axios.get(profile.image, {
      responseType: "arraybuffer",
    });
    const profileImage = profile.image.split("/");
    const filename = profileImage[profileImage.length - 1];
    const [id, extension] = filename.split(".");
    const base64 = response.data.toString("base64");
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, width: 500, margin: [0, 0, 0, 40] };
  }
  const docDefinition = {
    content: [
      imagePart,
      {
        text: [
          { text: profile.name },
          { text: profile.surname },
          { text: profile.email },
        ],
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 40],
      },
    ],
  };
  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();
  return pdfReadableStream;
};
