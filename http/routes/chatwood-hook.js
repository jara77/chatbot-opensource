const express = require('express');
const router = express.Router();
const { join } = require('path');
const { createReadStream } = require('fs');

const chatWoodHook = async (req, res) => {
    const providerWs = req.providerWs;
    // console.log(providerWs);
    const body = req.body;
    const phone = body?.conversation?.meta?.sender?.phone_number.replace('+','')
    // console.log(phone);
    await providerWs.sendText(`${phone}@c.us`, body.content)
    res.send(body)
};

// Router
router.post('/chatwood-hook', chatWoodHook)

router.get("/get-qr", async (_, res) => {
    const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
    const fileStream = createReadStream(YOUR_PATH_QR);

    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
});

module.exports = router