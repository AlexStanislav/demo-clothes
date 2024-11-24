import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    products: [],
    cart: [],
    wishlist: [],
    cartTotal: 0,
    cartCount: 0,
    wishlistCount: 0,
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : window.location.origin,
    isMobile: () => {
      let check = false
      ;(function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
            a.substr(0, 4)
          )
        )
          check = true
      })(navigator.userAgent || navigator.vendor || window.opera)
      return check
    }
  }),
  actions: {
    generateRandomProductName() {
      const adjectives = [
        'Awesome',
        'Incredible',
        'Fantastic',
        'Unbelievable',
        'Remarkable',
        'Extraordinary'
      ]
      const adverbs = ['Quickly', 'Carefully', 'Succinctly', 'Cleverly', 'Globally', 'Effectively']
      const nouns = ['T-Shirt', 'Pants', 'Dress', 'Jacket', 'Shoes', 'Hat']

      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
      const adverb = adverbs[Math.floor(Math.random() * adverbs.length)]
      const noun = nouns[Math.floor(Math.random() * nouns.length)]

      return `${adjective} ${adverb} ${noun}`
    },
    generateProducts() {
      const products = []
      const categories = ['men', 'women']
      const collections = ['new', 'hot', 'fall', 'winter', 'spring', 'summer']
      const brands = [
        'Adidas',
        'Apple',
        'Asics',
        'Casio',
        'H&M',
        'Hermes',
        'Hollister',
        'Louis Vuitton',
        'Puma',
        'Rolex',
        'Samsung',
        'Versace',
        'Zara'
      ]
      const description =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, laboriosam? Dolores, quae. Consequuntur, quia.'
      const colors = [
        'red',
        'blue',
        'green',
        'yellow',
        'purple',
        'orange',
        'brown',
        'black',
        'white',
        'gray'
      ]
      const images = {
        men: [
          'https://images.unsplash.com/photo-1717724162644-75f624f413ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1614495039268-aa9a80429b66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D',
          'https://images.unsplash.com/photo-1614495039368-525273956716?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1720057150150-c89579bea8de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D'
        ],
        women: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1583882358307-c46d9fdd6258?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ]
      }
      for (let i = 0; i < 80; i++) {
        let category = categories[Math.floor(Math.random() * 2)]
        let price = Math.floor(Math.random() * 10) + 1
        let old_price = null
        if (Math.random() < 0.3) {
          old_price = parseInt(price + price * (Math.random() * 0.2 + 0.1), 10)
        }
        products.push({
          id: i,
          name: this.generateRandomProductName(),
          description: description,
          price: price,
          category: category,
          collection: collections[Math.floor(Math.random() * collections.length)],
          image: images[category][Math.floor(Math.random() * images[category].length)],
          old_price: old_price,
          brand: brands[Math.floor(Math.random() * brands.length)],
          rating: Math.ceil(Math.random() * 5),
          sizes: ['S', 'M', 'L', 'XL', 'XXL'].sort(() => Math.random() - 0.5),
          colors: colors.sort(() => Math.random() - 0.5)
        })
      }
      return products
    },
    async fetchProducts() {
      // const request = await fetch(`${this.baseURL}/products`)
      // const response = await request.json()
      // this.products = response
      this.products = this.generateProducts()
    },
    addToCart(product) {
      this.cart.push(product)
      this.cartTotal += product.price
      this.cartCount++
    },
    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id)
      this.cartTotal -= product.price
      this.cartCount--
    },
    clearCart() {
      this.cart = []
      this.cartTotal = 0
      this.cartCount = 0
    },
    addToWishlist(product) {
      this.wishlist.push(product)
      this.wishlistCount++
    },
    removeFromWishlist(product) {
      this.wishlist = this.wishlist.filter((item) => item.id !== product.id)
      this.wishlistCount--
    }
  }
})
