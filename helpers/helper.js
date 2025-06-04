const bcrypt = require('bcryptjs');
const easyinvoice = require('easyinvoice');
const fs = require('fs');

const hashPass = (password) => {
  return bcrypt.hashSync(password, 10);
}

const comparePass = (inputPass, sourcePass) => {
  return bcrypt.compareSync(inputPass, sourcePass);
}

const formatMoney = (int) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(int);
}

const getInvoice = async (userId, productName, price) => {
  var data = {
    apiKey: "free", // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
    mode: "development", // Production or development, defaults to production   
    images: {
        // The logo on top of your invoice
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
        background: "https://public.budgetinvoice.com/img/watermark-draft.jpg"
    },
    // Your own data
    sender: {
        company: "Skelvia",
        address: "Jalan - jalan ah",
        zip: "1234 AB",
        city: "Wakanda",
        country: "Selandia Lama"
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
    },
    // Your recipient
    client: {
        UserID: userId,
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
    },
    information: {
        // Invoice number
        number: "2021.0001",
        // Invoice data
        date: "12-12-2021",
        // Invoice due date
        dueDate: "31-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: [
        {
            quantity: 1,
            description: productName,
            taxRate: 6,
            price: price
        },
    ],
    // The message you would like to display on the bottom of your invoice
    bottomNotice: "Kindly pay your invoice within 15 days.",
    // Settings to customize your invoice
    settings: {
        currency: "IDR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // locale: "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        // marginTop: 25, // Defaults to '25'
        // marginRight: 25, // Defaults to '25'
        // marginLeft: 25, // Defaults to '25'
        // marginBottom: 25, // Defaults to '25'
        // format: "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // height: "1000px", // allowed units: mm, cm, in, px
        // width: "500px", // allowed units: mm, cm, in, px
        // orientation: "landscape" // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
        // invoice: "FACTUUR",  // Default to 'INVOICE'
        // number: "Nummer", // Defaults to 'Number'
        // date: "Datum", // Default to 'Date'
        // dueDate: "Verloopdatum", // Defaults to 'Due Date'
        // subtotal: "Subtotaal", // Defaults to 'Subtotal'
        // products: "Producten", // Defaults to 'Products'
        // quantity: "Aantal", // Default to 'Quantity'
        // price: "Prijs", // Defaults to 'Price'
        // productTotal: "Totaal", // Defaults to 'Total'
        // total: "Totaal", // Defaults to 'Total'
        // taxNotation: "btw" // Defaults to 'vat'
    },
  };

  easyinvoice.createInvoice(data, async function (result) {
    //The response will contain a base64 encoded PDF file
    console.log('PDF base64 string: ', result.pdf);

    await fs.writeFileSync('invoice.pdf', result.pdf, 'base64');
  });
}

module.exports = {
  hashPass,
  comparePass,
  formatMoney,
  getInvoice
}