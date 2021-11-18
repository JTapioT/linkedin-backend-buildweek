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
    imagePart = { image: base64Image, width: 200, margin: [0, 0, 0, 40] };
  }
  const docDefinition = {
    header: {
      text: "Profile",
      alignment: "center",
      margin: [0, 10, 0, 0],
    },
    footer: {
      text: profile.email,
      alignment: `center`,
    },
    watermark: {
      text: "Profile",
      color: "blue",
      opacity: 0.1,
      bold: true,
      italics: false,
    },
    content: [
      imagePart,
      {
        ul: [
          { margin: [5, 10, 5, 20], text: profile.name },
          { margin: [5, 10, 5, 20], text: profile.surname },
          { margin: [5, 10, 5, 20], text: profile.email },
          { margin: [5, 10, 5, 20], text: profile.username },
          { margin: [5, 10, 5, 20], text: profile.bio },
          { margin: [5, 10, 5, 20], text: profile.title },
          { margin: [5, 10, 5, 20], text: profile.area },
        ],
        margin: [5, 2, 10, 20],
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
