import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { ResumeView } from "../types";
import { renderTemplate } from "./templateRenderer";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export async function generatePDF(resume: ResumeView): Promise<void> {
  const html = renderTemplate(resume.templateId, resume.content);

  // Mount hidden iframe for rendering
  const iframe = document.createElement("iframe");
  iframe.style.cssText = `
    position: fixed; left: -9999px; top: 0;
    width: ${A4_WIDTH_PX}px; height: ${A4_HEIGHT_PX}px;
    border: none; visibility: hidden;
  `;
  document.body.appendChild(iframe);

  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) throw new Error("Could not access iframe document");

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    // Wait for fonts and images to load
    await new Promise((resolve) => setTimeout(resolve, 600));

    const canvas = await html2canvas(iframeDoc.body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: A4_WIDTH_PX,
      height: A4_HEIGHT_PX,
      windowWidth: A4_WIDTH_PX,
      windowHeight: A4_HEIGHT_PX,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Handle multi-page: canvas height may exceed one A4 page
    const canvasHeightPerPage = (A4_WIDTH_PX / pdfWidth) * pdfHeight;
    const totalPages = Math.ceil(canvas.height / canvasHeightPerPage);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage();

      const srcY = page * canvasHeightPerPage;
      const srcH = Math.min(canvasHeightPerPage, canvas.height - srcY);

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.round((srcH / canvas.height) * canvas.height);

      const ctx = pageCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          canvas,
          0,
          srcY,
          canvas.width,
          srcH,
          0,
          0,
          canvas.width,
          pageCanvas.height,
        );
      }

      const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(pageImgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    const filename = `${resume.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_resume.pdf`;
    pdf.save(filename);
  } finally {
    document.body.removeChild(iframe);
  }
}
