import * as nodemailer from "nodemailer";

export default async function (req, res) {
  const { order, email, user, shippingAddress } = await req.body;
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL, // generated ethereal user
      pass: process.env.MAIL_SECRET, // generated ethereal password
    },
    secure: true,
  });

  const currencyFormatter = (price) => {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
      style: "currency",
      currency: "INR",
    }).format(price);
  };
  var total = currencyFormatter(order.total);
  var subtotal = currencyFormatter(order.subtotal);
  var shipping_price = currencyFormatter(order.shipping_price);

  const mailData = {
    from: "support@apneehatti.com",
    to: email,
    subject: `Order Confirmation for your Recent Purchase`,
    text: " hello | Sent from: apneehatti",
    html: `<head>
    <!--[if gte mso 15]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!-- Order confirmation email template for Shopify -->
    <style type="text/css" data-premailer="ignore">
      /* What it does: Remove spaces around the email design added by some email clients. */
      /* Beware: It can remove the padding / Margin and add a background color to the compose a reply window. */
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
      /* What it does: Stops email clients resizing small text. */
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      /* What it does: Forces Outlook.com to display emails full width. */
      .ExternalClass {
        width: 100%;
      }
      /* What is does: Centers email on Android 4.4 */
      div[style*="Margin: 16px 0"] {
        margin: 0 !important;
      }
      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      th {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      /* What it does: Fixes Outlook.com line height. */
      .ExternalClass,
      .ExternalClass * {
        line-height: 100% !important;
      }
      /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        border: none;
        margin: 0 auto;
      }
      div[style*="Margin: 16px 0"] {
        margin: 0 !important;
      }
      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
        -ms-interpolation-mode: bicubic;
      }
      /* What it does: Overrides styles added when Yahoo's auto-senses a link. */
      .yshortcuts a {
        border-bottom: none !important;
      }
      /* What it does: Overrides blue, underlined link auto-detected by iOS Mail. */
      /* Create a class for every link style needed; this template needs only one for the link in the footer. */
      /* What it does: A work-around for email clients meddling in triggered links. */
      *[x-apple-data-detectors],  /* iOS */
          .x-gmail-data-detectors,    /* Gmail */
          .x-gmail-data-detectors *,
          .aBn {
        border-bottom: none !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
  
      /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */
      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }
      /* If the above doesn't work, add a .g-img class to any image in question. */
      img.g-img + div {
        display: none !important;
      }
      /* What it does: Prevents underlining the button text in Windows 10 */
      a,
      a:link,
      a:visited {
        color: #ecba78;
        text-decoration: none !important;
      }
      .header a {
        color: #c3c3c3;
        text-decoration: none;
        text-underline: none;
      }
      .main a {
        color: #ecba78;
        text-decoration: none;
        text-underline: none;
        word-wrap: break-word;
      }
      .main .section.customer_and_shipping_address a,
      .main .section.shipping_address_and_fulfillment_details a {
        color: #666363;
        text-decoration: none;
        text-underline: none;
        word-wrap: break-word;
      }
      .footer a {
        color: #ecba78;
        text-decoration: none;
        text-underline: none;
      }
  
      /* What it does: Overrides styles added images. */
      img {
        border: none !important;
        outline: none !important;
        text-decoration: none !important;
      }
      /* What it does: Fixes fonts for Google WebFonts; */
      [style*="Karla"] {
        font-family: "Karla", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
          sans-serif !important;
      }
      [style*="Karla"] {
        font-family: "Karla", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
          sans-serif !important;
      }
      [style*="Karla"] {
        font-family: "Karla", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
          sans-serif !important;
      }
      [style*="Playfair Display"] {
        font-family: "Playfair Display", Georgia, serif !important;
      }
      td.menu_bar_1 a:hover,
      td.menu_bar_6 a:hover {
        color: #ecba78 !important;
      }
      th.related_product_wrapper.first {
        border-right: 13px solid #ffffff;
        padding-right: 6px;
      }
      th.related_product_wrapper.last {
        border-left: 13px solid #ffffff;
        padding-left: 6px;
      }
    </style>
    <!--[if (mso)|(mso 16)]>
      <style type="text/css" data-premailer="ignore">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Karla:400,700%7CPlayfair+Display:700,400%7CKarla:700,400%7CKarla:700,700"
      rel="stylesheet"
      type="text/css"
      data-premailer="ignore"
    />
    <!--<![endif]-->
    <style type="text/css" data-premailer="ignore">
      /* Media Queries */
      /* What it does: Removes right gutter in Gmail iOS app */
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        /* iPhone 6 and 6+ */
        .container {
          min-width: 375px !important;
        }
      }
      /* Main media query for responsive styles */
      @media only screen and (max-width: 480px) {
        /* What it does: Overrides email-container's desktop width and forces it into a 100% fluid width. */
        .email-container {
          width: 100% !important;
          min-width: 100% !important;
        }
        .section > th {
          padding: 13px 26px 13px 26px !important;
        }
        .section.divider > th {
          padding: 26px 26px !important;
        }
        .main .section:first-child > th,
        .main .section:first-child > td {
          padding-top: 26px !important;
        }
        .main .section:nth-last-child(2) > th,
        .main .section:nth-last-child(2) > td {
          padding-bottom: 52px !important;
        }
        .section.recommended_products > th,
        .section.discount > th {
          padding: 26px 26px !important;
        }
        /* What it does: Forces images to resize to the width of their container. */
        img.fluid,
        img.fluid-centered {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin: auto !important;
          box-sizing: border-box;
        }
        /* and center justify these ones. */
        img.fluid-centered {
          margin: auto !important;
        }
  
        /* What it does: Forces table cells into full-width rows. */
        th.stack-column,
        th.stack-column-left,
        th.stack-column-center,
        th.related_product_wrapper,
        .column_1_of_2,
        .column_2_of_2 {
          display: block !important;
          width: 100% !important;
          min-width: 100% !important;
          direction: ltr !important;
          box-sizing: border-box;
        }
        /* and left justify these ones. */
        th.stack-column-left {
          text-align: left !important;
        }
        /* and center justify these ones. */
        th.stack-column-center,
        th.related_product_wrapper {
          text-align: center !important;
          border-right: none !important;
          border-left: none !important;
        }
        .column_button,
        .column_button > table,
        .column_button > table th {
          width: 100% !important;
          text-align: center !important;
          margin: 0 !important;
        }
        .column_1_of_2 {
          padding-bottom: 26px !important;
        }
        .column_1_of_2 th {
          padding-right: 0 !important;
        }
        .column_2_of_2 th {
          padding-left: 0 !important;
        }
        .column_text_after_button {
          padding: 0 13px !important;
        }
        /* Adjust product images */
        th.table-stack {
          padding: 0 !important;
        }
        th.product-image-wrapper {
          padding: 26px 0 13px 0 !important;
        }
        img.product-image {
          height: 100px !important;
          max-height: 100px !important;
          width:100% !important;
        }
        tr.row-border-bottom th.product-image-wrapper {
          border-bottom: none !important;
        }
        th.related_product_wrapper.first,
        th.related_product_wrapper.last {
          padding-right: 0 !important;
          padding-left: 0 !important;
        }
        .text_banner th.banner_container {
          padding: 13px !important;
        }
        .mobile_app_download .column_1_of_2 .image_container {
          padding-bottom: 0 !important;
        }
        .mobile_app_download .column_2_of_2 .image_container {
          padding-top: 0 !important;
        }
      }
    </style>
    <style type="text/css" data-premailer="ignore">
      /* Custom Media Queries */
      @media only screen and (max-width: 480px) {
        .column_logo {
          display: block !important;
          width: 100% !important;
          min-width: 100% !important;
          direction: ltr !important;
          text-align: center !important;
        }
        p,
        .column_1_of_2 th p,
        .column_2_of_2 th p,
        .order_notes *,
        .invoice_link * {
          text-align: center !important;
        }
        .line-item-description p {
          text-align: left !important;
        }
        .line-item-price p,
        .line-item-qty p,
        .line-item-line-price p {
          text-align: right !important;
        }
        h1,
        h2,
        h3,
        .column_1_of_2 th,
        .column_2_of_2 th {
          text-align: center !important;
        }
        td.order-table-title {
          text-align: center !important;
        }
        .footer .column_1_of_2 {
          border-right: 0 !important;
          border-bottom: 0 !important;
        }
        .footer .section_wrapper_th {
          padding: 0 17px;
        }
      }
    </style>
  </head>
  <body
    className="body"
    id="body"
    leftmargin="0"
    topmargin="0"
    marginwidth="0"
    marginheight="0"
    bgcolor="#ecba78"
    style="
      -webkit-text-size-adjust: none;
      -ms-text-size-adjust: none;
      margin: 0;
      padding: 0;
    "
  >
    <!--[if !mso 9]><!-->
    <div
      style="
        display: none;
        overflow: hidden;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        mso-hide: all;
      "
    >
      We've got your order! Your world is about to look a whole lot better.We'll
      drop you another email when your order ships.
    </div>
    <!--<![endif]-->
    <!-- BEGIN: CONTAINER -->
    <table
      className="container container_full"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="border-collapse: collapse; min-width: 100%"
      role="presentation"
      bgcolor="#ecba78"
    >
      <tbody>
        <tr>
          <th valign="top" style="mso-line-height-rule: exactly">
            <center style="width: 100%">
              <table
                border="0"
                width="600"
                cellpadding="0"
                cellspacing="0"
                align="center"
                style="
                  width: 600px;
                  min-width: 600px;
                  max-width: 600px;
                  margin: auto;
                "
                className="email-container"
                role="presentation"
              >
                <tbody>
                  <tr>
                    <th valign="top" style="mso-line-height-rule: exactly">
                      <!-- BEGIN : SECTION : HEADER -->
                      <table
                        className="section_wrapper header"
                        data-id="header"
                        id="section-header"
                        border="0"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        style="min-width: 100%"
                        role="presentation"
                        bgcolor="#ffffff"
                      >
                        <tbody>
                          <tr>
                            <td
                              className="section_wrapper_th"
                              style="
                                mso-line-height-rule: exactly;
                                padding-top: 52px;
                                padding-bottom: 26px;
                              "
                              bgcolor="#ffffff"
                            >
                              <table
                                border="0"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                align="center"
                                style="min-width: 100%"
                                role="presentation"
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      className="column_logo"
                                      style="
                                        mso-line-height-rule: exactly;
                                        padding-top: 13px;
                                        padding-bottom: 13px;
                                      "
                                      align="center"
                                      bgcolor="#ffffff"
                                    >
                                      <!-- Logo : BEGIN -->
                                      <a
                                        href="https://apneehatti.com/"
                                        target="_blank"
                                        style="
                                          color: #c3c3c3;
                                          text-decoration: none !important;
                                          text-underline: none;
                                        "
                                      >
                                        <img
                                          src="https://www.apneehatti.com/images/logo/apneehatti_logo.svg"
                                          className="logo"
                                          width="140"
                                          border="0"
                                          style="
                                            width: 140px;
                                            height: auto !important;
                                            display: block;
                                            text-align: center;
                                            margin: auto;
                                          "
                                        />
                                      </a>
                                      <!-- Logo : END -->
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- END : SECTION : HEADER -->
                      <!-- BEGIN : SECTION : MAIN -->
                      <table
                        className="section_wrapper main"
                        data-id="main"
                        id="section-main"
                        border="0"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        style="min-width: 100%"
                        role="presentation"
                        bgcolor="#ffffff"
                      >
                        <tbody>
                          <tr>
                            <td
                              className="section_wrapper_th"
                              style="mso-line-height-rule: exactly"
                              bgcolor="#ffffff"
                            >
                              <table
                                border="0"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                align="center"
                                style="min-width: 100%"
                                id="mixContainer"
                                role="presentation"
                              >
                                <!-- BEGIN SECTION: Heading -->
                                <tbody>
                                  <tr
                                    id="section-1468266"
                                    className="section heading"
                                  >
                                    <th
                                      style="
                                        mso-line-height-rule: exactly;
                                        color: #4b4b4b;
                                        padding: 26px 52px 13px;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                        role="presentation"
                                        style="color: #4b4b4b"
                                        bgcolor="#ffffff"
                                      >
                                        <tbody>
                                          <tr
                                            style="color: #4b4b4b"
                                            bgcolor="#ffffff"
                                          >
                                            <th
                                              style="
                                                mso-line-height-rule: exactly;
                                                color: #4b4b4b;
                                              "
                                              bgcolor="#ffffff"
                                              valign="top"
                                            >
                                              <h1
                                                data-key="1468266_heading"
                                                style="
                                                  font-family: Georgia, serif,
                                                    'Playfair Display';
                                                  font-size: 28px;
                                                  line-height: 46px;
                                                  font-weight: 700;
                                                  color: #4b4b4b;
                                                  text-transform: none;
                                                  background-color: #ffffff;
                                                  margin: 0;
                                                "
                                              >
                                                Order Confirmation
                                              </h1>
                                            </th>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </th>
                                  </tr>
                                  <!-- END SECTION: Heading -->
                                  <!-- BEGIN SECTION: Introduction -->
                                  <tr
                                    id="section-1468267"
                                    className="section introduction"
                                  >
                                    <th
                                      style="
                                        mso-line-height-rule: exactly;
                                        padding: 13px 52px;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <p
                                        style="
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Arial,
                                            'Karla';
                                          font-size: 16px;
                                          line-height: 26px;
                                          font-weight: 400;
                                          color: #666363;
                                          margin: 0 0 13px;
                                        "
                                        align="center"
                                      >
                                        <span
                                          data-key="1468267_greeting_text"
                                          style="
                                            text-align: center;
                                            font-family: -apple-system,
                                              BlinkMacSystemFont, 'Segoe UI',
                                              Arial, 'Karla';
                                            font-size: 16px;
                                            line-height: 26px;
                                            font-weight: 400;
                                            color: #666363;
                                          "
                                        >
                                          Hey
                                        </span>
                                        ${user},
                                      </p>
  
                                      <p
                                        data-key="1468267_introduction_text"
                                        className="text"
                                        style="
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Arial,
                                            'Karla';
                                          font-size: 16px;
                                          line-height: 26px;
                                          font-weight: 400;
                                          color: #666363;
                                          margin: 13px 0;
                                        "
                                        align="center"
                                      ></p>
                                      <p
                                        style="
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Arial,
                                            'Karla';
                                          font-size: 16px;
                                          line-height: 26px;
                                          font-weight: 400;
                                          color: #666363;
                                          margin: 13px 0;
                                        "
                                        align="center"
                                      >
                                        We've got your order! Your world is about
                                        to look a whole lot better.
                                      </p>
                                      <p
                                        style="
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Arial,
                                            'Karla';
                                          font-size: 16px;
                                          line-height: 26px;
                                          font-weight: 400;
                                          color: #666363;
                                          margin: 13px 0;
                                        "
                                        align="center"
                                      >
                                        We'll drop you another email when your
                                        order ships.
                                      </p>
                                    </th>
                                  </tr>
                                  <!-- END SECTION: Introduction -->
                                  <!-- BEGIN SECTION: Order Number And Date -->
                                  <tr
                                    id="section-1468270"
                                    className="section order_number_and_date"
                                  >
                                    <th
                                      style="
                                        mso-line-height-rule: exactly;
                                        padding: 13px 52px;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <h2
                                        style="
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Arial,
                                            'Karla';
                                          color: #4b4b4b;
                                          font-size: 20px;
                                          line-height: 26px;
                                          font-weight: 700;
                                          text-transform: uppercase;
                                          letter-spacing: 1px;
                                          margin: 0;
                                        "
                                        align="center"
                                      >
                                        <span data-key="1468270_order_number"
                                          >Order No.</span
                                        >
                                        ${order._id}
                                      </h2>
                                      <p
                                        className="muted"
                                        style="
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Arial,
                                            'Karla';
                                          font-size: 14px;
                                          line-height: 26px;
                                          font-weight: normal;
                                          color: #bdbdbd;
                                          margin: 0;
                                        "
                                        align="center"
                                      >
                                        ${new Date(
                                          order.createdAt
                                        ).toLocaleDateString("en-US", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </p>
                                    </th>
                                  </tr>
                                  <!-- END SECTION: Order Number And Date -->
                                  <!-- BEGIN SECTION: Products With Pricing -->
                                  <tr
                                    id="section-1468271"
                                    className="section products_with_pricing"
                                  >
                                    <!-- Bold 1 -->
  
                                    <!-- end Bold 1 -->
                                    <th
                                      style="
                                        mso-line-height-rule: exactly;
                                        padding: 13px 52px;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <table
                                        className="table-inner"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                        style="min-width: 100%"
                                        role="presentation"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              className="product-table"
                                              style="
                                                mso-line-height-rule: exactly;
                                              "
                                              bgcolor="#ffffff"
                                              valign="top"
                                            >
                                              <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                                style="min-width: 100%"
                                                role="presentation"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th
                                                      colspan="2"
                                                      className="product-table-h3-wrapper"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                      "
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      <h3
                                                        data-key="1468271_item"
                                                        style="
                                                          font-family: -apple-system,
                                                            BlinkMacSystemFont,
                                                            'Segoe UI', Arial,
                                                            'Karla';
                                                          color: #bdbdbd;
                                                          font-size: 16px;
                                                          line-height: 52px;
                                                          font-weight: 700;
                                                          text-transform: uppercase;
                                                          border-bottom-width: 2px;
                                                          border-bottom-color: #dadada;
                                                          border-bottom-style: solid;
                                                          letter-spacing: 1px;
                                                          margin: 0;
                                                        "
                                                        align="left"
                                                      >
                                                        Items ordered
                                                      </h3>
                                                    </th>
                                                  </tr>
  
                                                  <!-- Bold 2 -->
  
                                                  <!-- end Bold 2 -->
                                                  ${order.order_items.map(
                                                    (item) =>
                                                      `<tr className="row-border-bottom">
                                                        <th
                                                          className="table-stack product-image-wrapper stack-column-center"
                                                          width="1"
                                                          style="
                                                        mso-line-height-rule: exactly;
                                                        border-bottom-width: 2px;
                                                        border-bottom-color: #dadada;
                                                        border-bottom-style: solid;
                                                        padding: 13px 13px 13px 0;
                                                      "
                                                          bgcolor="#ffffff"
                                                          valign="middle"
                                                        >
                                                          <img
                                                            width="50"
                                                            className="product-image"
                                                            src=${item.image[0]}
                                                            alt="Product Image"
                                                            style="
                                                          vertical-align: middle;
                                                          text-align: center;
                                                          width: 50px;
                                                          max-width: 50px;
                                                          height: auto !important;
                                                          border-radius: 1px;
                                                          padding: 0px;
                                                        "
                                                          />
                                                        </th>
                                                        <th
                                                          className="product-details-wrapper table-stack stack-column"
                                                          style="
                                                        mso-line-height-rule: exactly;
                                                        padding-top: 13px;
                                                        padding-bottom: 13px;
                                                        border-bottom-width: 2px;
                                                        border-bottom-color: #dadada;
                                                        border-bottom-style: solid;
                                                      "
                                                          bgcolor="#ffffff"
                                                          valign="middle"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            width="100%"
                                                            style="min-width: 100%"
                                                            role="presentation"
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <th
                                                                  className="line-item-description"
                                                                  style="
                                                                mso-line-height-rule: exactly;
                                                                font-family: -apple-system,
                                                                  BlinkMacSystemFont,
                                                                  'Segoe UI',
                                                                  Arial, 'Karla';
                                                                font-size: 16px;
                                                                line-height: 26px;
                                                                font-weight: 400;
                                                                color: #666363;
                                                                padding: 13px 6px
                                                                  13px 0;
                                                              "
                                                                  align="left"
                                                                  bgcolor="#ffffff"
                                                                  valign="top"
                                                                >
                                                                  <p
                                                                    style="
                                                                  mso-line-height-rule: exactly;
                                                                  font-family: -apple-system,
                                                                    BlinkMacSystemFont,
                                                                    'Segoe UI',
                                                                    Arial, 'Karla';
                                                                  font-size: 16px;
                                                                  line-height: 26px;
                                                                  font-weight: 400;
                                                                  color: #666363;
                                                                  margin: 0;
                                                                "
                                                                    align="left"
                                                                  >
                                                                    <a
                                                                      href="#"
                                                                      target="_blank"
                                                                      style="
                                                                    color: #666363;
                                                                    text-decoration: none !important;
                                                                    text-underline: none;
                                                                    word-wrap: break-word;
                                                                    text-align: left !important;
                                                                    font-weight: bold;
                                                                  "
                                                                    >
                                                                      ${
                                                                        item.title
                                                                      }
                                                                    </a>
                                                                  </p>
                                                                </th>

                                                                <th
                                                                  style="
                                                                mso-line-height-rule: exactly;
                                                              "
                                                                  bgcolor="#ffffff"
                                                                  valign="top"
                                                                ></th>

                                                                <th
                                                                  className="right line-item-qty"
                                                                  width="1"
                                                                  style="
                                                                mso-line-height-rule: exactly;
                                                                white-space: nowrap;
                                                                padding: 13px 0
                                                                  13px 13px;
                                                              "
                                                                  align="right"
                                                                  bgcolor="#ffffff"
                                                                  valign="top"
                                                                >
                                                                  <p
                                                                    style="
                                                                  mso-line-height-rule: exactly;
                                                                  font-family: -apple-system,
                                                                    BlinkMacSystemFont,
                                                                    'Segoe UI',
                                                                    Arial, 'Karla';
                                                                  font-size: 16px;
                                                                  line-height: 26px;
                                                                  font-weight: 400;
                                                                  color: #666363;
                                                                  margin: 0;
                                                                "
                                                                    align="right"
                                                                  >
                                                                    Ã&nbsp;${
                                                                      item.quantity
                                                                    }
                                                                   
                                                                  </p>
                                                                </th>
                                                                <th
                                                                  className="right line-item-line-price"
                                                                  width="1"
                                                                  style="
                                                                mso-line-height-rule: exactly;
                                                                white-space: nowrap;
                                                                padding: 13px 0
                                                                  13px 26px;
                                                              "
                                                                  align="right"
                                                                  bgcolor="#ffffff"
                                                                  valign="top"
                                                                >
                                                                  <p
                                                                    style="
                                                                  mso-line-height-rule: exactly;
                                                                  font-family: -apple-system,
                                                                    BlinkMacSystemFont,
                                                                    'Segoe UI',
                                                                    Arial, 'Karla';
                                                                  font-size: 16px;
                                                                  line-height: 26px;
                                                                  font-weight: 400;
                                                                  color: #666363;
                                                                  margin: 0;
                                                                "
                                                                    align="right"
                                                                  >
                                                                    
                                                                    ${Intl.NumberFormat(
                                                                      "en-IN",
                                                                      {
                                                                        maximumSignificantDigits: 3,
                                                                        style:
                                                                          "currency",
                                                                        currency:
                                                                          "INR",
                                                                      }
                                                                    ).format(
                                                                      item.price *
                                                                        item.quantity
                                                                    )}
                                                                  </p>
                                                                </th>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </th>
                                                      </tr>`
                                                  )}
  
                                                  <tr>
                                                    <th
                                                      colspan="2"
                                                      className="product-empty-row"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                      "
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    ></th>
                                                  </tr>
  
                                                  <!-- Bold 2 -->
  
                                                  <!-- end Bold 2 -->
                                                </tbody>
                                              </table>
                                            </th>
                                          </tr>
                                          <tr>
                                            <th
                                              className="pricing-table"
                                              style="
                                                mso-line-height-rule: exactly;
                                                padding: 13px 0;
                                              "
                                              bgcolor="#ffffff"
                                              valign="top"
                                            >
                                              <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                                style="min-width: 100%"
                                                role="presentation"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th
                                                      className="table-title"
                                                      data-key="1468271_subtotal"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: bold;
                                                        color: #666363;
                                                        width: 65%;
                                                        padding: 6px 0;
                                                      "
                                                      align="left"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      Subtotal
                                                    </th>
                                                    <th
                                                      className="table-text"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: 400;
                                                        color: #666363;
                                                        width: 35%;
                                                        padding: 6px 0;
                                                      "
                                                      align="right"
                                                      bgcolor="#ffffff"
                                                      valign="middle"
                                                    >
                                                      ${subtotal}
                                                    </th>
                                                  </tr>
  
                                                  <tr>
                                                    <th
                                                      className="table-title"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: bold;
                                                        color: #666363;
                                                        width: 65%;
                                                        padding: 6px 0;
                                                      "
                                                      align="left"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      shipping
                                                    </th>
                                                    <th
                                                      className="table-text"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: 400;
                                                        color: #666363;
                                                        width: 35%;
                                                        padding: 6px 0;
                                                      "
                                                      align="right"
                                                      bgcolor="#ffffff"
                                                      valign="middle"
                                                    >
                                                      ${shipping_price}
                                                    </th>
                                                  </tr>
  
                                                  <tr
                                                    className="pricing-table-total-row"
                                                  >
                                                    <th
                                                      className="table-title"
                                                      data-key="1468271_total"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: bold;
                                                        color: #666363;
                                                        width: 65%;
                                                        padding: 6px 0;
                                                      "
                                                      align="left"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      Total
                                                    </th>
                                                    <th
                                                      className="table-text"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: 400;
                                                        color: #666363;
                                                        width: 35%;
                                                        padding: 6px 0;
                                                      "
                                                      align="right"
                                                      bgcolor="#ffffff"
                                                      valign="middle"
                                                    >
                                                      ${total}
                                                    </th>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </th>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </th>
                                  </tr>
                                  <!-- END SECTION: Products With Pricing -->
                                  <!-- BEGIN SECTION: Payment Info -->
  
                                  <!-- END SECTION: Payment Info -->
                                  <!-- BEGIN SECTION: Customer And Shipping Address -->
                                  <tr
                                    id="section-1468273"
                                    className="section customer_and_shipping_address"
                                  >
                                    <!-- BEGIN : 2 COLUMNS : BILL_TO -->
                                    <th
                                      style="
                                        mso-line-height-rule: exactly;
                                        padding: 13px 52px;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <table
                                        border="0"
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="center"
                                        style="min-width: 100%"
                                        role="presentation"
                                      >
                                        <tbody>
                                          <tr>
                                            <!-- BEGIN : Column 1 of 2 : BILL_TO -->
  
                                            <!-- END : Column 1 of 2 : BILL_TO -->
                                            <!-- BEGIN : Column 2 of 2 : SHIP_TO -->
                                            <th
                                              width="100%"
                                              className="column_2_of_2 column_ship_to"
                                              style="
                                                mso-line-height-rule: exactly;
                                              "
                                              align="center"
                                              bgcolor="#ffffff"
                                              valign="top"
                                            >
                                              <table
                                                align="center"
                                                border="0"
                                                width="100%"
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="min-width: 100%"
                                                role="presentation"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        padding-left: 5%;
                                                      "
                                                      align="center"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      <h3
                                                        data-key="1468273_ship_to"
                                                        style="
                                                          font-family: -apple-system,
                                                            BlinkMacSystemFont,
                                                            'Segoe UI', Arial,
                                                            'Karla';
                                                          color: #bdbdbd;
                                                          font-size: 16px;
                                                          line-height: 52px;
                                                          font-weight: 700;
                                                          text-transform: uppercase;
                                                          letter-spacing: 1px;
                                                          margin: 0;
                                                        "
                                                        align="center"
                                                      >
                                                        Shipping Address
                                                      </h3>
                                                    </th>
                                                  </tr>
  
                                                  <tr>
                                                    <th
                                                      className="shipping_address"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        padding-left: 5%;
                                                      "
                                                      align="center"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      <p
                                                        style="
                                                          mso-line-height-rule: exactly;
                                                          font-family: -apple-system,
                                                            BlinkMacSystemFont,
                                                            'Segoe UI', Arial,
                                                            'Karla';
                                                          font-size: 16px;
                                                          line-height: 26px;
                                                          font-weight: 400;
                                                          color: #666363;
                                                          margin: 0;
                                                        "
                                                        align="center"
                                                      >
                                                        ${
                                                          shippingAddress.fullname
                                                        },
                                                        <br />
                                                        ${
                                                          shippingAddress.address_line
                                                        },
                                                        <br />
                                                        ${shippingAddress.city},
                                                        <br />
                                                        ${
                                                          shippingAddress.postal_code
                                                        },
                                                        <br />
                                                        India<br />
                                                      </p>
                                                    </th>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </th>
                                            <!-- END : Column 2 of 2 : SHIP_TO -->
                                          </tr>
                                        </tbody>
                                      </table>
                                    </th>
                                    <!-- END : 2 COLUMNS : SHIP_TO -->
                                  </tr>
                                  <!-- END SECTION: Customer And Shipping Address -->
                                  <!-- BEGIN SECTION: Divider -->
                                  <tr
                                    id="section-1468275"
                                    className="section divider"
                                  >
                                    <th
                                      style="
                                        mso-line-height-rule: exactly;
                                        padding: 26px 52px;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                        role="presentation"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              style="
                                                mso-line-height-rule: exactly;
                                                border-top-width: 2px;
                                                border-top-color: #dadada;
                                                border-top-style: solid;
                                              "
                                              bgcolor="#ffffff"
                                              valign="top"
                                            ></th>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </th>
                                  </tr>
                                  <!-- END SECTION: Divider -->
                                  <!-- BEGIN SECTION: Closing Text -->
                                  <tr
                                    id="section-1468276"
                                    className="section closing_text"
                                  >
                                    <th
                                      data-key="1468276_closing_text"
                                      className="text"
                                      style="
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Arial,
                                          'Karla';
                                        font-size: 16px;
                                        line-height: 26px;
                                        font-weight: 400;
                                        color: #666363;
                                        padding: 13px 52px 52px;
                                      "
                                      align="center"
                                      bgcolor="#ffffff"
                                    >
                                      <p
                                        style="
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Arial,
                                            'Karla';
                                          font-size: 16px;
                                          line-height: 26px;
                                          font-weight: 400;
                                          color: #666363;
                                          margin: 0;
                                        "
                                        align="center"
                                      >
                                        If you need help with anything please
                                        don't hesitate to drop us an email:
                                        support@apneehatti.com :)
                                      </p>
                                    </th>
                                  </tr>
                                  <!-- END SECTION: Closing Text -->
                                  <tr data-id="link-list">
                                    <td
                                      className="menu_bar menu_bar_6"
                                      style="
                                        mso-line-height-rule: exactly;
                                        padding: 26px 0;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <table
                                        className="table_menu_bar"
                                        border="0"
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              className="menu_bar_item first"
                                              style="
                                                width: 33%;
                                                mso-line-height-rule: exactly;
                                                font-family: -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  Arial, 'Karla';
                                                font-size: 16px;
                                                font-weight: 400;
                                                line-height: 26px;
                                                text-transform: uppercase;
                                                color: #bdbdbd;
                                                border-right-color: #dadada;
                                                border-right-style: solid;
                                                border-left-color: #dadada;
                                                border-left-style: none;
                                                letter-spacing: 1px;
                                                border: 0;
                                              "
                                              align="center"
                                              bgcolor="#ffffff"
                                            >
                                              <a
                                                href="#"
                                                target="_blank"
                                                style="
                                                  color: #bdbdbd;
                                                  text-decoration: none !important;
                                                  text-underline: none;
                                                  word-wrap: break-word;
                                                  text-align: center !important;
                                                  font-family: -apple-system,
                                                    BlinkMacSystemFont, 'Segoe UI',
                                                    Arial, 'Karla';
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 26px;
                                                  text-transform: uppercase;
                                                  letter-spacing: 1px;
                                                "
                                              >
                                                Shop
                                              </a>
                                            </th>
                                            <th
                                              className="menu_bar_item"
                                              style="
                                                width: 33%;
                                                mso-line-height-rule: exactly;
                                                font-family: -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  Arial, 'Karla';
                                                font-size: 16px;
                                                font-weight: 400;
                                                line-height: 26px;
                                                text-transform: uppercase;
                                                color: #bdbdbd;
                                                border-right-color: #dadada;
                                                border-right-style: solid;
                                                border-left-color: #dadada;
                                                border-left-style: solid;
                                                letter-spacing: 1px;
                                                border: 0;
                                              "
                                              align="center"
                                              bgcolor="#ffffff"
                                            >
                                              <a
                                                href="#"
                                                target="_blank"
                                                style="
                                                  color: #bdbdbd;
                                                  text-decoration: none !important;
                                                  text-underline: none;
                                                  word-wrap: break-word;
                                                  text-align: center !important;
                                                  font-family: -apple-system,
                                                    BlinkMacSystemFont, 'Segoe UI',
                                                    Arial, 'Karla';
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 26px;
                                                  text-transform: uppercase;
                                                  letter-spacing: 1px;
                                                "
                                              >
                                                About Us
                                              </a>
                                            </th>
                                            <th
                                              className="menu_bar_item last"
                                              style="
                                                width: 33%;
                                                mso-line-height-rule: exactly;
                                                font-family: -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  Arial, 'Karla';
                                                font-size: 16px;
                                                font-weight: 400;
                                                line-height: 26px;
                                                text-transform: uppercase;
                                                color: #bdbdbd;
                                                border-right-color: #dadada;
                                                border-right-style: none;
                                                border-left-color: #dadada;
                                                border-left-style: solid;
                                                letter-spacing: 1px;
                                                border: 0;
                                              "
                                              align="center"
                                              bgcolor="#ffffff"
                                            >
                                              <a
                                                href="#"
                                                target="_blank"
                                                style="
                                                  color: #bdbdbd;
                                                  text-decoration: none !important;
                                                  text-underline: none;
                                                  word-wrap: break-word;
                                                  text-align: center !important;
                                                  font-family: -apple-system,
                                                    BlinkMacSystemFont, 'Segoe UI',
                                                    Arial, 'Karla';
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 26px;
                                                  text-transform: uppercase;
                                                  letter-spacing: 1px;
                                                "
                                              >
                                                Contact
                                              </a>
                                            </th>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- END : SECTION : MAIN -->
                      <!-- BEGIN : SECTION : FOOTER -->
                      <table
                        className="section_wrapper footer"
                        data-id="footer"
                        id="section-footer"
                        border="0"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        style="min-width: 100%"
                        role="presentation"
                        bgcolor="#ffffff"
                      >
                        <tbody>
                          <tr>
                            <td
                              className="section_wrapper_th"
                              style="
                                mso-line-height-rule: exactly;
                                padding: 0 52px;
                              "
                              bgcolor="#ffffff"
                            >
                              <table
                                border="0"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                align="center"
                                style="min-width: 100%"
                                role="presentation"
                              >
                                <!-- BEGIN : 2 COLUMNS : SOCIAL_BLOCK -->
                                <tbody>
                                  <tr>
                                    <th
                                      style="mso-line-height-rule: exactly"
                                      bgcolor="#ffffff"
                                    >
                                      <table
                                        border="0"
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="center"
                                        style="min-width: 100%"
                                        role="presentation"
                                      >
                                        <tbody>
                                          <tr>
                                            <!-- BEGIN : Column 1 of 2 : SOCIAL_BLOCK -->
                                            <th
                                              width="50%"
                                              className="column_1_of_2 column_social_block"
                                              style="
                                                mso-line-height-rule: exactly;
                                                padding-top: 26px;
                                                padding-bottom: 26px;
                                                border-top-width: 2px;
                                                border-top-color: #dadada;
                                                border-top-style: solid;
                                                border-bottom-width: 2px;
                                                border-bottom-color: #dadada;
                                                border-bottom-style: solid;
                                                border-right-width: 2px;
                                                border-right-color: #dadada;
                                                border-right-style: solid;
                                              "
                                              align="center"
                                              bgcolor="#ffffff"
                                              valign="top"
                                            >
                                              <table
                                                align="center"
                                                border="0"
                                                width="100%"
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="
                                                  min-width: 100%;
                                                  text-align: center;
                                                "
                                                role="presentation"
                                              >
                                                <!-- Social heading : BEGIN -->
                                                <tbody>
                                                  <tr style="" align="center">
                                                    <th
                                                      className="column_footer_title"
                                                      width="100%"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        padding-right: 5%;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 14px;
                                                        line-height: 24px;
                                                        font-weight: 400;
                                                        color: #a3a1a1;
                                                        text-transform: none;
                                                      "
                                                      align="center"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      <p
                                                        data-key="section_footer_title"
                                                        style="
                                                          mso-line-height-rule: exactly;
                                                          font-family: -apple-system,
                                                            BlinkMacSystemFont,
                                                            'Segoe UI', Arial,
                                                            'Karla';
                                                          font-size: 14px;
                                                          line-height: 24px;
                                                          font-weight: 400;
                                                          color: #a3a1a1;
                                                          text-transform: none;
                                                          margin: 0 0 13px;
                                                        "
                                                        align="center"
                                                      >
                                                        Let's hang out?
                                                      </p>
                                                    </th>
                                                  </tr>
                                                  <!-- Social heading : END -->
                                                  <!-- Store Address : BEGIN -->
                                                  <tr style="" align="center">
                                                    <th
                                                      className="column_shop_social_icons"
                                                      width="100%"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        padding-right: 5%;
                                                      "
                                                      align="center"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      <a
                                                        className="social-link"
                                                        href="https://www.facebook.com"
                                                        target="_blank"
                                                        title="Facebook"
                                                        style="
                                                          color: #ecba78;
                                                          text-decoration: none !important;
                                                          text-underline: none;
                                                          font-size: 14px;
                                                          text-align: center;
                                                        "
                                                      >
                                                        <img
                                                          width="32"
                                                          className="social-icons"
                                                          alt="Facebook"
                                                          src="https://orderlyemails.com/facebook_3.png"
                                                          style="
                                                            width: 32px;
                                                            height: auto !important;
                                                            vertical-align: middle;
                                                            text-align: center;
                                                            padding: 6px 6px 0 0px;
                                                          "
                                                        />
                                                      </a>
                                                      <a
                                                        className="social-link"
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        title="Twitter"
                                                        style="
                                                          color: #ecba78;
                                                          text-decoration: none !important;
                                                          text-underline: none;
                                                          font-size: 14px;
                                                          text-align: center;
                                                        "
                                                      >
                                                        <img
                                                          width="32"
                                                          className="social-icons"
                                                          alt="Twitter"
                                                          src="https://orderlyemails.com/twitter_3.png"
                                                          style="
                                                            width: 32px;
                                                            height: auto !important;
                                                            vertical-align: middle;
                                                            text-align: center;
                                                            padding: 6px 6px 0;
                                                          "
                                                        />
                                                      </a>
                                                      <a
                                                        className="social-link"
                                                        href="https://instagram.com/"
                                                        target="_blank"
                                                        title="Instagram"
                                                        style="
                                                          color: #ecba78;
                                                          text-decoration: none !important;
                                                          text-underline: none;
                                                          font-size: 14px;
                                                          text-align: center;
                                                        "
                                                      >
                                                        <img
                                                          width="32"
                                                          className="social-icons"
                                                          alt="Instagram"
                                                          src="https://orderlyemails.com/instagram_3.png"
                                                          style="
                                                            width: 32px;
                                                            height: auto !important;
                                                            vertical-align: middle;
                                                            text-align: center;
                                                            padding: 6px 6px 0;
                                                          "
                                                        />
                                                      </a>
                                                      <a
                                                        className="social-link"
                                                        href="https://www.youtube.com"
                                                        target="_blank"
                                                        title="YouTube"
                                                        style="
                                                          color: #ecba78;
                                                          text-decoration: none !important;
                                                          text-underline: none;
                                                          font-size: 14px;
                                                          text-align: center;
                                                        "
                                                      >
                                                        <img
                                                          width="32"
                                                          className="social-icons"
                                                          alt="YouTube"
                                                          src="https://orderlyemails.com/youtube_3.png"
                                                          style="
                                                            width: 32px;
                                                            height: auto !important;
                                                            vertical-align: middle;
                                                            text-align: center;
                                                            padding: 6px 0px 0 6px;
                                                          "
                                                        />
                                                      </a>
                                                    </th>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </th>
                                            <!-- END : Column 1 of 2 : SOCIAL_BLOCK -->
                                            <!-- BEGIN : Column 2 of 2 : SHOP_BLOCK -->
                                            <th
                                              width="50%"
                                              className="column_2_of_2 column_shop_block"
                                              style="
                                                mso-line-height-rule: exactly;
                                                padding-top: 26px;
                                                padding-bottom: 26px;
                                                border-top-width: 2px;
                                                border-top-color: #dadada;
                                                border-top-style: solid;
                                                border-bottom-width: 2px;
                                                border-bottom-color: #dadada;
                                                border-bottom-style: solid;
                                              "
                                              align="center"
                                              bgcolor="#ffffff"
                                              valign="top"
                                            >
                                              <table
                                                align="center"
                                                border="0"
                                                width="100%"
                                                cellpadding="0"
                                                cellspacing="0"
                                                style="
                                                  min-width: 100%;
                                                  text-align: center;
                                                "
                                                role="presentation"
                                              >
                                                <!-- Store Address : BEGIN -->
                                                <tbody>
                                                  <tr style="" align="center">
                                                    <th
                                                      className="column_shop_block2"
                                                      data-key="section_shop_block2"
                                                      width="100%"
                                                      style="
                                                        mso-line-height-rule: exactly;
                                                        padding-left: 5%;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Arial,
                                                          'Karla';
                                                        font-size: 14px;
                                                        line-height: 24px;
                                                        font-weight: 400;
                                                        color: #a3a1a1;
                                                        text-transform: none;
                                                      "
                                                      align="center"
                                                      bgcolor="#ffffff"
                                                      valign="top"
                                                    >
                                                      Apneehatti<br
                                                        style="text-align: center"
                                                      />Uthra Gram<br
                                                        style="text-align: center"
                                                      />Dharamshala, Himachal
                                                      Pradesh 176052<br
                                                        style="text-align: center"
                                                      />
                                                      <br
                                                        style="text-align: center"
                                                      />
                                                      Copyright Â© 2022
                                                    </th>
                                                  </tr>
                                                  <!-- Store Address : END -->
                                                </tbody>
                                              </table>
                                            </th>
                                            <!-- END : Column 2 of 2 : SHOP_BLOCK -->
                                          </tr>
                                        </tbody>
                                      </table>
                                    </th>
                                    <!-- END : 2 COLUMNS : SHOP_BLOCK -->
                                  </tr>
                                  <tr>
                                    <th
                                      data-id="store-info"
                                      style="mso-line-height-rule: exactly"
                                      bgcolor="#ffffff"
                                    >
                                      <table
                                        border="0"
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                      >
                                        <!-- Store Website : BEGIN -->
                                        <tbody>
                                          <tr>
                                            <th
                                              className="column_shop_block1"
                                              width="100%"
                                              style="
                                                mso-line-height-rule: exactly;
                                                font-family: -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  Arial, 'Karla';
                                                font-size: 14px;
                                                line-height: 24px;
                                                font-weight: 400;
                                                color: #a3a1a1;
                                                text-transform: none;
                                                padding-bottom: 13px;
                                                padding-top: 26px;
                                              "
                                              align="center"
                                              bgcolor="#ffffff"
                                            >
                                              <a
                                                href="https://apneehatti.com/"
                                                target="_blank"
                                                data-key="section_shop_block1"
                                                style="
                                                  color: #ecba78;
                                                  text-decoration: none !important;
                                                  text-underline: none;
                                                  font-size: 14px;
                                                  font-weight: 400;
                                                  text-transform: none;
                                                "
                                                >apneehatti.com</a
                                              >
                                            </th>
                                          </tr>
                                          <!-- Store Website : END -->
                                        </tbody>
                                      </table>
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      height="1"
                                      border="0"
                                      style="
                                        height: 1px;
                                        line-height: 1px;
                                        font-size: 1px;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <img
                                        id="open-image"
                                        src=""
                                        alt=""
                                        width="1"
                                        height="1"
                                        border="0"
                                      />
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- END : SECTION : FOOTER -->
                    </th>
                  </tr>
                </tbody>
              </table>
            </center>
          </th>
        </tr>
      </tbody>
    </table>
    <!-- END : CONTAINER -->
  </body>
  

  `,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
  });
  res.status(200).json("Confirmation mail send successfully");
}
