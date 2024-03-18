"use client";
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Invoice = ({ logo, order, signature }) => {
  const generateInvoice2 = (order) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [180, 279.4],
    });
    // Define currency formatter function
    function currencyFormatter(value) {
      return "INR " + Number(value).toFixed(2);
    }
    // Add logo and invoice title
    doc.addImage(logo, "JPEG", 10, 10, 40, 30);
    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Invoice", 155, 30, null, null, "right");

    // Add sold by and pan/gst/order details
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Sold By", 12, 70);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text("Apneehatti LLP,", 12, 75);
    doc.text("Dharamshala, Village - Uthra Gram,", 12, 80);
    doc.text("P.O - Ramerh, Tehsil,", 12, 85);
    doc.text("Dharamshala, Himachal Pradesh 176052.", 12, 90);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Pan No :`, 105, 75);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(`EOOPS9825D`, 122, 75);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`GST Registration No :`, 105, 80);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(`02ABVFA0117G1ZV`, 142, 80);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Order Id :`, 105, 85);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(`#${order._id}`, 122, 85);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Order Date :`, 105, 90);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(`${new Date(order.createdAt).toLocaleString()}`, 127, 90);

    // Add billing and shipping addresses
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Billing Address:", 12, 110);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(`${order.shipping_address.fullname},`, 12, 115);
    doc.text(
      `${order.shipping_address.address_line}, ${order.shipping_address.city},`,
      12,
      120
    );
    doc.text(
      `${order.shipping_address.state}, ${order.shipping_address.country} - ${order.shipping_address.postal_code}`,
      12,
      125
    );
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Shipping Address:", 105, 110);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(`${order.shipping_address.fullname},`, 105, 115);
    doc.text(
      `${order.shipping_address.address_line}, ${order.shipping_address.city},`,
      105,
      120
    );
    doc.text(
      `${order.shipping_address.state}, ${order.shipping_address.country} - ${order.shipping_address.postal_code}`,
      105,
      125
    );

    // Add table with order items

    const tableRows = order.order_items.map((item, index) => {
      const discount =
        order.coupon != null ? item.price / order.coupon.discount_percent : 0;
      const row = [
        index + 1,
        item.title,
        currencyFormatter(item.price),
        item.quantity,
        currencyFormatter(discount),
        currencyFormatter(item.price * item.quantity - discount),
      ];
      return row;
    });

    const shippingRow = [
      "",
      "",
      "",
      "",
      "",
      currencyFormatter(order.subtotal),
      currencyFormatter(order.shipping_price),
    ];
    const totalRow = [
      { content: "Total", styles: { fontStyle: "bold" }, colSpan: 7 },

      {
        content: currencyFormatter(order.total),
        styles: { fontStyle: "bold" },
      },
    ];

    tableRows.push(shippingRow);
    tableRows.push(totalRow);

    doc.autoTable({
      head: [
        [
          "Sr.No",
          "Description",
          { content: "Unit Price", styles: { whiteSpace: "nowrap" } },
          "Quantity",
          { content: "Discount", styles: { whiteSpace: "nowrap" } },
          { content: "Subtotal", styles: { whiteSpace: "nowrap" } },
          { content: "Shipping", styles: { whiteSpace: "nowrap" } },
          { content: "Total", styles: { whiteSpace: "nowrap" } },
        ],
      ],
      body: tableRows,
      columnStyles: {
        1: { noWrap: true },
        2: { noWrap: true },
        3: { noWrap: true },
        4: { noWrap: true },
        5: { noWrap: true },
        6: { noWrap: true },
        7: { noWrap: true },
        8: { noWrap: true },
      },
      styles: {
        columnWidth: "auto",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        cell: {
          noWrap: true,
        },
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontSize: 10,
        halign: "center",
        valign: "middle",
      },

      startY: 150,
    });
    var tableBottom = doc.autoTableEndPosY();

    // Add signature
    doc.addImage(signature, "JPEG", 100, tableBottom + 10, 90, 20);
    // var imageBottom = doc.addImageEndPosY();
    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    // doc.text("Authorize signature", imageBottom + 10, 30, null, null, "right");
    // Save the PDF
    doc.save(`invoice-${order._id}.pdf`);
  };

  function handleGeneratePDF() {
    generateInvoice2(order);
  }

  return (
    <div className="">
      <button
        onClick={() => handleGeneratePDF()}
        className=" px-10 w-56 py-2  uppercase transition-all duration-300 hover:bg-black hover:text-white text-sm font-bold mt-2 border-2 border-black"
      >
        Download Invoice
      </button>
    </div>
  );
};

export default Invoice;
