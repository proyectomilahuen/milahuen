import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Utilidad para obtener imágenes en formato Base64
const getBase64ImageFromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Error al convertir la imagen ${url} a Base64:`, error);
    return null;
  }
};

// Formateo de moneda en CLP
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
};

// Función para generar el PDF
export const generatePDF = async ({ name, email, contactNumber, address, cartItems, total, discount, totalWithDiscount }) => {
  const doc = new jsPDF('l', 'mm', 'a4');

  // Configuración de colores
  const primaryColor = [48, 48, 48]; // Gris oscuro
  const accentColor = [195, 148, 6]; // Dorado (#c39406)

  // Obtener logo
  const logoUrl = `${window.location.origin}/images/logo-negro.png`;
  const logoBase64 = await getBase64ImageFromUrl(logoUrl);

  // Encabezado
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 15, 15, 25, 25);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('EMPORIO MILAHUÉN', 45, 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('BOLETA ELECTRÓNICA', 45, 32);

  doc.setFontSize(10);
  doc.setTextColor(...accentColor);
  const empresaInfo = ['www.milahuen.cl', 'emporiomilahuen@gmail.com', '+56 9 XXXX XXXX', 'Santiago, Chile'];
  empresaInfo.forEach((line, index) => {
    doc.text(line, 280, 20 + index * 5, { align: 'right' });
  });

  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.5);
  doc.line(15, 45, 280, 45);

  // Información del cliente
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('DATOS DEL CLIENTE', 15, 55);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const clienteInfo = [
    [`Cliente: ${name}`, `Email: ${email}`],
    [`Teléfono: ${contactNumber}`, `Dirección: ${address}`],
  ];
  clienteInfo.forEach((row, index) => {
    doc.text(row[0], 15, 63 + index * 7);
    doc.text(row[1], 120, 63 + index * 7);
  });

  // Tabla de productos
  doc.autoTable({
    startY: 80,
    head: [['Producto', 'Cantidad', 'Precio Unitario', 'Total']],
    body: cartItems.map((item) => [
      item.name,
      item.quantity,
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity),
    ]),
    theme: 'plain',
    headStyles: {
      fillColor: [...accentColor],
      textColor: 255,
      fontSize: 11,
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 50, halign: 'right' },
      3: { cellWidth: 50, halign: 'right' },
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    margin: { right: 20 },
  });

  // Resumen de totales
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setDrawColor(...accentColor);
  doc.setFillColor(250, 250, 250);
  doc.rect(170, finalY, 110, 35, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Subtotal:', 180, finalY + 10);
  doc.text(`Descuento (${discount * 100}%):`, 180, finalY + 20);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL:', 180, finalY + 30);

  doc.setFont('helvetica', 'normal');
  doc.text(formatCurrency(total), 275, finalY + 10, { align: 'right' });
  doc.text(`-${formatCurrency(total * discount)}`, 275, finalY + 20, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(totalWithDiscount), 275, finalY + 30, { align: 'right' });

  // Pie de página
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...accentColor);
  doc.text('¡Gracias por ser parte de este cambio!', 147.5, 190, { align: 'center' });

  // Descargar PDF
  doc.save('Boleta_Emporio_Milahuen.pdf');
};
