const express = require('express')
const path = require('path')
const fs = require("fs");
const exphbs = require('express-handlebars')
const json2csv = require("json2csv").parse;
const app = express()
Web3 = require('web3')
web3 = new Web3

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static ('public'))


app.get('/', (req, res) => {
  
  const wallet = web3.eth.accounts.create()
        
    const readFileSync = filePath =>
    fs.readFileSync(filePath, { encoding: "utf-8" });

    // A helper to search for values ​​in files =D
    const findWord = async (text, filePath) => {
    const result = await readFileSync(path.join(__dirname, filePath));
    return Promise.resolve(RegExp("\\b" + text + "\\b").test(result));
    };

    const write = async (fileName, fields, data) => {
    // output file in the same folder
    const filename = path.join(__dirname, "CSV", `${fileName}`);
    let rows;

    // I check if there is a header with these items
    const hasValue = await findWord("address,privateKey", "./CSV/walletSave.csv");
    //  If there is a header I add the other lines without it if I don't follow the natural flow
    if (hasValue) {
      rows = json2csv(data, { header: false });
    } else if (!fs.existsSync(fields)) {
    // If file doesn't exist, we will create new file and add rows with headers.
      rows = json2csv(data, { header: true });
    } else {
      // Rows without headers.
      rows = json2csv(data, { header: false });
    }

    // I deal with the information by removing the quotes
    const newRows = rows.replace(/[\\"]/g, "");
    // Append file function can create new file too.
    await fs.appendFileSync(filename, newRows);
    // Always add new line if file already exists.
    await fs.appendFileSync(filename, "\r\n");
    };

    fields = ["address", "privateKey"];
    data = [
    {
      address: wallet.address,
      privateKey: wallet.privateKey
    }
    ];

    write("walletSave.csv", fields, data);

    console.log(wallet.address)

    res.render('index', {
      address: wallet.address
    })

})

app.get('/download-link', function(req, res){
  const file = `${__dirname}/CSV/walletSave.csv`;
  res.download(file); // Set disposition and send it.
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`The server is running on the port ${PORT}`)
})