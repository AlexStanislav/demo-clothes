const stripe = require('stripe')('sk_test_51PbLj22Nm2XuukBrGlAYWwe1MkKYsXTyj10DCQ0pCQ9zzfpDw2PanKd6P53dXeCToz9FBEv4p0b290QrreJax7f20019UpmaSy');
const express = require('express')
const app = express()
const port = 8000
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

function generateRandomProductName() {
    const adjectives = ['Awesome', 'Incredible', 'Fantastic', 'Unbelievable', 'Remarkable', 'Extraordinary'];
    const adverbs = ['Quickly', 'Carefully', 'Succinctly', 'Cleverly', 'Globally', 'Effectively'];
    const nouns = ['T-Shirt', 'Pants', 'Dress', 'Jacket', 'Shoes', 'Hat'];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const adverb = adverbs[Math.floor(Math.random() * adverbs.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${adjective} ${adverb} ${noun}`;
}


function generateProducts() {

    const products = []
    const categories = ['men', 'women']
    const collections = ['new', 'hot', 'fall', 'winter', 'spring', 'summer']
    const brands = ['Adidas', 'Apple', 'Asics', 'Casio', 'H&M', 'Hermes', 'Hollister', 'Louis Vuitton', 'Puma', 'Rolex', 'Samsung', 'Versace', 'Zara']
    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, laboriosam? Dolores, quae. Consequuntur, quia.'
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'brown', 'black', 'white', 'gray']
    const images = {
        men: ['https://images.unsplash.com/photo-1717724162644-75f624f413ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1614495039268-aa9a80429b66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1614495039368-525273956716?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1720057150150-c89579bea8de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D'],
        women: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1583882358307-c46d9fdd6258?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    }
    for (let i = 0; i < 80; i++) {
        let category = categories[Math.floor(Math.random() * 2)]
        let price = Math.floor(Math.random() * 1000)
        let old_price = null
        if (Math.random() < 0.3) {
            old_price = parseInt(price + (price * (Math.random() * 0.2 + 0.1)), 10)
        }
        products.push({
            id: i,
            name: generateRandomProductName(),
            description: description,
            price: price,
            category: category,
            collection: collections[Math.floor(Math.random() * collections.length)],
            image: images[category][Math.floor(Math.random() * images[category].length)],
            old_price: old_price,
            brand: brands[Math.floor(Math.random() * brands.length)],
            rating: Math.ceil(Math.random() * 5),
            sizes: ['S', 'M', 'L', 'XL', 'XXL'].sort(() => Math.random() - 0.5),
            colors: colors.sort(() => Math.random() - 0.5),
        })
    }
    return products
}

app.get('/products', (req, res) => {
    let products = generateProducts()
    res.send(products)
})

// Define a route for the '/checkout' endpoint that accepts POST requests
// The endpoint is responsible for creating a Stripe checkout session
app.post('/checkout', async (req, res) => {
    // Get the array of items from the request body
    const items = req.body.items;

    console.log('items', items)

    // Create a new checkout session using Stripe's checkout.sessions.create method
    // The session is created with the following parameters:
    const session = await stripe.checkout.sessions.create({
        // Define the line items for the session
        // The line items are created by mapping over the items array
        line_items: items.map(item => {
            // For each item, create a line item object with the following properties:
            return {
                // The price data for the line item
                price_data: {
                    // The currency for the line item is USD
                    currency: 'usd',
                    // The product data for the line item
                    product_data: {
                        // The name of the product is taken from the item object
                        name: item.name,
                        // The image of the product is taken from the item object
                        images: [item.image],
                    },
                    // The unit amount for the line item is the price of the item multiplied by 100
                    // This is because Stripe expects the price in cents
                    unit_amount: item.price * 100,
                },
                // The quantity for the line item is taken from the item object
                quantity: item.quantity
            }
        }),
        // The mode for the session is set to 'payment'
        // This means that the session will be used for a payment
        mode: 'payment',
        // The success URL for the session is constructed using the request protocol and host
        success_url: `${req.protocol}://${req.get('host')}/success`,
        // The cancel URL for the session is constructed using the request protocol and host
        cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
    })

    // Send a response back to the client with the URL of the created checkout session
    res.send({ url: session.url })
})

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body
    const token = req.body.token

    if (!token) {
        return res.status(400).json({ error: 'Token is required' })
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${process.env.CAPTCHA_SECRET}&response=${token}`
        })

        if (response.status !== 200) {
            return res.status(500).json({ error: 'Failed to verify token' })
        } else if (response.status === 200) {
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            })

            const mailOptions = {
                from: email,
                to: process.env.MAIL_USERNAME,
                subject: `Message from ${name}`,
                text: message
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error)
                    return res.status(500).json({ error: 'Failed to send email' })
                } else {
                    return res.status(200).json({ message: 'Email sent successfully' })
                }
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to verify token' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})